#!/usr/bin/env python3
"""Parse the supplied Natura dictionary PDF (two columns, font-aware).

Python >= 3.10; dependency: pip install pymupdf
Usage: python parse_dictionary.py dicionario.pdf -o dicionario.json
This is a layout-specific parser, not a general PDF/OCR converter.
"""
from __future__ import annotations

import argparse
from collections import Counter
import json
from pathlib import Path
import re
import sys
import unicodedata

try:
    import pymupdf as fitz
except ImportError:
    try:
        import fitz
    except ImportError:
        sys.exit('Missing dependency: python -m pip install pymupdf')


def clean(text):
    return unicodedata.normalize('NFC', text).replace('\u00ad', '').strip()


def join_text(left, right, dehyphenate=True):
    """Join physical lines; removing a terminal hyphen is necessarily heuristic."""
    if not left:
        return right
    if dehyphenate and re.search(r'\w-$', left) and re.match(r'[^\W\d_]', right):
        return left[:-1] + right
    return left + ' ' + right


def is_bold(span):
    return bool(span['flags'] & 16) or 'BX' in span['font'] or 'BI' in span['font']


def is_italic(span):
    return bool(span['flags'] & 2) or 'TI' in span['font']


def lines_in_reading_order(doc, start_page, end_page, top, bottom):
    """Read left column then right, without mixing simultaneous baselines."""
    for index in range(start_page - 1, end_page):
        page = doc[index]
        columns = [[], []]
        for block in page.get_text('dict')['blocks']:
            for line in block.get('lines', []):
                spans = [s for s in line['spans'] if s['text'].strip()]
                if not spans or line['bbox'][1] < top or line['bbox'][3] > page.rect.height - bottom:
                    continue
                # Large alphabetic section dividers, e.g. A, B, C.
                if max(s['size'] for s in spans) > 18:
                    continue
                col = int(line['bbox'][0] >= page.rect.width / 2)
                columns[col].append((line, spans))
        for col, items in enumerate(columns):
            # Headwords sit at the left edge of each column. Infer that edge
            # from bold text rather than baking A4 coordinates into the parser.
            candidates = [l['bbox'][0] for l, s in items if is_bold(s[0])]
            anchor = min(candidates) if candidates else page.rect.width * (0.095 if col == 0 else 0.51)
            for line, spans in sorted(items, key=lambda pair: (pair[0]['bbox'][1], pair[0]['bbox'][0])):
                yield {
                    'text': clean(''.join(s['text'] for s in line['spans'])),
                    'page': index + 1, 'column': col + 1,
                    'indent': round(line['bbox'][0] - anchor, 2),
                    'bbox': [round(v, 2) for v in line['bbox']],
                    'bold': is_bold(spans[0]),
                    'all_bold': all(is_bold(s) or 'XC' in s['font'] for s in spans),
                    # Only typographic labels count; colons inside prose don't.
                    'label': (clean(spans[0]['text']).split(':', 1)[0]
                              if is_italic(spans[0]) and ':' in spans[0]['text'] else None),
                }


def structure_entry(entry, dehyphenate):
    """Keep ordered sections instead of guessing the author's sense boundaries.

    Labels and repeated fields are retained verbatim. Indentation gives nested
    example fields. Source lines remain authoritative for irregular bullet lists.
    """
    sections = []
    stack = []
    active = None
    for line in entry['source_lines'][entry.pop('_heading_lines'):]:
        text, indent, label = line['text'], line['indent'], line['label']
        if text in ('•', '◦', '–'):
            node = {'kind': 'list_marker', 'text': text, 'indent': indent}
            sections.append(node)
            stack = []
            active = None
            continue
        bullet = text.startswith(('•', '◦', '– '))
        if label is not None:
            node = {'kind': 'field', 'label': label,
                    'text': text.split(':', 1)[1].strip(), 'indent': indent,
                    'children': []}
            while stack and indent <= stack[-1]['indent'] + 2:
                stack.pop()
            (stack[-1]['children'] if stack else sections).append(node)
            stack.append(node)
            active = node
        elif bullet or active is None or indent < active['indent'] + 4:
            # Definitions begin at body indentation; wrapped lines are indented
            # a further ~12 pt. This also separates a definition after `é um:`.
            node = {'kind': 'definition', 'text': text, 'indent': indent}
            sections.append(node)
            stack = []
            active = node
        else:
            active['text'] = join_text(active['text'], text, dehyphenate)
    entry['sections'] = sections
    entry['definitions'] = [s['text'] for s in sections if s['kind'] == 'definition']
    fields = {}
    def collect(nodes):
        for node in nodes:
            if node['kind'] == 'field':
                fields.setdefault(node['label'], []).append(node['text'])
                collect(node['children'])
    collect(sections)
    entry['fields'] = fields
    entry['synonyms'] = [clean(t) for value in fields.get('sin.', [])
                         for t in value.split(';') if clean(t)]
    # source_lines include positions and unjoined physical text for auditing.
    for line in entry['source_lines']:
        for key in ('bold', 'all_bold', 'label', 'indent'):
            line.pop(key, None)
    return entry


def parse_entries(doc, args, report):
    current = None
    heading_open = False
    for line in lines_in_reading_order(doc, args.start_page, args.end_page,
                                      args.header_cutoff, args.footer_margin):
        if line['bold'] and abs(line['indent']) <= 2:
            if current:
                yield structure_entry(current, not args.keep_line_hyphens)
            current = {'id': report['entry_count'] + 1, 'headword': line['text'].rstrip('•').strip(),
                       'source_pages': [line['page']], 'source_lines': [line],
                       '_heading_lines': 1}
            report['entry_count'] += 1
            heading_open = True
            if line['text'].endswith('•'):
                # Occasionally a new-sense bullet shares the heading baseline.
                marker = dict(line, text='•', bold=False, all_bold=False,
                              label=None, derived_from_heading=True)
                current['source_lines'].append(marker)
                heading_open = False
        elif current is None:
            report['orphan_lines'].append(line)
        else:
            current['source_lines'].append(line)
            if line['page'] not in current['source_pages']:
                current['source_pages'].append(line['page'])
            if heading_open and line['all_bold'] and line['label'] is None:
                current['headword'] = join_text(current['headword'], line['text'],
                                                not args.keep_line_hyphens)
                current['_heading_lines'] += 1
            else:
                heading_open = False
    if current:
        yield structure_entry(current, not args.keep_line_hyphens)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('pdf', type=Path)
    parser.add_argument('-o', '--output', type=Path, default=Path('dicionario.json'))
    parser.add_argument('--jsonl', action='store_true', help='One entry per line; no metadata wrapper.')
    parser.add_argument('--start-page', type=int, default=3, help='First dictionary page, 1-based (default: 3).')
    parser.add_argument('--end-page', type=int, help='Last page, inclusive.')
    parser.add_argument('--header-cutoff', type=float, default=50, help='Ignore content above this y coordinate (pt).')
    parser.add_argument('--footer-margin', type=float, default=35, help='Ignore bottom margin (pt).')
    parser.add_argument('--keep-line-hyphens', action='store_true', help='Preserve ambiguous end-of-line hyphens.')
    parser.add_argument('--report', type=Path, help='Audit report path; default: OUTPUT.report.json.')
    args = parser.parse_args(argv)
    report = {'entry_count': 0, 'orphan_lines': [], 'empty_entries': [], 'duplicate_headwords': {}, 'field_counts': {}}
    counts, labels = Counter(), Counter()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with fitz.open(args.pdf) as doc:
        args.end_page = args.end_page or len(doc)
        if not 1 <= args.start_page <= args.end_page <= len(doc):
            parser.error('Page range is outside the PDF.')
        metadata = {'source': args.pdf.name, 'pdf_pages': len(doc), 'parsed_pages': [args.start_page, args.end_page],
                    'schema_version': 1, 'dehyphenation': not args.keep_line_hyphens}
        # Stream entries so a large dictionary does not have to fit in memory.
        with args.output.open('w', encoding='utf-8') as out:
            if not args.jsonl:
                out.write('{"metadata": ' + json.dumps(metadata, ensure_ascii=False) + ', "entries": [\n')
            first = True
            for entry in parse_entries(doc, args, report):
                counts[entry['headword']] += 1
                labels.update(entry['fields'].keys())
                if not entry['sections']:
                    report['empty_entries'].append({'id': entry['id'], 'headword': entry['headword'], 'pages': entry['source_pages']})
                if not first and not args.jsonl:
                    out.write(',\n')
                out.write(json.dumps(entry, ensure_ascii=False))
                if args.jsonl:
                    out.write('\n')
                first = False
            if not args.jsonl:
                out.write('\n]}\n')
    report['duplicate_headwords'] = {k: v for k, v in counts.items() if v > 1}
    report['field_counts'] = dict(labels.most_common())
    report_path = args.report or args.output.with_suffix('.report.json')
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    if not report['entry_count']:
        sys.exit('No entries detected. Check the page range/layout. Scanned PDFs require OCR first.')
    print(f"Parsed {report['entry_count']} entries -> {args.output}; audit -> {report_path}", file=sys.stderr)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

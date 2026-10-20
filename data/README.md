# Dictionary PDF to JSON

This parser is tailored to the supplied Portuguese Natura dictionary: two
columns, bold headwords, italic field labels, and dictionary content starting
on page 3. It uses selectable PDF text; it does not perform OCR.

## Run

Requires Python 3.10 or newer.

```sh
python -m pip install pymupdf
python parse_dictionary.py dicionario.pdf -o dicionario.json
```

Windows: use `py` instead of `python` if that is your Python launcher.

Optional JSON Lines output, useful for processing one record at a time:

```sh
python parse_dictionary.py dicionario.pdf --jsonl -o dicionario.jsonl
```

Parse a sample or preserve end-of-line hyphens:

```sh
python parse_dictionary.py dicionario.pdf --start-page 3 --end-page 10 -o sample.json
python parse_dictionary.py dicionario.pdf --keep-line-hyphens -o conservative.json
```

## Output

Default JSON is an object with `metadata` and an `entries` array. Each entry has:

| Key | Meaning |
| --- | --- |
| `id` | Sequential record ID; duplicate headwords remain separate records. |
| `headword` | Entry heading, including any wrapped heading lines. |
| `definitions` | Unlabelled definition paragraphs/bullets. |
| `synonyms` | Values of `sin.` split on semicolons. |
| `fields` | Original field names mapped to lists of values; includes nested labels. |
| `sections` | Ordered definitions, fields and list markers, with indentation; fields have nested `children`. |
| `source_pages` | Original PDF page numbers, 1-based. |
| `source_lines` | Physical extracted lines and their page, column, and bounding box before line joining. |

Example access:

```python
import json

with open('dicionario.json', encoding='utf-8') as f:
    dictionary = json.load(f)

for entry in dictionary['entries']:
    print(entry['headword'], entry['definitions'])
    print(entry['fields'].get('level', []))
```

The adjacent `dicionario.report.json` contains counts, empty entries, duplicate
headwords, and any orphan lines. Use `--report PATH` to choose its location.

## Validation and limits

The supplied 301-page PDF produced 7,241 records, including 948 entries with no
body content and 24 repeated headwords. All 36,268 extracted body lines are
retained. Spot checks covered headings with italic words/placeholders, wrapped
headwords, nested examples, first/last entries, and synonym line wrapping.
JSONL and page-range modes were also exercised.

This preserves source content without inventing missing definitions. Section
and nesting boundaries follow typography and indentation; unusual lists may
need manual cleanup. `sections` retains order whereas the convenient `fields`
view aggregates fields across the whole entry. It does not infer individual
word senses, and synonyms can apply to different senses.

By default a hyphen at a line break between letters is removed. This repairs
`ber-` + `bicacho`, but can also remove a genuine compound hyphen. Use
`--keep-line-hyphens` if conservative text preservation matters more than
cleaned words. Original physical lines are always available for review.

Entry detection relies on the supplied layout. For a revised edition, adjust
`--start-page`, `--header-cutoff`, and `--footer-margin` as necessary. Scanned
PDFs need a separate OCR step. Output is UTF-8 and records are streamed to disk.

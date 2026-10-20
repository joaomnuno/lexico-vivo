import { readFile } from 'node:fs/promises';
import { db } from '../lib/db';
import { classifyRegion, normalize, slugify } from '../lib/normalize';

type SourceEntry = {
  id: number;
  headword: string;
  definitions: string[];
  synonyms: string[];
  fields: Record<string, string[]>;
  sections: object[];
  source_pages: number[];
};
const { entries } = JSON.parse(
  await readFile(new URL('../data/dicionario.json', import.meta.url), 'utf8'),
) as { entries: SourceEntry[] };
const slugs = new Set<string>();
await db.$executeRawUnsafe('PRAGMA journal_mode = WAL');
for (let i = 0; i < entries.length; i += 200) {
  await db.$transaction(
    entries.slice(i, i + 200).map((e) => {
      const base = slugify(e.headword);
      const slug = slugs.has(base) ? `${base}-${e.id}` : base;
      slugs.add(slug);
      const data = {
        id: e.id,
        slug,
        headword: e.headword,
        normalized: normalize(e.headword),
        definitions: e.definitions,
        synonyms: e.synonyms,
        fields: e.fields,
        sections: e.sections,
        pages: e.source_pages,
        region: classifyRegion((e.fields.local || []).join(' ')),
        register: (e.fields.level || []).join('; '),
        kind: /\s/.test(e.headword) ? 'expression' : 'word',
      };
      return db.entry.upsert({ where: { id: e.id }, create: data, update: data });
    }),
  );
}
console.log(
  `Imported ${entries.length} source records. Existing contributions and votes preserved.`,
);
await db.$disconnect();

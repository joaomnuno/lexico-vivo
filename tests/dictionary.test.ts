import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { corpus, search } from '../lib/dictionary';
import { db } from '../lib/db';
import { conjugation } from '../lib/conjugation';

test('import preserves every source record, duplicate headwords, definitions and original fields', async () => {
  const source = JSON.parse(await readFile('data/dicionario.json', 'utf8')).entries;
  const imported = (await corpus()).entries;
  assert.equal(imported.filter((e) => e.source === 'original').length, source.length);
  assert.equal(new Set(imported.map((e) => e.slug)).size, imported.length);
  const byId = new Map(imported.map((e) => [e.id, e]));
  for (const entry of source) {
    const record = byId.get(entry.id)!;
    assert.deepEqual(record.definitions, entry.definitions);
    assert.deepEqual(record.fields, entry.fields);
    assert.deepEqual(record.sections, entry.sections);
    assert.deepEqual(record.pages, entry.source_pages);
  }
});
test('search handles accents, typos, wildcards, definitions, regions and bounded pagination', async () => {
  const accent = await search({ q: 'desenrascanco' });
  assert.equal(accent.entries[0].headword, 'desenrascanço');
  const typo = await search({ q: 'desenrascancoo' });
  assert.equal(typo.entries[0].headword, 'desenrascanço');
  assert.equal(typo.approximate, true);
  const wildcard = await search({ q: 'desenras*' });
  assert.ok(wildcard.entries.length > 2);
  assert.ok(wildcard.entries.every((e) => e.normalized.startsWith('desenras')));
  const definitions = await search({ q: 'problema', mode: 'definitions' }, 50);
  assert.ok(definitions.entries.some((e) => e.headword === 'abacaxi'));
  const region = await search({ region: 'brasil' });
  assert.ok(region.entries.length > 0);
  assert.ok(region.entries.every((e) => e.region === 'brasil'));
  assert.equal((await search({ page: '-12' })).page, 1);
  const page = await search({ page: '99999' });
  assert.equal(page.page, page.pages);
  await search({ q: '[(' });
  const wildcardDefinitions = await search({ q: 'prob*', mode: 'definitions' }, 50);
  assert.ok(wildcardDefinitions.entries.some((e) => e.headword === 'abacaxi'));
  assert.ok(
    (await search({ q: 'problema complicada', mode: 'definitions' }, 50)).entries.some(
      (e) => e.headword === 'abacaxi',
    ),
  );
  assert.equal((await search({ q: 'a*'.repeat(55) + 'z' })).total, 0);
});
test('conjugator handles irregular verbs and rejects non-infinitives', () => {
  assert.deepEqual(conjugation('ser')?.present, ['sou', 'és', 'é', 'somos', 'sois', 'são']);
  assert.deepEqual(conjugation('falar')?.present, [
    'falo',
    'falas',
    'fala',
    'falamos',
    'falais',
    'falam',
  ]);
  assert.equal(conjugation('<script>'), null);
  assert.equal(conjugation('sou'), null);
  assert.deepEqual(conjugation('pôr')?.subjunctivePresent, [
    'ponha',
    'ponhas',
    'ponha',
    'ponhamos',
    'ponhais',
    'ponham',
  ]);
  assert.equal(conjugation('falar')?.preterite?.[3], 'falámos');
});
process.on('beforeExit', () => {
  void db.$disconnect();
});

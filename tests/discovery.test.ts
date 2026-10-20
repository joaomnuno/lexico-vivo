import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { Entry } from '../lib/dictionary';
import { selectDiscovery } from '../lib/discovery';

const entries: Entry[] = Array.from({ length: 30 }, (_, id) => ({
  id,
  slug: `word-${id}`,
  headword: `Word ${id}`,
  normalized: `word ${id}`,
  definitions: ['A definition'],
  synonyms: [],
  fields: {},
  sections: [],
  pages: [],
  region: id % 2 ? 'brasil' : 'norte',
  kind: id % 3 ? 'word' : 'expression',
  register: '',
  source: 'original',
}));

test('discovery is stable across requests and corpus ordering, and rotates across dates', () => {
  const options = { date: '2026-10-20', count: 3 };
  const picks = selectDiscovery(entries, options);
  assert.equal(picks.length, 3);
  assert.deepEqual(selectDiscovery([...entries].reverse(), options), picks);
  assert.notDeepEqual(selectDiscovery(entries, { ...options, date: '2026-10-21' }), picks);
});

test('discovery excludes blank definitions, duplicate headwords and the daily highlight variants', () => {
  const pool = [
    ...entries,
    { ...entries[0], id: 100, slug: 'word-0-variant' },
    { ...entries[1], id: 101, slug: 'word-1-variant' },
    { ...entries[2], id: 102, normalized: 'blank', definitions: ['◦  '] },
  ];
  const picks = selectDiscovery(pool, { count: 100, excludeIds: [0] });
  assert.equal(picks.length, 29);
  assert.equal(new Set(picks.map((entry) => entry.normalized)).size, picks.length);
  assert.ok(picks.every((entry) => ![0, 100, 102].includes(entry.id)));
});

test('discovery supports filtered modules, small pools and empty results', () => {
  const picks = selectDiscovery(entries, { count: 6, region: 'brasil', kind: 'expression' });
  assert.equal(picks.length, 5);
  assert.ok(picks.every((entry) => entry.region === 'brasil' && entry.kind === 'expression'));
  assert.deepEqual(selectDiscovery(entries, { region: 'unknown' }), []);
  assert.deepEqual(selectDiscovery(entries, { count: 0 }), []);
  assert.deepEqual(selectDiscovery(entries, { count: 0.5 }), []);
  assert.deepEqual(selectDiscovery([], {}), []);
});

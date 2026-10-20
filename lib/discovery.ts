import { createHash } from 'node:crypto';
import type { Entry } from './dictionary';

export type DiscoveryOptions = {
  count?: number;
  excludeIds?: number[];
  region?: string;
  kind?: string;
  /** Stable selection for this UTC date; injectable for previews and tests. */
  date?: string;
};

export function selectDiscovery(entries: Entry[], options: DiscoveryOptions = {}): Entry[] {
  const {
    count = 3,
    excludeIds = [],
    region,
    kind,
    date = new Date().toISOString().slice(0, 10),
  } = options;
  if (!Number.isFinite(count) || count < 1) return [];
  const excluded = new Set(excludeIds);
  const excludedWords = new Set(
    entries.filter((entry) => excluded.has(entry.id)).map((entry) => entry.normalized),
  );
  const candidates = entries
    .filter(
      (entry) =>
        entry.definitions.some((definition) => definition.replace(/^◦/, '').trim()) &&
        !excluded.has(entry.id) &&
        !excludedWords.has(entry.normalized) &&
        (!region || entry.region === region) &&
        (!kind || entry.kind === kind),
    )
    .map((entry) => ({
      entry,
      rank: createHash('sha256').update(`${date}:${entry.slug}`).digest('hex'),
    }))
    .sort((a, b) => a.rank.localeCompare(b.rank) || a.entry.slug.localeCompare(b.entry.slug));
  const seen = new Set<string>();
  const selected: Entry[] = [];
  for (const { entry } of candidates) {
    if (seen.has(entry.normalized)) continue;
    seen.add(entry.normalized);
    selected.push(entry);
    if (selected.length >= Math.floor(count)) break;
  }
  return selected;
}

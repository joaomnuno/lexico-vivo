import Fuse from 'fuse.js';
import { RE2JS } from 're2js';
import { db } from './db';
import { normalize, regions } from './normalize';
import { selectDiscovery, type DiscoveryOptions } from './discovery';

export type Entry = {
  id: number;
  slug: string;
  headword: string;
  normalized: string;
  definitions: string[];
  synonyms: string[];
  fields: Record<string, string[]>;
  sections: { kind: string; label?: string; text?: string; children?: unknown[] }[];
  pages: number[];
  region: string;
  register: string;
  kind: string;
  source: string;
};
let cache: { until: number; entries: Entry[]; fuse: Fuse<Entry> } | undefined;
export async function corpus() {
  if (!cache || cache.until < Date.now()) {
    const entries = (await db.entry.findMany({
      orderBy: { normalized: 'asc' },
    })) as unknown as Entry[];
    cache = {
      until: Date.now() + 60_000,
      entries,
      fuse: new Fuse(entries, { keys: ['normalized'], threshold: 0.32, ignoreLocation: true }),
    };
  }
  return cache;
}
export type SearchParams = {
  q?: string;
  mode?: string;
  letter?: string;
  region?: string;
  register?: string;
  kind?: string;
  page?: string;
};
export function cleanParams(input: Record<string, unknown>): SearchParams {
  return Object.fromEntries(
    ['q', 'mode', 'letter', 'region', 'register', 'kind', 'page'].map((key) => {
      const value = Array.isArray(input[key]) ? input[key][0] : input[key];
      return [key, typeof value === 'string' ? value.slice(0, 120) : ''];
    }),
  );
}
export async function search(input: SearchParams, pageSize = 18) {
  const params = cleanParams(input);
  const { entries, fuse } = await corpus();
  const query = normalize((params.q || '').slice(0, 120));
  let matches = entries;
  let approximate = false;
  if (query) {
    const wildcard = query.includes('*') || query.includes('?');
    const escaped = query
      .replace(/[.+^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.');
    const pattern = wildcard
      ? RE2JS.compile(params.mode === 'definitions' ? escaped : `^${escaped}$`)
      : null;
    matches = entries.filter((e) => {
      const value =
        params.mode === 'definitions'
          ? normalize([...e.definitions, ...Object.values(e.fields).flat()].join(' '))
          : e.normalized;
      return pattern
        ? params.mode === 'definitions'
          ? pattern.test(value)
          : pattern.matches(value)
        : params.mode === 'definitions'
          ? query.split(/\s+/).every((term) => value.includes(term))
          : value.includes(query);
    });
    if (!matches.length && params.mode !== 'definitions' && !wildcard) {
      matches = fuse.search(query).map((r) => r.item);
      approximate = matches.length > 0;
    } else if (!wildcard && params.mode !== 'definitions') {
      matches.sort(
        (a, b) =>
          Number(b.normalized === query) - Number(a.normalized === query) ||
          Number(b.normalized.startsWith(query)) - Number(a.normalized.startsWith(query)),
      );
    }
  }
  matches = matches.filter(
    (e) =>
      (!params.letter || e.normalized.startsWith(normalize(params.letter))) &&
      (!params.region || e.region === params.region) &&
      (!params.register || normalize(e.register).includes(normalize(params.register))) &&
      (!params.kind || e.kind === params.kind),
  );
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  const page = Math.min(pages, Math.max(1, parseInt(params.page || '1') || 1));
  return {
    entries: matches.slice((page - 1) * pageSize, page * pageSize),
    total: matches.length,
    page,
    pages,
    approximate,
  };
}
export async function findEntry(slug: string) {
  return (await corpus()).entries.find((e) => e.slug === slug);
}
export async function featured(options: DiscoveryOptions = {}) {
  const { entries } = await corpus();
  return selectDiscovery(entries, options);
}
export async function daily() {
  const { entries } = await corpus();
  const eligible = entries.filter(
    (e) => e.definitions.length && e.synonyms.length && (e.fields['ex.'] || []).length,
  );
  const day = Math.floor(Date.now() / 86_400_000);
  return eligible[day % eligible.length];
}
export async function stats() {
  const { entries } = await corpus();
  return {
    total: entries.length,
    defined: entries.filter((e) => e.definitions.length).length,
    examples: entries.reduce((n, e) => n + (e.fields['ex.'] || []).length, 0),
    regions: regions.map((r) => ({
      id: r.id,
      name: r.name,
      short: r.short,
      description: r.description,
      count: entries.filter((e) => e.region === r.id).length,
    })),
    registers: [...new Set(entries.map((e) => e.register).filter(Boolean))].sort(),
  };
}
export const entryUrl = (e: Pick<Entry, 'slug'>) => `/verbete/${e.slug}`;
export const formatNumber = (value: number) => value.toLocaleString('pt-PT');

import { db } from './db';
import { corpus } from './dictionary';

export type ActivityKind = 'view' | 'search';
let lastCleanup = '';
export async function recordActivity(entryId: number, clientId: string, searched: boolean) {
  const day = new Date().toISOString().slice(0, 10);
  const kinds: ActivityKind[] = searched ? ['view', 'search'] : ['view'];
  await db.$transaction(
    kinds.map((kind) =>
      db.activity.upsert({
        where: { entryId_clientId_kind_day: { entryId, clientId, kind, day } },
        create: { entryId, clientId, kind, day },
        update: {},
      }),
    ),
  );
  if (lastCleanup !== day) {
    lastCleanup = day;
    const cutoff = new Date(Date.now() - 29 * 86_400_000).toISOString().slice(0, 10);
    await db.activity.deleteMany({ where: { day: { lt: cutoff } } });
  }
}
export async function hot(kind: ActivityKind = 'view', days = 7, limit = 5) {
  const cutoff = new Date(Date.now() - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  const ranked = await db.activity.groupBy({
    by: ['entryId'],
    where: { kind, day: { gte: cutoff } },
    _count: { entryId: true },
    orderBy: [{ _count: { entryId: 'desc' } }, { entryId: 'asc' }],
    take: limit,
  });
  const entries = new Map((await corpus()).entries.map((entry) => [entry.id, entry]));
  return ranked.flatMap((row) => {
    const entry = entries.get(row.entryId);
    return entry ? [{ entry, count: row._count.entryId }] : [];
  });
}

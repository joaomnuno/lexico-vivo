import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { recordActivity, hot } from '../lib/activity';

test('real activity counts deduplicate refreshes, distinguish searches, and aggregate readers', async () => {
  const clients = [randomUUID(), randomUUID()];
  const entryId = 1;
  const day = new Date().toISOString().slice(0, 10);
  const baseline = await db.activity.count({ where: { entryId, day, kind: 'view' } });
  try {
    await recordActivity(entryId, clients[0], false);
    await recordActivity(entryId, clients[0], false);
    assert.equal(await db.activity.count({ where: { entryId, clientId: clients[0] } }), 1);
    await recordActivity(entryId, clients[0], true);
    await recordActivity(entryId, clients[0], true);
    const events = await db.activity.findMany({ where: { clientId: clients[0] } });
    assert.deepEqual(events.map((event) => event.kind).sort(), ['search', 'view']);
    await recordActivity(entryId, clients[1], false);
    const ranking = await hot('view', 1, 20);
    assert.equal(ranking.find((row) => row.entry.id === entryId)?.count, baseline + 2);
    assert.ok((await hot('search', 1, 20)).some((row) => row.entry.id === entryId));
  } finally {
    await db.activity.deleteMany({ where: { clientId: { in: clients } } });
    await db.$disconnect();
  }
});

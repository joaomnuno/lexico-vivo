import { db } from '../lib/db';
if ((await db.entry.count()) === 0) await import('../prisma/seed');
await db.$disconnect();

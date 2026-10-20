import { db } from '../lib/db';
import { normalize, slugify } from '../lib/normalize';

const [action, id] = process.argv.slice(2);
if (!action || action === 'list') {
  console.log(
    JSON.stringify(
      await db.contribution.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'asc' },
      }),
      null,
      2,
    ),
  );
} else if ((action === 'approve' || action === 'reject') && id) {
  await db.$transaction(async (tx) => {
    const item = await tx.contribution.findUniqueOrThrow({ where: { id } });
    if (item.status !== 'PENDING') throw new Error('Contribution already reviewed.');
    if (action === 'approve') {
      const data = {
        definitions: [item.definition],
        fields: {
          'ex.': item.example ? [item.example] : [],
          local: item.region ? [item.region] : [],
        },
      };
      if (item.entryId) {
        const original = await tx.entry.findUniqueOrThrow({ where: { id: item.entryId } });
        const fields = original.fields as Record<string, string[]>;
        const { classifyRegion } = await import('../lib/normalize');
        await tx.entry.update({
          where: { id: item.entryId },
          data: {
            definitions: data.definitions,
            source: 'reviewed',
            fields: {
              ...fields,
              ...(item.example ? { 'ex.': [item.example] } : {}),
              ...(item.region ? { local: [item.region] } : {}),
            },
            ...(item.region ? { region: classifyRegion(item.region) } : {}),
          },
        });
      } else {
        const nextId = (await tx.entry.aggregate({ _max: { id: true } }))._max.id! + 1;
        const { classifyRegion } = await import('../lib/normalize');
        await tx.entry.create({
          data: {
            ...data,
            id: nextId,
            headword: item.headword,
            normalized: normalize(item.headword),
            slug: `${slugify(item.headword)}-${nextId}`,
            synonyms: [],
            sections: [],
            pages: [],
            region: classifyRegion(item.region),
            kind: /\s/.test(item.headword) ? 'expression' : 'word',
            source: 'community',
          },
        });
      }
    }
    await tx.contribution.update({
      where: { id },
      data: { status: action === 'approve' ? 'APPROVED' : 'REJECTED' },
    });
  });
  console.log(`${action}: ${id}`);
} else {
  throw new Error('Usage: npm run moderate -- [list | approve ID | reject ID]');
}
await db.$disconnect();

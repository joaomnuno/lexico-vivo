import { db } from '../../../../lib/db';
import { reader, readJson, sameOrigin } from '../../../../lib/http';
async function counts(entryId: number, clientId: string) {
  const [groups, vote] = await Promise.all([
    db.vote.groupBy({ by: ['value'], where: { entryId }, _count: true }),
    db.vote.findUnique({ where: { entryId_clientId: { entryId, clientId } } }),
  ]);
  return {
    yes: groups.find((g) => g.value === 'yes')?._count || 0,
    no: groups
      .filter((g) => g.value === 'no' || g.value === 'rare')
      .reduce((sum, group) => sum + group._count, 0),
    current: vote?.value === 'rare' ? 'no' : vote?.value || '',
  };
}
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const entryId = Number((await params).id);
  if (!Number.isSafeInteger(entryId) || entryId < 1)
    return Response.json({ error: 'Verbete inválido.' }, { status: 400 });
  const { id } = reader(request);
  return Response.json(await counts(entryId, id), { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  const entryId = Number((await params).id);
  const { id, headers } = reader(request);
  try {
    const { value } = await readJson(request);
    if (!Number.isSafeInteger(entryId) || entryId < 1 || !['yes', 'no'].includes(value))
      return Response.json({ error: 'Voto inválido.' }, { status: 400, headers });
    if (!(await db.entry.findUnique({ where: { id: entryId }, select: { id: true } })))
      return Response.json({ error: 'Verbete não encontrado.' }, { status: 404, headers });
    await db.vote.upsert({
      where: { entryId_clientId: { entryId, clientId: id } },
      create: { entryId, clientId: id, value },
      update: { value },
    });
    return Response.json(await counts(entryId, id), { headers });
  } catch {
    return Response.json({ error: 'Não foi possível registar o voto.' }, { status: 400, headers });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  const entryId = Number((await params).id);
  const { id, headers } = reader(request);
  if (!Number.isSafeInteger(entryId) || entryId < 1)
    return Response.json({ error: 'Verbete inválido.' }, { status: 400, headers });
  try {
    await db.vote.deleteMany({ where: { entryId, clientId: id } });
    return Response.json(await counts(entryId, id), { headers });
  } catch {
    return Response.json({ error: 'Não foi possível retirar o voto.' }, { status: 503, headers });
  }
}

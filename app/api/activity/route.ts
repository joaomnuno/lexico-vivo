import { db } from '../../../lib/db';
import { recordActivity } from '../../../lib/activity';
import { reader, readJson, sameOrigin } from '../../../lib/http';

export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  const { id, headers } = reader(request);
  try {
    const { entryId, searched } = await readJson(request);
    if (
      !Number.isSafeInteger(entryId) ||
      entryId < 1 ||
      (searched !== undefined && typeof searched !== 'boolean')
    )
      return Response.json({ error: 'Consulta inválida.' }, { status: 400, headers });
    if (!(await db.entry.findUnique({ where: { id: entryId }, select: { id: true } })))
      return Response.json({ error: 'Verbete não encontrado.' }, { status: 404, headers });
    await recordActivity(entryId, id, searched === true);
    return new Response(null, { status: 204, headers });
  } catch {
    return Response.json(
      { error: 'Não foi possível registar a consulta.' },
      { status: 400, headers },
    );
  }
}

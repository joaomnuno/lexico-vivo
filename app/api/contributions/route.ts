import { z } from 'zod';
import { db } from '../../../lib/db';
import { reader, readJson, sameOrigin } from '../../../lib/http';
const schema = z.object({
  headword: z.string().trim().min(2).max(180),
  definition: z.string().trim().min(10).max(2000),
  example: z.string().trim().max(1000).default(''),
  region: z.string().trim().max(100).default(''),
  name: z.string().trim().max(80).default(''),
  website: z.string().max(0).optional(),
  entryId: z.number().int().positive().optional(),
});
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  const { id, headers } = reader(request);
  try {
    const parsed = schema.safeParse(await readJson(request));
    if (!parsed.success)
      return Response.json(
        {
          error:
            'Revê os campos. A expressão precisa de 2 caracteres e a definição de pelo menos 10.',
        },
        { status: 400, headers },
      );
    const { website, ...data } = parsed.data;
    if (
      data.entryId &&
      !(await db.entry.findUnique({ where: { id: data.entryId }, select: { id: true } }))
    )
      return Response.json({ error: 'Verbete não encontrado.' }, { status: 404, headers });
    const count = await db.contribution.count({
      where: { clientId: id, createdAt: { gte: new Date(Date.now() - 86_400_000) } },
    });
    if (count >= 5)
      return Response.json(
        { error: 'Já recebemos cinco sugestões tuas hoje. Volta amanhã para partilhares mais.' },
        { status: 429, headers },
      );
    const item = await db.contribution.create({ data: { ...data, clientId: id } });
    return Response.json({ id: item.id, status: item.status }, { status: 201, headers });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && error.message === 'Request too large')
    )
      return Response.json(
        { error: 'O pedido não é válido ou é demasiado longo.' },
        { status: 400, headers },
      );
    console.error('Contribution failed', error);
    return Response.json(
      { error: 'Não foi possível guardar. Tenta novamente mais tarde.' },
      { status: 503, headers },
    );
  }
}

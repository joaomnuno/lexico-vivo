import { findEntry } from '../../../../lib/dictionary';
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const entry = await findEntry((await params).slug);
  return entry
    ? Response.json(entry, { headers: { 'Cache-Control': 'public, max-age=60' } })
    : Response.json({ error: 'Verbete não encontrado.' }, { status: 404 });
}

import { hot } from '../../../lib/activity';
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const kind = params.get('kind') === 'search' ? 'search' : 'view';
  const days = params.get('days') === '1' ? 1 : params.get('days') === '30' ? 30 : 7;
  const entries = await hot(kind, days, 20);
  return Response.json(
    {
      kind,
      days,
      entries: entries.map(({ entry, count }) => ({
        id: entry.id,
        slug: entry.slug,
        headword: entry.headword,
        definition: entry.definitions[0] || '',
        count,
      })),
    },
    { headers: { 'Cache-Control': 'public, max-age=30' } },
  );
}

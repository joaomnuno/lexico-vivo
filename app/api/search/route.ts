import { search } from '../../../lib/dictionary';
export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);
  const limit = Math.max(1, Math.min(50, parseInt(params.limit || '18') || 18));
  const result = await search(params, limit);
  return Response.json(
    {
      ...result,
      entries: result.entries.map(
        ({ id, slug, headword, definitions, region, register, kind }) => ({
          id,
          slug,
          headword,
          definitions,
          region,
          register,
          kind,
        }),
      ),
    },
    { headers: { 'Cache-Control': 'public, max-age=60' } },
  );
}

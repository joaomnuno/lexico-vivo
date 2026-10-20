import { db } from '../../../lib/db';
export async function GET() {
  try {
    const entries = await db.entry.count();
    return Response.json(
      { status: entries > 0 ? 'ok' : 'empty', entries },
      { status: entries > 0 ? 200 : 503, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return Response.json({ status: 'unavailable' }, { status: 503 });
  }
}

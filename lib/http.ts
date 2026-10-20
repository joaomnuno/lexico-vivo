import { randomUUID } from 'node:crypto';
export function reader(request: Request) {
  const cookie = request.headers
    .get('cookie')
    ?.match(/(?:^|;\s*)lv-reader=([a-f0-9-]{36})(?:;|$)/)?.[1];
  const id = cookie || randomUUID();
  return {
    id,
    headers: {
      'Set-Cookie': `lv-reader=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
      'Cache-Control': 'no-store',
    },
  };
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
export async function readJson(request: Request) {
  const text = await request.text();
  if (text.length > 12_000) throw new Error('Request too large');
  return JSON.parse(text);
}

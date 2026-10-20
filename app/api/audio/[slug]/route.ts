import { audioClip, AudioError } from '../../../../lib/audio';
import { findEntry } from '../../../../lib/dictionary';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const variant = new URL(request.url).searchParams.get('variant') || 'pt-PT';
  if (variant !== 'pt-PT' && variant !== 'pt-BR')
    return Response.json({ error: 'Variante de voz inválida.' }, { status: 400 });
  const entry = await findEntry((await params).slug);
  if (!entry) return Response.json({ error: 'Verbete não encontrado.' }, { status: 404 });
  try {
    const audio = await audioClip(entry.headword, variant);
    return new Response(new Uint8Array(audio), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof AudioError
            ? error.message
            : 'O áudio está temporariamente indisponível.',
      },
      {
        status: error instanceof AudioError ? error.status : 503,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}

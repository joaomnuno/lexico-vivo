import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const voices = { 'pt-PT': 'pt-PT-RaquelNeural', 'pt-BR': 'pt-BR-FranciscaNeural' } as const;
export type AudioVariant = keyof typeof voices;
const format = 'audio-24khz-48kbitrate-mono-mp3';
const pending = new Map<string, Promise<Buffer>>();
export const speechEnabled = () =>
  Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION);
export class AudioError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
const escapeXml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (character) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!,
  );

export async function audioClip(text: string, variant: AudioVariant) {
  const voice = voices[variant];
  const hash = createHash('sha256').update(`${voice}:${format}:${text}`).digest('hex');
  const directory =
    process.env.AUDIO_CACHE_DIR ||
    join(
      dirname((process.env.DATABASE_URL || 'file:./storage/lexico.db').replace(/^file:/, '')),
      'audio',
    );
  const file = join(directory, `${hash}.mp3`);
  try {
    return await readFile(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }
  if (!speechEnabled()) throw new AudioError(503, 'O áudio ainda não está disponível.');
  const region = process.env.AZURE_SPEECH_REGION!;
  if (!/^[a-z0-9-]+$/.test(region))
    throw new AudioError(503, 'O áudio está temporariamente indisponível.');
  const existing = pending.get(file);
  if (existing) return existing;
  if (pending.size >= 2)
    throw new AudioError(
      429,
      'Há outros áudios a ser preparados. Tenta novamente dentro de instantes.',
    );
  const generation = (async () => {
    const response = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_KEY!,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': format,
          'User-Agent': 'LexicoVivo',
        },
        body: `<speak version="1.0" xml:lang="${variant}"><voice name="${voice}">${escapeXml(text)}</voice></speak>`,
        signal: AbortSignal.timeout(15_000),
      },
    );
    if (!response.ok || !response.headers.get('content-type')?.startsWith('audio/'))
      throw new AudioError(503, 'Não foi possível preparar o áudio. Tenta novamente mais tarde.');
    const bytes = Buffer.from(await response.arrayBuffer());
    if (!bytes.length || bytes.length > 2_000_000)
      throw new AudioError(502, 'O áudio recebido não é válido.');
    await mkdir(directory, { recursive: true });
    const temporary = `${file}.${randomUUID()}.tmp`;
    await writeFile(temporary, bytes);
    await rename(temporary, file);
    return bytes;
  })();
  pending.set(file, generation);
  try {
    return await generation;
  } finally {
    pending.delete(file);
  }
}

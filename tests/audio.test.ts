import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { audioClip, AudioError } from '../lib/audio';

test('hosted audio uses the exact voice, escapes text, deduplicates requests and persists clips', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'lexico-audio-'));
  const previous = {
    key: process.env.AZURE_SPEECH_KEY,
    region: process.env.AZURE_SPEECH_REGION,
    directory: process.env.AUDIO_CACHE_DIR,
  };
  process.env.AUDIO_CACHE_DIR = directory;
  delete process.env.AZURE_SPEECH_KEY;
  delete process.env.AZURE_SPEECH_REGION;
  const calls: RequestInit[] = [];
  const bytes = new Uint8Array([73, 68, 51, 1, 2, 3]);
  const fetchMock = t.mock.method(
    globalThis,
    'fetch',
    async (_url: string, options: RequestInit) => {
      calls.push(options);
      return new Response(bytes, { headers: { 'Content-Type': 'audio/mpeg' } });
    },
  );
  try {
    await assert.rejects(
      audioClip('estar com os azeites', 'pt-PT'),
      (error) => error instanceof AudioError && error.status === 503,
    );
    assert.equal(calls.length, 0);
    process.env.AZURE_SPEECH_KEY = 'test-key';
    process.env.AZURE_SPEECH_REGION = 'westeurope';
    const phrase = 'palavra & <voice name="outro">';
    const results = await Promise.all([audioClip(phrase, 'pt-PT'), audioClip(phrase, 'pt-PT')]);
    assert.deepEqual(results[0], Buffer.from(bytes));
    assert.deepEqual(results[1], Buffer.from(bytes));
    assert.equal(calls.length, 1);
    assert.match(String(calls[0].body), /name="pt-PT-RaquelNeural"/);
    assert.match(String(calls[0].body), /palavra &amp; &lt;voice name=&quot;outro&quot;&gt;/);
    await audioClip(phrase, 'pt-BR');
    assert.equal(calls.length, 2);
    assert.match(String(calls[1].body), /name="pt-BR-FranciscaNeural"/);
    delete process.env.AZURE_SPEECH_KEY;
    assert.deepEqual(await audioClip(phrase, 'pt-PT'), Buffer.from(bytes));
    assert.equal(calls.length, 2);
    assert.equal((await readdir(directory)).filter((file) => file.endsWith('.mp3')).length, 2);
    process.env.AZURE_SPEECH_KEY = 'test-key';
    fetchMock.mock.mockImplementation(async () => new Response('provider failed', { status: 429 }));
    await assert.rejects(
      audioClip('outro verbete', 'pt-PT'),
      (error) => error instanceof AudioError && error.status === 503,
    );
    assert.equal((await readdir(directory)).filter((file) => file.endsWith('.mp3')).length, 2);
  } finally {
    for (const [name, value] of Object.entries({
      AZURE_SPEECH_KEY: previous.key,
      AZURE_SPEECH_REGION: previous.region,
      AUDIO_CACHE_DIR: previous.directory,
    })) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
    await rm(directory, { recursive: true, force: true });
  }
});

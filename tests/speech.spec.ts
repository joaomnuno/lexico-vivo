import { test, expect } from '@playwright/test';

test('speech selects the exact Portuguese variant and never falls back to another accent', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const state = window as typeof window & {
      testVoices: { lang: string; name: string }[];
      testSpoken: { lang: string; voice: string | null }[];
    };
    state.testVoices = [{ lang: 'pt-BR', name: 'Brazilian voice' }];
    state.testSpoken = [];
    class Utterance {
      constructor(public text: string) {}
      lang = '';
      rate = 1;
      voice: { lang: string; name: string } | null = null;
      onend?: () => void;
    }
    Object.defineProperty(window, 'SpeechSynthesisUtterance', {
      value: Utterance,
      configurable: true,
    });
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        getVoices: () => state.testVoices,
        cancel() {},
        speak(utterance: Utterance) {
          state.testSpoken.push({ lang: utterance.lang, voice: utterance.voice?.name || null });
          utterance.onend?.();
        },
      },
    });
  });
  await page.goto('/verbete/estar-com-os-azeites');
  const player = page.locator('.entry-reader .pronunciation');
  await player.getByRole('button').click();
  await expect(player.locator('small')).toContainText('A voz pt-PT não está disponível');
  const spoken = () =>
    page.evaluate(() => (window as unknown as { testSpoken: object[] }).testSpoken);
  expect(await spoken()).toEqual([]);

  await player.getByRole('combobox').selectOption('pt-BR');
  await player.getByRole('button').click();
  expect(await spoken()).toEqual([{ lang: 'pt-BR', voice: 'Brazilian voice' }]);

  // Simulate a PT-PT voice becoming available after the initial asynchronous load.
  await page.evaluate(() => {
    (window as unknown as { testVoices: { lang: string; name: string }[] }).testVoices.push({
      lang: 'pt_PT',
      name: 'European voice',
    });
  });
  await player.getByRole('combobox').selectOption('pt-PT');
  await player.getByRole('button').click();
  expect(await spoken()).toEqual([
    { lang: 'pt-BR', voice: 'Brazilian voice' },
    { lang: 'pt-PT', voice: 'European voice' },
  ]);
});

import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
import { db } from '../lib/db';

const testClients = new Set<string>();
test.afterAll(async () => {
  await db.vote.deleteMany({ where: { clientId: { in: [...testClients] } } });
  await db.contribution.deleteMany({ where: { clientId: { in: [...testClients] } } });
  await db.$disconnect();
});
test('home renders, search autocompletes with keyboard, and entry can be saved', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A língua como ela se fala');
  await page.locator('#hero-search').fill('desenras');
  const suggestions = page.locator('#hero-search-suggestions');
  await expect(suggestions.getByRole('option').first()).toBeVisible();
  await page.locator('#hero-search').press('ArrowDown');
  await page.locator('#hero-search').press('Enter');
  await expect(page).toHaveURL(/\/verbete\/desenras/);
  await expect(page.locator('.entry-reader h1')).toBeVisible();
  await page.locator('.reader-tools').getByRole('button', { name: 'Guardar palavra' }).click();
  await page.goto('/guardados');
  await expect(page.locator('.saved-list article')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.saved-list article')).toHaveCount(1);
  expect(errors).toEqual([]);
});
test('filters, source references and irregular conjugation work', async ({ page, request }) => {
  await page.goto('/dicionario?q=desenrascancoo');
  await expect(page.locator('.results-summary')).toContainText('Talvez procures');
  await page.goto('/dicionario?region=brasil');
  await expect(page.locator('.results-grid article').first()).toBeVisible();
  await expect(page.locator('select[name=region]')).toHaveValue('brasil');
  await page.goto('/verbete/estar-com-os-azeites');
  await expect(page.locator('.definitions')).toContainText('estar mal disposto e zangado');
  await expect(page.locator('.synonym-list')).toBeVisible();
  await expect(page.locator('.entry-source')).toContainText('pág.');
  await page.goto('/conjugar?verbo=ser');
  await expect(page.locator('.tense-card').first()).toContainText('sou');
  await expect(page.locator('.tense-card')).toHaveCount(17);
  expect((await request.get('/api/entries/no-such-entry')).status()).toBe(404);
  expect((await request.get('/does-not-exist')).status()).toBe(404);
  expect((await request.get('/robots.txt')).ok()).toBe(true);
  expect((await request.get('/sitemap.xml')).ok()).toBe(true);
});
test('votes persist without duplicates; suggestions remain private and require review', async ({
  page,
  context,
}) => {
  await page.goto('/verbete/estar-com-os-azeites');
  await page.getByRole('button', { name: /^Sim \(/ }).click();
  await expect(page.getByRole('button', { name: /^Sim \(/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const cookie = (await context.cookies()).find((c) => c.name === 'lv-reader')!;
  testClients.add(cookie.value);
  const count = await db.vote.count({ where: { clientId: cookie.value } });
  await page.getByRole('button', { name: /^Sim \(/ }).click();
  expect(await db.vote.count({ where: { clientId: cookie.value } })).toBe(count);
  await page.reload();
  await expect(page.getByRole('button', { name: /^Sim \(/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.locator('.entry-source').getByRole('button', { name: 'Sugerir correção' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog
    .locator('textarea[name=definition]')
    .fill('Sugestão de teste para revisão editorial.');
  await dialog.getByRole('button', { name: 'Enviar para revisão' }).click();
  await expect(dialog).toContainText('A tua sugestão foi guardada');
  const suggestion = await db.contribution.findFirst({ where: { clientId: cookie.value } });
  expect(suggestion?.status).toBe('PENDING');
  await page.reload();
  await expect(page.locator('.definitions')).toContainText('estar mal disposto e zangado');
});
test('desktop and mobile layouts stay within viewport', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      '/',
      '/verbete/estar-com-os-azeites',
      '/dicionario?region=brasil',
      '/regioes',
      '/conjugar?verbo=ser',
      '/sobre',
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      if (path === '/' || path.startsWith('/verbete/'))
        await page.screenshot({
          path: `docs/screenshots/${path === '/' ? 'home' : 'entry'}-${width}.png`,
          fullPage: true,
        });
    }
  }
});

test('key pages meet automated WCAG AA checks', async ({ page }) => {
  for (const path of [
    '/',
    '/verbete/estar-com-os-azeites',
    '/dicionario',
    '/conjugar?verbo=ser',
    '/sobre',
    '/regioes',
    '/api',
    '/guardados',
  ]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ selector: n.target, summary: n.failureSummary })),
      })),
    ).toEqual([]);
  }
});

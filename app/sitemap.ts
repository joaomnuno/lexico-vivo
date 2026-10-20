import { corpus } from '../lib/dictionary';
export default async function sitemap() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    '/',
    '/dicionario',
    '/em-alta',
    '/regioes',
    '/sobre',
    '/conjugar',
    ...(await corpus()).entries.map((e) => `/verbete/${e.slug}`),
  ].map((path) => ({ url: `${site}${path}` }));
}

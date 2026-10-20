import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@fontsource/merriweather/latin-400.css';
import '@fontsource/merriweather/latin-700.css';
import '@fontsource/merriweather/latin-400-italic.css';
import '@fontsource/plus-jakarta-sans/latin-400.css';
import '@fontsource/plus-jakarta-sans/latin-500.css';
import '@fontsource/plus-jakarta-sans/latin-600.css';
import '@fontsource/plus-jakarta-sans/latin-700.css';
import './globals.css';
import './editorial.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: 'Léxico Vivo — A língua como ela se fala', template: '%s · Léxico Vivo' },
  description:
    'Descobre o calão, as expressões populares e os falares da língua portuguesa. Um dicionário vivo, feito de palavras e de quem as usa.',
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', locale: 'pt_PT', siteName: 'Léxico Vivo' },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body>
        <a className="skip-link" href="#conteudo">
          Saltar para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

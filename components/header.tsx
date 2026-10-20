'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bookmark, Globe2 } from 'lucide-react';
import { Brand } from './brand';
import { Search } from './search';
import { Contribution } from './interactive';

export function Header() {
  const path = usePathname();
  const [params, setParams] = useState<URLSearchParams>();
  useEffect(() => setParams(new URLSearchParams(window.location.search)), [path]);
  const dictionaryTab =
    params?.get('kind') === 'expression'
      ? '/dicionario?kind=expression'
      : params?.get('register') === 'calão'
        ? '/dicionario?register=calão'
        : '/dicionario';
  return (
    <header className="site-header">
      <div className="header-top container">
        <Brand />
        <Search />
        <div className="header-actions">
          <span className="language">
            <Globe2 size={15} /> Português
          </span>
          <a href="/guardados" className="icon-button" aria-label="Palavras guardadas">
            <Bookmark size={20} />
          </a>
          <Contribution compact />
        </div>
      </div>
      <div className="header-bottom">
        <div className="container nav-row">
          <nav aria-label="Navegação principal">
            {[
              ['/dicionario', 'Dicionário'],
              ['/em-alta', 'Em alta'],
              ['/dicionario?kind=expression', 'Expressões populares'],
              ['/dicionario?register=calão', 'Calão & gíria'],
              ['/regioes', 'Regiões'],
              ['/sobre', 'O projeto'],
            ].map(([url, label]) => (
              <a
                key={url}
                href={url}
                className={
                  (path === '/dicionario' ? url === dictionaryTab : path === url) ? 'active' : ''
                }
                aria-current={
                  (path === '/dicionario' ? url === dictionaryTab : path === url)
                    ? 'page'
                    : undefined
                }
              >
                {label}
              </a>
            ))}
          </nav>
          <span className="nav-note">
            <span className="live-dot" /> Um património que se mantém vivo
          </span>
        </div>
      </div>
    </header>
  );
}

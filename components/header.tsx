'use client';
import { usePathname } from 'next/navigation';
import { Bookmark, BookOpenText, MapPin, Flame, Info } from 'lucide-react';
import { Brand } from './brand';
import { Search } from './search';
import { Contribution } from './interactive';

export function Header() {
  const path = usePathname();
  const hasPageSearch = path === '/' || path === '/dicionario';
  return (
    <header className={`site-header${hasPageSearch ? ' has-page-search' : ''}`}>
      <div className="header-top container">
        <Brand />
        <div className="header-actions">
          <a
            href="/guardados"
            className="icon-button"
            aria-label="Palavras guardadas"
            aria-current={path === '/guardados' ? 'page' : undefined}
          >
            <Bookmark size={20} />
          </a>
          <Contribution compact />
        </div>
        <div className="header-bottom">
          <div className="nav-row">
            <nav aria-label="Navegação principal">
              {[
                { url: '/dicionario', label: 'Dicionário', Icon: BookOpenText },
                { url: '/regioes', label: 'Regiões', Icon: MapPin },
                { url: '/em-alta', label: 'Em alta', Icon: Flame },
                { url: '/sobre', label: 'O projeto', Icon: Info },
              ].map(({ url, label, Icon }) => {
                const active =
                  path === url ||
                  (url === '/sobre' && path.startsWith('/sobre')) ||
                  (url === '/dicionario' && path.startsWith('/verbete/'));
                return (
                  <a
                    key={url}
                    href={url}
                    className={active ? 'active' : ''}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
        {!hasPageSearch && <Search />}
      </div>
    </header>
  );
}

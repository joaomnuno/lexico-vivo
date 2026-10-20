import type { Metadata } from 'next';
import { Search, Eye } from 'lucide-react';
import { HotList } from '../../components/hot-list';
export const metadata: Metadata = { title: 'Em alta — o que andamos a descobrir' };
export const dynamic = 'force-dynamic';
export default async function HotPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; dias?: string }>;
}) {
  const params = await searchParams;
  const kind = params.tipo === 'search' ? 'search' : 'view';
  const days = params.dias === '1' ? 1 : params.dias === '30' ? 30 : 7;
  const url = (type: string, period: number) => `/em-alta?tipo=${type}&dias=${period}`;
  return (
    <div className="container hot-page">
      <div className="page-intro">
        <h1>Em alta</h1>
        <p>As palavras mais consultadas e encontradas nas pesquisas.</p>
      </div>
      <div className="hot-filters">
        <nav aria-label="Tipo de atividade">
          <a
            className={kind === 'view' ? 'active' : ''}
            href={url('view', days)}
            aria-current={kind === 'view' ? 'page' : undefined}
          >
            <Eye size={15} /> Mais vistos
          </a>
          <a
            className={kind === 'search' ? 'active' : ''}
            href={url('search', days)}
            aria-current={kind === 'search' ? 'page' : undefined}
          >
            <Search size={15} /> Mais pesquisados
          </a>
        </nav>
        <nav aria-label="Período">
          {[
            [1, 'Hoje'],
            [7, '7 dias'],
            [30, '30 dias'],
          ].map(([period, label]) => (
            <a
              key={period}
              className={days === period ? 'active' : ''}
              href={url(kind, Number(period))}
              aria-current={days === period ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <section
        className="hot-ranking"
        aria-label={kind === 'view' ? 'Verbetes mais vistos' : 'Verbetes mais pesquisados'}
      >
        <HotList kind={kind} days={days} limit={20} />
      </section>
      <a className="text-link hot-privacy-link" href="/sobre/privacidade">
        Como são tratados os meus dados?
      </a>
    </div>
  );
}

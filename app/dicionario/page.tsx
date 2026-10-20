import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, SearchX, SlidersHorizontal, X } from 'lucide-react';
import { search, stats, cleanParams, formatNumber, type SearchParams } from '../../lib/dictionary';
import { EntryCard, JoinBanner } from '../../components/cards';
import { Search } from '../../components/search';

export const metadata: Metadata = {
  title: 'Dicionário de A a Z',
  description:
    'Pesquisa palavras, expressões populares, sinónimos e definições. Explora o dicionário por letra, região ou registo.',
};
export const dynamic = 'force-dynamic';
export default async function Dictionary({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = cleanParams(await searchParams);
  const [result, numbers] = await Promise.all([search(params), stats()]);
  const url = (changes: SearchParams) => {
    const p = new URLSearchParams(
      Object.entries({ ...params, page: '1', ...changes }).filter(([, v]) => !!v) as [
        string,
        string,
      ][],
    );
    return `/dicionario?${p}`;
  };
  const filtered = Object.entries(params).some(([k, v]) => k !== 'page' && !!v);
  return (
    <div className="container directory-page">
      <div className="page-intro">
        <h1>{params.q ? `Resultados para “${params.q}”` : 'Dicionário'}</h1>
        <p>{formatNumber(numbers.total)} palavras e expressões. Pesquisa ou explora de A a Z.</p>
      </div>
      <Search hero initial={params.q} id="dictionary-search" />
      <form className="filter-bar" action="/dicionario">
        <input type="hidden" name="q" value={params.q || ''} />
        {params.letter && <input type="hidden" name="letter" value={params.letter} />}
        <span className="filter-label">
          <SlidersHorizontal size={16} /> Afinar pesquisa
        </span>
        <label>
          <span className="sr-only">Onde pesquisar</span>
          <select name="mode" defaultValue={params.mode || ''}>
            <option value="">Nas palavras</option>
            <option value="definitions">Nas definições</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Região</span>
          <select name="region" defaultValue={params.region || ''}>
            <option value="">Todas as regiões</option>
            {numbers.regions.map((r) => (
              <option value={r.id} key={r.id}>
                {r.name} ({r.count})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Tipo de verbete</span>
          <select name="kind" defaultValue={params.kind || ''}>
            <option value="">Palavras e expressões</option>
            <option value="word">Palavras</option>
            <option value="expression">Expressões</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Registo</span>
          <select name="register" defaultValue={params.register || ''}>
            <option value="">Todos os registos</option>
            {numbers.registers.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
            {!numbers.registers.includes('calão') && <option value="calão">Calão</option>}
          </select>
        </label>
        <button className="button primary" type="submit">
          Aplicar
        </button>
      </form>
      <nav className="alphabet" aria-label="Índice alfabético">
        <a className={!params.letter ? 'active' : ''} href={url({ letter: '' })}>
          Todos
        </a>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <a
            href={url({ letter })}
            key={letter}
            className={params.letter === letter ? 'active' : ''}
            aria-label={`Letra ${letter}`}
          >
            {letter}
          </a>
        ))}
      </nav>
      <div className="results-summary">
        <p>
          <strong>{formatNumber(result.total)}</strong>{' '}
          {result.total === 1 ? 'verbete encontrado' : 'verbetes encontrados'}
          {result.approximate && <span> · Não encontrámos a grafia exata. Talvez procures:</span>}
        </p>
        {filtered && (
          <a href="/dicionario" className="text-link">
            <X size={14} /> Limpar filtros
          </a>
        )}
      </div>
      {result.entries.length ? (
        <div className="card-grid results-grid">
          {result.entries.map((entry) => (
            <EntryCard entry={entry} key={entry.id} fromSearch={!!params.q} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <SearchX size={44} strokeWidth={1} />
          <h2>Ainda não encontrámos essa expressão.</h2>
          <p>
            Experimenta menos palavras, retira os filtros ou usa * para substituir letras.
            <br />
            Também podes procurar uma palavra dentro das definições.
          </p>
          <a href="/dicionario" className="button secondary">
            Explorar todos os verbetes
          </a>
        </section>
      )}
      {result.pages > 1 && (
        <nav className="pagination" aria-label="Paginação">
          {result.page > 1 ? (
            <a className="button secondary" href={url({ page: String(result.page - 1) })}>
              <ArrowLeft size={15} /> Anterior
            </a>
          ) : (
            <span />
          )}
          <span>
            Página {result.page} de {result.pages}
          </span>
          {result.page < result.pages ? (
            <a className="button secondary" href={url({ page: String(result.page + 1) })}>
              Seguinte <ArrowRight size={15} />
            </a>
          ) : (
            <span />
          )}
        </nav>
      )}
      <p className="search-help">
        Dica: pesquisa <code>desenras*</code> para encontrar palavras que começam assim, ou{' '}
        <code>*ar</code> para encontrar terminações.
      </p>
      <JoinBanner />
    </div>
  );
}

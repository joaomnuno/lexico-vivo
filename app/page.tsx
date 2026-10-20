import './home.css';
import { ArrowRight, MapPin } from 'lucide-react';
import { daily, entryUrl, featured, formatNumber, stats } from '../lib/dictionary';
import { Search } from '../components/search';
import { AuthorTribute } from '../components/author-tribute';
import { EntryCard, JoinBanner } from '../components/cards';
import { SaveButton } from '../components/interactive';
import { HotList } from '../components/hot-list';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const [numbers, day, picks] = await Promise.all([stats(), daily(), featured()]);
  return (
    <>
      <section className="home-intro">
        <div className="container home-intro-grid">
          <div className="home-lookup">
            <span className="eyebrow">Calão · Expressões · Falares</span>
            <h1>A língua como ela se fala.</h1>
            <p>
              {formatNumber(numbers.total)} palavras e expressões do português, à tua descoberta.
            </p>
            <Search hero id="hero-search" />
            <div className="lookup-examples">
              <span>Experimenta</span>
              {['desenrascanço', 'estar com os azeites'].map((q) => (
                <a key={q} href={`/dicionario?q=${encodeURIComponent(q)}`}>
                  {q} <ArrowRight size={13} />
                </a>
              ))}
            </div>
          </div>
          <article className="word-of-day" aria-labelledby="daily-title">
            <div className="word-of-day-label">
              <span className="eyebrow">Expressão do dia</span>
              <time dateTime={new Date().toISOString().slice(0, 10)}>
                {new Intl.DateTimeFormat('pt-PT', {
                  day: 'numeric',
                  month: 'short',
                  timeZone: 'UTC',
                }).format(new Date())}
              </time>
            </div>
            <h2 id="daily-title">
              <a href={entryUrl(day)}>{day.headword}</a>
            </h2>
            <p>{day.definitions[0]?.replace(/^◦/, '') || 'Verbete em revisão.'}</p>
            {day.fields['ex.']?.[0] && <blockquote>“{day.fields['ex.'][0]}”</blockquote>}
            <div className="word-of-day-actions">
              <a className="text-link" href={entryUrl(day)}>
                Ver significado <ArrowRight size={16} />
              </a>
              <SaveButton entry={day} />
            </div>
          </article>
        </div>
      </section>
      <div className="container discovery-body">
        <section aria-labelledby="discover-title">
          <div className="section-heading">
            <h2 id="discover-title">Vale a pena conhecer</h2>
            <a className="text-link" href="/dicionario">
              Ver dicionário <ArrowRight size={16} />
            </a>
          </div>
          <div className="card-grid">
            {picks
              .filter((entry) => entry.id !== day.id)
              .slice(0, 3)
              .map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
          </div>
        </section>
        <div className="discovery-bottom">
          <section className="discovery-regions" aria-labelledby="regions-title">
            <div className="section-heading">
              <h2 id="regions-title">Pelos nossos falares</h2>
              <a className="text-link" href="/regioes">
                Ver regiões <ArrowRight size={16} />
              </a>
            </div>
            <div className="region-links">
              {numbers.regions.slice(0, 5).map((r) => (
                <a key={r.id} href={`/dicionario?region=${r.id}`}>
                  <MapPin size={17} />
                  <span>{r.name}</span>
                  <small>{formatNumber(r.count)}</small>
                  <ArrowRight size={15} />
                </a>
              ))}
            </div>
          </section>
          <section className="discovery-hot" aria-labelledby="hot-title">
            <div className="section-heading">
              <h2 id="hot-title">Em alta esta semana</h2>
              <a className="text-link" href="/em-alta">
                Ver mais <ArrowRight size={16} />
              </a>
            </div>
            <HotList limit={3} />
          </section>
        </div>
        <JoinBanner />
        <AuthorTribute />
      </div>
    </>
  );
}

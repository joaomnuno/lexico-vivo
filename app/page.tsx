import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BookOpenText,
  Globe2,
  MapPin,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react';
import { daily, entryUrl, featured, formatNumber, stats } from '../lib/dictionary';
import { Search } from '../components/search';
import { EntryCard, JoinBanner } from '../components/cards';
import { Pronounce, SaveButton, ShareButton } from '../components/interactive';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const [numbers, day, picks] = await Promise.all([stats(), daily(), featured()]);
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-kicker">
            <span className="tiny-star">✳</span> Dicionário de calão e expressões populares
          </div>
          <h1>
            A língua como ela se fala.
            <br />
            Na rua, na taberna,
            <br />à mesa do café.
          </h1>
          <p>
            Há um português que não se aprende nos livros.
            <br />
            Descobre as palavras, as histórias e os falares que são nossos.
          </p>
          <Search hero id="hero-search" />
          <div className="try-search">
            <span>Experimenta:</span>
            {['desenrascanço', 'estar com os azeites', 'chico-esperto'].map((q) => (
              <a key={q} href={`/dicionario?q=${encodeURIComponent(q)}`}>
                {q}
                <ArrowRight size={12} />
              </a>
            ))}
          </div>
          <div className="hero-foot">
            <span>
              <BookOpenText size={15} /> {formatNumber(numbers.total)} palavras e expressões
            </span>
            <span className="hero-foot-divider" />
            <span>
              <Globe2 size={15} /> Muitos lugares. Uma língua.
            </span>
            <a href="#descobrir" aria-label="Explorar o dicionário">
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
        <span className="hero-watermark" aria-hidden="true">
          a<span>à</span>
        </span>
        <span className="hero-side-note" aria-hidden="true">
          Património oral da língua portuguesa
        </span>
      </section>
      <div className="container home-body" id="descobrir">
        <section className="daily-feature">
          <div className="daily-main">
            <div className="eyebrow">
              <Sparkles size={15} /> Uma expressão, todos os dias
            </div>
            <div className="daily-heading">
              <h2>
                <a href={entryUrl(day)}>{day.headword}</a>
              </h2>
              <div className="daily-tools">
                <SaveButton entry={day} />
                <ShareButton title={day.headword} />
              </div>
            </div>
            <Pronounce word={day.headword} />
            <div className="daily-definitions">
              <div>
                <h3>O que quer dizer</h3>
                <p>{day.definitions[0]?.replace(/^◦/, '')}</p>
              </div>
              <div>
                <h3>Por outras palavras</h3>
                <p>{day.synonyms.slice(0, 4).join('; ')}.</p>
              </div>
            </div>
            {day.fields['ex.']?.[0] && (
              <blockquote>
                “{day.fields['ex.'][0]}”<small>Exemplo da recolha original</small>
              </blockquote>
            )}
            <a className="button primary" href={entryUrl(day)}>
              Explorar o verbete <ArrowRight size={16} />
            </a>
          </div>
          <div className="daily-aside">
            <div className="daily-date">
              <span>
                {new Intl.DateTimeFormat('pt-PT', { month: 'long', timeZone: 'UTC' }).format(
                  new Date(),
                )}
              </span>
              <strong>{new Date().getUTCDate().toString().padStart(2, '0')}</strong>
              <span>Expressão do dia</span>
            </div>
            <div className="daily-quote">
              <Quote size={28} />
              <p>
                Uma língua não vive
                <br />
                só no dicionário.
                <br />
                Vive em quem a fala.
              </p>
              <span>É por isso que estamos aqui.</span>
            </div>
          </div>
        </section>
        <section className="explore-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Da boca do povo para aqui</span>
              <h2>Cada expressão tem uma história.</h2>
            </div>
            <a className="text-link" href="/dicionario">
              Explorar o dicionário <ArrowRight size={16} />
            </a>
          </div>
          <div className="card-grid">
            {picks.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
        <section className="regional-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A mesma língua, muitas vozes</span>
              <h2>Diz-me de onde falas.</h2>
              <p>Há palavras que trazem a terra agarrada às sílabas.</p>
            </div>
            <a href="/regioes" className="text-link">
              Conhecer os falares <ArrowRight size={16} />
            </a>
          </div>
          <div className="region-grid">
            {numbers.regions.slice(0, 5).map((r) => (
              <a className="region-card" key={r.id} href={`/dicionario?region=${r.id}`}>
                <span className="region-card-icon">
                  <MapPin size={22} strokeWidth={1.3} />
                  <span className={`region-dot ${r.id}`} />
                </span>
                <h3>{r.name}</h3>
                <p>{r.description}</p>
                <span className="region-count">
                  {r.count} verbetes <ArrowRight size={15} />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section className="manifesto">
          <div className="manifesto-title">
            <BookOpen size={32} strokeWidth={1.3} />
            <h2>
              O rigor de um dicionário.
              <br />A vida de uma conversa.
            </h2>
            <a className="text-link" href="/sobre">
              Conhece o projeto <ArrowRight size={15} />
            </a>
          </div>
          <div className="manifesto-points">
            {[
              [
                BookOpenText,
                'Memória preservada',
                'A recolha original mantém os significados, exemplos e referências de cada expressão.',
              ],
              [
                MapPin,
                'Identidade em cada palavra',
                'Do Norte às ilhas e por toda a lusofonia. Os lugares também fazem parte do significado.',
              ],
              [
                Users,
                'Mais vozes, mais língua',
                'Sugestões da comunidade, revistas antes de entrar. Um património que se constrói em conjunto.',
              ],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof BookOpen;
              return (
                <div key={String(title)}>
                  <I size={21} strokeWidth={1.4} />
                  <div>
                    <h3>{String(title)}</h3>
                    <p>{String(copy)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <JoinBanner />
      </div>
    </>
  );
}

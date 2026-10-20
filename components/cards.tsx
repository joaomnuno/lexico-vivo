import { ArrowRight, BookOpenText, MapPin, Quote, Sparkles } from 'lucide-react';
import { entryUrl, type Entry } from '../lib/dictionary';
import { SaveButton, Contribution } from './interactive';
import { regions } from '../lib/normalize';

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="entry-card">
      <div className="entry-card-top">
        <span className="tag">
          {entry.register || (entry.kind === 'expression' ? 'Expressão popular' : 'Léxico popular')}
        </span>
        <SaveButton entry={entry} />
      </div>
      <a className="card-title" href={entryUrl(entry)}>
        <h3>{entry.headword}</h3>
      </a>
      <p>
        {entry.definitions[0]?.replace(/^◦/, '') ||
          'Este verbete aguarda uma definição. Podes ajudar a completá-lo.'}
      </p>
      {entry.fields['ex.']?.[0] && <blockquote>“{entry.fields['ex.'][0]}”</blockquote>}
      <div className="entry-card-bottom">
        <small>
          <MapPin size={12} />
          {entry.fields.local?.join(', ') || 'Região não indicada'}
        </small>
        <a href={entryUrl(entry)} aria-label={`Consultar ${entry.headword}`}>
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function JoinBanner() {
  return (
    <section className="join-banner">
      <div>
        <span className="eyebrow">O próximo verbete pode ser teu</span>
        <h2>
          Há palavras que só
          <br />a tua terra conhece.
        </h2>
        <p>
          Uma expressão da tua avó. Uma palavra do teu bairro.
          <br />
          Ajuda-nos a guardar aquilo que nos faz falar português.
        </p>
      </div>
      <Contribution />
      <BookOpenText className="join-decoration" size={190} strokeWidth={0.7} />
    </section>
  );
}
export function Sidebar({ day, picks }: { day: Entry; picks: Entry[] }) {
  return (
    <aside className="dictionary-sidebar">
      <section className="side-card daily-side">
        <div className="section-mini">
          <span>
            <Sparkles size={14} /> Expressão do dia
          </span>
          <span>
            {new Intl.DateTimeFormat('pt-PT', {
              day: 'numeric',
              month: 'long',
              timeZone: 'UTC',
            }).format(new Date())}
          </span>
        </div>
        <h2>
          <a href={entryUrl(day)}>{day.headword}</a>
        </h2>
        <p>{day.definitions[0]?.replace(/^◦/, '')}</p>
        <a className="text-link" href={entryUrl(day)}>
          Descobrir expressão <ArrowRight size={14} />
        </a>
      </section>
      <section className="side-card">
        <div className="section-mini">
          <span>
            <BookOpenText size={14} /> À descoberta
          </span>
        </div>
        <ol className="discovery-list">
          {picks.map((e) => (
            <li key={e.id}>
              <a href={entryUrl(e)}>
                <strong>{e.headword}</strong>
                <small>{e.definitions[0]?.replace(/^◦/, '')}</small>
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section className="side-card region-side">
        <div className="section-mini">
          <span>
            <MapPin size={14} /> Um país, tantos falares
          </span>
        </div>
        {regions.slice(0, 5).map((r) => (
          <a key={r.id} href={`/dicionario?region=${r.id}`}>
            <span className={`region-dot ${r.id}`} />
            {r.name}
            <ArrowRight size={13} />
          </a>
        ))}
        <a className="text-link" href="/regioes">
          Toda a lusofonia <ArrowRight size={14} />
        </a>
      </section>
      <section className="side-card dark-card">
        <Quote size={26} strokeWidth={1.3} />
        <h2>Também se diz assim na tua terra?</h2>
        <p>O dicionário cresce com as palavras de quem o vive.</p>
        <Contribution />
      </section>
    </aside>
  );
}

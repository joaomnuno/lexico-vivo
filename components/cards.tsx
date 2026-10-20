import { ArrowRight, MapPin, Feather, Flame } from 'lucide-react';
import { entryUrl, type Entry } from '../lib/dictionary';
import { SaveButton, Contribution } from './interactive';
import { HotList } from './hot-list';
import { displayDefinition } from '../lib/definition';

export function EntryCard({ entry, fromSearch = false }: { entry: Entry; fromSearch?: boolean }) {
  const url = entryUrl(entry) + (fromSearch ? '?via=pesquisa' : '');
  return (
    <article className="entry-card">
      <div className="entry-card-top">
        <span className={`tag${entry.register === 'coloquial' ? ' sage' : ''}`}>
          {entry.register || (entry.kind === 'expression' ? 'Expressão popular' : 'Léxico popular')}
        </span>
        <SaveButton entry={entry} />
      </div>
      <a className="card-title" href={url}>
        <h3>{entry.headword}</h3>
      </a>
      <p>{displayDefinition(entry.definitions[0]) || 'Definição por completar.'}</p>
      <div className="entry-card-bottom">
        <small>
          {entry.fields.local?.length ? (
            <>
              <MapPin size={12} />
              {entry.fields.local.join(', ')}
            </>
          ) : null}
        </small>
        <a href={url} aria-label={`Consultar ${entry.headword}`}>
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function JoinBanner() {
  return (
    <section className="contribution-strip">
      <div>
        <h2>Falta aqui uma expressão?</h2>
        <p>Partilha-a connosco. Cada sugestão passa por revisão.</p>
      </div>
      <Contribution />
    </section>
  );
}
export function Sidebar({ day }: { day: Entry }) {
  return (
    <aside className="dictionary-sidebar">
      <section className="side-card daily-side">
        <div className="section-mini">
          <span>
            <Feather size={14} aria-hidden="true" /> A descoberta de hoje
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
        <p>{displayDefinition(day.definitions[0])}</p>
        <a className="text-link" href={entryUrl(day)}>
          Descobrir expressão <ArrowRight size={14} />
        </a>
      </section>
      <section className="side-card hot-side">
        <div className="section-mini">
          <span>
            <Flame size={14} /> Em alta esta semana
          </span>
        </div>
        <HotList />
        <a className="text-link" href="/em-alta">
          Ver mais
        </a>
      </section>
    </aside>
  );
}

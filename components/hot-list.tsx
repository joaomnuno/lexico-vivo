import { Flame } from 'lucide-react';
import { displayDefinition } from '../lib/definition';
import { hot, type ActivityKind } from '../lib/activity';
import { entryUrl, formatNumber } from '../lib/dictionary';

export async function HotList({
  kind = 'view',
  days = 7,
  limit = 5,
}: {
  kind?: ActivityKind;
  days?: number;
  limit?: number;
}) {
  const entries = await hot(kind, days, limit);
  return entries.length ? (
    <ol className="hot-list">
      {entries.map(({ entry, count }) => (
        <li key={entry.id}>
          <a href={entryUrl(entry)}>
            <div>
              <strong>{entry.headword}</strong>
              <small>{displayDefinition(entry.definitions[0]) || 'Verbete em revisão'}</small>
            </div>
            <span className="hot-count">
              {formatNumber(count)}
              <small>
                {kind === 'search'
                  ? count === 1
                    ? 'pesquisa'
                    : 'pesquisas'
                  : count === 1
                    ? 'consulta'
                    : 'consultas'}
              </small>
            </span>
          </a>
        </li>
      ))}
    </ol>
  ) : (
    <div className="hot-empty">
      <Flame size={24} strokeWidth={1.4} />
      <p>
        {kind === 'search'
          ? 'Ainda não há pesquisas neste período.'
          : 'Ainda não há consultas neste período.'}
      </p>
      <a href="/dicionario" className="text-link">
        Descobrir uma expressão
      </a>
    </div>
  );
}

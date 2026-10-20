import { ArrowRight } from 'lucide-react';
import { featured } from '../lib/dictionary';
import type { DiscoveryOptions } from '../lib/discovery';
import { EntryCard } from './cards';

export async function DiscoverySection({
  id = 'discover-title',
  title = 'Vale a pena conhecer',
  ...options
}: DiscoveryOptions & { id?: string; title?: string }) {
  const entries = await featured(options);
  if (!entries.length) return null;
  const params = new URLSearchParams();
  if (options.region) params.set('region', options.region);
  if (options.kind) params.set('kind', options.kind);
  const href = `/dicionario${params.size ? `?${params}` : ''}`;
  return (
    <section aria-labelledby={id}>
      <div className="section-heading">
        <h2 id={id}>{title}</h2>
        <a className="text-link" href={href}>
          Ver dicionário <ArrowRight size={16} />
        </a>
      </div>
      <div className="card-grid">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

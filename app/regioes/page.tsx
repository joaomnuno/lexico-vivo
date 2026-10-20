import type { Metadata } from 'next';
import { ArrowRight, MapPin } from 'lucide-react';
import { corpus, entryUrl, stats } from '../../lib/dictionary';
import { JoinBanner } from '../../components/cards';
export const metadata: Metadata = { title: 'Regiões & falares' };
export const dynamic = 'force-dynamic';
export default async function Regions() {
  const [numbers, { entries }] = await Promise.all([stats(), corpus()]);
  return (
    <div className="container regions-page">
      <div className="page-intro">
        <h1>Regiões e falares</h1>
        <p>Explora as palavras pelos lugares onde foram recolhidas.</p>
      </div>
      <div className="region-explanation">
        <MapPin size={20} />
        <p>
          As regiões refletem as indicações da recolha original. Uma palavra pode usar-se noutros
          lugares; a ausência de uma região não significa ausência de uso.
        </p>
      </div>
      <div className="region-detail-grid">
        {numbers.regions.map((r) => (
          <section className="region-detail" key={r.id}>
            <div className="region-detail-heading">
              <MapPin size={23} />
              <span>{r.count} verbetes</span>
            </div>
            <h2>{r.name}</h2>
            <p>{r.description}</p>
            <ul>
              {entries
                .filter((e) => e.region === r.id && e.definitions.length)
                .slice(0, 4)
                .map((e) => (
                  <li key={e.id}>
                    <a href={entryUrl(e)}>
                      {e.headword}
                      <ArrowRight size={14} />
                    </a>
                  </li>
                ))}
            </ul>
            <a className="text-link" href={`/dicionario?region=${r.id}`}>
              Explorar este falar <ArrowRight size={15} />
            </a>
          </section>
        ))}
      </div>
      <JoinBanner />
    </div>
  );
}

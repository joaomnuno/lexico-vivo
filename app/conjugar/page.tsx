import type { Metadata } from 'next';
import { ArrowRight, Languages } from 'lucide-react';
import { conjugation, groups } from '../../lib/conjugation';
export const metadata: Metadata = { title: 'Conjugação verbal' };
export default async function Conjugate({
  searchParams,
}: {
  searchParams: Promise<{ verbo?: string }>;
}) {
  const input = (await searchParams).verbo;
  const verb = (typeof input === 'string' ? input : '').trim().toLowerCase().slice(0, 50);
  const result = verb ? conjugation(verb) : null;
  return (
    <div className="container conjugation-page">
      <div className="page-intro">
        <span className="eyebrow">
          <Languages size={16} /> As palavras em movimento
        </span>
        <h1>
          Eu falo. Tu falas.
          <br />A língua vive.
        </h1>
        <p>
          Indicativo, conjuntivo, imperativo e infinitivo pessoal. As formas simples e compostas, no
          mesmo lugar.
        </p>
      </div>
      <form className="conjugate-form" action="/conjugar">
        <label htmlFor="verb">Verbo no infinitivo</label>
        <div>
          <input
            id="verb"
            name="verbo"
            defaultValue={verb}
            maxLength={50}
            placeholder="Ex.: falar, fazer, ser"
            required
          />
          <button className="button primary" type="submit">
            Conjugar <ArrowRight size={15} />
          </button>
        </div>
      </form>
      {verb && !result && (
        <div className="empty-state" role="status">
          <h2>Não foi possível conjugar “{verb}”.</h2>
          <p>Usa um verbo no infinitivo, sem pronomes. Experimenta «falar» ou «ser».</p>
        </div>
      )}
      {result && (
        <>
          <h2 className="conjugation-title">
            Conjugação de <em>{verb}</em>
          </h2>
          <dl className="verb-forms">
            {[
              ['Infinitivo', result.infinitive],
              ['Gerúndio', result.gerund],
              ['Particípio', result.pastParticiple],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {groups.map((group) => (
            <section className="conjugation-group" key={group.name}>
              <h2>{group.name}</h2>
              <div className="conjugation-grid">
                {Object.entries(group.tenses).map(([key, label]) => {
                  const forms = result[key];
                  if (!Array.isArray(forms)) return null;
                  return (
                    <section className="tense-card" key={key}>
                      <h3>{label}</h3>
                      <dl>
                        {forms.map((form, i) => (
                          <div key={i}>
                            <dt>
                              {
                                (key === 'imperative'
                                  ? ['tu', 'ele / ela', 'nós', 'vós', 'eles / elas']
                                  : ['eu', 'tu', 'ele / ela', 'nós', 'vós', 'eles / elas'])[i]
                              }
                            </dt>
                            <dd>{form || '—'}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  );
                })}
              </div>
            </section>
          ))}
        </>
      )}
      <p className="tool-note">
        Conjugação automática em português europeu com{' '}
        <a href="https://github.com/ablaut-dev/ablaut" target="_blank" rel="noreferrer">
          ablaut
        </a>
        . Não inclui conjugação pronominal. O uso regional, as variantes e os verbos defectivos
        podem exigir consulta adicional.
      </p>
      <div className="verb-suggestions">
        <span>Experimenta também:</span>
        {['falar', 'fazer', 'ser', 'ir', 'ter', 'viver'].map((v) => (
          <a href={`/conjugar?verbo=${v}`} key={v}>
            {v}
          </a>
        ))}
      </div>
    </div>
  );
}

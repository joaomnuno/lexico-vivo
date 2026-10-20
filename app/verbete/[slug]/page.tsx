import { TrackVisit } from '../../../components/track-visit';
import { speechEnabled } from '../../../lib/audio';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronRight,
  FileText,
  MapPin,
  Quote,
  ScrollText,
} from 'lucide-react';
import { corpus, daily, entryUrl, findEntry } from '../../../lib/dictionary';
import { Sidebar } from '../../../components/cards';
import {
  Contribution,
  PrintButton,
  Pronounce,
  SaveButton,
  ShareButton,
  Vote,
} from '../../../components/interactive';

export const dynamic = 'force-dynamic';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const entry = await findEntry((await params).slug);
  return entry
    ? {
        title: entry.headword,
        description:
          entry.definitions[0]?.replace(/^◦/, '') || 'Consulta este verbete no Léxico Vivo.',
        alternates: { canonical: entryUrl(entry) },
      }
    : { title: 'Verbete não encontrado' };
}
export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const entry = await findEntry((await params).slug);
  if (!entry) notFound();
  const [{ entries }, day] = await Promise.all([corpus(), daily()]);
  const index = entries.findIndex((e) => e.id === entry.id);
  const previous = entries[index - 1],
    next = entries[index + 1];
  const fields = entry.fields;
  const origins = [...(fields.etim || []), ...(fields['ori.'] || [])];
  const shown = new Set(['sin.', 'ex.', 'local', 'level', 'etim', 'ori.', 'oposto', 'gram', 'en']);
  const otherFields = Object.entries(fields).filter(([key]) => !shown.has(key));
  const lookup = new Map(entries.map((e) => [e.normalized, e]));
  const { normalize } = await import('../../../lib/normalize');
  const linked = (text: string) => {
    const match = lookup.get(normalize(text));
    return match ? entryUrl(match) : `/dicionario?q=${encodeURIComponent(text)}`;
  };
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.headword,
    description: entry.definitions.join('; '),
    inDefinedTermSet: 'Léxico Vivo',
  };
  return (
    <div className="container entry-page">
      {process.env.ACTIVITY_TRACKING !== 'false' && <TrackVisit entryId={entry.id} />}
      <nav className="breadcrumb" aria-label="Localização">
        <a href="/">Início</a>
        <ChevronRight size={12} />
        <a href="/dicionario">Dicionário</a>
        <ChevronRight size={12} />
        <span>{entry.headword}</span>
      </nav>
      <div className="dictionary-grid">
        <div>
          <article className="entry-reader">
            <div className="reader-label">
              <span className="eyebrow">
                <BookOpenText size={14} /> Verbete do dicionário
              </span>
              <div className="reader-tools">
                <ShareButton title={entry.headword} />
                <SaveButton entry={entry} />
                <PrintButton />
              </div>
            </div>
            <h1>{entry.headword}</h1>
            <div className="entry-meta">
              <Pronounce word={entry.headword} slug={entry.slug} hosted={speechEnabled()} />
              {fields.gram?.length && <em>{fields.gram.join('; ')}</em>}
            </div>
            <div className="entry-tags">
              <span className="tag">
                {entry.kind === 'expression' ? 'Expressão popular' : 'Palavra'}
              </span>
              {entry.register && <span className="tag warm">{entry.register}</span>}
              {fields.local?.map((local) => (
                <span key={local} className="tag region">
                  <MapPin size={11} />
                  {local}
                </span>
              ))}
            </div>
            <section className="reader-section">
              <h2 className="section-mini">
                <span className="section-rule" /> Significados & aceções
              </h2>
              {entry.definitions.length ? (
                <ol className="definitions">
                  {entry.definitions.map((definition, i) => (
                    <li key={i}>
                      <span className="definition-number">{i + 1}</span>
                      <p>{definition.replace(/^◦\s*/, '')}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="source-gap">
                  <FileText size={22} />
                  <div>
                    <strong>Uma palavra à espera de mais contexto.</strong>
                    <p>
                      A recolha original não inclui uma definição neste verbete. Consulta as
                      informações abaixo ou sugere uma.
                    </p>
                    <Contribution entry={entry} />
                  </div>
                </div>
              )}
            </section>
            {origins.length > 0 && (
              <section className="origin-box">
                <ScrollText size={22} />
                <div>
                  <h2>Origem & história</h2>
                  {origins.map((origin, i) => (
                    <p key={i}>{origin}</p>
                  ))}
                </div>
              </section>
            )}
            {fields['ex.']?.length > 0 && (
              <section className="reader-section">
                <h2 className="section-mini">
                  <Quote size={14} /> Exemplos no quotidiano
                </h2>
                {fields['ex.'].map((example, i) => (
                  <blockquote className="example" key={i}>
                    “{example}”
                    <small>
                      Recolha original ·{' '}
                      {entry.pages.length
                        ? `página ${entry.pages[0]}`
                        : 'Contribuição da comunidade'}
                    </small>
                  </blockquote>
                ))}
              </section>
            )}
            {entry.synonyms.length > 0 && (
              <section className="reader-section">
                <h2 className="section-mini">
                  <span className="section-rule" /> Sinónimos & expressões próximas{' '}
                  <small>{entry.synonyms.length} na fonte</small>
                </h2>
                <div className="synonym-list">
                  {entry.synonyms.map((synonym, i) => (
                    <a key={i} href={linked(synonym)}>
                      {synonym}
                      <ArrowRight size={12} />
                    </a>
                  ))}
                </div>
                <p className="source-note">
                  Os sinónimos pertencem ao verbete original e podem corresponder a aceções
                  diferentes.
                </p>
              </section>
            )}
            {fields.oposto?.length > 0 && (
              <section className="reader-section">
                <h2 className="section-mini">Antónimos & opostos</h2>
                <div className="synonym-list">
                  {fields.oposto.map((text, i) => (
                    <a key={i} href={linked(text)}>
                      {text}
                    </a>
                  ))}
                </div>
              </section>
            )}
            {fields.en?.length > 0 && (
              <section className="reader-section">
                <h2 className="section-mini">Equivalentes em inglês</h2>
                {fields.en.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </section>
            )}
            {otherFields.length > 0 && (
              <section className="reader-section source-fields">
                <h2 className="section-mini">
                  <FileText size={14} /> Mais sobre esta expressão
                </h2>
                <dl>
                  {otherFields.map(([key, values]) => (
                    <div key={key}>
                      <dt>
                        {(
                          {
                            nota: 'Nota de uso',
                            'é um': 'Classificação na fonte',
                            patt: 'Padrão de uso',
                            equiv: 'Equivalentes',
                            frase: 'Frase',
                            dom: 'Domínio',
                            'pseudo-etimo': 'Etimologia popular (não verificada)',
                            ver: 'Ver também',
                          } as Record<string, string>
                        )[key] || key}
                      </dt>
                      <dd>
                        {values.map((text, i) => (
                          <p key={i}>{text}</p>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            <div className="reader-related">
              <a href={`/dicionario?q=${encodeURIComponent(entry.headword)}&mode=definitions`}>
                Encontrar nas definições <ArrowRight size={13} />
              </a>
            </div>
            <Vote entryId={entry.id} />
            <div className="entry-source">
              <span>
                <FileText size={13} />
                {entry.source === 'original' ? (
                  <>
                    <a href="/sobre#jose-joao-almeida">Recolha de José João Almeida</a>
                    {entry.pages.length ? ` · pág. ${entry.pages.join(', ')}` : ''}
                  </>
                ) : (
                  'Contribuição revista'
                )}
              </span>
              <Contribution entry={entry} />
            </div>
            <details className="source-details">
              <summary>Consultar registo original e proveniência</summary>
              <p>
                A fonte deste verbete é a recolha de José João Almeida e dos seus colaboradores. O
                texto conserva o conteúdo da recolha, incluindo grafias e marcas de uso. A leitura é
                sintetizada pelo navegador.
              </p>
              <a href={`/api/entries/${entry.slug}`}>Consultar dados deste verbete (JSON)</a>
              <pre>
                {JSON.stringify(
                  { fields: entry.fields, sections: entry.sections, pages: entry.pages },
                  null,
                  2,
                )}
              </pre>
            </details>
          </article>
          <nav className="entry-neighbors" aria-label="Verbetes vizinhos">
            {previous ? (
              <a href={entryUrl(previous)}>
                <ArrowLeft size={18} />
                <div>
                  <small>Verbete anterior</small>
                  <strong>{previous.headword}</strong>
                </div>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={entryUrl(next)}>
                <div>
                  <small>Verbete seguinte</small>
                  <strong>{next.headword}</strong>
                </div>
                <ArrowRight size={18} />
              </a>
            ) : (
              <span />
            )}
          </nav>
          <div className="editorial-note">
            <BookOpenText size={26} strokeWidth={1.2} />
            <p>
              <strong>Uma palavra pode contar muitas histórias.</strong>
              <br />
              Respeitamos a linguagem da fonte, sem transformar expressões em juízos sobre pessoas.{' '}
              <a href="/sobre#metodologia">Conhece os critérios editoriais.</a>
            </p>
          </div>
        </div>
        <Sidebar day={day} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
    </div>
  );
}

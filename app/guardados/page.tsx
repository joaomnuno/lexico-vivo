'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import { readSaved, SaveButton } from '../../components/interactive';
export default function SavedPage() {
  const [saved, setSaved] = useState<ReturnType<typeof readSaved>>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const sync = () => {
      setSaved(readSaved());
      setLoaded(true);
    };
    sync();
    window.addEventListener('saved-change', sync);
    return () => window.removeEventListener('saved-change', sync);
  }, []);
  return (
    <div className="container saved-page">
      <title>Palavras guardadas · Léxico Vivo</title>
      <div className="page-intro">
        <span className="eyebrow">
          <Bookmark size={16} /> A tua coleção de palavras
        </span>
        <h1>Há palavras que ficam.</h1>
        <p>
          Guarda as expressões que queres voltar a encontrar. Ficam neste navegador, sem precisares
          de criar conta.
        </p>
      </div>
      {!loaded ? (
        <p>A abrir os teus guardados…</p>
      ) : saved.length ? (
        <div className="saved-list">
          {saved.map((entry) => (
            <article key={entry.id}>
              <a href={`/verbete/${entry.slug}`}>
                <h2>{entry.headword}</h2>
                <ArrowRight size={20} />
              </a>
              <SaveButton entry={entry} />
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bookmark size={42} strokeWidth={1} />
          <h2>A tua coleção começa numa palavra.</h2>
          <p>Usa o marcador junto de um verbete para o guardares aqui.</p>
          <a className="button primary" href="/dicionario">
            Encontrar a primeira <ArrowRight size={16} />
          </a>
        </div>
      )}
    </div>
  );
}

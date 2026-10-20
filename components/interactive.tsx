'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  Check,
  Flag,
  HeartHandshake,
  LoaderCircle,
  Plus,
  Printer,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  X,
} from 'lucide-react';
import type { Entry } from '../lib/dictionary';

type Saved = Pick<Entry, 'id' | 'headword' | 'slug'>;
export function readSaved(): Saved[] {
  try {
    return JSON.parse(localStorage.getItem('lexico-saved') || '[]');
  } catch {
    return [];
  }
}
export function SaveButton({ entry, text = false }: { entry: Saved; text?: boolean }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => setSaved(readSaved().some((e) => e.id === entry.id));
    sync();
    window.addEventListener('saved-change', sync);
    return () => window.removeEventListener('saved-change', sync);
  }, [entry.id]);
  return (
    <button
      className={text ? 'button secondary' : 'icon-button'}
      aria-label={saved ? 'Remover dos guardados' : 'Guardar palavra'}
      aria-pressed={saved}
      onClick={() => {
        try {
          const values = readSaved();
          localStorage.setItem(
            'lexico-saved',
            JSON.stringify(saved ? values.filter((e) => e.id !== entry.id) : [...values, entry]),
          );
          window.dispatchEvent(new Event('saved-change'));
        } catch {
          alert('Não foi possível guardar. Verifica as permissões de armazenamento do navegador.');
        }
      }}
    >
      <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
      {text && (saved ? 'Guardado' : 'Guardar')}
    </button>
  );
}
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="icon-button"
      aria-label="Copiar ligação do verbete"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`${title} — ${window.location.href}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch {
          window.prompt('Copia esta ligação:', window.location.href);
        }
      }}
    >
      {copied ? <Check size={18} /> : <Share2 size={18} />}
      <span className="sr-only" role="status">
        {copied ? 'Ligação copiada' : ''}
      </span>
    </button>
  );
}
export function PrintButton() {
  return (
    <button className="icon-button" aria-label="Imprimir verbete" onClick={() => window.print()}>
      <Printer size={18} />
    </button>
  );
}
export function Pronounce({ word }: { word: string }) {
  const [voice, setVoice] = useState('pt-PT');
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);
  return (
    <div className="pronunciation">
      <button
        className="sound-button"
        aria-label={`Ouvir ${word}`}
        disabled={speaking}
        onClick={() => {
          if (!('speechSynthesis' in window)) {
            setMessage('Este navegador não suporta leitura em voz alta.');
            return;
          }
          const utterance = new SpeechSynthesisUtterance(word);
          utterance.lang = voice;
          utterance.rate = 0.85;
          utterance.onend = () => setSpeaking(false);
          utterance.onerror = () => {
            setSpeaking(false);
            setMessage('Voz indisponível. Experimenta outro navegador.');
          };
          window.speechSynthesis.cancel();
          setMessage('');
          setSpeaking(true);
          window.speechSynthesis.speak(utterance);
        }}
      >
        <Volume2 size={17} />
      </button>
      <span>Ouvir a expressão</span>
      <select aria-label="Variante da voz" value={voice} onChange={(e) => setVoice(e.target.value)}>
        <option value="pt-PT">PT-PT</option>
        <option value="pt-BR">PT-BR</option>
      </select>
      <span className="sr-only" role="status">
        {message || (speaking ? 'A reproduzir leitura sintetizada' : '')}
      </span>
      {message && <small>{message}</small>}
    </div>
  );
}
export function Contribution({
  compact = false,
  entry,
}: {
  compact?: boolean;
  entry?: Pick<Entry, 'id' | 'headword'>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  return (
    <>
      <button
        className={
          compact ? 'button primary contribute-header' : entry ? 'text-button' : 'button primary'
        }
        onClick={() => {
          setDone(false);
          setMessage('');
          dialog.current?.showModal();
        }}
      >
        {entry ? <Flag size={14} /> : <Plus size={16} />}{' '}
        {entry ? 'Sugerir correção' : 'Sugerir expressão'}
      </button>
      <dialog
        ref={dialog}
        aria-label={entry ? 'Sugerir correção' : 'Sugerir expressão'}
        className="contribution-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close icon-button"
          aria-label="Fechar"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} />
        </button>
        {done ? (
          <div className="success-state">
            <HeartHandshake size={42} />
            <h2>Mais uma voz para o Léxico.</h2>
            <p>A tua sugestão foi guardada. Será revista antes de aparecer no dicionário.</p>
            <button className="button primary" onClick={() => dialog.current?.close()}>
              Continuar a explorar
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">A língua também é tua</span>
            <h2>{entry ? 'Ajuda-nos a afinar o verbete.' : 'Como se diz na tua terra?'}</h2>
            <p>
              Partilha uma expressão, o seu significado e um exemplo. Cada contribuição passa por
              revisão.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPending(true);
                setMessage('');
                const form = e.currentTarget;
                try {
                  const response = await fetch('/api/contributions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...Object.fromEntries(new FormData(form)),
                      entryId: entry?.id,
                    }),
                  });
                  const data = await response.json();
                  if (!response.ok)
                    throw new Error(data.error || 'Não foi possível enviar. Tenta novamente.');
                  setDone(true);
                  form.reset();
                } catch (error) {
                  setMessage(
                    error instanceof Error
                      ? error.message
                      : 'Verifica a ligação e tenta novamente.',
                  );
                } finally {
                  setPending(false);
                }
              }}
            >
              <label>
                Palavra ou expressão
                <input
                  name="headword"
                  required
                  minLength={2}
                  maxLength={180}
                  defaultValue={entry?.headword}
                  placeholder="Ex.: estar com os azeites"
                />
              </label>
              <label>
                O que significa?
                <textarea
                  name="definition"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={3}
                  placeholder="Explica o significado com as tuas palavras."
                />
              </label>
              <label>
                Exemplo de uso <small>(opcional)</small>
                <textarea
                  name="example"
                  maxLength={1000}
                  rows={2}
                  placeholder="Uma frase onde costumas usar a expressão."
                />
              </label>
              <div className="form-columns">
                <label>
                  Região <small>(opcional)</small>
                  <input name="region" maxLength={100} placeholder="Ex.: Minho, Portugal" />
                </label>
                <label>
                  O teu nome <small>(opcional)</small>
                  <input
                    name="name"
                    maxLength={80}
                    autoComplete="given-name"
                    placeholder="Como te devemos chamar?"
                  />
                </label>
              </div>
              <label className="honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <p className="form-note">
                Não incluas dados pessoais no exemplo. A sugestão fica disponível apenas para
                revisão editorial.
              </p>
              {message && (
                <p className="form-error" role="alert">
                  {message}
                </p>
              )}
              <button className="button primary" type="submit" disabled={pending}>
                {pending ? <LoaderCircle size={16} className="spinner" /> : <Plus size={16} />}{' '}
                {pending ? 'A enviar…' : 'Enviar para revisão'}
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
export function Vote({ entryId }: { entryId: number }) {
  const [counts, setCounts] = useState({ yes: 0, rare: 0, current: '' });
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  useEffect(() => {
    fetch(`/api/votes/${entryId}`)
      .then((r) => r.json())
      .then(setCounts)
      .catch(() => {});
  }, [entryId]);
  const vote = async (value: string) => {
    setPending(true);
    try {
      const response = await fetch(`/api/votes/${entryId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) throw new Error();
      setCounts(await response.json());
      setMessage('Obrigado por partilhares o uso na tua terra.');
    } catch {
      setMessage('Não foi possível registar. Tenta novamente.');
    } finally {
      setPending(false);
    }
  };
  return (
    <div className="vote-widget">
      <div>
        <strong>Ainda se usa na tua terra?</strong>
        <small>A língua vive de quem a fala.</small>
      </div>
      <div className="vote-actions">
        <button
          className="button secondary"
          disabled={pending}
          aria-pressed={counts.current === 'yes'}
          onClick={() => vote('yes')}
        >
          <ThumbsUp size={15} /> Sim ({counts.yes})
        </button>
        <button
          className="button secondary"
          disabled={pending}
          aria-pressed={counts.current === 'rare'}
          onClick={() => vote('rare')}
        >
          <ThumbsDown size={15} /> Raramente ({counts.rare})
        </button>
      </div>
      <p className="vote-message" role="status">
        {message}
      </p>
    </div>
  );
}

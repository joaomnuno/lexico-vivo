'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search as SearchIcon, X } from 'lucide-react';
import type { Entry } from '../lib/dictionary';

export function Search({
  hero = false,
  initial = '',
  id = 'header-search',
}: {
  hero?: boolean;
  initial?: string;
  id?: string;
}) {
  const [value, setValue] = useState(initial);
  const [suggestions, setSuggestions] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hero) return;
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, [hero]);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      if (value.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}&limit=5`, {
          signal: controller.signal,
        });
        if (response.ok) setSuggestions((await response.json()).entries);
      } catch {
        /* A cancelled suggestion request needs no user-facing error. */
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);
  useEffect(() => {
    const close = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  return (
    <div ref={root} className={`search-wrap ${hero ? 'search-hero' : 'search-compact'}`}>
      <form
        action="/dicionario"
        className="search-form"
        role="search"
        onSubmit={(e) => {
          if (open && active >= 0 && suggestions[active]) {
            e.preventDefault();
            window.location.assign(`/verbete/${suggestions[active].slug}?via=pesquisa`);
          }
        }}
      >
        <SearchIcon size={hero ? 22 : 17} aria-hidden="true" />
        <input
          ref={input}
          id={id}
          name="q"
          value={value}
          autoComplete="off"
          enterKeyHint="search"
          maxLength={120}
          placeholder={hero ? 'Que palavra te traz por cá?' : 'Procurar uma palavra ou expressão…'}
          aria-label="Pesquisar no dicionário"
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={`${id}-suggestions`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-option-${active}` : undefined}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              setActive(-1);
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              setActive((i) => Math.min(i + 1, suggestions.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((i) => Math.max(-1, i - 1));
            }
          }}
        />
        {value && (
          <button
            className="icon-button clear-search"
            type="button"
            aria-label="Limpar pesquisa"
            onClick={() => {
              setValue('');
              setActive(-1);
              input.current?.focus();
            }}
          >
            <X size={16} />
          </button>
        )}
        {hero ? (
          <button className="button primary search-submit" type="submit">
            Consultar <ArrowRight size={16} />
          </button>
        ) : (
          <kbd>Ctrl K</kbd>
        )}
      </form>
      {open && suggestions.length > 0 && (
        <ul
          className="suggestions"
          id={`${id}-suggestions`}
          role="listbox"
          aria-label="Sugestões de pesquisa"
        >
          {suggestions.map((entry, i) => (
            <li role="option" id={`${id}-option-${i}`} aria-selected={active === i} key={entry.id}>
              <a
                className={active === i ? 'selected' : ''}
                href={`/verbete/${entry.slug}?via=pesquisa`}
              >
                <span>
                  <strong>{entry.headword}</strong>
                  <small>{entry.definitions[0] || 'Verbete em revisão'}</small>
                </span>
                <ArrowRight size={16} />
              </a>
            </li>
          ))}
          <li className="all-results">
            <a href={`/dicionario?q=${encodeURIComponent(value)}`}>
              Ver todos os resultados <ArrowRight size={14} />
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

import { BookOpenText } from 'lucide-react';
export default function NotFound() {
  return (
    <div className="container empty-state not-found">
      <BookOpenText size={48} strokeWidth={1} />
      <span className="eyebrow">Página não encontrada</span>
      <h1>
        Esta palavra ficou
        <br />
        na ponta da língua.
      </h1>
      <p>A ligação pode ter mudado. Procura uma expressão no dicionário.</p>
      <a className="button primary" href="/dicionario">
        Voltar ao dicionário
      </a>
    </div>
  );
}

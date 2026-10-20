'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state">
      <h1>Não foi possível abrir esta página.</h1>
      <p>A ligação ao dicionário pode estar temporariamente indisponível.</p>
      <button className="button primary" onClick={reset}>
        Tentar novamente
      </button>
      <a href="/" className="text-link">
        Voltar ao início
      </a>
    </div>
  );
}

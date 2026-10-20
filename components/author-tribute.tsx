import { ArrowUpRight } from 'lucide-react';
export function AuthorTribute() {
  return (
    <section className="source-credit" aria-label="A recolha original">
      <p>
        Da recolha de <a href="/sobre#jose-joao-almeida">José João Almeida</a> e dos seus
        colaboradores.
      </p>
      <a className="text-link" href="/sobre#jose-joao-almeida">
        Conhecer a origem <ArrowUpRight size={15} />
      </a>
    </section>
  );
}

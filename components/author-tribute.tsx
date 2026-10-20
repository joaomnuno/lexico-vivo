import { ArrowUpRight } from 'lucide-react';

export function AuthorTribute() {
  return (
    <section className="author-tribute" aria-labelledby="author-tribute-title">
      <span className="author-monogram" aria-hidden="true">
        JJ
      </span>
      <div>
        <span className="eyebrow">Antes deste site, houve quem escutasse.</span>
        <h2 id="author-tribute-title">Obrigado, José João Almeida.</h2>
        <p>
          O Léxico Vivo nasce da sua recolha de calão e expressões idiomáticas, construída com
          muitas outras vozes. À curiosidade de guardar estas palavras e à generosidade de as
          partilhar, deixamos o nosso reconhecimento.
        </p>
        <a className="text-link" href="/sobre#jose-joao-almeida">
          Conhecer o autor e a sua obra <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

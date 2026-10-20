import { ArrowUpRight, BookOpenText } from 'lucide-react';
import { Brand } from './brand';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            Um lugar para as palavras que não cabem
            <br />
            nos dicionários de sempre.
          </p>
          <span className="footer-signature">
            Com gratidão a <a href="/sobre#jose-joao-almeida">José João Almeida</a> e a quem
            partilhou estas palavras.
          </span>
        </div>
        <div>
          <h3>Explorar o léxico</h3>
          <a href="/dicionario">Dicionário de A a Z</a>
          <a href="/em-alta">Em alta: consultas & pesquisas</a>
          <a href="/dicionario?kind=expression">Expressões populares</a>
          <a href="/regioes">Regiões & falares</a>
          <a href="/conjugar">Conjugação verbal</a>
        </div>
        <div>
          <h3>Um projeto vivo</h3>
          <a href="/sobre">Sobre o Léxico Vivo</a>
          <a href="/sobre#jose-joao-almeida">O autor & a recolha original</a>
          <a href="/sobre#metodologia">Critérios editoriais</a>
          <a href="/api">API & dados</a>
        </div>
        <div className="footer-note">
          <BookOpenText size={28} strokeWidth={1.4} />
          <p>
            Preservar a oralidade.
            <br />
            Dar futuro à memória.
          </p>
          <a href="/sobre#participar">
            Faz parte desta história <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getUTCFullYear()} Léxico Vivo · Património da língua portuguesa</span>
        <a href="/sobre#privacidade">Privacidade</a>
        <a href="/sobre#fontes">Fontes & atribuição</a>
      </div>
    </footer>
  );
}

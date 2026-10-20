import { Brand } from './brand';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-simple">
        <Brand />
        <nav aria-label="Informação do projeto">
          <a href="/sobre">O projeto</a>
          <a href="/sobre#fontes">Fontes e atribuição</a>
          <a href="/api">API</a>
          <a href="/sobre/privacidade">Privacidade</a>
        </nav>
        <span>© {new Date().getUTCFullYear()} Léxico Vivo</span>
      </div>
    </footer>
  );
}

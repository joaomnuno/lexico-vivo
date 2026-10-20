import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'API & dados' };
export default function ApiDocs() {
  return (
    <div className="container api-page">
      <div className="page-intro">
        <span className="eyebrow">Para quem constrói com palavras</span>
        <h1>O léxico, também em dados.</h1>
        <p>
          API de leitura em JSON. Sem chave de acesso. Resultados paginados e referências à fonte.
        </p>
      </div>
      <div className="prose">
        <h2>Pesquisar no dicionário</h2>
        <pre>GET /api/search?q=desenras&amp;limit=5</pre>
        <p>
          Parâmetros: <code>q</code> (até 120 caracteres), <code>mode=definitions</code>,{' '}
          <code>letter</code>, <code>region</code>, <code>kind=word|expression</code>,{' '}
          <code>register</code>, <code>page</code> e <code>limit</code> (1–50). A resposta inclui{' '}
          <code>entries</code>, <code>total</code>, <code>page</code>, <code>pages</code> e{' '}
          <code>approximate</code>. Os operadores * e ? substituem sequências e letras.
        </p>
        <p>
          <a href="/api/search?q=desenras&limit=5">Experimentar esta pesquisa</a>
        </p>
        <h2>Consultar um verbete</h2>
        <pre>GET /api/entries/estar-com-os-azeites</pre>
        <p>
          Devolve o verbete com definições, sinónimos, campos originais, secções e páginas da fonte.
          Um verbete inexistente devolve HTTP 404.
        </p>
        <p>
          <a href="/api/entries/estar-com-os-azeites">Consultar exemplo de verbete</a>
        </p>
        <h2>Reutilização responsável</h2>
        <p>
          Os materiais fornecidos não confirmam a licença do corpus original. O acesso técnico não
          concede direitos de redistribuição. Consulta as{' '}
          <a href="/sobre#fontes">fontes e condições de atribuição</a> antes de reutilizar o
          conteúdo.
        </p>
        <p>
          As sugestões da comunidade ficam numa fila privada e não são expostas por esta API. Guarda
          resultados em cache e evita pedidos desnecessários.
        </p>
      </div>
    </div>
  );
}

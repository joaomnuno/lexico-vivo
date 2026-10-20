import type { Metadata } from 'next';
import { Contribution } from '../../components/interactive';
import { stats, formatNumber } from '../../lib/dictionary';
export const metadata: Metadata = { title: 'José João Almeida, a recolha e o projeto' };
export const dynamic = 'force-dynamic';
export default async function About() {
  const numbers = await stats();
  return (
    <div className="container about-page">
      <div className="page-intro">
        <h1>Sobre o Léxico Vivo</h1>
        <p>Uma nova forma de consultar a recolha de José João Almeida.</p>
      </div>
      <div className="about-grid">
        <aside className="about-nav">
          <a href="#jose-joao-almeida">José João Almeida</a>
          <a href="#origem">A recolha original</a>
          <a href="#metodologia">Critérios editoriais</a>
          <a href="#participar">Como participar</a>
          <a href="#fontes">Fontes & atribuição</a>
          <a href="/sobre/privacidade">Privacidade & dados</a>
        </aside>
        <div className="prose">
          <section id="jose-joao-almeida">
            <h2>José João Almeida</h2>
            <p>
              O Léxico Vivo apresenta a recolha de <strong>José João Almeida</strong>, autor do{' '}
              <a href="https://natura.di.uminho.pt/~jj/pln/calao/dicionario.html">
                Dicionário aberto de calão e expressões idiomáticas
              </a>
              , numa interface dedicada à pesquisa e descoberta de palavras.
            </p>
            <p>
              Professor de Computação na Universidade do Minho e investigador do Centro ALGORITMI,
              cruza o estudo da linguagem com a informática. É o fundador do{' '}
              <a href="https://natura.di.uminho.pt/wiki/doku.php?id=ProjectoNatura">
                Projeto Natura
              </a>
              , dedicado ao processamento da linguagem natural e à criação de recursos para a língua
              portuguesa. O seu percurso inclui também o desenvolvimento do Jspell, com Ulisses
              Pinto, para a análise e correção de palavras em português.
            </p>
            <p>
              Numa{' '}
              <a href="https://algoritmi.uminho.pt/news/dicionario-aberto-de-calao-e-expressoes-idiomaticas-de-jose-joao-almeida/">
                notícia de maio de 2024
              </a>
              , o Centro ALGORITMI descreve uma recolha feita ao longo de 30 anos e disponibilizada
              gratuitamente na Internet, com significados, exemplos, variantes e lugares de uso.
            </p>
            <blockquote cite="https://natura.di.uminho.pt/~jj/pln/calao/dicionario.pdf#page=2">
              “Apela-se no entanto ao leitor que seja criativo, fraterno e inclusivo mas nunca
              indiferente.”
              <cite>José João Almeida · introdução ao dicionário, página 2</cite>
            </blockquote>
          </section>
          <section id="origem">
            <h2>A recolha original</h2>
            <p>
              Na introdução, o autor apresenta o dicionário como uma coleção amadora, construída com
              a colaboração de vários informantes. A segunda página agradece a uma longa lista de
              pessoas que contribuíram com palavras e expressões.
            </p>
            <p>
              O original junta linguística, linguagens de programação e Perl, usando DPL, uma
              linguagem de programação de dicionários do Projeto Natura. Num{' '}
              <a href="https://natura.di.uminho.pt/~jj/dac.html">texto de setembro de 1999</a>, José
              João Almeida e Pedro Rangel Henriques já descreviam um dicionário consultável e
              extensível pela Internet: útil mesmo quando incompleto, sempre aberto a novas
              contribuições.
            </p>
            <p>
              A edição que serve de base a este site tem 301 páginas e está datada de 7 de outubro
              de 2026. Conservamos os {formatNumber(numbers.total)} registos extraídos e as
              referências às páginas da fonte. O crédito pelo trabalho original pertence ao autor e
              aos seus colaboradores.
            </p>
          </section>
          <section id="metodologia">
            <h2>Critérios editoriais</h2>
            <p>
              As definições, os exemplos, os sinónimos, as marcas de registo e as indicações
              regionais são preservados como foram extraídos. Algumas grafias, divisões de sentidos
              ou quebras de linha podem precisar de revisão.
            </p>
            <ul>
              <li>
                <strong>Sem preencher silêncios:</strong>{' '}
                {formatNumber(numbers.total - numbers.defined)} registos não têm definição na fonte.
                Esses verbetes são identificados e podem receber sugestões.
              </li>
              <li>
                <strong>Sem inventar geografia:</strong> os rótulos regionais provêm do campo de
                localização. O agrupamento por região é uma ajuda de navegação, não um mapa
                exaustivo do uso.
              </li>
              <li>
                <strong>Sinónimos com contexto:</strong> a fonte associa sinónimos ao verbete; nem
                sempre os distingue por aceção.
              </li>
              <li>
                <strong>Origem e uso:</strong> hipóteses de etimologia popular são identificadas
                como não verificadas. Registar uma expressão não significa endossar o seu uso.
              </li>
              <li>
                <strong>Leitura acessível:</strong> o áudio é sintetizado. Não é uma gravação de
                falantes nativos nem uma transcrição fonética validada. Quando o serviço de áudio
                está ativo, são reproduzidos ficheiros de voz sintetizada em PT-PT ou PT-BR. Sem
                esse serviço, a leitura usa uma voz da variante escolhida disponível no navegador.
              </li>
              <li>
                <strong>Grafia fiel:</strong> não convertemos automaticamente entre normas
                ortográficas. PT-PT e PT-BR no leitor mudam apenas a voz.
              </li>
            </ul>
          </section>
          <section id="participar">
            <h2>Como participar</h2>
            <p>
              Conheces uma expressão que falta? Um significado diferente? Um uso na tua região?
              Envia uma sugestão com uma definição e, se possível, um exemplo.
            </p>
            <p>
              As sugestões ficam numa fila privada de revisão editorial. Só passam para o dicionário
              depois de aprovadas. Não existe publicação automática de contribuições.
            </p>
            <Contribution />
          </section>
          <section id="fontes">
            <h2>Fontes & atribuição</h2>
            <p>
              José João Almeida, <em>Dicionário aberto de calão e expressões idiomáticas</em>,
              edição de 7 de outubro de 2026, 301 páginas. Autoria e introdução confirmadas no PDF
              original fornecido ao projeto, páginas 1–2.
            </p>
            <p>
              Consulta o{' '}
              <a href="https://natura.di.uminho.pt/~jj/pln/calao/dicionario.html">
                dicionário no site do autor
              </a>
              , a <a href="https://natura.di.uminho.pt/~jj/">sua página académica</a> e os{' '}
              <a href="https://natura.di.uminho.pt/wiki/doku.php?id=dicionarios%3Amain">
                créditos do Jspell
              </a>
              .
            </p>
            <p>
              O objetivo é facilitar a consulta e a investigação. A licença CC BY-SA proposta no
              protótipo não está confirmada para o corpus. Antes de reutilizar ou redistribuir o
              conteúdo, confirma os direitos com os titulares da recolha original.
            </p>
            <p>
              Ícones: <a href="https://lucide.dev">Lucide</a> (ISC). Tipos de letra: Merriweather e
              Plus Jakarta Sans (SIL Open Font License), servidos localmente.
            </p>
            <p>
              <a href="/api">Consultar a documentação da API de leitura.</a>
            </p>
          </section>
          <section id="privacidade">
            <h2>Privacidade</h2>
            <p>
              Explicamos o que fica neste navegador, como contamos as consultas e o que acontece aos
              teus votos e contribuições.
            </p>
            <p>
              <a href="/sobre/privacidade">Como são tratados os meus dados?</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import { Contribution } from '../../components/interactive';
import { stats, formatNumber } from '../../lib/dictionary';
export const metadata: Metadata = { title: 'José João Almeida, a recolha e o projeto' };
export const dynamic = 'force-dynamic';
export default async function About() {
  const numbers = await stats();
  return (
    <div className="container about-page">
      <div className="page-intro">
        <span className="eyebrow">
          <BookOpenText size={16} /> Sobre o Léxico Vivo
        </span>
        <h1>
          Guardar o que dizemos.
          <br />
          Preservar o que somos.
        </h1>
        <p>As palavras do dia a dia também merecem um lugar na memória.</p>
      </div>
      <div className="about-grid">
        <aside className="about-nav">
          <a href="#jose-joao-almeida">José João Almeida</a>
          <a href="#origem">A recolha original</a>
          <a href="#metodologia">Critérios editoriais</a>
          <a href="#participar">Como participar</a>
          <a href="#fontes">Fontes & atribuição</a>
          <a href="#privacidade">Privacidade</a>
        </aside>
        <div className="prose">
          <section id="jose-joao-almeida">
            <span className="eyebrow">Com admiração e gratidão</span>
            <h2>
              José João Almeida,
              <br />a curiosidade por trás das palavras.
            </h2>
            <p>
              Há um trabalho de escuta por trás de cada expressão que aqui encontras. A recolha que
              dá origem ao Léxico Vivo é de <strong>José João Almeida</strong>, autor do{' '}
              <a href="https://natura.di.uminho.pt/~jj/pln/calao/dicionario.html">
                Dicionário aberto de calão e expressões idiomáticas
              </a>
              . O seu nome está na primeira página do original; merece também um lugar de destaque
              nesta nova casa das palavras.
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
              gratuitamente na Internet. É um trabalho paciente de guardar significados, exemplos,
              variantes e lugares de uso, com espaço para o humor e para as expressões menos
              cerimoniosas do português.
            </p>
            <blockquote cite="https://natura.di.uminho.pt/~jj/pln/calao/dicionario.pdf#page=2">
              “Apela-se no entanto ao leitor que seja criativo, fraterno e inclusivo mas nunca
              indiferente.”
              <cite>José João Almeida · introdução ao dicionário, página 2</cite>
            </blockquote>
            <p>
              Obrigado, José João Almeida, por olhar para a fala de todos os dias com esta
              curiosidade, por a guardar e por a partilhar. O Léxico Vivo procura dar continuidade a
              esse gesto: facilitar o encontro com as palavras, mantendo visível quem as reuniu.
            </p>
          </section>
          <section id="origem">
            <h2>Uma recolha aberta a muitas vozes.</h2>
            <p>
              Na introdução, o autor apresenta o dicionário como uma coleção amadora, construída com
              a colaboração de vários informantes. A segunda página agradece a uma longa lista de
              pessoas que contribuíram com palavras e expressões. O nosso agradecimento estende-se a
              todas elas: esta memória da língua é também feita dessas partilhas.
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
              referências às páginas da fonte. Esta interface é uma nova forma de consultar a
              recolha; o crédito pelo trabalho original pertence ao seu autor e aos seus
              colaboradores.
            </p>
          </section>
          <section id="metodologia">
            <h2>Respeitar a fonte. Dar contexto à língua.</h2>
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
                <strong>Leitura acessível:</strong> o áudio usa a síntese de voz do navegador. Não é
                uma gravação de falantes nativos nem uma transcrição fonética validada.
              </li>
              <li>
                <strong>Grafia fiel:</strong> não convertemos automaticamente entre normas
                ortográficas. PT-PT e PT-BR no leitor mudam apenas a voz.
              </li>
            </ul>
          </section>
          <section id="participar">
            <h2>Uma língua nunca está acabada.</h2>
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
              original fornecido ao projeto, páginas 1–2. Os verbetes foram extraídos das páginas
              3–301 para <code>dicionario.json</code>.
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
              A conjugação usa a biblioteca{' '}
              <a href="https://github.com/ablaut-dev/ablaut">ablaut</a> (MIT/Apache-2.0). Ícones:{' '}
              <a href="https://lucide.dev">Lucide</a> (ISC). Tipos de letra: Merriweather e Plus
              Jakarta Sans (SIL Open Font License), servidos localmente.
            </p>
            <p>
              <a href="/api">Consultar a documentação da API de leitura.</a>
            </p>
          </section>
          <section id="privacidade">
            <h2>Privacidade, sem complicar.</h2>
            <p>
              Os teus guardados ficam no armazenamento local deste navegador. Podes removê-los a
              qualquer momento pelo marcador do verbete ou apagando os dados do site. Não são
              sincronizados entre dispositivos.
            </p>
            <p>
              Quando votas ou envias uma sugestão, um identificador aleatório é guardado num cookie
              durante um ano para evitar votos repetidos e limitar submissões. Não usamos esse
              identificador para publicidade.
            </p>
            <p>
              As sugestões conservam o texto enviado, o nome opcional, a região opcional, a data e
              esse identificador. Não envies informações pessoais ou sensíveis nos exemplos. Não
              usamos análise de tráfego nem cookies publicitários na aplicação.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

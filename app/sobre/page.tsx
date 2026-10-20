import type { Metadata } from 'next';
import { BookOpenText } from 'lucide-react';
import { Contribution } from '../../components/interactive';
import { stats, formatNumber } from '../../lib/dictionary';
export const metadata: Metadata = { title: 'O projeto, a recolha e os critérios editoriais' };
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
          <a href="#origem">A recolha original</a>
          <a href="#metodologia">Critérios editoriais</a>
          <a href="#participar">Como participar</a>
          <a href="#fontes">Fontes & atribuição</a>
          <a href="#privacidade">Privacidade</a>
        </aside>
        <div className="prose">
          <section id="origem">
            <h2>Um dicionário começa por escutar.</h2>
            <p>
              O Léxico Vivo dá uma casa digital a uma recolha de calão e expressões populares da
              língua portuguesa. Um espaço para descobrir os sentidos que circulam nas ruas, nos
              cafés, nas aldeias e entre gerações.
            </p>
            <p>
              A base inicial foi importada de uma extração estruturada de um dicionário de 301
              páginas, identificado nos materiais fornecidos como dicionário Natura. Conservamos os{' '}
              {formatNumber(numbers.total)} registos e as referências às páginas da fonte.
            </p>
            <blockquote>
              Às pessoas que recolheram, anotaram e preservaram estas palavras: este projeto existe
              graças a esse trabalho.
            </blockquote>
            <p>
              Os materiais disponíveis não permitem confirmar a identidade do autor, a história
              editorial ou a licença do documento original. A biografia e o retrato sugeridos no
              protótipo não são apresentados como factos históricos.
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
              Fonte do corpus: <code>dicionario.json</code>, extraído de <code>dicionario.pdf</code>
              , páginas 3–301. O registo detalhado de cada verbete preserva os campos e a ordem das
              secções disponíveis.
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

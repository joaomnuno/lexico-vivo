import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = { title: 'Como tratamos os teus dados' };
export default function Privacy() {
  return (
    <div className="container about-page api-page">
      <div className="page-intro">
        <a className="text-link" href="/sobre">
          <ArrowLeft size={14} /> O projeto
        </a>
        <span className="eyebrow">
          <ShieldCheck size={16} /> Privacidade
        </span>
        <h1>Como tratamos os teus dados.</h1>
        <p>O que guardamos, para que serve e o que aparece publicamente no Léxico Vivo.</p>
      </div>
      <div className="prose">
        <section>
          <h2>Os teus guardados ficam contigo.</h2>
          <p>
            As palavras guardadas ficam no armazenamento local deste navegador. Podes removê-las
            pelo marcador do verbete ou apagando os dados do site. Não são enviadas para o servidor
            nem sincronizadas entre dispositivos.
          </p>
        </section>
        <section>
          <h2>O que contamos em Em alta.</h2>
          <p>
            Contamos uma consulta por navegador, verbete e dia. Uma pesquisa conta quando abre um
            verbete a partir das sugestões ou dos resultados. Recarregar a página não acrescenta
            outra consulta desse verbete no mesmo dia.
          </p>
          <p>
            Os totais apresentados são agregados: não mostramos quem consultou, nem guardamos o
            texto livre das pesquisas. Registamos apenas o verbete publicado que foi aberto, o tipo
            de atividade, a data e um identificador aleatório do navegador.
          </p>
          <p>
            Os períodos seguem a data UTC. Os resultados atualizam-se ao abrir a página. Os registos
            de atividade com mais de 30 dias são apagados quando chegam novas consultas.
          </p>
        </section>
        <section>
          <h2>Um identificador para evitar repetições.</h2>
          <p>
            Quando consultas um verbete, votas ou envias uma sugestão, guardamos um identificador
            aleatório num cookie durante um ano. Serve para evitar consultas e votos repetidos,
            permitir alterar ou retirar o teu voto e limitar submissões. Não é usado para
            publicidade.
          </p>
        </section>
        <section>
          <h2>Votos e contribuições.</h2>
          <p>
            Podes votar Sim ou Não e retirar o teu voto no próprio verbete. Os totais são públicos;
            o identificador associado ao voto não é apresentado.
          </p>
          <p>
            As sugestões conservam o texto enviado, o nome opcional, a região opcional, a data e o
            identificador do navegador. Ficam numa fila privada de revisão antes de serem
            publicadas. Não envies informações pessoais ou sensíveis nos exemplos.
          </p>
        </section>
        <section>
          <h2>Leitura em voz alta.</h2>
          <p>
            Quando o serviço de áudio está ativo, o texto do verbete é enviado ao Microsoft Azure
            Speech para gerar a leitura. O ficheiro resultante fica guardado para as reproduções
            seguintes. Sem esse serviço, a leitura usa a síntese de voz disponível no navegador.
          </p>
        </section>
        <section>
          <h2>Sem publicidade nem análise externa de tráfego.</h2>
          <p>
            A aplicação não usa cookies publicitários nem serviços externos de análise de tráfego. A
            secção Em alta usa os registos de consultas descritos nesta página.
          </p>
        </section>
      </div>
    </div>
  );
}

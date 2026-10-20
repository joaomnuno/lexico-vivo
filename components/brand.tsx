import { BookOpenText, MessageCircle } from 'lucide-react';
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Léxico Vivo, página inicial">
      <span className="brand-mark">
        <BookOpenText size={34} strokeWidth={1.6} />
        <MessageCircle size={15} strokeWidth={2} />
      </span>
      <span>
        <span className="brand-name">
          Léxico Vivo<span className="open-tag">aberto</span>
        </span>
        <span className="brand-caption">A língua de todos, nas palavras de cada um.</span>
      </span>
    </a>
  );
}

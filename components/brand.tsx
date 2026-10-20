import { BookOpenText } from 'lucide-react';
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Léxico Vivo, página inicial">
      <span className="brand-symbol" aria-hidden="true">
        <BookOpenText size={25} strokeWidth={1.6} />
      </span>
      <span className="brand-name">Léxico Vivo</span>
    </a>
  );
}

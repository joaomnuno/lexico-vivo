export function PageHero({
  variant,
  eyebrow,
  title,
  description,
}: {
  variant: 'regions' | 'hot' | 'about';
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className={`editorial-hero editorial-hero-${variant}`}>
      <div className="container">
        <div className="page-intro">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

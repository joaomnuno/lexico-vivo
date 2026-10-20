# Editorial direction

Illustration art direction and the reusable master prompt are in [visual-style-guide.md](visual-style-guide.md). The original generation prompts, reference mappings, and asset dimensions are recorded in [image-prompts.md](image-prompts.md).

The October 2026 refresh puts dictionary lookup first and reduces repeated project messaging.

## References reviewed

- [Priberam](https://dicionario.priberam.org/): prominent lookup and direct access to frequently searched words.
- [Dicio](https://www.dicio.com.br/): compact word-of-the-day and discovery sections.
- [Infopédia](https://www.infopedia.pt/): clear separation between dictionary tools and editorial material.

These informed the information hierarchy; Léxico Vivo retains its own warm paper, espresso and caramel palette, Merriweather headings, and locally served Plus Jakarta Sans interface.

## Conventions

- One main search per page. Home and dictionary pages have their own; other pages use the header. Ctrl/Cmd+K focuses it.
- Functional page titles; reserve the brand's conversational voice for the homepage.
- Cards preview a definition. Full examples, pronunciation, source fields and related meanings belong in the entry reader.
- Navigation covers distinct destinations. Expression type and register remain dictionary filters.
- Use short, descriptive section headings without a second slogan above each one.
- Keep source attribution visible and link to the full biography and editorial policy.
- Base colors and components live in `app/globals.css`; the shared botanical layout, navigation, and editorial pages live in `app/editorial.css`; homepage composition lives in `app/home.css`.
- Every route shares the compact desktop navigation. Pages without their own search retain a compact header search; narrower screens stack search and navigation without hiding either.
- Regiões, Em alta, and O projeto use the shared `PageHero` composition with botanical artwork and live HTML text. The village and desk illustrations are decorative, not documentary images.
- The daily discovery uses “Uma palavra puxa outra” and “A descoberta de hoje”, with a feather and layered paper styling instead of a colored top border.

Updated desktop and mobile captures are in `docs/screenshots/`.

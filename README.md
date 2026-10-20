# Léxico Vivo

A Portuguese slang and idiom dictionary built with **vinext**, React, Prisma, and SQLite. The supplied editorial references guide the parchment, espresso, and caramel palette, Merriweather headings, and Plus Jakarta Sans interface. Fonts are served locally.

## Run locally

Requires Node.js 24 and npm. SQLite is local; no database server or external API key is required.

```sh
npm ci
cp .env.example .env
npm run db:prepare
npm run dev
```

Open http://localhost:3000. For production locally, run `npm run build` followed by `npm start`. Set `PORT` to change the production port.

## Features

- All 7,241 supplied source records, with duplicate headwords assigned distinct URLs.
- Accent-insensitive search, Fuse.js typo suggestions, keyboard autocomplete, Ctrl/Cmd+K, definition search, `*` and `?` wildcards, pagination, and combined region/register/type/A–Z filters. Wildcards use RE2JS to avoid regex backtracking.
- Definitions, source examples, linked synonyms, antonyms, original regional labels, etymology and English equivalents where present. Every remaining source field is available too.
- Previous/next entries, date-based expression of the day, curated discovery, regional browsing, share links, print layout, and browser-local saved entries.
- Optional [hosted MP3 pronunciation](docs/AUDIO.md) uses Azure Speech with dedicated PT-PT/PT-BR voices and persistent caching. Without credentials, browser speech synthesis explicitly selects a voice matching PT-PT or PT-BR. If that exact variant is unavailable on the device, the player explains this instead of silently substituting another accent. This changes speech only, not the corpus spelling.
- Persistent Yes/No community usage votes, a remove-vote control, and a private contribution queue with editorial approval through a CLI. Votes are deduplicated per browser identifier; submissions are limited to five per identifier per day. These are lightweight abuse controls, not identity verification.
- **Em alta** ranks real entry views and searches that open entries, with separate 1/7/30-day views. Each browser/entry/day is counted once per activity type. Only published dictionary terms appear; raw queries and visitor identities are not exposed. Records older than 30 days are purged on subsequent activity. Set `ACTIVITY_TRACKING=false` to disable automatic tracking in a preview.
- Public paginated JSON search/entry API, health endpoint, sitemap, robots.txt, entry metadata, and DefinedTerm structured data.
- Responsive layouts, semantic HTML, keyboard navigation, focus states, native modal dialogs, reduced-motion support, and automated accessibility checks.

## Source fidelity and limits

The archives are fully unpacked in `references/` and `data/`. Commit `fbdd0c0` preserves the starting materials before application development.

The supplied parser reports 948 entries without definitions. Those entries remain visible and explicitly incomplete. All original definitions, fields, ordered sections and PDF page references are imported. Physical extraction lines remain in `data/dicionario.json`; the application links to the structured record for each entry.

This is a dictionary of the supplied slang/idiom corpus. It does not contain Priberam's general-language corpus, its translation service, native pronunciation recordings, validated IPA, syllabification, or automatic conversion between spelling standards. It implements comparable lookup and reading tools where source data supports them. Popularity is based on actual recorded visits and search selections; empty rankings stay empty until activity arrives. No fake counts or regional distribution are displayed.

The original PDF is preserved at `references/dicionario.pdf`. Its title page credits **José João Almeida** and dates this edition to 7 October 2026. Page 2 describes the collaborative collection and credits its contributors. The site credits Almeida on the landing page, in the project biography, and on original dictionary entries. Academic sources and the original dictionary are linked from the biography. See [source notes](docs/SOURCES.md).

The prototype's attribution to Alberto P. de Vasconcelos was unsupported and is not used. Its generated portrait remains a reference asset, not an authenticated photograph. The prototype's CC BY-SA corpus licence is not established by the supplied PDF; confirm the applicable original terms before redistribution.

## Editorial review

```sh
npm run moderate -- list
npm run moderate -- approve CONTRIBUTION_ID
npm run moderate -- reject CONTRIBUTION_ID
```

Run these on the host against the same `DATABASE_URL`, or inside the application container. Approval is transactional. A new expression creates a separate entry; an approved correction updates the definition and only supplied example/region fields, preserving the other source metadata and original sections. Reviewed entries are labelled accordingly. Rejected or previously reviewed items cannot be approved again. The read cache refreshes within 60 seconds.

The queue is never exposed through the public API. Back up SQLite before editorial work. `npm run db:seed` explicitly reimports the original corpus and overwrites changes to source entries; normal startup only seeds an empty database.

## Coolify and Coolship

See [deployment instructions](docs/DEPLOYMENT.md). The Docker image runs as the `node` user on port 3000. Startup applies committed Prisma migrations and imports the corpus only when the database is empty. Mount `/app/storage` persistently so contributions, votes and reviewed entries survive deployments.

```sh
docker compose up --build -d
```

The database lives in the named `lexico-data` volume. Keep a single application replica with this SQLite deployment.

## Verification

```sh
npm run check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Tests additionally cover activity deduplication and hosted-audio caching. Tests check the entire import against the original JSON, accents and typo search, wildcard and definition lookup, filters and pagination, keyboard autocomplete, persistent saves, duplicate voting, private submissions, missing routes, sitemap/robots, desktop/mobile overflow, and automated WCAG AA rules. Browser tests require a prepared database and production build. They remove their own contributions and votes. Screenshots are in `docs/screenshots/`.

## Dependencies

The lockfile pins the complete dependency graph. The `fflate` override replaces a vulnerable transitive version used by vinext's optional OG tooling. At implementation time, `npm audit` still reports six high-severity transitive findings from `braces` through vinext's CommonJS build plugin. No patched `braces` release is available; npm's suggested fix downgrades vinext to 0.2.1 and is deliberately not applied. These packages process project build patterns; the dictionary's public wildcard input uses RE2JS instead. Recheck upstream updates before deployment.

# Verification

Verified on 20 October 2026 with Node.js 24, the locked dependencies, and Chromium.

- `npm run check`: passed, including unused import/parameter checks.
- `npm test`: 3 tests passed. Import checks compare all 7,241 records with source definitions, fields, ordered sections and page references; search checks cover accents, typos, wildcard safety, multiple definition terms, regional filters, and pagination; conjugation checks include irregular verbs and European Portuguese accents.
- `npm run build`: passed with vinext 1.2.1 and Vite 8.3.4.
- `npm run test:e2e`: 5 tests passed. Covers keyboard search, saved words across reloads, filters, source references, conjugation, 404s, sitemap/robots, voting without duplicate rows, and contributions remaining pending/private.
- Viewport checks: no horizontal overflow at 1440px and 390px for landing, dictionary entry, results, regions, conjugation and project pages. Full-page screenshots accompany this document.
- Axe: no violations of the selected WCAG 2 A/AA and WCAG 2.1 AA rules across landing, entry, dictionary, conjugation, project, region, API documentation and saved-word pages. Automated checks do not constitute a complete accessibility audit.
- Docker: image builds successfully. Fresh named volume runs committed Prisma migration, imports 7,241 entries and reaches a healthy state as the non-root `node` user. Production dictionary and WebAssembly conjugation routes return HTTP 200.
- Editorial CLI: created a pending suggestion in the isolated Docker database, approved it transactionally, and verified the new entry, source label and regional classification. Entry count becomes 7,242 only in that test volume.
- Persistence: the approved entry survives both container restart and replacement with the rebuilt image while reusing the named volume. Startup does not reimport or overwrite the database.
- Runtime origin: setting `NEXT_PUBLIC_SITE_URL` in the container produces sitemap URLs with that origin.

Temporary container and volume are removed after verification. Repository database remains the original 7,241-entry corpus. No remote resource was created, no Git commits were pushed, and no public deployment was performed.

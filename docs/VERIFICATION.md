# Verification

Verified on 20 October 2026 with Node.js 24, the locked dependencies, and Chromium.

- `npm run check`: passed, including unused import/parameter checks.
- `npm test`: 4 tests passed. Activity checks cover real aggregation and per-reader/day deduplication; hosted-audio tests verify exact voices, escaping, request deduplication, cache persistence and provider failure handling. Import checks compare all 7,241 records with source definitions, fields, ordered sections and page references; search checks cover accents, typos, wildcard safety, multiple definition terms, regional filters, and pagination.
- `npm run build`: passed with vinext 1.2.1 and Vite 8.3.4.
- `npm run test:e2e`: 7 tests passed. Voice fallback, Yes/No vote changes/removal across reloads, and public activity aggregates are included. Covers keyboard search, saved words across reloads, filters, source references, 404s, sitemap/robots, voting without duplicate rows, and contributions remaining pending/private.
- Viewport checks: no horizontal overflow at 1440px and 390px for landing, dictionary entry, results, regions, Em alta and project pages. Full-page screenshots accompany this document.
- Axe: no violations of the selected WCAG 2 A/AA and WCAG 2.1 AA rules across landing, entry, dictionary, project, region, API documentation, saved-word and Em alta pages. Automated checks do not constitute a complete accessibility audit.
- Docker: image builds successfully. Fresh named volume runs committed Prisma migration, imports 7,241 entries and reaches a healthy state as the non-root `node` user. The production dictionary route returns HTTP 200.
- Editorial CLI: created a pending suggestion in the isolated Docker database, approved it transactionally, and verified the new entry, source label and regional classification. Entry count becomes 7,242 only in that test volume.
- Persistence: the approved entry survives both container restart and replacement with the rebuilt image while reusing the named volume. Startup does not reimport or overwrite the database.
- Runtime origin: setting `NEXT_PUBLIC_SITE_URL` in the container produces sitemap URLs with that origin.

Temporary container and volume are removed after verification. Repository database remains the original 7,241-entry corpus. No remote resource was created, no Git commits were pushed, and no public deployment was performed.

Hosted playback was also checked against a separate server configured with a dummy key, with the browser Audio constructor mocked: both PT-PT and PT-BR request the correct MP3 route without browser speech synthesis. No real provider request was made. Live audio generation and accent quality require a valid Azure resource and remain unverified.

The updated Docker image also passed a fresh-volume check with both committed migrations. In the isolated container, opening a search result records one search and one view, reloading leaves the count unchanged, and a separate browser adds a second view. The search attribution parameter is removed from the visible URL after recording. A mocked-provider MP3 was written to the persistent audio directory as the non-root user and served by the real audio route. Activity and audio cache survival were checked across container restart; these test-only records and bytes are removed with that volume.

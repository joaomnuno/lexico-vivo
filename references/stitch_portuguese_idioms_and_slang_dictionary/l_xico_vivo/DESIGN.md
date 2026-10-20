---
name: Léxico Vivo
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#4f4440'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#81746f'
  outline-variant: '#d3c3bd'
  surface-tint: '#72594e'
  primary: '#24130b'
  on-primary: '#ffffff'
  primary-container: '#3b271e'
  on-primary-container: '#aa8d80'
  inverse-primary: '#e0c0b2'
  secondary: '#8d4f12'
  on-secondary: '#ffffff'
  secondary-container: '#feac68'
  on-secondary-container: '#773e00'
  tertiary: '#300b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#521900'
  on-tertiary-container: '#db784f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fedbcd'
  primary-fixed-dim: '#e0c0b2'
  on-primary-fixed: '#29170f'
  on-primary-fixed-variant: '#594238'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77e'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb598'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7b2f0a'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display-hero:
    fontFamily: Merriweather
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Merriweather
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headword-lg:
    fontFamily: Merriweather
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.015em
  headword-lg-mobile:
    fontFamily: Merriweather
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headword-md:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  definition-body:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  definition-body-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 28px
  example-quote:
    fontFamily: Merriweather
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  phonetic-guide:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0.02em
  register-tag:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  meta-caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  ui-control:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
---

## Brand & Style

This design system establishes a bridge between the authoritative gravitas of Portuguese archival lexicography (Priberam, Porto Editora, Infopédia) and the living, kinetic spirit of modern colloquial speech. It treats street parlance, regionalisms, and idiomatic vernacular with the same rigorous typographics and structural dignity historically reserved for canonical literature.

### Design Movement & Aesthetic
- **Contemporary Literary Editorial with Tactile Warmth:** Blends classical European typesetting disciplines with the swift utility of modern reference software.
- **Tone:** Authoritative yet non-judgmental, warm, culturally inquisitive, and effortlessly legible.
- **Atmosphere:** Digital parchment illuminated by warm ambient light. It rejects sterile clinical grays and stark monochrome contrasts in favor of steeped, organic earth tones (espresso, roasted caramel, baked terracotta, and unbleached linen).

## Colors

The palette draws directly from Portuguese bookbinding materials, terracotta roof tiles, and roasted café culture, structured to maximize reading endurance and semantic clarity.

### Functional Roles & Hierarchy
- **Base Canvas (`#FBF8F3`):** Unbleached warm linen parchment. Mitigates eye fatigue across extended reading sessions while retaining warmth.
- **Surface Layer 2 (`#F4EFE6`):** Deepened paper tint used for search bars, definition cards, etymological inset wells, and metadata containers.
- **Surface Border (`#E5DBD0`):** Soft stone hairline dividers that organize complex dictionary entries without visual congestion.
- **Primary Ink (`#211C1A`):** Deep roasted walnut for all primary textual definitions and phonetic transcriptions. Softer on the eye than pure `#000000`.
- **Secondary Ink / Metadata (`#6E5D53`):** Muted umber for grammar classes, etymological roots, and phonetic keys.
- **Brand / Espresso Anchor (`#3B271E`):** Deep espresso brown for structural headwords, primary navigation, and prominent branding anchors.
- **Accent / Warm Caramel (`#C67D3E`):** Interactive trigger color for text selections, primary buttons, audio pronunciation buttons, and active filter states.
- **Accent / Terracotta (`#B85D36`):** Dedicated tag color for vulgarity registers, sensitive colloquial markers, and alerts.

## Typography

The typographical pairing sets a deliberate dialog between timeless lexicography and modern digital ergonomics:
- **Headlines & Literary Citations (`Merriweather`):** Selected for its sturdy serifs, warm curves, and exceptional readability at both display scale and small italicized quotation blocks. Slang headwords command real presence, treated with academic respect.
- **Body, Metas, & UI Controls (`Plus Jakarta Sans`):** A friendly, geometrically disciplined sans-serif with open apertures that prevents dense lexicographical lists from feeling cramped or intimidating.

### Formatting Conventions
- **Headwords:** Merriweather Bold, always set in lower-case or capitalized root forms with natural kerning.
- **Grammar & Word Class:** Set in italicized muted umber immediately following the headword (e.g., *loc. adj.*, *v. tr.*, *s. m.*).
- **Phonetics:** Enclosed in square brackets `[ ... ]` using medium weight `phonetic-guide` styling.
- **Quotations:** Formatted in Merriweather Italic, set within a left-bordered blockquote, offset by warm caramel vertical rules.

## Layout & Spacing

The structural layout relies on an asymmetric editorial reading grid inspired by multi-volume reference encyclopedias.

### Grid & Breakpoints
- **Desktop (1024px and above):** 12-column grid. Max-width canvas of 1280px centered. Dictionary entries occupy an 8-column main reader track, while a sticky 4-column sidebar carries regional distribution, linguistic frequency, and curated "Expressão do Dia" widgets.
- **Tablet (768px - 1023px):** 8-column grid with a fluid responsive collapse; supplementary widgets fold underneath the primary entry block.
- **Mobile (below 768px):** Single-column stack with `1rem` outer margins. Filter pills and phonetic triggers convert into horizontal swipe rails.

### Reading Rhythm
- Vertical spacing adheres to an 8px base rhythm.
- Definitions use generous `lineHeight` (28px) combined with `space-md` (16px) separation between individual numbered sub-senses, ensuring zero confusion when navigating polysemic words with multiple vulgar or figurative definitions.

## Elevation & Depth

To reflect the tactile materiality of books, archival paper, and scholarly journals, this design system avoids synthetic drop shadows, harsh black tints, and glassy blurs.

### Depth Hierarchy
- **Level 0 (Parchment Foundation):** Background `#FBF8F3`. Completely flat, non-reflective base.
- **Level 1 (Card & Section Wells):** Background `#F4EFE6` with a crisp, low-contrast border in `#E5DBD0` (1px solid). No drop shadow.
- **Level 2 (Popovers, Tooltips & Audio Triggers):** Background `#FBF8F3`, border `#E5DBD0`, backed by an ambient shadow tinted in deep umber: `0 8px 24px -4px rgba(59, 39, 30, 0.08)`.
- **Level 3 (Modal Dialogs & Fast Jump Drawers):** Background `#FBF8F3`, bordered with `rgba(59, 39, 30, 0.12)`, supported by `0 20px 40px -8px rgba(33, 28, 26, 0.18)` and an espresso-tinted backdrop scrim: `rgba(43, 27, 23, 0.4)`.

## Shapes

The design system employs a soft, humanistic shape profile (`roundedness: 1`). Sharp 90-degree corners are softened to echo book edges and library card catalogs, while hyper-rounded pills are reserved exclusively for contextual tags and interactive chips.

### Geometry Specifications
- **Dictionary Cards, Search Containers & Inset Panels:** Soft radius (`0.25rem` to `0.5rem`). Keeps the structural frame grounded, formal, and organized.
- **Metadata Badges, Audio Buttons & Semantic Tags:** Fully rounded pill shapes (`9999px`) to create an immediate visual separation between descriptive metadata and textual content.

## Components

### 1. Dictionary Entry Header
- **Layout:** Flex row with wrapped baseline alignment.
- **Headword:** Set in `headword-lg` (`Merriweather`), `#3B271E`.
- **Phonetics:** `#6E5D53` adjacent to a circular caramel audio button (`36px` diameter) with an integrated soundwave icon.
- **Grammatical Class:** Italicized sans-serif caption right after phonetics.

### 2. Register & Dialect Pills
- **Badge Anatomy:** High-contrast pill indicators with uppercase typography (`register-tag`).
- **Variants:**
  - *Calão / Obsceno:* Background `#B85D36` with `#FFFFFF` text.
  - *Informal / Gíria:* Background `#F4EFE6` with `#3B271E` text and `#E5DBD0` border.
  - *Regionalismo (Norte, Alentejo, Lisboa, Ilhas):* Background `#FAF0E6` with `#C67D3E` text and `#D97736` border (0.5px solid).

### 3. Numbered Definition List
- **Index:** Circular numeral badge or bold serif numerals (`1.`, `2.`, `3.`) in `#C67D3E`.
- **Content:** `definition-body` in `#211C1A`.
- **Sub-senses & Nuances:** Indented by `space-md` with `space-xs` padding, framed by a soft `#E5DBD0` border.

### 4. Exemplos de Uso (Citation Quotes)
- **Container:** Recessed blockquote with background `#F4EFE6`, left accent border of 3px solid `#C67D3E`, internal padding `space-md`.
- **Typography:** Merriweather Italic 15px.
- **Attribution/Context:** Preceded by an em-dash (`—`), displayed in sans-serif caption `#6E5D53`.

### 5. Search Bar & Rapid Filtering
- **Input Field:** Large 52px input box, background `#FFFFFF`, border 1.5px solid `#E5DBD0`, inner left search icon in `#6E5D53`. Active focus ring: 2px solid `#C67D3E`.
- **Voice / Region Quick Filter:** Pill-shaped toggle chips situated directly below the search field allowing instant filtering by geography (e.g., *Portugal*, *Brasil*, *Angola*, *Moçambique*) or register type.

### 6. Buttons
- **Primary:** Background `#3B271E`, text `#FBF8F3`, radius `0.25rem`. Hover: `#211C1A`.
- **Secondary / Accent:** Background `#C67D3E`, text `#FFFFFF`, radius `0.25rem`. Hover: `#B85D36`.
- **Tertiary / Ghost:** Border 1px solid `#E5DBD0`, text `#3B271E`, background transparent. Hover: background `#F4EFE6`.

### 7. Curated Widget: "Expressão do Dia"
- **Style:** Compact card with warm linen paper background (`#F4EFE6`), bordered by `#E5DBD0`, topped with a small terracotta ribbon label indicating "Destaque Quotidiano".
- **Interaction:** One-click copy for social sharing, complete with definition synopsis and regional origin tag.
# Images for Léxico Vivo

The generated batch has been received in `references/`, exported to WebP, and integrated into the mobile heroes, Regiões, and O projeto. See [the original generation prompts and asset records](docs/image-prompts.md) and [the reusable visual style guide](docs/visual-style-guide.md). The briefs below are preserved as the initial requests.

The UI now uses the supplied text-free book-and-botanical artwork (`references/9a0fc2b3-c4df-454e-aa47-137c6b061448.png`) as `public/images/dictionary-botanical.png`. No replacement is needed for the desktop hero.

Please generate the following complementary images using that image as a style reference. Generate artwork only: no interface, headings, captions, logos, watermarks, or legible lettering. Keep the palette warm ivory (#fcf9f4), parchment, muted olive, caramel, and espresso brown. Avoid saturated orange, glossy 3D, and heavy dark backgrounds. Deliver individual PNG or WebP files, not a collage. The new images are optional additions; the current UI works without them.

## 1. Mobile botanical hero — highest priority

**Filename:** `botanical-mobile.webp` · **Size:** 1200 × 1500 · **Intended placement:** mobile dictionary and homepage hero.

**Prompt:** Create a quiet watercolor and cut-paper editorial illustration for a Portuguese dictionary, matching the supplied open-book and botanical reference. Portrait composition on warm ivory paper (#fcf9f4) with very subtle natural grain. A small antique open book, softly painted page edges, and delicate olive and bay branches occupy only the bottom-right quarter. Faint translucent parchment shapes and a few pale leaves frame the bottom edge. Keep the entire top two-thirds and the left side almost empty ivory, suitable for dark live website text and a search field. Low contrast, refined literary atmosphere, soft daylight, natural muted brown and olive pigments. No readable marks on the book pages, no text, no lettering, no typography, no borders, no UI. Fade the outer edges into ivory.

## 2. Falares: a Portuguese village vignette

**Filename:** `falares-village.webp` · **Size:** 1600 × 900 · **Intended placement:** introduction to regional browsing.

**Prompt:** A delicate watercolor and pencil editorial vignette of a small Portuguese village square: whitewashed houses, a terracotta roof, a modest stone fountain, an olive tree, and two tiny loosely sketched figures talking outside a café. Match the supplied book-and-botanical artwork in material, restrained detail, and palette. Warm ivory paper (#fcf9f4), faded sepia linework, muted olive leaves, very pale terracotta. Place the scene across the lower-right half with generous uninterrupted ivory negative space at the upper left. Soft irregular watercolor edges fading into the paper. Intimate everyday life, understated and literary, no tourist-poster treatment. No identifiable real people, no readable signs, no text, no labels, no logos, no UI.

## 3. The collection: a writer's desk

**Filename:** `collection-desk.webp` · **Size:** 1600 × 1000 · **Intended placement:** the project's source and history section.

**Prompt:** An elegant watercolor and graphite illustration of a well-used wooden writing desk seen from a gentle overhead angle: a small open notebook, loose archival index cards, a fountain pen, and a single bay sprig beside a closed clothbound dictionary. Use the supplied botanical book reference for the warm ivory, parchment, espresso, and muted olive palette and fine paper texture. Objects clustered in the right half; left half mostly open ivory paper for editorial text. Sparse, tactile, contemplative, softly lit, with imperfect hand-painted edges dissolving into #fcf9f4. Suggest collecting spoken language through everyday tools. No person or portrait, no readable writing, no book titles, no logos, no UI. Do not imply that this is a photograph of the original author's belongings.

## Delivery

Save the generated files in `public/images/` using the filenames above. Tell me when they are ready so I can inspect their composition and integrate them at the appropriate sizes and breakpoints. Text will stay in HTML for accessibility and responsive layout.

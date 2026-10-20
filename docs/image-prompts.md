# Léxico Vivo — Original image generation prompts

These are the original prompts supplied by the user for the three generated illustrations, documented on 20 October 2026. Prompt wording is preserved below; copied interface text such as “Copy prompt” is omitted.

All three used the same original [book-and-botanical illustration](../references/9a0fc2b3-c4df-454e-aa47-137c6b061448.png) as **Image A**, not just a text description. The generation model and version were not supplied. The reusable [master style prompt](visual-style-guide.md) documents their shared artistic constraints for future requests.

## A. botanical-mobile.webp

- Target aspect ratio: **4:5**
- Requested delivery dimensions: **1200 × 1500**
- Received source: [2753018a-6216-4d4e-b2e3-e0e0b7756755.png](../references/2753018a-6216-4d4e-b2e3-e0e0b7756755.png)
- Actual source dimensions: **1122 × 1402**, PNG
- Intended final path: `public/images/botanical-mobile.webp`
- Intended placement: mobile dictionary and homepage hero
- Generation model/version: **not supplied**
- Integrated web export: [botanical-mobile.webp](../public/images/botanical-mobile.webp), **1122 × 1402**, used for mobile home, dictionary, and Em alta backgrounds.

### Original prompt

```text
Create artwork only, with no interface, headings, captions, logos, watermarks, or legible lettering. Image A is the style reference: match its quiet watercolor-and-cut-paper editorial illustration style, warm ivory paper texture, parchment shapes, muted olive botanicals, caramel and espresso brown tones, and refined literary atmosphere.  Generate a portrait mobile hero illustration for a Portuguese dictionary. Composition on warm ivory paper (#fcf9f4) with very subtle natural grain. A small antique open book with softly painted page edges and delicate olive and bay branches should occupy only the bottom-right quarter. Add faint translucent parchment shapes and a few pale leaves framing the bottom edge.  Keep the entire top two-thirds and the left side almost empty ivory with generous negative space, suitable for dark live website text and a search field. Low contrast, soft daylight, natural muted brown and olive pigments.  No readable marks on the book pages, no text, no lettering, no borders, no UI. Fade the outer edges into ivory. Avoid saturated orange, glossy 3D, and heavy dark backgrounds.
```

## B. falares-village.webp

- Target aspect ratio: **16:9**
- Requested delivery dimensions: **1600 × 900**
- Received source: [d498f248-e7b7-4d7d-b8d0-0c2837eb04fa.png](../references/d498f248-e7b7-4d7d-b8d0-0c2837eb04fa.png)
- Actual source dimensions: **1672 × 941**, PNG
- Intended final path: `public/images/falares-village.webp`
- Intended placement: introduction to regional browsing
- Generation model/version: **not supplied**
- Integrated web export: [falares-village.webp](../public/images/falares-village.webp), **1672 × 941**, used for the Regiões introduction.

### Original prompt

```text
Create artwork only, with no interface, headings, captions, logos, watermarks, or legible lettering. Image A is the style reference: match its watercolor and pencil editorial style, paper texture, restrained detail, and palette of warm ivory (#fcf9f4), parchment, muted olive, pale terracotta, caramel, and espresso brown.  Generate a delicate vignette of a small Portuguese village square: whitewashed houses, a terracotta roof, a modest stone fountain, an olive tree, and two tiny loosely sketched figures talking outside a café.  Place the scene across the lower-right half with generous uninterrupted ivory negative space at the upper left. Use faded sepia linework, muted olive leaves, and very pale terracotta accents. Soft irregular watercolor edges should fade into the paper.  The mood should feel intimate, everyday, understated, and literary rather than like a tourist poster.  No identifiable real people, no readable signs, no text, no labels, no logos, no UI.
```

## C. collection-desk.webp

- Target aspect ratio: **8:5**
- Requested delivery dimensions: **1600 × 1000**
- Received source: [3809c86c-09ed-4d6b-ab8c-e0f6ce5d536c.png](../references/3809c86c-09ed-4d6b-ab8c-e0f6ce5d536c.png)
- Actual source dimensions: **1586 × 992**, PNG
- Intended final path: `public/images/collection-desk.webp`
- Intended placement: the project's source and history section
- Generation model/version: **not supplied**
- Integrated web export: [collection-desk.webp](../public/images/collection-desk.webp), **1586 × 992**, used for the O projeto introduction.

### Original prompt

```text
Create artwork only, with no interface, headings, captions, logos, watermarks, or legible lettering. Image A is the style reference: use it for the warm ivory, parchment, espresso, and muted olive palette, fine paper texture, and elegant watercolor-and-graphite editorial mood.  Generate an illustration of a well-used wooden writing desk seen from a gentle overhead angle: a small open notebook, loose archival index cards, a fountain pen, and a single bay sprig beside a closed clothbound dictionary.  Cluster the objects in the right half; keep the left half mostly open ivory paper for editorial text. The scene should be sparse, tactile, contemplative, softly lit, with imperfect hand-painted edges dissolving into #fcf9f4.  Suggest collecting spoken language through everyday tools.  No person or portrait, no readable writing, no book titles, no logos, no UI. Do not imply that this is a photograph of any real author's belongings. Avoid saturated orange, glossy 3D, and heavy dark backgrounds.
```

## Production notes

The user specified aspect ratios during generation, not exact pixel dimensions. The requested dimensions above are delivery targets; actual PNG dimensions were inspected in the repository. The source-to-scene mappings were verified by visually inspecting the three new references.

Preserve the original PNGs in `references/`. Record any resizing, cropping, conversion settings, and final approved export here when preparing web assets. Keep website text in HTML, separate from the illustrations.

The three supplied images were exported with ImageMagick to WebP at quality 84, preserving their original pixel dimensions without cropping or upscaling. The source PNGs remain unchanged. CSS controls responsive cropping and adds soft ivory gradients where needed for text readability. Together, the WebP exports total approximately 439 KiB. Integration was requested by the user; final visual sign-off is not separately recorded.

The earlier [prompt_images.md](../prompt_images.md) contains the initial image briefs. This document is the record of the prompts actually used for this batch.

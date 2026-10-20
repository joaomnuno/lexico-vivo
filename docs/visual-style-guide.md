# Léxico Vivo — Visual Style Guide

The illustration style is **Vintage Botanical Watercolor Editorial Illustration**: traditional watercolor, fine graphite illustration, aged paper textures, and minimalist editorial composition.

## Master style prompt (reusable)

Create an elegant, minimalist editorial illustration in a vintage botanical watercolor and graphite style, inspired by traditional Portuguese literary illustrations, archival books, and natural history artwork.

### Art direction

- Traditional hand-painted watercolor with delicate graphite and sepia pencil linework.
- Subtle paper grain, translucent pigment washes, and organic cut-paper textures.
- Restrained detail with soft, imperfect brushwork and naturally faded edges.
- Warm, understated, literary atmosphere, reminiscent of an illustrated dictionary or archival publication.
- Flat, soft natural daylight with delicate shadows and minimal contrast.
- Objects should feel tactile, aged, and authentic, never artificially glossy.

### Color palette

- Warm ivory: `#fcf9f4` — primary background
- Parchment beige — watercolor washes and paper
- Muted olive and sage — botanical elements
- Caramel and faded terracotta — warm accents
- Espresso brown — fine outlines, shadows, and aged materials
- Soft sepia — secondary details

### Composition

- Generous negative space, particularly on the left or upper portion.
- Primary subjects grouped asymmetrically toward the right or lower-right.
- Background illustrations should dissolve naturally into the ivory paper.
- No hard rectangular boundaries or visible frames.
- Avoid excessive visual density or competing focal points.
- Artwork must integrate naturally behind live website typography and interactive components.

### Strict exclusions

No readable text, lettering, typography, captions, labels, logos, watermarks, borders, or user interface elements. No saturated orange, glossy 3D rendering, photography, heavy dark backgrounds, harsh shadows, excessive contrast, or tourist-poster aesthetics.

### Consistency requirement

Match the supplied Léxico Vivo botanical book illustration in watercolor technique, paper texture, muted pigments, edge treatment, lighting, and artistic restraint. All illustrations should appear to belong to the same illustrated literary collection.

## Keeping future generations consistent

For each new image, combine:

**Master style prompt + Scene-specific prompt + Reference image + Target aspect ratio**

Always supply the original [text-free book-and-botanical reference](../references/9a0fc2b3-c4df-454e-aa47-137c6b061448.png), referred to as **Image A** in the original prompts. Its website copy is [dictionary-botanical.png](../public/images/dictionary-botanical.png).

Use the same original reference each time, rather than progressively using newly generated images as references. This reduces style drift across successive generations. The original batch used an image reference as well as text; the reusable master prompt above documents the shared style, rather than claiming to be additional text submitted with that batch.

Specify the aspect ratio during generation. Exact delivery dimensions and WebP conversion are a separate production step; requested dimensions are not evidence of the generator's output dimensions.

For each asset, record the exact prompt, reference image, target aspect ratio, generation model/version, original output dimensions and filename, and final approved image. If information is unavailable, mark it as unknown rather than inferring it.

See [image-prompts.md](image-prompts.md) for the original prompts and received asset records, and [DESIGN.md](DESIGN.md) for interface conventions.

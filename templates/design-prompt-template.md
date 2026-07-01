# Design Prompt Template

Reusable prompt scaffolds for image generation. Copy a block, fill the
`{{PLACEHOLDERS}}`, and paste into your image model. **The quote must be pasted
character-exact** — copy it straight from `quotes/quotes-master.md`.

Every prompt block contains: exact quote · layout · font · palette · background ·
placement · output format · negative prompt · quality checks.

---

## Shared fields (fill once per design)

```
QUOTE (exact, do not alter): {{QUOTE}}
LINE BREAKS: {{LINE_BREAKS_AS_INTENDED}}
STYLE KEYWORDS: {{STYLE}}         e.g. bold feminine, minimal luxury, cheeky
COLORWAY: {{PALETTE}}             e.g. off-white type on transparent
```

---

## 1. Text-only print design (transparent, no model/background)

```
Create a TEXT-ONLY print graphic. No model, no shirt, no background.

EXACT TEXT (reproduce letter-for-letter, keep punctuation & capitalization):
{{QUOTE}}

LAYOUT: centered composition, balanced margins, stacked lines per intended
  line breaks: {{LINE_BREAKS_AS_INTENDED}}.
FONT STYLE: {{FONT_DIRECTION}} (e.g. high-contrast modern serif for elegance
  OR bold condensed sans for impact). Consistent kerning, no distorted letters.
COLOR PALETTE: {{PALETTE}}. Flat solid colors, print-safe, no gradients unless
  specified.
BACKGROUND: fully transparent (alpha), nothing behind the text.
PRINT PLACEMENT: standalone graphic sized for a 4500x5400px front print area.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.

NEGATIVE PROMPT: no shirt, no garment, no model, no mannequin, no background
  color, no drop shadow (unless requested), no watermark, no extra text, no
  misspellings, no warped or duplicated letters, no lorem ipsum, no signature.

QUALITY CHECKS:
- Text matches the EXACT TEXT above, character for character.
- Punctuation and capitalization preserved.
- Background is transparent.
- Composition is centered and print-ready.
```

## 2. Typography-heavy design

```
Create a TYPOGRAPHY-DRIVEN print graphic where the lettering IS the artwork.

EXACT TEXT: {{QUOTE}}
LAYOUT: dramatic type hierarchy — vary weight/size across the {{LINE_BREAKS}}
  so the contrast words dominate; tight, intentional composition.
FONT STYLE: mix a bold display face with a delicate accent face; expressive
  ligatures allowed but every character must stay legible and correct.
COLOR PALETTE: {{PALETTE}} (2–3 colors max).
BACKGROUND: transparent.
PRINT PLACEMENT: front print, 4500x5400px.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.
NEGATIVE PROMPT: no misspellings, no warped letters, no background, no model,
  no clutter, no stock-art icons, no watermark.
QUALITY CHECKS: exact text · legible at small size · centered · transparent.
```

## 3. Minimalist luxury design

```
Create a MINIMALIST LUXURY print graphic.

EXACT TEXT: {{QUOTE}}
LAYOUT: generous negative space, single refined type block, perfectly centered.
FONT STYLE: elegant high-contrast serif OR fine geometric sans; couture feel.
COLOR PALETTE: restrained — e.g. warm off-white, soft gold, or matte black
  (choose from {{PALETTE}}).
BACKGROUND: transparent.
PRINT PLACEMENT: small-to-medium centered chest print or left-chest option.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.
NEGATIVE PROMPT: no clutter, no gradients, no drop shadow, no background, no
  model, no misspellings, no decorative overload.
QUALITY CHECKS: exact text · elegant spacing · transparent · premium feel.
```

## 4. Y2K feminine design

```
Create a Y2K FEMININE print graphic.

EXACT TEXT: {{QUOTE}}
LAYOUT: playful, bubbly arrangement; slight arch or wave allowed if legible.
FONT STYLE: chrome/bubble/glossy Y2K lettering; girly but readable.
COLOR PALETTE: hot pink, baby blue, silver chrome, lilac (pull from {{PALETTE}}).
  Glossy highlights OK; keep colors flat enough to print.
BACKGROUND: transparent (embed sparkle/star motifs into the graphic, not a bg).
PRINT PLACEMENT: front print, 4500x5400px.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.
NEGATIVE PROMPT: no background fill, no model, no misspellings, no muddy colors,
  no unreadable warping, no watermark.
QUALITY CHECKS: exact text · fun but legible · transparent · print-safe colors.
```

## 5. Desi glam design

```
Create a DESI GLAM print graphic — South Asian influence, premium & trendy.

EXACT TEXT: {{QUOTE}}
LAYOUT: centered type framed by subtle traditional motifs (fine mandala corners,
  delicate paisley, or minimal jhumka/henna line accents) — accents support the
  text, never overpower it.
FONT STYLE: modern serif or elegant display, optional tasteful Indic-inspired
  flourish; keep every English character exact and legible.
COLOR PALETTE: rich jewel tones or gold-on-transparent (from {{PALETTE}}).
BACKGROUND: transparent.
PRINT PLACEMENT: front print, 4500x5400px.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.
NEGATIVE PROMPT: no background, no model, no cultural caricature, no religious
  symbols, no misspellings, no cluttered ornament, no watermark.
QUALITY CHECKS: exact text · tasteful motif balance · transparent · premium.
```

## 6. Back-of-shirt design

```
Create a BACK PRINT graphic (large upper-back placement).

EXACT TEXT: {{QUOTE}}
LAYOUT: large, confident, centered across the upper/mid back; readable from a
  distance; line breaks per {{LINE_BREAKS}}.
FONT STYLE: {{FONT_DIRECTION}} — bold enough to read across a room.
COLOR PALETTE: {{PALETTE}} (high contrast against {{GARMENT_COLOR}}).
BACKGROUND: transparent.
PRINT PLACEMENT: back print, 4500x5400px, weighted toward upper back.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.
NEGATIVE PROMPT: no shirt, no model, no background, no misspellings, no warped
  letters, no watermark.
QUALITY CHECKS: exact text · large & legible · transparent · high contrast.
```

---

## Filling checklist (every prompt)

- [ ] Quote pasted from `quotes-master.md`, character-exact.
- [ ] Line breaks specified.
- [ ] Font, palette, layout, background, placement, output all filled.
- [ ] Negative prompt included.
- [ ] Quality-checks block kept.

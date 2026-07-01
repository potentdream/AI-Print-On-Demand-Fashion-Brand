# Mockup Prompt Template

Prompts for placing a **finished print-ready graphic** onto products for
previews. Mockups are for marketing only — they are **never** the print file.

Golden rule for every mockup: **the text on the garment must match the print
file exactly.** If your tool re-renders the text, verify it character-for-
character; prefer tools that composite the actual PNG rather than regenerating.

---

## 1. Traditional / desi outfit model mockup

```
Create a LIFESTYLE MOCKUP of a print-on-demand tee worn by a model in a subtly
cheeky, bold, feminine traditional-influenced styling.

GRAPHIC: place the provided print-ready PNG on the {{PLACEMENT: front/back}} of
  the garment, centered, realistic fabric wrap and lighting.
EXACT TEXT ON GARMENT (must remain unchanged): {{QUOTE}}
MODEL / STYLING: confident South-Asian-influenced styling — e.g. tee paired with
  a draped dupatta, statement earrings, or a modern-traditional fusion look;
  premium, wearable, trendy; empowered expression.
GARMENT: {{GARMENT}} (e.g. oversized black T-shirt).
SCENE: clean editorial background, soft studio light.
OUTPUT FORMAT: high-res JPG/PNG, 2000px+ on the long edge.
NEGATIVE PROMPT: no text distortion, no misspellings, no altered quote, no logo,
  no watermark, no cultural caricature, no religious symbols, no extra graphics.
QUALITY CHECKS: quote matches print file · placement realistic · text crisp ·
  brand-appropriate styling.
```

## 2. Front T-shirt mockup

```
Create a FRONT-PLACEMENT T-shirt mockup.

GRAPHIC: composite the provided print-ready PNG centered on the chest of a
  {{GARMENT}}; realistic wrinkles, seams, and lighting.
EXACT TEXT ON GARMENT (unchanged): {{QUOTE}}
STYLE: {{STYLE}}; flat-lay OR on-model per {{MODE}}.
SCENE / BACKGROUND: {{BACKGROUND}} (e.g. neutral studio, soft shadow).
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.
NEGATIVE PROMPT: no altered text, no misspellings, no watermark, no extra logos,
  no warped graphic, no distorted garment.
QUALITY CHECKS: quote exact · centered on chest · realistic fabric · crisp text.
```

## 3. Back T-shirt mockup

```
Create a BACK-PLACEMENT T-shirt mockup.

GRAPHIC: composite the provided back print PNG across the upper/mid back of a
  {{GARMENT}}; realistic drape and lighting.
EXACT TEXT ON GARMENT (unchanged): {{QUOTE}}
STYLE: {{STYLE}}; on-model showing the back, or ghost/flat-lay per {{MODE}}.
SCENE / BACKGROUND: {{BACKGROUND}}.
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.
NEGATIVE PROMPT: no altered text, no misspellings, no front graphic, no
  watermark, no warped letters.
QUALITY CHECKS: quote exact · large & centered on back · realistic · legible.
```

## 4. Tote bag mockup

```
Create a TOTE BAG mockup.

GRAPHIC: composite the provided print-ready PNG centered on a {{TOTE_COLOR}}
  canvas tote; realistic fabric texture and handles.
EXACT TEXT ON TOTE (unchanged): {{QUOTE}}
STYLE: {{STYLE}}; flat-lay or held/lifestyle per {{MODE}}.
SCENE / BACKGROUND: {{BACKGROUND}} (e.g. cafe table, neutral wall).
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.
NEGATIVE PROMPT: no altered text, no misspellings, no watermark, no warped
  graphic, no distorted bag shape.
QUALITY CHECKS: quote exact · centered on tote · realistic texture · crisp text.
```

## 5. Product photography mockup (hero / listing image)

```
Create a HERO PRODUCT PHOTO for the listing.

GRAPHIC: the provided print-ready PNG on {{GARMENT_OR_PRODUCT}}, {{PLACEMENT}}.
EXACT TEXT (unchanged): {{QUOTE}}
STYLE: premium e-commerce; {{FLATLAY_OR_MODEL}}; brand-consistent props.
LIGHTING: soft, even, true-to-color.
SCENE / BACKGROUND: clean, minimal, on-brand.
OUTPUT FORMAT: high-res JPG, square 2000x2000 + optional 4:5 portrait.
NEGATIVE PROMPT: no altered text, no misspellings, no watermark, no clutter,
  no busy background, no competing logos.
QUALITY CHECKS: quote exact · sharp focus · true colors · listing-ready crop.
```

---

## Front vs. back vs. lifestyle — always generate as a set

For a launch, produce at minimum:
1. Front (or back, per the design's primary placement) — on model.
2. The opposite placement OR a flat-lay.
3. One lifestyle shot.
4. Tote version (if the quote is tagged `tote`).

Save each to `mockups/` using the naming rules, e.g.
`slug__mockup__front__black-tee-model.png`.

## Universal mockup checklist

- [ ] Text on product is identical to the print file.
- [ ] No misspellings introduced by the generator.
- [ ] Placement (front/back/tote) is correct and realistic.
- [ ] Graphic centered, not warped.
- [ ] File saved in `mockups/` with correct name.
- [ ] Print file NOT modified by the mockup step.

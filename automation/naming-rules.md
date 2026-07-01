# Naming Rules

Consistent naming keeps hundreds of designs shippable and searchable. These
rules are enforced by `npm run export-pack` and `npm run qc-check`.

---

## 1. Design slug

The slug is the folder name and the base of every filename.

- Lowercase only.
- Words separated by single hyphens.
- No punctuation, apostrophes, ampersands, or emoji.
- Derived from the quote text.

| Quote | Slug |
|---|---|
| `Sweet Outside. Savage Inside.` | `sweet-outside-savage-inside` |
| `Good Girl. Bad Decisions. Great Outfit.` | `good-girl-bad-decisions-great-outfit` |
| `Not a Princess. The Queen.` | `not-a-princess-the-queen` |
| `Saree, Sass & Self-Respect.` | `saree-sass-self-respect` |

Rule: lowercase → strip punctuation → replace spaces & `&` runs with `-` →
collapse repeats → trim leading/trailing hyphens.

---

## 2. File naming pattern

```
<slug>__<asset-type>__<variant>__<spec>.<ext>
```

Double underscore (`__`) separates the four segments so single hyphens stay
readable inside each segment.

| Segment | Meaning | Allowed values |
|---|---|---|
| `slug` | design slug | see above |
| `asset-type` | what the file is | `print`, `mockup`, `prompt`, `listing`, `source` |
| `variant` | placement / channel | `front`, `back`, `tote`, `sticker`, `lifestyle`, `all` |
| `spec` | size / format / target | e.g. `4500x5400`, `transparent`, `etsy`, `shopify`, `v1` |

### Examples

```
sweet-outside-savage-inside__print__front__4500x5400-transparent.png
sweet-outside-savage-inside__print__back__4500x5400-transparent.png
sweet-outside-savage-inside__mockup__front__black-tee-model.png
sweet-outside-savage-inside__mockup__back__black-tee-lifestyle.png
sweet-outside-savage-inside__mockup__tote__natural-canvas.png
sweet-outside-savage-inside__prompt__front__print-only.md
sweet-outside-savage-inside__listing__all__etsy.md
sweet-outside-savage-inside__listing__all__shopify.md
```

---

## 3. Print-ready file specs

- Format: **PNG with transparent background** (or SVG for pure vector type).
- Resolution: **300 DPI**.
- Minimum canvas: **4500 × 5400 px** (15" × 18" front print area).
- Tote canvas: **3600 × 3600 px** minimum.
- Sticker: **1500 × 1500 px** minimum, die-cut safe margin included.
- Color space: **sRGB** (POD standard). No embedded CMYK unless the platform asks.
- Filename **must** contain `transparent` in the spec segment.

---

## 4. Folder placement

| File type | Goes in |
|---|---|
| Transparent print PNG/SVG | `print-ready/` |
| Any mockup (has a shirt/tote/model/background) | `mockups/` |
| Prompt markdown | `prompts/` |
| Listing copy markdown | `listing-copy/` |
| Briefs, notes, layered working files | `source/` |

A print file **must never** live in `mockups/` and a mockup **must never** live
in `print-ready/`. `qc-check` fails the design if it finds a misplaced file.

---

## 5. Versioning

Append `v2`, `v3`, … to the `spec` segment for iterations. Keep the latest
approved version without a version suffix, or promote by renaming. Never
overwrite an approved file — add a new version.

---

## 6. Reserved words / banned characters

- No spaces in filenames.
- No `#`, `?`, `%`, `&`, `'`, `"`, `:` in filenames.
- No uppercase in slugs or filenames.
- Emoji only allowed inside Instagram caption *content*, never in filenames.

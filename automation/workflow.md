# Workflow — Idea to Export

The end-to-end process for taking one idea to a fully listed, print-ready
product. Each step names the tool/template and the folder it writes to.

```
idea → quote → variations → brief → prompts → generate → mockups → QC → listing → export
```

---

## Step 0 — Capture the idea

Add the raw seed quote to `quotes/quotes-master.md`. Tag its mood and product
fit (see Phase 2 rules in that file).

## Step 1 — Generate variations

```bash
npm run quote-variations -- --quote "Sweet Outside. Savage Inside."
```

Produces 10 on-brand variations appended to `quotes/quote-variations.md`. Pick
the strongest 1–3 to develop into designs. Keep the tone: **bold, cheeky,
feminine, confident.**

## Step 2 — Create the design folder + brief

```bash
npm run new-design -- --quote "Sweet Outside. Savage Inside." \
  --product "Oversized black T-shirt" --variant back \
  --style "bold feminine, minimal luxury, cheeky"
```

Creates `designs/<slug>/` with the 5 subfolders and writes
`source/brief.json` (the machine-readable brief that downstream scripts read).

## Step 3 — Generate prompts

```bash
npm run make-prompts -- --slug sweet-outside-savage-inside
```

Writes into `prompts/`:
- `…__prompt__front__print-only.md`
- `…__prompt__front__tshirt-mockup.md`
- `…__prompt__back__tshirt-mockup.md`
- `…__prompt__tote__mockup.md`

Each is filled from `templates/design-prompt-template.md` /
`templates/mockup-prompt-template.md` with the **exact quote** locked in.

## Step 4 — Generate assets (human + image model)

Paste each prompt into your image generation tool of choice. Save:
- Transparent print PNG → `print-ready/` (naming rules apply).
- Mockups → `mockups/`.

> The image model produces the pixels; this repo guarantees the **prompt,
> naming, structure, and QC** around them. Always visually verify text is
> character-exact — image models can distort typography.

## Step 5 — Quality control

```bash
npm run qc-check -- --slug sweet-outside-savage-inside
```

Runs the checklist in `templates/export-checklist.md`: exact text, transparency,
resolution, placement, centering, file naming, and print/mockup separation.
Writes a QC report to `source/qc-report.md`.

## Step 6 — Listing copy

```bash
npm run make-listing -- --slug sweet-outside-savage-inside
```

Writes Etsy / Shopify / Amazon / Instagram copy into `listing-copy/` using
`templates/listing-template.md`.

## Step 7 — Export pack

```bash
npm run export-pack -- --slug sweet-outside-savage-inside
```

Validates that every required file exists, is correctly named, and is in the
right folder. Prints an upload-ready manifest.

---

## The automation loop (fast path)

Paste one brief and run the pipeline end-to-end:

```
QUOTE:    "Sweet Outside. Savage Inside."
PRODUCT:  Oversized black T-shirt
VARIANT:  Back print
STYLE:    Bold feminine, minimal luxury, cheeky
OUTPUT:   print-ready PNG prompt, T-shirt mockup prompt, tote mockup prompt, listing copy
```

```bash
npm run new-design -- --quote "Sweet Outside. Savage Inside." --product "Oversized black T-shirt" --variant back --style "bold feminine, minimal luxury, cheeky"
npm run make-prompts -- --slug sweet-outside-savage-inside
npm run make-listing -- --slug sweet-outside-savage-inside
```

Then generate images, drop them in, and finish with `qc-check` + `export-pack`.

---

## Roles in the loop

| Actor | Owns |
|---|---|
| **You (creative director)** | picks quotes, approves designs, generates images |
| **Scripts** | folders, briefs, prompt/listing scaffolding, QC + export validation |
| **Image model** | the actual artwork + mockups from the prompts |
| **Templates** | the guardrails that keep every output on-brand |

# Export Checklist (Quality Control)

Run this before any design goes live. `npm run qc-check` automates the
structural parts (file presence, naming, folder separation); the text/visual
parts need your eyes. Copy this into `source/qc-report.md` and tick each box.

Design: `{{SLUG}}`
Quote (source of truth): `{{QUOTE}}`
Date checked: `{{DATE}}`

---

## A. Text accuracy (highest priority)

- [ ] Quote in the print file matches `quotes-master.md` **character for character**.
- [ ] Spelling is correct (read it out loud, backwards too).
- [ ] Punctuation preserved (periods, commas, ampersands, apostrophes).
- [ ] Capitalization preserved.
- [ ] Line breaks are as intended.
- [ ] No accidental extra words, letters, or duplicated glyphs.

## B. Print file integrity

- [ ] Background is fully transparent (checkerboard confirmed).
- [ ] No stray shirt, model, or background baked in.
- [ ] Resolution ≥ 4500×5400 px (tee) / 3600×3600 (tote) / 1500×1500 (sticker).
- [ ] 300 DPI, sRGB color space.
- [ ] Design is centered / correctly positioned for its placement.
- [ ] Colors are print-safe (no unintended gradients/soft shadows).
- [ ] Filename follows naming rules and contains `transparent`.
- [ ] File is in `print-ready/` (NOT in `mockups/`).

## C. Mockups

- [ ] At least one front OR back on-model mockup exists.
- [ ] Text on every mockup matches the print file exactly.
- [ ] Placement (front/back/tote) is correct and realistic.
- [ ] Graphic is centered and not warped on the product.
- [ ] Styling is on-brand (bold, feminine, premium; tasteful if desi).
- [ ] Mockup files are in `mockups/` (NOT in `print-ready/`).
- [ ] Filenames follow naming rules.

## D. Separation & structure

- [ ] Separate print file(s) and mockup file(s) both exist.
- [ ] Design has its own folder with all 5 subfolders.
- [ ] Prompts saved in `prompts/`.
- [ ] Listing copy saved in `listing-copy/`.
- [ ] Brief saved in `source/brief.json`.

## E. Listing readiness

- [ ] Title, descriptions, bullets, tags, alt text present.
- [ ] Quote appears exactly in the copy (no typo drift).
- [ ] At least one hero/listing image selected.

---

## Result

- Overall: ☐ PASS ☐ FAIL
- Blocking issues: `{{ISSUES}}`
- Reviewer: `{{NAME}}`

> Any unchecked box in section A or B is an automatic FAIL — do not upload.

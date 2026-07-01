# Task List

Two lists: the **build phases** (setting up this system) and the **per-design
task list** (repeat for every product).

---

## Build phases (system)

- [x] **Phase 1 — Project setup**: folders, README, workflow, templates, naming rules.
- [x] **Phase 2 — Quote engine**: quotes-master + variations + `quote-variations` script.
- [x] **Phase 3 — Design prompt engine**: 6+ prompt scaffolds + `make-prompts` script.
- [x] **Phase 4 — Mockup workflow**: mockup templates (front/back/lifestyle/tote).
- [x] **Phase 5 — Quality control**: export checklist + `qc-check` script.
- [x] **Phase 6 — Product listing generator**: Etsy/Shopify/Amazon/IG + `make-listing`.
- [x] **Phase 7 — Automation loop**: brief → `new-design` → prompts → listing.
- [x] **Phase 8 — CLI commands**: `npm run` scripts wired in `package.json`.

---

## Per-design task list (repeat each product)

Copy this block into `source/tasks.md` for each new design.

### Ideation
- [ ] Quote added to `quotes/quotes-master.md` (exact text, mood, product fit).
- [ ] Ran `quote-variations`; picked the winning variation(s).

### Setup
- [ ] Ran `new-design`; folder + `source/brief.json` created.
- [ ] Confirmed slug matches naming rules.

### Prompts
- [ ] Ran `make-prompts`; 4 prompt files present in `prompts/`.
- [ ] Verified each prompt has the exact quote + negative prompt + QC block.

### Generation
- [ ] Generated transparent print PNG(s) → `print-ready/`.
- [ ] Generated front mockup → `mockups/`.
- [ ] Generated back mockup (if applicable) → `mockups/`.
- [ ] Generated lifestyle mockup → `mockups/`.
- [ ] Generated tote mockup (if tagged tote) → `mockups/`.

### Quality control
- [ ] Ran `qc-check`; structural checks pass.
- [ ] Completed manual text + visual checklist in `source/qc-report.md`.
- [ ] Overall QC = PASS.

### Listing
- [ ] Ran `make-listing`; Etsy + Shopify (+Amazon/IG) copy in `listing-copy/`.
- [ ] Filled all placeholders; quote character-exact.
- [ ] Selected hero/listing image.

### Export
- [ ] Ran `export-pack`; manifest clean, no naming errors.
- [ ] Uploaded to POD platform(s).
- [ ] Updated status → `live` in `quotes-master.md`.

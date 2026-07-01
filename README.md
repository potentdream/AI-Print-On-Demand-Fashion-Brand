# POD Fashion Brand Workflow

A complete, repeatable system for creating **bold, cheeky, feminine, quote-based**
print-on-demand apparel — T-shirts, tote bags, and stickers — from **idea →
quote variations → design prompts → generation references → mockups →
print-ready files → product listings → organized folders**.

The brand voice is **bold, cheeky, feminine, stylish, modern, slightly savage,
and culturally playful**, with an optional South Asian / traditional fashion
influence that always stays **premium, wearable, and trendy**.

---

## What this repo gives you

- 📁 A clean, enforced **folder structure** (one folder per design).
- ✍️ A **quote engine** with mood categories and product fit tags.
- 🎨 Nine reusable **design prompt templates** (text-only → desi glam → mockups).
- 👕 A **mockup workflow** for front / back / lifestyle / tote versions.
- ✅ **Quality-control checklists** that protect exact text and print specs.
- 🛍️ **Listing generators** for Etsy, Shopify, Amazon, and Instagram.
- 🔁 An **automation loop** — paste one brief, get every file you need.
- 🖥️ **CLI-style scripts** (`npm run new-design`, `qc-check`, `export-pack`, …).

---

## Folder structure

```
/                                 (this repo = the POD brand project)
├── README.md
├── package.json                  npm run scripts
├── quotes/
│   ├── quotes-master.md          the canonical quote bank (source of truth)
│   └── quote-variations.md       10-variation expansions per seed quote
├── designs/
│   └── <design-slug>/
│       ├── print-ready/          transparent, high-res PNGs for POD upload
│       ├── mockups/              front / back / lifestyle / tote previews
│       ├── prompts/             the exact prompts used to generate assets
│       ├── listing-copy/        Etsy / Shopify / Amazon / Instagram copy
│       └── source/              working files, notes, brief.json
├── templates/
│   ├── design-prompt-template.md
│   ├── mockup-prompt-template.md
│   ├── listing-template.md
│   └── export-checklist.md
├── automation/
│   ├── workflow.md              end-to-end process
│   ├── task-list.md             build phases + per-design task list
│   └── naming-rules.md          file & folder naming conventions
└── scripts/                      lightweight Node automation
```

> The original brief sketched a `/pod-brand/` root. Because **this repository is
> the project**, the structure lives at the repo root instead of nesting one
> level deeper. Everything else matches the brief exactly.

---

## Quick start

```bash
# 1. Generate a fresh design folder from a brief
npm run new-design -- --quote "Sweet Outside. Savage Inside." \
  --product "Oversized black T-shirt" --variant back --style "bold feminine, minimal luxury, cheeky"

# 2. Expand a quote into 10 on-brand variations
npm run quote-variations -- --quote "Sweet Outside. Savage Inside."

# 3. Generate all prompt files for a design
npm run make-prompts -- --slug sweet-outside-savage-inside

# 4. Generate listing copy
npm run make-listing -- --slug sweet-outside-savage-inside

# 5. Run quality control before upload
npm run qc-check -- --slug sweet-outside-savage-inside

# 6. Validate the export pack (naming + required files)
npm run export-pack -- --slug sweet-outside-savage-inside
```

All scripts are **plain Node, no dependencies**. They read/write Markdown + JSON
so the whole system stays inspectable and diff-friendly.

---

## The golden rules (never break these)

1. **Text is sacred.** The quote in the final print file must be character-exact —
   punctuation, capitalization, and line breaks preserved. Never "improve" a
   quote silently.
2. **Print files are naked.** No model, no shirt, no background — transparent
   PNG only, unless a mockup is explicitly requested.
3. **Mockups are separate.** Mockup files live in `/mockups/`, never in
   `/print-ready/`.
4. **One design, one folder.** Every design gets its own slug folder with the
   five standard subfolders.
5. **Follow the naming rules.** See `automation/naming-rules.md`.

---

## Build phases

This system was built in 8 phases — see `automation/task-list.md` for the full
breakdown and per-design checklist:

1. Project setup
2. Quote engine
3. Design prompt engine
4. Mockup workflow
5. Quality control
6. Product listing generator
7. Automation loop
8. CLI commands

---

## Worked example

The `designs/sweet-outside-savage-inside/` folder is a **fully completed
reference design** — brief, all prompts, mockup specs, QC report, and Etsy +
Shopify listing copy — so you can see exactly what a finished design looks like.

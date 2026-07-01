'use strict';

/**
 * npm run new-design -- --quote "Sweet Outside. Savage Inside." \
 *   --product "Oversized black T-shirt" --variant back \
 *   --style "bold feminine, minimal luxury, cheeky"
 *
 * Creates designs/<slug>/ with the 5 standard subfolders and a brief.json.
 * Never overwrites existing files.
 */

const fs = require('fs');
const path = require('path');
const { parseArgs, slugify, ensureDir, writeSafe, designDir, SUBFOLDERS, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));

if (!args.quote) {
  fail('Missing --quote. Example:\n  npm run new-design -- --quote "Sweet Outside. Savage Inside." --product "Oversized black T-shirt" --variant back --style "bold feminine, cheeky"');
}

const quote = String(args.quote);
const slug = args.slug ? String(args.slug) : slugify(quote);
const brief = {
  quote,
  slug,
  product: args.product ? String(args.product) : 'Unisex T-shirt',
  variant: args.variant ? String(args.variant) : 'front',
  style: args.style ? String(args.style) : 'bold feminine, cheeky',
  garmentColor: args.color ? String(args.color) : 'black',
  lineBreaks: args.lines ? String(args.lines) : quote.split('.').map(s => s.trim()).filter(Boolean).join(' / '),
  createdAt: new Date().toISOString(),
};

const dir = designDir(slug);
console.log(`\nCreating design: ${slug}`);

// Folders
for (const sub of SUBFOLDERS) ensureDir(path.join(dir, sub));

// .gitkeep so empty asset folders survive in git
for (const sub of ['print-ready', 'mockups']) {
  const keep = path.join(dir, sub, '.gitkeep');
  if (!fs.existsSync(keep)) writeSafe(keep, '', { force: false });
}

// Brief
writeSafe(path.join(dir, 'source', 'brief.json'), JSON.stringify(brief, null, 2) + '\n');

// Per-design task file (copy of the template checklist)
const tasks = `# Tasks — ${quote}

Slug: \`${slug}\`  ·  Product: ${brief.product}  ·  Variant: ${brief.variant}
Style: ${brief.style}

- [ ] make-prompts
- [ ] generate print-ready PNG
- [ ] generate mockups (front / back / lifestyle / tote)
- [ ] make-listing
- [ ] qc-check (PASS)
- [ ] export-pack
- [ ] mark live in quotes/quotes-master.md
`;
writeSafe(path.join(dir, 'source', 'tasks.md'), tasks);

console.log(`\nDone. Next:\n  npm run make-prompts -- --slug ${slug}\n  npm run make-listing -- --slug ${slug}\n`);

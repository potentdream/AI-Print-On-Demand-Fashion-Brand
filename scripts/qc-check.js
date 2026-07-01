'use strict';

/**
 * npm run qc-check -- --slug sweet-outside-savage-inside
 *
 * Runs the STRUCTURAL quality-control checks that can be automated:
 *   - folder structure present
 *   - brief exists
 *   - prompts present
 *   - print/mockup separation (no misplaced files)
 *   - file naming conventions
 *   - listing copy present
 * Writes a report to source/qc-report.md. Text/visual checks stay manual.
 */

const fs = require('fs');
const path = require('path');
const { parseArgs, readBrief, designDir, SUBFOLDERS, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));
if (!args.slug) fail('Missing --slug. Example:\n  npm run qc-check -- --slug sweet-outside-savage-inside');

const slug = String(args.slug);
const dir = designDir(slug);
let brief;
try { brief = readBrief(slug); } catch (e) { fail(e.message); }

const results = [];
function check(label, ok, detail = '') {
  results.push({ label, ok, detail });
}

const IMG = /\.(png|jpg|jpeg|webp|svg)$/i;
const NAME_RE = new RegExp(`^${slug}__(print|mockup|prompt|listing|source)__(front|back|tote|sticker|lifestyle|all)__[a-z0-9-]+\\.[a-z0-9]+$`, 'i');

function listFiles(sub) {
  const p = path.join(dir, sub);
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter(f => f !== '.gitkeep' && !f.startsWith('.'));
}

// 1. Folder structure
for (const sub of SUBFOLDERS) {
  check(`Folder exists: ${sub}/`, fs.existsSync(path.join(dir, sub)));
}

// 2. Brief
check('brief.json present', fs.existsSync(path.join(dir, 'source', 'brief.json')));

// 3. Prompts present
const prompts = listFiles('prompts');
check('At least one prompt in prompts/', prompts.length > 0, `${prompts.length} found`);

// 4. Print/mockup separation
const printFiles = listFiles('print-ready').filter(f => IMG.test(f));
const mockupFiles = listFiles('mockups').filter(f => IMG.test(f));

// A print file must be transparent-named and live in print-ready
printFiles.forEach(f => {
  check(`print file names transparency: ${f}`, /transparent/i.test(f), 'print files should include "transparent"');
});
// No mockup-typed file should sit in print-ready and vice versa
printFiles.forEach(f => {
  check(`no mockup in print-ready: ${f}`, !/__mockup__/i.test(f));
});
mockupFiles.forEach(f => {
  check(`no print in mockups: ${f}`, !/__print__/i.test(f));
});

// 5. Naming conventions for image assets
[...printFiles, ...mockupFiles].forEach(f => {
  check(`naming ok: ${f}`, NAME_RE.test(f), 'expected slug__type__variant__spec.ext');
});

// 6. Listing copy present
const listings = listFiles('listing-copy');
check('At least one listing file', listings.length > 0, `${listings.length} found`);

// 7. Presence of at least one print + one mockup (warn, not hard fail if assets not generated yet)
check('At least one print-ready image', printFiles.length > 0, printFiles.length ? '' : 'generate the transparent PNG');
check('At least one mockup image', mockupFiles.length > 0, mockupFiles.length ? '' : 'generate a mockup');

// Report
const passed = results.filter(r => r.ok).length;
const total = results.length;
const overall = results.every(r => r.ok) ? 'PASS' : 'FAIL';

let md = `# QC Report — ${brief.quote}\n\nSlug: \`${slug}\`  ·  Checked: ${new Date().toISOString().slice(0,10)}\n`;
md += `Automated structural result: **${overall}** (${passed}/${total})\n\n`;
md += `> Automated checks cover structure, naming, and separation only.\n> You must still manually verify text accuracy, transparency, resolution, and placement — see templates/export-checklist.md.\n\n`;
md += '## Automated checks\n\n';
results.forEach(r => {
  md += `- [${r.ok ? 'x' : ' '}] ${r.label}${r.detail ? ` — _${r.detail}_` : ''}\n`;
});
md += '\n## Manual checks (do these by eye)\n\n';
md += '- [ ] Quote character-exact vs quotes-master.md\n- [ ] Spelling correct\n- [ ] Background transparent (checkerboard)\n- [ ] Resolution >= 4500x5400 (tee)\n- [ ] Design centered\n- [ ] Mockup placement realistic\n- [ ] Overall visual PASS\n';

fs.writeFileSync(path.join(dir, 'source', 'qc-report.md'), md);

console.log(`\nQC (${slug}): ${overall} — ${passed}/${total} automated checks`);
results.filter(r => !r.ok).forEach(r => console.log(`  ✗ ${r.label}${r.detail ? ` (${r.detail})` : ''}`));
console.log(`Report: designs/${slug}/source/qc-report.md\n`);

process.exit(overall === 'PASS' ? 0 : 1);

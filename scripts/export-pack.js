'use strict';

/**
 * npm run export-pack -- --slug sweet-outside-savage-inside
 *
 * Validates the design is upload-ready and prints an export manifest:
 *   - required files present
 *   - naming conventions valid
 *   - print/mockup separation intact
 * Exits non-zero if the pack is not ready.
 */

const fs = require('fs');
const path = require('path');
const { parseArgs, readBrief, designDir, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));
if (!args.slug) fail('Missing --slug. Example:\n  npm run export-pack -- --slug sweet-outside-savage-inside');

const slug = String(args.slug);
const dir = designDir(slug);
let brief;
try { brief = readBrief(slug); } catch (e) { fail(e.message); }

const IMG = /\.(png|jpg|jpeg|webp|svg)$/i;
function list(sub) {
  const p = path.join(dir, sub);
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p).filter(f => f !== '.gitkeep' && !f.startsWith('.'));
}

const printFiles = list('print-ready').filter(f => IMG.test(f));
const mockupFiles = list('mockups').filter(f => IMG.test(f));
const prompts = list('prompts');
const listings = list('listing-copy');

const problems = [];
if (printFiles.length === 0) problems.push('No print-ready image (need a transparent PNG).');
if (mockupFiles.length === 0) problems.push('No mockup image.');
if (prompts.length === 0) problems.push('No prompt files.');
if (listings.length === 0) problems.push('No listing copy.');
printFiles.forEach(f => { if (!/transparent/i.test(f)) problems.push(`Print file missing "transparent" in name: ${f}`); });
printFiles.forEach(f => { if (/__mockup__/i.test(f)) problems.push(`Mockup file in print-ready/: ${f}`); });
mockupFiles.forEach(f => { if (/__print__/i.test(f)) problems.push(`Print file in mockups/: ${f}`); });

console.log(`\n=== Export pack: ${slug} ===`);
console.log(`Quote: ${brief.quote}`);
console.log(`\nPrint-ready (${printFiles.length}):`);
printFiles.forEach(f => console.log(`  • ${f}`));
console.log(`Mockups (${mockupFiles.length}):`);
mockupFiles.forEach(f => console.log(`  • ${f}`));
console.log(`Prompts (${prompts.length}), Listings (${listings.length}).`);

if (problems.length) {
  console.log('\n✗ NOT READY:');
  problems.forEach(p => console.log(`  - ${p}`));
  console.log('');
  process.exit(1);
}

console.log('\n✓ Export pack READY for upload.\n');

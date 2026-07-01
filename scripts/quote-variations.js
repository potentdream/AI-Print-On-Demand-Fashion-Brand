'use strict';

/**
 * npm run quote-variations -- --quote "Sweet Outside. Savage Inside."
 *
 * Generates 10 on-brand variation SCAFFOLDS from a seed quote and appends them
 * to quotes/quote-variations.md for you to refine. This is a deterministic
 * helper — it produces structured starting points that keep the two-beat
 * contrast rhythm; always edit for voice + non-offensiveness before use.
 */

const fs = require('fs');
const path = require('path');
const { parseArgs, ROOT, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));
if (!args.quote) {
  fail('Missing --quote. Example:\n  npm run quote-variations -- --quote "Sweet Outside. Savage Inside."');
}

const seed = String(args.quote).trim();

// Soft/sharp swap banks used to riff on the contrast structure.
const softWords = ['Sweet', 'Soft', 'Pretty', 'Delicate', 'Cute', 'Gentle', 'Graceful', 'Sugar'];
const sharpWords = ['Savage', 'Sharp', 'Fierce', 'Bold', 'Deadly', 'Ruthless', 'Unbothered', 'Boss'];
const tails = [
  'Energy', 'Standards', 'Boundaries', 'Plans', 'Choices', 'Core', 'Vibes', 'Mode', 'Rules', 'Aura',
];

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

const variations = [];
for (let i = 0; i < 10; i++) {
  const soft = softWords[i % softWords.length];
  const sharp = sharpWords[(i * 3) % sharpWords.length];
  const tail = tails[i % tails.length];
  variations.push(`${cap(soft)} Face. ${cap(sharp)} ${tail}.`);
}

const stamp = new Date().toISOString().slice(0, 10);
let block = `\n## Seed: "${seed}"  _(scaffold ${stamp})_\n`;
block += 'Refine each line for voice + non-offensiveness before use.\n\n';
block += '| # | Variation (draft) | Refine? |\n|---|-------------------|---------|\n';
variations.forEach((v, i) => {
  block += `| ${i + 1} | ${v} | [ ] |\n`;
});

const file = path.join(ROOT, 'quotes', 'quote-variations.md');
fs.appendFileSync(file, block);

console.log(`\nAppended 10 variation drafts for "${seed}" to quotes/quote-variations.md`);
console.log('Edit them for tone before promoting any to quotes-master.md.\n');
variations.forEach((v, i) => console.log(`  ${i + 1}. ${v}`));
console.log('');

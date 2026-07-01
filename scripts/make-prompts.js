'use strict';

/**
 * npm run make-prompts -- --slug sweet-outside-savage-inside
 *
 * Reads source/brief.json and writes 4 filled prompt files into prompts/:
 *   - print-only (transparent print file)
 *   - front tshirt mockup
 *   - back tshirt mockup
 *   - tote mockup
 * The exact quote is locked into every prompt. Never overwrites (use --force).
 */

const path = require('path');
const { parseArgs, readBrief, writeSafe, designDir, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));
if (!args.slug) fail('Missing --slug. Example:\n  npm run make-prompts -- --slug sweet-outside-savage-inside');

const slug = String(args.slug);
const force = Boolean(args.force);
let brief;
try { brief = readBrief(slug); } catch (e) { fail(e.message); }

const { quote, product, style, garmentColor, lineBreaks } = brief;
const dir = path.join(designDir(slug), 'prompts');

function block(title, body) {
  return `# ${title}\n\nDesign: \`${slug}\`\nExact quote (do NOT alter): **${quote}**\nLine breaks: ${lineBreaks}\n\n---\n\n\`\`\`\n${body.trim()}\n\`\`\`\n`;
}

const printOnly = block('Prompt — Print-Only (transparent)', `
Create a TEXT-ONLY print graphic. No model, no shirt, no background.

EXACT TEXT (reproduce letter-for-letter, keep punctuation & capitalization):
${quote}

LAYOUT: centered, balanced margins; stacked lines per intended breaks: ${lineBreaks}.
FONT STYLE: ${style} — high-contrast modern serif OR bold condensed sans; clean kerning, no distorted letters.
COLOR PALETTE: off-white / soft cream type (adjust for contrast on ${garmentColor}). Flat, print-safe colors.
BACKGROUND: fully transparent (alpha). Nothing behind the text.
PRINT PLACEMENT: standalone graphic sized for a 4500x5400px front print area.
OUTPUT FORMAT: transparent PNG, 300 DPI, sRGB.

NEGATIVE PROMPT: no shirt, no garment, no model, no mannequin, no background color, no drop shadow, no watermark, no extra text, no misspellings, no warped or duplicated letters, no signature.

QUALITY CHECKS:
- Text matches EXACT TEXT above, character for character.
- Punctuation and capitalization preserved.
- Background transparent.
- Centered and print-ready.
`);

const frontMockup = block('Prompt — Front T-Shirt Mockup', `
Create a FRONT-PLACEMENT T-shirt mockup.

GRAPHIC: composite the provided print-ready PNG centered on the chest of a ${product}; realistic wrinkles, seams, lighting.
EXACT TEXT ON GARMENT (unchanged): ${quote}
STYLE: ${style}; on-model, confident feminine pose.
SCENE / BACKGROUND: clean editorial studio, soft shadow.
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.

NEGATIVE PROMPT: no altered text, no misspellings, no watermark, no extra logos, no warped graphic, no distorted garment.

QUALITY CHECKS: quote exact · centered on chest · realistic fabric · crisp text.
`);

const backMockup = block('Prompt — Back T-Shirt Mockup', `
Create a BACK-PLACEMENT T-shirt mockup.

GRAPHIC: composite the provided back print PNG across the upper/mid back of a ${product}; realistic drape and lighting.
EXACT TEXT ON GARMENT (unchanged): ${quote}
STYLE: ${style}; on-model showing the back.
SCENE / BACKGROUND: clean editorial studio, soft shadow.
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.

NEGATIVE PROMPT: no altered text, no misspellings, no front graphic, no watermark, no warped letters.

QUALITY CHECKS: quote exact · large & centered on back · realistic · legible.
`);

const toteMockup = block('Prompt — Tote Bag Mockup', `
Create a TOTE BAG mockup.

GRAPHIC: composite the provided print-ready PNG centered on a natural canvas tote; realistic fabric texture and handles.
EXACT TEXT ON TOTE (unchanged): ${quote}
STYLE: ${style}; lifestyle (held or on a cafe table).
SCENE / BACKGROUND: neutral, on-brand.
OUTPUT FORMAT: high-res JPG, 2000px+ long edge.

NEGATIVE PROMPT: no altered text, no misspellings, no watermark, no warped graphic, no distorted bag shape.

QUALITY CHECKS: quote exact · centered on tote · realistic texture · crisp text.
`);

console.log(`\nWriting prompts for ${slug}:`);
writeSafe(path.join(dir, `${slug}__prompt__front__print-only.md`), printOnly, { force });
writeSafe(path.join(dir, `${slug}__prompt__front__tshirt-mockup.md`), frontMockup, { force });
writeSafe(path.join(dir, `${slug}__prompt__back__tshirt-mockup.md`), backMockup, { force });
writeSafe(path.join(dir, `${slug}__prompt__tote__mockup.md`), toteMockup, { force });
console.log('');

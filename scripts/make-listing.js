'use strict';

/**
 * npm run make-listing -- --slug sweet-outside-savage-inside
 *
 * Reads source/brief.json and writes filled Etsy + Shopify listing copy
 * (with Amazon + Instagram sections) into listing-copy/. Quote is kept exact.
 */

const path = require('path');
const { parseArgs, readBrief, writeSafe, designDir, fail } = require('./lib');

const args = parseArgs(process.argv.slice(2));
if (!args.slug) fail('Missing --slug. Example:\n  npm run make-listing -- --slug sweet-outside-savage-inside');

const slug = String(args.slug);
const force = Boolean(args.force);
let brief;
try { brief = readBrief(slug); } catch (e) { fail(e.message); }

const { quote, product, style, variant } = brief;
const audience = args.audience || 'women 18–35 who love bold, aesthetic, quote fashion + gifting';
const placement = variant === 'back' ? 'back' : 'front';
const dir = path.join(designDir(slug), 'listing-copy');

const etsy = `# Etsy Listing — ${quote}

**Title:**
${quote} ${product} | Bold Feminine Cheeky Quote Tee | Statement Gift for Her

**Short description:**
${quote} — a bold, cheeky, feminine ${product} for the girl who's all sweetness and steel. Premium print, everyday wearable.

**Long description:**
Meet "${quote}" — for the girl who smiles soft and stands her ground.

- Statement quote design, printed bold and clean (${placement} print).
- Soft, premium fabric built for everyday confidence.
- Perfect for ${audience}.
- A cheeky, feminine gift that actually gets worn.

Care: machine wash cold, inside out, tumble dry low.
Made-to-order and printed with love.

**Bullet points:**
- Bold feminine quote: "${quote}"
- Premium, wearable, made-to-order
- Great gift for her
- Multiple sizes & colors
- Designed for comfort + confidence

**SEO tags (13):**
feminine quote tee, cheeky shirt, savage girl tee, statement tshirt, gift for her, bold women tee, aesthetic tee, sassy quote, trendy tee, girl boss gift, quote tshirt, ${style.split(',')[0].trim()} tee, oversized tee

**Alt text:**
${product} showing the quote "${quote}" in bold feminine typography, ${placement} print.

**Variant names:** Black / White / Sand · S / M / L / XL / 2XL · Front / Back print
`;

const shopify = `# Shopify Listing — ${quote}

**Title:** ${quote} — ${product}

**Short description:**
Bold outside, savage inside. "${quote}" on a premium ${product} for the modern, cheeky, feminine icon.

**Long description (HTML):**
<p>Some girls are sweet. Some are savage. You're both — and this says it out loud.</p>
<p><strong>"${quote}"</strong> printed ${placement} in bold feminine typography on a soft, premium ${product}.</p>
<ul>
  <li>Made-to-order, high-resolution print</li>
  <li>Comfortable, everyday-wearable fit</li>
  <li>Perfect for ${audience}</li>
</ul>
<p>Pair it with attitude. Ships worldwide.</p>

**Highlights:**
- Statement feminine quote design
- Premium fabric, true-to-color print
- Front or back placement options
- Sizes S–2XL

**Meta description:**
Shop "${quote}" — a bold, cheeky, feminine ${product}. Premium print, made to order.

**Tags:** feminine, cheeky, savage, quote, gift-for-her, statement-tee
**Collections:** New Arrivals, Quote Tees

**Alt text:** ${product} showing the quote "${quote}" in bold feminine typography, ${placement} print.
`;

const amazonIg = `# Amazon + Instagram — ${quote}

## Amazon

**Title:** Women's ${product} "${quote}" Bold Feminine Cheeky Quote Graphic Tee

**Bullet points:**
- BOLD FEMININE STATEMENT: "${quote}" for sweet-yet-savage energy.
- PREMIUM PRINT: crisp, durable graphic that lasts wash after wash.
- COMFORT FIT: soft, everyday-wearable fabric.
- GREAT GIFT: perfect for ${audience}.
- MULTIPLE OPTIONS: sizes S–2XL, front/back placement, multiple colors.

**Description:**
"${quote}" — a cheeky, feminine, modern graphic ${product}. Made to order with a high-resolution ${placement} print.

**Backend search terms:**
feminine quote tee cheeky savage statement shirt gift for her trendy women graphic tee oversized

## Instagram

**Caption:**
${quote} 🖤
Which one are you today? 👇
New drop: "${quote}" — bold, feminine, unbothered.
Tap the link to make it yours.

**Hashtags:**
#quotetshirt #feminineenergy #savagequotes #cheekytees #statementtee #giftforher #bossbabe #trendytshirt #womenwhoslay #aesthetictee #ootd #shopsmall

**Suggested audience:** ${audience}
**Suggested product type:** ${product}
`;

console.log(`\nWriting listing copy for ${slug}:`);
writeSafe(path.join(dir, `${slug}__listing__all__etsy.md`), etsy, { force });
writeSafe(path.join(dir, `${slug}__listing__all__shopify.md`), shopify, { force });
writeSafe(path.join(dir, `${slug}__listing__all__amazon-instagram.md`), amazonIg, { force });
console.log('');

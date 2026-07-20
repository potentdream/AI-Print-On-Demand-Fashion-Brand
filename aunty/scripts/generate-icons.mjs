// Generates PWA icons + favicon from the Aunty mark.
// Run: node scripts/generate-icons.mjs   (outputs are committed)
// Keep the SVG here in sync with components/aunty-mark.tsx (judging mood).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INK = "#1b2153";
const PAPER = "#f6f5f1";
const RANI = "#d6156c";
const GOLD = "#e9a13b";

// pad: extra safe-zone margin (fraction of canvas) for maskable icons.
function markSvg({ bg, pad = 0 }) {
  const inner = 96;
  const size = inner / (1 - 2 * pad);
  const off = (size - inner) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <g transform="translate(${off} ${off})">
    <path d="M22 46 C20 24 36 14 50 14 C66 14 78 26 76 46 L70 46 C71 30 62 21 50 21 C37 21 27 30 28 46 Z" fill="${INK}"/>
    <circle cx="18" cy="38" r="9" fill="${INK}"/>
    <circle cx="18" cy="38" r="3.2" fill="${GOLD}"/>
    <circle cx="49" cy="36" r="3.4" fill="${RANI}"/>
    <g stroke="${GOLD}" stroke-width="3.4" fill="none">
      <circle cx="36" cy="54" r="11.5"/>
      <circle cx="62" cy="54" r="11.5"/>
      <path d="M47.5 52 Q49 50.5 50.5 52"/>
      <path d="M24.5 51 L20 48.5 M73.5 51 L78 48.5" stroke-linecap="round"/>
    </g>
    <g stroke="${INK}" stroke-width="2.6" stroke-linecap="round">
      <path d="M31 54.5 L41 54.5 M57 54.5 L67 54.5"/>
      <path d="M43 76 Q49 79 55 76" fill="none"/>
    </g>
    <g fill="${INK}">
      <circle cx="21.5" cy="62" r="2.6"/>
      <circle cx="76.5" cy="62" r="2.6"/>
      <circle cx="21.5" cy="67.5" r="1.6"/>
      <circle cx="76.5" cy="67.5" r="1.6"/>
    </g>
  </g>
</svg>`;
}

const root = path.resolve(import.meta.dirname, "..");
const iconsDir = path.join(root, "public", "icons");
await mkdir(iconsDir, { recursive: true });

const plain = Buffer.from(markSvg({ bg: PAPER, pad: 0.06 }));
const maskable = Buffer.from(markSvg({ bg: PAPER, pad: 0.14 }));

const jobs = [
  [plain, 192, path.join(iconsDir, "icon-192.png")],
  [plain, 512, path.join(iconsDir, "icon-512.png")],
  [maskable, 512, path.join(iconsDir, "icon-maskable-512.png")],
  [plain, 180, path.join(root, "app", "apple-icon.png")],
];

for (const [svg, size, out] of jobs) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log(`✓ ${path.relative(root, out)} (${size}px)`);
}

// Vector favicon (Next.js app/icon.svg convention) — transparent bg, ink mark.
await writeFile(
  path.join(root, "app", "icon.svg"),
  markSvg({ bg: "transparent", pad: 0.02 }),
);
console.log("✓ app/icon.svg");

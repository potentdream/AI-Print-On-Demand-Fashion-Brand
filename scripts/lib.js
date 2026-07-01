'use strict';

/**
 * Shared helpers for the POD workflow scripts.
 * Pure Node, no dependencies.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DESIGNS_DIR = path.join(ROOT, 'designs');
const SUBFOLDERS = ['print-ready', 'mockups', 'prompts', 'listing-copy', 'source'];

/** Turn a quote into a filesystem-safe slug (see automation/naming-rules.md). */
function slugify(quote) {
  return String(quote)
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/['".,!?:;()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Minimal `--flag value` / `--flag=value` / `--bool` parser. */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const eq = token.indexOf('=');
    if (eq !== -1) {
      args[token.slice(2, eq)] = token.slice(eq + 1);
    } else {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[token.slice(2)] = true;
      } else {
        args[token.slice(2)] = next;
        i++;
      }
    }
  }
  return args;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Write only if missing (never overwrite) unless force is true. */
function writeSafe(filePath, content, { force = false } = {}) {
  if (fs.existsSync(filePath) && !force) {
    console.log(`  • skip (exists): ${rel(filePath)}`);
    return false;
  }
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`  ✓ wrote: ${rel(filePath)}`);
  return true;
}

function rel(p) {
  return path.relative(ROOT, p) || p;
}

function designDir(slug) {
  return path.join(DESIGNS_DIR, slug);
}

function readBrief(slug) {
  const briefPath = path.join(designDir(slug), 'source', 'brief.json');
  if (!fs.existsSync(briefPath)) {
    throw new Error(
      `No brief found for "${slug}". Run: npm run new-design -- --quote "..." first.`
    );
  }
  return JSON.parse(fs.readFileSync(briefPath, 'utf8'));
}

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

module.exports = {
  ROOT,
  DESIGNS_DIR,
  SUBFOLDERS,
  slugify,
  parseArgs,
  ensureDir,
  writeSafe,
  rel,
  designDir,
  readBrief,
  fail,
};

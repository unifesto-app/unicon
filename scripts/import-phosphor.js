// Copies Phosphor (MIT) SVGs into glyphs/<weight>/<name>.svg as starting shapes.
// Never overwrites an existing file, so redrawn glyphs are safe. Pass --force to re-import.
//
//   node scripts/import-phosphor.js Ticket CalendarBlank house
//   cat names.txt | node scripts/import-phosphor.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(rootDir, "node_modules/@phosphor-icons/core/assets");
const OUT = path.join(rootDir, "glyphs");
const WEIGHTS = ["regular", "light", "bold", "fill", "duotone"]; // thin is unused by our apps

const force = process.argv.includes("--force");
let names = process.argv.slice(2).filter((a) => a !== "--force");
if (names.length === 0 && !process.stdin.isTTY) names = fs.readFileSync(0, "utf8").split(/\s+/);

// "CalendarBlank" / "CalendarBlankIcon" / "calendar-blank" -> "calendar-blank"
const toKebab = (n) =>
  n
    .replace(/Icon$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

let copied = 0, skipped = 0;
const missing = [];
for (const name of [...new Set(names.filter(Boolean).map(toKebab))].sort()) {
  for (const weight of WEIGHTS) {
    const file = weight === "regular" ? `${name}.svg` : `${name}-${weight}.svg`;
    const src = path.join(SRC, weight, file);
    const dest = path.join(OUT, weight, `${name}.svg`);
    if (!fs.existsSync(src)) { missing.push(`${weight}/${name}`); continue; }
    if (fs.existsSync(dest) && !force) { skipped++; continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
  }
}

console.log(`Copied ${copied} SVGs, skipped ${skipped} existing.`);
if (missing.length) {
  console.error(`Not found in Phosphor: ${missing.join(", ")}`);
  process.exit(1);
}

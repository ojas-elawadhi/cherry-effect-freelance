import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "public", "TCELogo.png");
const out = path.join(root, "public", "TCELogo-nobg.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Sample the four corners to determine the background colour.
const corners = [
  [0, 0],
  [width - 1, 0],
  [0, height - 1],
  [width - 1, height - 1],
];
let br = 0,
  bg = 0,
  bb = 0;
for (const [x, y] of corners) {
  const i = (y * width + x) * channels;
  br += data[i];
  bg += data[i + 1];
  bb += data[i + 2];
}
br = Math.round(br / corners.length);
bg = Math.round(bg / corners.length);
bb = Math.round(bb / corners.length);

// Inner radius -> fully transparent, outer radius -> feathered edge.
const inner = 70;
const outer = 115;

for (let p = 0; p < data.length; p += channels) {
  const dr = data[p] - br;
  const dg = data[p + 1] - bg;
  const db = data[p + 2] - bb;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);

  if (dist <= inner) {
    data[p + 3] = 0;
  } else if (dist < outer) {
    const t = (dist - inner) / (outer - inner);
    data[p + 3] = Math.round(data[p + 3] * t);
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(out);

console.log(`background rgb(${br}, ${bg}, ${bb}) -> ${out}`);

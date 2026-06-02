import fs from "fs";
import path from "path";
import sharp from "sharp";

const sizes = [24, 32, 48, 64, 128, 256, 512, 1024];

for (const size of sizes) {
  fs.mkdirSync(`dist/${size}`, { recursive: true });
}

const files = fs.readdirSync("exports");

(async () => {
  for (const file of files) {
    if (!file.endsWith(".png")) continue;

    const iconName = path.basename(file, ".png");

    for (const size of sizes) {
      await sharp(`exports/${file}`)
        .resize(size, size)
        .png()
        .toFile(`dist/${size}/${iconName}.png`);
    }

    console.log(`✓ ${iconName}`);
  }
})();

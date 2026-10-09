// Holt ein Bild aus dem eise.de-Rohbestand (_analyse/img-raw/<thema>/NN.webp) nach public/images.
// Aufruf: node scripts/pick-image.mjs <thema> <nr> <ziel-ohne-endung> [breite] [grau] [hellNN = NN% Weiß darüber]
// Beispiel: node scripts/pick-image.mjs schwimmteiche 05 leistungen/schwimmteiche-1 1400
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export async function pick(thema, nr, ziel, breite = 1400, modus = '') {
  const src = `_analyse/img-raw/${thema}/${String(nr).padStart(2, '0')}.webp`;
  const out = `public/images/${ziel}.webp`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  let img = sharp(src).resize({ width: breite, withoutEnlargement: true });
  if (modus.includes('grau')) img = img.grayscale();
  const w = modus.match(/hell(\d+)/);
  if (w) {
    const buf = await img.toBuffer({ resolveWithObject: true });
    const svg = Buffer.from('<svg width="'+buf.info.width+'" height="'+buf.info.height+'"><rect width="100%" height="100%" fill="#fff" fill-opacity="'+(+w[1]/100)+'"/></svg>');
    img = sharp(buf.data).composite([{ input: svg }]);
  }
  await img.webp({ quality: 80 }).toFile(out);
  return out;
}

if (process.argv[1].endsWith('pick-image.mjs')) {
  const [, , thema, nr, ziel, breite, modus] = process.argv;
  console.log(await pick(thema, nr, ziel, breite ? +breite : 1400, modus || ''));
}

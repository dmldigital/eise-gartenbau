import fs from 'node:fs';
import sharp from 'sharp';
import { pick } from './pick-image.mjs';

// Hero 1 in Originalgröße (2560 px) von eise.de
const heroUrl = 'https://eise.de/eise-wAssets/img/slides/weblication/wThumbnails/ae2a0420-83b0f3bb-ecb04a97@2560w.webp';
const buf = Buffer.from(await (await fetch(heroUrl, { headers: { 'user-agent': 'Mozilla/5.0' } })).arrayBuffer());
fs.mkdirSync('public/images', { recursive: true });
await sharp(buf).resize({ width: 2000 }).webp({ quality: 80 }).toFile('public/images/hero-pool.webp');

const jobs = [
  ['schwimmteiche', 1, 'hero-schwimmteich', 1400],
  ['home', 4, 'hero-natursteintreppe', 1400],
  ['historie', 6, 'trust-team', 1400],
  ['home', 10, 'trust-heckenschnitt', 900],
  ['planung-und-gestaltung', 6, 'trust-gartenplan', 1000],
  ['firmengarten', 4, 'faq-bg', 1400, 'hell55'],
  ['pflanzen-und-rasen', 16, 'work-bg', 2000, 'hell20'],
  ['pflanzen-und-rasen', 20, 'footer-bg', 1800, 'grau'],
  ['home', 9, 'wissen-gartentipps', 1000],
  ['moderner-garten', 19, 'wissen-kundenstimmen', 1000],
  ['hier-entsteht-ein-garten', 4, 'wissen-entstehung', 1000],
];
for (const [t, n, z, w, m] of jobs) console.log(await pick(t, n, z, w, m || ''));
fs.copyFileSync('_analyse/logo.svg', 'public/images/eise-logo.svg');
await sharp('_analyse/logo.svg', { density: 200 }).resize({ width: 840 }).png().toFile('public/images/eise-logo.png');
await sharp('_analyse/logo.svg', { density: 200 }).resize({ width: 1200, height: 630, fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile('public/images/og-eise.png');
console.log('fertig');

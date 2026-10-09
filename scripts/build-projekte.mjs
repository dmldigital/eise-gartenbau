// Gruppiert die eise.de-Projektfotos nach Projekt (Ort + Leistung) und schreibt src/data/projekte.ts.
import fs from 'node:fs';
import sharp from 'sharp';
const projects = JSON.parse(fs.readFileSync('_analyse/projects.json', 'utf8'));
const ortFull = (ort, land) => ort.replace('Weil am Rhein-Ötlingen', 'Weil am Rhein - Ötlingen') + (land !== 'DE' ? ' ' + land : '');
const find = (page, titel, ort, land) => projects.find((p) => p.page === page && p.caption && p.caption.startsWith(titel + ' in ') && p.caption.endsWith(ortFull(ort, land)));

// [Seite, Ordner, Titel, Ort, Land, Kategorie, Leistung, URL der passenden Leistungsseite]
const S = '/eise/schwimmteiche/', N = '/eise/pool/natur-bio.php', M = '/eise/mauern-und-bodenbelaege/', F = '/eise/firmengarten/';
const list = [
  [S, 'projekt1', 'Moderner Badeteich mit Wasserspiel', 'Schwörstadt', 'DE', 'Schwimmteich', 'Schwimmteich mit Wasserspiel', '/leistungen/schwimmteiche/'],
  [S, 'projekt2', 'Naturnaher Schwimmteich', 'Lörrach', 'DE', 'Schwimmteich', 'Naturnaher Schwimmteich', '/leistungen/schwimmteiche/'],
  [S, 'projekt3', 'Schwimmteich im mediterranen Garten', 'Neuwiller', 'FR', 'Schwimmteich', 'Schwimmteich, mediterrane Bepflanzung', '/leistungen/schwimmteiche/'],
  [S, 'projekt4', 'Moderner, naturnaher Badeteich', 'Lörrach', 'DE', 'Schwimmteich', 'Badeteich mit moderner Gestaltung', '/leistungen/schwimmteiche/'],
  [S, 'projekt5', 'Schwimmteich mit Sitzecke', 'Neuenburg', 'DE', 'Schwimmteich', 'Schwimmteich mit Terrasse', '/leistungen/schwimmteiche/'],
  [S, 'projekt6', 'Naturnaher Badeteich', 'Basel', 'CH', 'Schwimmteich', 'Naturnaher Badeteich', '/leistungen/schwimmteiche/'],
  [S, 'projekt7', 'Badeteich mit Gartenhaus', 'Niedereggenen', 'DE', 'Schwimmteich', 'Badeteich mit Gartenhaus', '/leistungen/schwimmteiche/'],
  [S, 'projekt8', 'Schwimmteich mit Quellstein', 'Schopfheim', 'DE', 'Schwimmteich', 'Schwimmteich mit Quellstein', '/leistungen/schwimmteiche/'],
  [N, 'projekt1', 'Moderner Bio-Pool', 'Oberwil', 'CH', 'Naturpool', 'Natur- und Biopool', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt2', 'Naturnaher Garten mit Pool und Sauna', 'Binzen', 'DE', 'Naturpool', 'Naturpool mit Sauna', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt3', 'Natur-Pool mit Sitzecke und Arena', 'Schopfheim', 'DE', 'Naturpool', 'Naturpool mit Sitzarena', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt4', 'Loungebecken mit Sauna als Bio-Pool', 'Wyhlen', 'DE', 'Naturpool', 'Biopool mit Sauna', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt5', 'Natur-Pool mit Sitzquadern', 'Murg', 'DE', 'Naturpool', 'Naturpool mit Sitzquadern', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt6', 'Natur-Pool mit viel Holz', 'Leymen', 'FR', 'Naturpool', 'Naturpool mit Holzdeck', '/leistungen/pools/naturpool-biopool/'],
  [N, 'projekt7', 'Hanggrundstück mit Bio-Pool', 'Reinach', 'CH', 'Naturpool', 'Biopool am Hang', '/leistungen/pools/naturpool-biopool/'],
  [M, 'projekt1', 'Modern gestalteter Garten', 'Laufenburg', 'DE', 'Garten & Terrasse', 'Garten, Pool und Natursteinbeläge', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt2', 'Romantische Loungeecke', 'Biel-Benken', 'CH', 'Garten & Terrasse', 'Terrasse und Loungeecke', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt4', 'Moderne Gestaltung mit Pool', 'Lörrach', 'DE', 'Garten & Terrasse', 'Pool, Terrasse und Beläge', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt5', 'Arena aus Sitzquadern', 'Schopfheim', 'DE', 'Garten & Terrasse', 'Sitzquader und Natursteinmauern', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt6', 'Naturnaher Garten mit Pool', 'Binzen', 'DE', 'Garten & Terrasse', 'Garten, Pool und Mauern', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt7', 'Mediterraner, naturnaher Garten', 'Leymen', 'FR', 'Garten & Terrasse', 'Mediterraner Naturgarten', '/leistungen/mediterraner-garten/'],
  [M, 'projekt9', 'Moderne Gestaltung mit Wasserelement', 'Biel-Benken', 'CH', 'Garten & Terrasse', 'Wasserelement und Natursteinwand', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt10', 'Garten in Hanglage', 'Grenzach', 'DE', 'Garten & Terrasse', 'Hanggarten mit Treppen', '/leistungen/mauern-treppen-bodenbelaege/'],
  [M, 'projekt12', 'Sonnendeck mit mediterraner Gestaltung', 'Weil am Rhein-Ötlingen', 'DE', 'Garten & Terrasse', 'Sonnendeck und Bepflanzung', '/leistungen/mediterraner-garten/'],
  [M, 'projekt14', 'Loungebecken im mediterranen Garten', 'Kaiseraugst', 'CH', 'Garten & Terrasse', 'Loungebecken und Terrasse', '/leistungen/mediterraner-garten/'],
  [F, 'projekt1', 'Firmengarten mit üppiger Bepflanzung', 'Weil am Rhein', 'DE', 'Firmengarten', 'Gestaltung und Bepflanzung', '/leistungen/firmengaerten/'],
  [F, 'projekt2', 'Naturnaher Firmengarten', 'Maulburg', 'DE', 'Firmengarten', 'Naturnahe Anlage', '/leistungen/firmengaerten/'],
  [F, 'projekt3', 'Bürogarten', 'Haltingen', 'DE', 'Firmengarten', 'Außenanlage am Bürogebäude', '/leistungen/firmengaerten/'],
];
const slug = (s) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
fs.mkdirSync('public/images/referenzen', { recursive: true });
const out = [];
for (const [page, dir, titel, ort, land, kategorie, leistung, href] of list) {
  const p = find(page, titel, ort, land);
  if (!p) { console.log('FEHLT', page, titel, ort); continue; }
  const basis = `${slug(kategorie)}-${slug(ort)}`;
  const id = `${basis}-${out.filter((o) => o.id.startsWith(basis)).length + 1}`;
  const bilder = [];
  for (let i = 0; i < Math.min(3, p.images.length); i++) {
    const res = await fetch('https://eise.de' + p.images[i], { headers: { 'user-agent': 'Mozilla/5.0' } });
    const buf = Buffer.from(await res.arrayBuffer());
    const file = `referenzen/${id}-${i + 1}.webp`;
    await sharp(buf).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/images/${file}`);
    bilder.push(`/images/${file}`);
  }
  out.push({ id, titel, ort, land, kategorie, leistung, href, bilder });
}
const ts = `// Automatisch erzeugt von scripts/build-projekte.mjs aus den Projektfotos von eise.de.
export interface Projekt {
  id: string;
  titel: string;
  ort: string;
  land: 'DE' | 'CH' | 'FR';
  kategorie: string;
  leistung: string;
  href: string;
  bilder: string[];
}

export const projekte: Projekt[] = ${JSON.stringify(out, null, 2)};

export const ortLabel = (p: Projekt) => (p.land === 'DE' ? p.ort : p.ort + ' (' + p.land + ')');
`;
fs.writeFileSync('src/data/projekte.ts', ts);
console.log(out.length, 'Projekte');

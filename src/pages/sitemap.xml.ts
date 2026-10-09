import type { APIRoute } from 'astro';
import { seiten } from '../data/seiten';

// Nur Seiten, die es als Datei in src/pages wirklich gibt – so wächst die Sitemap mit den fertigen Seiten mit.
const vorhanden = new Set(
  Object.keys(import.meta.glob('./**/*.astro')).map((datei) => {
    const route = datei.replace(/^\.\//, '').replace(/\.astro$/, '').replace(/index$/, '');
    return `/${route}${route && !route.endsWith('/') ? '/' : ''}`;
  }),
);

export const GET: APIRoute = ({ site }) => {
  const basis = (site?.origin ?? 'https://eise.de') + import.meta.env.BASE_URL.replace(/\/$/, '');
  const urls = seiten
    .filter((s) => vorhanden.has(s.path) && !['/impressum/', '/datenschutz/', '/barrierefreiheit/'].includes(s.path))
    .map((s) => `  <url><loc>${basis}${s.path}</loc><priority>${s.prio.toFixed(1)}</priority></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

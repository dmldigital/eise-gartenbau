import { defineMiddleware } from 'astro:middleware';

/**
 * Schalter für die Links auf andere Seiten der Website.
 * Solange die Unterseiten noch nicht fertig sind, werden alle internen Links auf andere Seiten aus dem HTML entfernt:
 * Menüpunkte, Karten und Buttons bleiben sichtbar, führen aber nirgends hin.
 * Bleiben: Sprungmarken auf derselben Seite (#…), "/" bzw. "/#…", mailto:, tel: und externe Links.
 * Auf `true` setzen, sobald die Unterseiten stehen – dann sind alle Links wieder aktiv.
 */
const LINKS_ZU_ANDEREN_SEITEN_AKTIV = false;

/**
 * Läuft die Seite unter einem Unterpfad (GitHub Pages: /eise-gartenbau/), bekommen alle fest eingetragenen
 * Pfade der Form "/images/…" bzw. url(/…) dieses Präfix. Pfade, die Astro schon mit dem Unterpfad versehen hat, bleiben unberührt.
 */
const BASIS = import.meta.env.BASE_URL.replace(/\/$/, ''); // '' oder '/eise-gartenbau'

const mitBasis = (pfad: string) => (!BASIS || pfad === BASIS || pfad.startsWith(`${BASIS}/`) ? pfad : `${BASIS}${pfad}`);

export const onRequest = defineMiddleware(async (_context, next) => {
  const antwort = await next();
  if (!(antwort.headers.get('content-type') ?? '').includes('text/html')) return antwort;

  let html = await antwort.text();

  if (!LINKS_ZU_ANDEREN_SEITEN_AKTIV) {
    html = html.replace(/<a\b[^>]*>/g, (tag) => tag.replace(/\shref="\/(?![#"])[^"]*"/, ''));
  }

  if (BASIS) {
    html = html
      .replace(/(\s(?:href|src|poster)=")(\/(?!\/)[^"]*)"/g, (_m, davor, pfad) => `${davor}${mitBasis(pfad)}"`)
      .replace(/url\((['"]?)(\/(?!\/)[^)'"]*)\1\)/g, (_m, q, pfad) => `url(${q}${mitBasis(pfad)}${q})`);
  }

  return new Response(html, { status: antwort.status, statusText: antwort.statusText, headers: antwort.headers });
});

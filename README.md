# Eise Garten- und Landschaftsbau – Website (Astro)

Neue Startseite für [eise.de](https://eise.de): Astro 7, Tailwind 4, GSAP, Lenis.

```bash
npm ci
npm run dev      # http://localhost:4322
npm run build    # statisch nach dist/
```

- **Sitemap und Seitenstruktur:** `SITEMAP.md`, Titel/Descriptions je Seite in `src/data/seiten.ts`
- **Stammdaten (Adresse, Telefon):** `src/data/firma.ts`
- **Links zu anderen Seiten:** per Schalter in `src/middleware.ts` abgeschaltet, solange die Unterseiten nicht fertig sind
- **Vorschau:** wird bei jedem Push auf `main` per GitHub Actions gebaut und unter dem Unterpfad `/eise-gartenbau/` veröffentlicht (`noindex`)

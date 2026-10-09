# Eise Garten- und Landschaftsbau – neue Sitemap & Startseiten-Konzept

Stand der Analyse von eise.de: 38 Seiten gecrawlt (Texte, Bilder, Titel, Links). Alle Inhalte, Bilder und Daten der neuen Seite stammen von eise.de.

## Befund (Ist-Zustand eise.de)

| Thema | Befund | Folge |
|---|---|---|
| URL-Aufbau | Alles unter `/eise/…`, Dateiendungen `.php`, Zusatz `?navid=…` | Saubere Wurzel-URLs, ohne `.php`, ohne Parameter, 301-Weiterleitungen |
| Dünne Seiten | `licht.php` / `ambiente.php` (~400 Zeichen), `anfahrt` (~200), `teamevents` (~1.000), `pflege-und-service/` (Zwischenseite), `hier-entsteht-ein-garten` (kaum Text) | Zusammenlegen bzw. mit Text anreichern, damit keine Thin-Content-Seiten entstehen |
| Duplikate | `/datenschutz` und `/datenschutz/`, `ueber-uns/?navid=…` | Eine kanonische URL pro Seite |
| Titles | Neue, keywordstarke Titles sind schon vorhanden (z. B. „Schwimmteiche – Natürliches Badevergnügen …“) | Übernehmen und auf ≤ 60 Zeichen straffen |
| Lokaler Bezug | Projekte nennen Orte (Lörrach, Binzen, Schopfheim, Basel CH, Leymen FR …), werden aber nicht als Referenz-Seiten genutzt | Referenzen mit Ort + Leistung als eigene, indexierbare Seite |
| Marke | Familienbetrieb seit 1952, 3. Generation, 35 Mitarbeitende, Standorte Weil am Rhein (D) und Basel (CH) | Vertrauens-Sektion, Zahlen, LocalBusiness-Schema mit zwei Standorten |
| Farben | Grün `#299738`, Gelb `#ffd712`, Anthrazit `#353535`, Creme `#efeade`, Schrift Open Sans | Gugenberger-Orange → Eise-Grün, Gelb als Akzent |

## Neue Sitemap (Zielstruktur)

Ebene 1 = Hauptnavigation, Ebene 2/3 = Silos. Alle URLs mit abschließendem Slash, ohne Dateiendung.

```
/                                              Startseite
├── /leistungen/                               Hub: alle Leistungen
│   ├── /leistungen/gartenplanung/             ← /eise/planung-und-gestaltung/
│   ├── /leistungen/pools/                     ← /eise/pool/
│   │   ├── /leistungen/pools/naturpool-biopool/        ← pool/natur-bio.php
│   │   ├── /leistungen/pools/chlorpool/                ← pool/chlor.php
│   │   ├── /leistungen/pools/salzwasserpool/           ← pool/salz.php
│   │   └── /leistungen/pools/poolgroessen-formen/      ← pool/groesse-und-formen.php
│   ├── /leistungen/schwimmteiche/             ← /eise/schwimmteiche/
│   ├── /leistungen/mauern-treppen-bodenbelaege/   ← /eise/mauern-und-bodenbelaege/
│   ├── /leistungen/gartenhaus-sauna/          ← /eise/sauna-und-gartenhaus/
│   ├── /leistungen/sichtschutz/               ← /eise/sichtschutz/
│   ├── /leistungen/gartenbeleuchtung/         ← licht-und-ambiente/ + licht.php + ambiente.php (zusammengelegt)
│   ├── /leistungen/pflanzen-rasen/            ← /eise/pflanzen-und-rasen/
│   ├── /leistungen/gartenpflege/              ← pflege-und-service/ + pflege-und-service.php
│   ├── /leistungen/mediterraner-garten/       ← /eise/mediterran-und-naturgarten/
│   ├── /leistungen/moderner-garten/           ← /eise/moderner-garten/
│   └── /leistungen/firmengaerten/             ← /eise/firmengarten/
├── /referenzen/                               Projekte mit Ort + Leistung
│   └── /referenzen/entstehung-eines-gartens/  ← /eise/hier-entsteht-ein-garten/
├── /kundenstimmen/                            ← /eise/kundenstimmen/
├── /gartentipps/                              ← pflege-und-service/gartentipps.php (Ratgeber-Hub, wächst)
├── /ueber-uns/                                Firmenprofil (neu: Hub mit Zahlen, Philosophie)
│   ├── /ueber-uns/team/                       ← /eise/ueber-uns/
│   ├── /ueber-uns/geschichte-philosophie/     ← /eise/historie/
│   ├── /ueber-uns/partner/                    ← /eise/partner/
│   └── /ueber-uns/engagement/                 ← /eise/engagement/
├── /karriere/                                 ← /eise/arbeiten-bei-firma-eise/ (+ Teamevents als Abschnitt)
│   ├── /karriere/jobangebote/                 ← …/jobangebote.php
│   ├── /karriere/ausbildung-praktikum/        ← …/ausbildung-und-praktikum.php
│   └── /karriere/bewerbung/                   ← /eise/kontakt/bewerbung.php
├── /kontakt/                                  ← /eise/kontakt/ + /eise/anfahrt/ (zusammengelegt, zwei Standorte)
├── /impressum/    /datenschutz/    /barrierefreiheit/
└── /sitemap.xml   /robots.txt
```

35 indexierbare Seiten (vorher 38 URLs, davon 6 dünne oder doppelte zusammengelegt, ein neuer Firmenprofil-Hub unter `/ueber-uns/`). Die 301-Weiterleitungen stehen in `public/_redirects`.

## Seiten-Matrix (Title ≤ 60, eine H1 je Seite)

| URL | Title | H1 | Such-Absicht |
|---|---|---|---|
| `/` | Garten- und Landschaftsbau Weil am Rhein, Lörrach & Basel \| Eise | Natürlich schöne Gärten. Seit drei Generationen. | Marke + Gartenbau Dreiländereck |
| `/leistungen/` | Leistungen im Garten- und Landschaftsbau \| Eise | Alles für Ihren Garten – aus einer Hand | Überblick |
| `/leistungen/gartenplanung/` | Gartenplanung & Gartengestaltung in Weil am Rhein \| Eise | Planung & Gestaltung | Gartenplaner |
| `/leistungen/pools/` | Pool im Garten bauen lassen – Weil am Rhein & Lörrach \| Eise | Der Pool | Poolbau |
| `/leistungen/pools/naturpool-biopool/` | Naturpool & Biopool im Garten \| Eise | Natur- und Biopools | Naturpool |
| `/leistungen/pools/chlorpool/` | Chlorpool im Garten bauen \| Eise | Chlorpools | Chlorpool |
| `/leistungen/pools/salzwasserpool/` | Salzwasserpool im Garten bauen \| Eise | Salzwasserpools | Salzwasserpool |
| `/leistungen/pools/poolgroessen-formen/` | Poolgrößen & Formen im Überblick \| Eise | Größen & Formen | Pool Größe |
| `/leistungen/schwimmteiche/` | Schwimmteich & Badeteich bauen – Dreiländereck \| Eise | Schwimmteiche | Schwimmteich |
| `/leistungen/mauern-treppen-bodenbelaege/` | Mauern, Treppen & Terrassenbeläge im Garten \| Eise | Mauern, Treppen & Bodenbeläge | Terrasse/Mauer |
| `/leistungen/gartenhaus-sauna/` | Gartenhaus & Gartensauna planen und bauen \| Eise | Gartenhaus & Sauna | Gartensauna |
| `/leistungen/sichtschutz/` | Sichtschutz im Garten – Holz, Stein, Cortenstahl \| Eise | Sichtschutz | Sichtschutz |
| `/leistungen/gartenbeleuchtung/` | Gartenbeleuchtung & Ambiente \| Eise | Licht & Ambiente | Gartenbeleuchtung |
| `/leistungen/pflanzen-rasen/` | Bepflanzung & Rasen anlegen \| Eise | Pflanzen & Rasen | Rasen anlegen |
| `/leistungen/gartenpflege/` | Gartenpflege & Service in Weil am Rhein \| Eise | Pflege & Service | Gartenpflege |
| `/leistungen/mediterraner-garten/` | Mediterraner Garten & Naturgarten gestalten \| Eise | Mediterran & Naturgarten | Gartenstil |
| `/leistungen/moderner-garten/` | Moderner Garten gestalten lassen \| Eise | Moderner Garten | Gartenstil |
| `/leistungen/firmengaerten/` | Firmengarten & Außenanlagen für Unternehmen \| Eise | Firmengärten | B2B |
| `/referenzen/` | Gartenprojekte & Referenzen aus dem Dreiländereck \| Eise | Gärten, die bleiben. | Beweis, Ortsbezug |
| `/referenzen/entstehung-eines-gartens/` | So entsteht ein Garten – Baustellen-Einblicke \| Eise | Hier entsteht ein Garten | Vertrauen |
| `/kundenstimmen/` | Kundenstimmen – Bewertungen zu Eise Gartenbau | Kundenstimmen – unsere beste Referenz | Vertrauen |
| `/gartentipps/` | Gartentipps vom Landschaftsgärtner \| Eise | Gartentipps | Ratgeber |
| `/ueber-uns/` | Über Eise – Familienbetrieb seit 1952 | Drei Generationen. Ein Anspruch. | Marke |
| `/ueber-uns/team/` | Unser Team – Landschaftsgärtner im Dreiländereck \| Eise | Unser Team | Marke/Karriere |
| `/ueber-uns/geschichte-philosophie/` | Philosophie & Firmengeschichte seit 1952 \| Eise | Philosophie & Firmengeschichte | Marke |
| `/ueber-uns/partner/` | Partner & Kooperationen \| Eise | Unsere Partner | Marke |
| `/ueber-uns/engagement/` | Regional & Sozial – Engagement von Eise | Regional & Sozial | Marke |
| `/karriere/` | Karriere im Garten- und Landschaftsbau \| Eise | Arbeiten bei Eise | Jobs |
| `/karriere/jobangebote/` | Jobs Garten- und Landschaftsbau im Dreiländereck \| Eise | Jobangebote | Jobs |
| `/karriere/ausbildung-praktikum/` | Ausbildung Landschaftsgärtner & Praktikum \| Eise | Ausbildung & Praktikum | Azubis |
| `/karriere/bewerbung/` | Online bewerben bei Eise | Online-Bewerbung | Bewerbung |
| `/kontakt/` | Kontakt & Anfahrt – Weil am Rhein und Basel \| Eise | Sprechen wir über Ihren Garten. | Anfrage |

Die Texte in `<title>`/`<meta description>` sind in den Seiten selbst hinterlegt (`src/data/seiten.ts`).

## Startseiten-Aufteilung (Layout von Gugenberger, Inhalt von Eise)

Die Reihenfolge und alle Bewegungsabläufe der Gugenberger-Startseite bleiben, Farben, Logo, Bilder und Texte sind Eise:

| # | Gugenberger-Sektion | Eise-Inhalt | Ziel (SEO / Nutzer) |
|---|---|---|---|
| 1 | Hero mit drei Bildstreifen, wächst beim Scrollen | „Natürlich schöne Gärten. Seit drei Generationen.“ · Pool / Naturteich / Natursteintreppe · CTA „Gartenberatung vereinbaren“ | H1 + Hauptkeyword + Ortsbezug im ersten Blick |
| 2 | Trust: Foto, Fließtext, Aufzählung, Zahlen, Projekt-Teaser | Team-Foto, Familienbetrieb seit 1952, 35 Mitarbeitende, 3 Generationen | Vertrauen, E-E-A-T |
| 3 | Leistungen (6 Karten, horizontal beim Scrollen) | Planung · Pools & Schwimmteiche · Mauern & Beläge · Gartenhaus, Sauna & Sichtschutz · Licht · Pflanzen, Rasen & Pflege | Interne Verlinkung auf alle Leistungs-Silos |
| 4 | Referenzen (4 große Karten) | Echte Projekte mit Ort (Schwörstadt, Lörrach, Neuwiller FR …) | Lokale Signale, Beweis |
| 5 | FAQ (Akkordeon) | Fragen zu Ablauf, Einzugsgebiet, Pools, Planung, Pflege | FAQ-Rich-Result, Long-Tail |
| 6 | Kontakt | Zwei Standorte: Weil am Rhein (D) und Basel (CH), Telefon, Anfahrt | Conversion, NAP-Daten |
| 7 | „Haltung“ (Vollbild-Bild + Kreis-Button) | „Wir leben Natur.“ → Philosophie & Geschichte | Marke |
| 8 | Wissen & Einblicke (3 Karten) | Gartentipps · Kundenstimmen · Entstehung eines Gartens | Redaktionelle Einstiege |

## Technische SEO-Umsetzung

- Ein `<h1>` je Seite, Hierarchie ohne Sprünge; Bilder mit aussagekräftigem `alt` (Ort + Motiv) und sprechenden Dateinamen.
- Canonical-URL, Open-Graph, Twitter-Card, `lang="de"`, Theme-Color auf jeder Seite (`BaseLayout`).
- Strukturierte Daten: `LocalBusiness` (`LandscapingBusiness`) mit beiden Standorten auf der Startseite und im Kontakt, `FAQPage` bei Seiten mit FAQ, `BreadcrumbList` auf allen Unterseiten.
- `sitemap.xml` wird automatisch aus der Seitenliste erzeugt, `robots.txt` verweist darauf.
- 301-Weiterleitungen für jede alte `/eise/…`-URL (`public/_redirects`).
- Kontaktformular mit Datenschutz-Checkbox bleibt (Formular-Endpunkt im Betrieb noch festzulegen).

## Phase 2 (Empfehlung, noch nicht gebaut)

- Orts-Seiten mit echten Projekten: `/einzugsgebiet/weil-am-rhein/`, `/loerrach/`, `/basel/`, `/schopfheim/` – nur mit echten Referenzen und Texten, keine Dopplungen.
- Gartentipps als einzelne Ratgeber-Artikel statt einer langen Seite (Rasen anlegen, Pool-Wasserpflege, Hecke schneiden …).
- Google-Unternehmensprofil mit identischen NAP-Daten, Bewertungen auf `/kundenstimmen/` mit `Review`-Markup.

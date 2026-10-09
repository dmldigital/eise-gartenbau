// Alle indexierbaren Seiten mit Title und Description. Quelle für <title>, <meta description> und sitemap.xml.
// Title ≤ 60 Zeichen, Description ≤ 155 Zeichen. Pfade mit abschließendem Slash.
export interface Seite {
  path: string;
  title: string;
  description: string;
  /** Sitemap-Priorität */
  prio: number;
}

export const seiten: Seite[] = [
  { path: '/', prio: 1, title: 'Garten- und Landschaftsbau Weil am Rhein, Lörrach & Basel | Eise', description: 'Eise Garten- und Landschaftsbau in Weil am Rhein: Gartenplanung, Pools, Schwimmteiche, Terrassen und Pflege. Familienbetrieb seit 1952 im Dreiländereck.' },
  { path: '/leistungen/', prio: 0.9, title: 'Leistungen im Garten- und Landschaftsbau | Eise', description: 'Planung, Pools, Schwimmteiche, Mauern, Terrassen, Sauna, Sichtschutz, Licht, Pflanzen und Pflege: Alle Gartenleistungen von Eise aus einer Hand.' },
  { path: '/leistungen/gartenplanung/', prio: 0.8, title: 'Gartenplanung & Gartengestaltung in Weil am Rhein | Eise', description: 'Individuelle Gartenplanung mit Entwurf, Visualisierung und Genehmigungsunterstützung – ästhetisch, funktional und budgetgerecht. Eise, Weil am Rhein.' },
  { path: '/leistungen/pools/', prio: 0.8, title: 'Pool im Garten bauen – Weil am Rhein & Lörrach | Eise', description: 'Individuelle Poolanlagen für Ihren Garten: Natur-, Chlor- und Salzwasserpools, Technik und Einbindung in die Umgebung aus einer Hand. Eise Gartenbau.' },
  { path: '/leistungen/pools/naturpool-biopool/', prio: 0.7, title: 'Naturpool & Biopool im Garten bauen | Eise', description: 'Naturpools und Biopools mit biologischer Wasseraufbereitung ganz ohne Chemie: Planung und Bau vom Landschaftsgärtner im Dreiländereck. Eise Gartenbau.' },
  { path: '/leistungen/pools/chlorpool/', prio: 0.7, title: 'Chlorpool im Garten bauen lassen | Eise', description: 'Klassische Chlorpools mit bewährter Filtertechnik für klare Wasserqualität: Planung, Einbau und Gestaltung durch Eise Garten- und Landschaftsbau.' },
  { path: '/leistungen/pools/salzwasserpool/', prio: 0.7, title: 'Salzwasserpool im Garten bauen lassen | Eise', description: 'Salzwasserpools für sanften Badekomfort mit moderner Technik: Planung und Einbau vom Garten- und Landschaftsbauer Eise in Weil am Rhein.' },
  { path: '/leistungen/pools/poolgroessen-formen/', prio: 0.6, title: 'Poolgrößen & Formen im Überblick | Eise', description: 'Welche Poolgröße und Form passt zu Ihrem Garten? Individuelle Lösungen für jedes Grundstück – beraten und gebaut von Eise Garten- und Landschaftsbau.' },
  { path: '/leistungen/schwimmteiche/', prio: 0.8, title: 'Schwimmteich & Badeteich bauen – Dreiländereck | Eise', description: 'Schwimmteiche und Badeteiche mit klaren Wasserzonen und natürlicher Bepflanzung: ökologisch baden im eigenen Garten. Planung und Bau von Eise.' },
  { path: '/leistungen/mauern-treppen-bodenbelaege/', prio: 0.8, title: 'Mauern, Treppen & Terrassenbeläge im Garten | Eise', description: 'Natursteinmauern, Treppen, Terrassen und Wege: stilvolle Struktur für Ihren Garten aus hochwertigen Materialien. Eise Garten- und Landschaftsbau.' },
  { path: '/leistungen/gartenhaus-sauna/', prio: 0.7, title: 'Gartenhaus & Gartensauna planen und bauen | Eise', description: 'Gartenhäuser und Saunen als persönlicher Rückzugsort: Planung, Gestaltung und Einbindung in Ihren Garten durch Eise in Weil am Rhein.' },
  { path: '/leistungen/sichtschutz/', prio: 0.7, title: 'Sichtschutz im Garten – Holz, Stein, Hecke | Eise', description: 'Privatsphäre mit Stil: Sichtschutz aus Holz, Naturstein, Cortenstahl oder Hecken passend zu Ihrem Garten. Planung und Bau von Eise Gartenbau.' },
  { path: '/leistungen/gartenbeleuchtung/', prio: 0.7, title: 'Gartenbeleuchtung & Ambiente | Eise', description: 'Stimmungsvolle Gartenbeleuchtung für Sicherheit und Atmosphäre: Licht für Terrasse, Pool, Wege und Pflanzen von Eise Garten- und Landschaftsbau.' },
  { path: '/leistungen/pflanzen-rasen/', prio: 0.7, title: 'Bepflanzung & Rasen anlegen | Eise', description: 'Individuelle Bepflanzung und Rasenflächen für einen lebendigen Garten: Planung und Pflanzarbeiten vom Landschaftsgärtner Eise im Dreiländereck.' },
  { path: '/leistungen/gartenpflege/', prio: 0.7, title: 'Gartenpflege & Service in Weil am Rhein | Eise', description: 'Rundum-sorglos-Gartenpflege für Privatgärten: damit Rasen, Hecken und Pflanzen dauerhaft schön bleiben. Eise Garten- und Landschaftsbau.' },
  { path: '/leistungen/mediterraner-garten/', prio: 0.6, title: 'Mediterraner Garten & Naturgarten gestalten | Eise', description: 'Urlaubsflair im eigenen Garten: mediterrane Gestaltung und Naturgärten mit Vielfalt und Ästhetik – geplant und gebaut von Eise Gartenbau.' },
  { path: '/leistungen/moderner-garten/', prio: 0.6, title: 'Moderner Garten gestalten lassen | Eise', description: 'Zeitgemäße Ästhetik und harmonische Gestaltung: moderne Gärten mit klaren Linien, Pool und Terrasse vom Landschaftsgärtner Eise in Weil am Rhein.' },
  { path: '/leistungen/firmengaerten/', prio: 0.6, title: 'Firmengarten & Außenanlagen für Unternehmen | Eise', description: 'Attraktive und funktionale Grünflächen für Unternehmen: Firmengärten und Außenanlagen im Raum Weil am Rhein, Lörrach und Basel. Eise Gartenbau.' },
  { path: '/referenzen/', prio: 0.8, title: 'Gartenprojekte & Referenzen aus dem Dreiländereck | Eise', description: 'Realisierte Gärten, Pools und Schwimmteiche in Lörrach, Weil am Rhein, Basel und Umgebung – alle Bilder stammen aus eigenen Projekten von Eise.' },
  { path: '/referenzen/entstehung-eines-gartens/', prio: 0.5, title: 'So entsteht ein Garten – Baustellen-Einblicke | Eise', description: 'Von der Baugrube zur Wohlfühloase: Einblicke in die Entstehung von Pool, Terrasse und Garten auf den Baustellen von Eise Garten- und Landschaftsbau.' },
  { path: '/kundenstimmen/', prio: 0.6, title: 'Kundenstimmen – Bewertungen zu Eise Gartenbau', description: 'Das sagen Auftraggeber über Eise Garten- und Landschaftsbau: ehrliches Feedback zu Planung, Umsetzung, Team und Zuverlässigkeit.' },
  { path: '/gartentipps/', prio: 0.6, title: 'Gartentipps vom Landschaftsgärtner | Eise', description: 'Praktische Gartentipps für einen gesunden und schönen Garten: Rasen, Hecken, Pflanzen und Pflege – vom Fachbetrieb Eise in Weil am Rhein.' },
  { path: '/ueber-uns/', prio: 0.6, title: 'Über Eise – Familienbetrieb seit 1952', description: 'Eise Garten- und Landschaftsbau: Familienbetrieb in dritter Generation mit 35 Mitarbeitenden, Standorten in Weil am Rhein und Basel und Leidenschaft für Gärten.' },
  { path: '/ueber-uns/team/', prio: 0.5, title: 'Unser Team – Landschaftsgärtner im Dreiländereck | Eise', description: 'Lernen Sie das Eise-Team kennen: Techniker, Meister, Landschaftsgärtner und junge Talente, die Ihre Gartenträume mit Leidenschaft umsetzen.' },
  { path: '/ueber-uns/geschichte-philosophie/', prio: 0.5, title: 'Philosophie & Firmengeschichte seit 1952 | Eise', description: 'Seit 1952 realisiert Eise Gärten im Dreiländereck: Tradition, Qualität und Respekt vor der Natur – die Geschichte des Familienbetriebs in drei Generationen.' },
  { path: '/ueber-uns/partner/', prio: 0.4, title: 'Partner & Kooperationen | Eise', description: 'Kompetente Kooperationen für hochwertige Gartengestaltung: die Partner von Eise Garten- und Landschaftsbau im Überblick.' },
  { path: '/ueber-uns/engagement/', prio: 0.4, title: 'Regional & Sozial – Engagement von Eise', description: 'Eise engagiert sich für Sport und Gesellschaft in der Region: Einblick in das regionale und soziale Engagement des Familienbetriebs.' },
  { path: '/karriere/', prio: 0.6, title: 'Karriere im Garten- und Landschaftsbau | Eise', description: 'Arbeiten bei Eise: ein familiengeführter Gartenbaubetrieb mit 35 Mitarbeitenden, Teamgeist und Teamevents. Jetzt Stellen und Ausbildung entdecken.' },
  { path: '/karriere/jobangebote/', prio: 0.6, title: 'Jobs Garten- und Landschaftsbau im Dreiländereck | Eise', description: 'Aktuelle Jobangebote im Garten- und Landschaftsbau bei Eise in Weil am Rhein: Ihre Karriere im Dreiländereck beginnt hier.' },
  { path: '/karriere/ausbildung-praktikum/', prio: 0.6, title: 'Ausbildung Landschaftsgärtner & Praktikum | Eise', description: 'Starte deine Karriere als Landschaftsgärtner: Ausbildung und Praktikum bei Eise Garten- und Landschaftsbau in Weil am Rhein.' },
  { path: '/karriere/bewerbung/', prio: 0.4, title: 'Online bewerben bei Eise Garten- und Landschaftsbau', description: 'Bewerben Sie sich online bei Eise Garten- und Landschaftsbau: einfach das Formular ausfüllen und Unterlagen mitschicken.' },
  { path: '/kontakt/', prio: 0.9, title: 'Kontakt & Anfahrt – Weil am Rhein und Basel | Eise', description: 'Kontakt zu Eise Garten- und Landschaftsbau: Lütemannsweg 2 in Weil am Rhein, Hafenstraße 13 in Basel. Telefon, E-Mail, Anfahrt und Online-Formular.' },
  { path: '/impressum/', prio: 0.1, title: 'Impressum | Eise Garten- und Landschaftsbau', description: 'Impressum von Jürgen Eise Garten- und Landschaftsbau, Weil am Rhein.' },
  { path: '/datenschutz/', prio: 0.1, title: 'Datenschutz | Eise Garten- und Landschaftsbau', description: 'Datenschutzerklärung von Jürgen Eise Garten- und Landschaftsbau.' },
  { path: '/barrierefreiheit/', prio: 0.1, title: 'Barrierefreiheit | Eise Garten- und Landschaftsbau', description: 'Informationen zur Barrierefreiheit der Website von Eise Garten- und Landschaftsbau.' },
];

/** Meta einer Seite holen – wirft bei unbekanntem Pfad, damit kein Tippfehler unbemerkt bleibt. */
export const seite = (path: string): Seite => {
  const s = seiten.find((x) => x.path === path);
  if (!s) throw new Error(`Seite ${path} fehlt in src/data/seiten.ts`);
  return s;
};

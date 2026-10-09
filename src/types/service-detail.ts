export interface ServiceDetailContent {
  /** Pfad der Seite, z. B. '/leistungen/pools/' – Title/Description kommen aus data/seiten.ts */
  path: string;
  /** Übergeordnete Seite für die Brotkrumen (neben „Leistungen“) */
  parent?: { name: string; href: string };
  /** Unterseiten (nur bei Hubs wie Pools) */
  children?: { name: string; href: string }[];
  childrenLabel?: string;
  name: string;
  eyebrow: string;
  intro: string;
  cta: string;
  /** Drei kurze Fakten unter dem Hero, z. B. ['Seit 1952', 'Weil am Rhein, Lörrach & Basel', 'Planung bis Pflege'] */
  facts: string[];
  introEyebrow: string;
  introText: string;
  /** Bild relativ zu /images/, z. B. 'referenzen/schwimmteich-basel-1-1.webp' */
  featureImage: string;
  featureAlt: string;
  featureCaption: string;
  featureEyebrow: string;
  featureText: string;
  featureTextSecond: string;
  featureCta: string;
  referenceText: string;
  relatedTitle: string;
  relatedText: string;
  relatedHref: string;
  relatedLabel: string;
  heroAccent: string;
  heroTitle: string[];
  introTitle: string[];
  featureTitle: string[];
  processTitle: string[];
  referenceTitle: string[];
  faqTitle: string[];
  checklist: [string, string][];
  /** [Bild relativ zu /images/, Bildunterschrift (Ort · Leistung), Alt-Text] – 2 bis 4 Stück */
  references: [string, string, string][];
  /** [Nummer, Titel, Text] – genau 4 Stück */
  steps: [string, string, string][];
  /** [Frage, Antwort] – 3 bis 5 Stück */
  questions: [string, string][];
}

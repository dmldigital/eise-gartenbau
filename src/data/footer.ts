// Inhalte der Fußzeile (Links zu Unterseiten, Rechtliches, Social, Kurztext, Standorte).
import { firma } from './firma';

export const navigation: [string, string][] = [
  ['Home', '/#seitenanfang'],
  ['Leistungen', '/leistungen/'],
  ['Referenzen', '/referenzen/'],
  ['Kundenstimmen', '/kundenstimmen/'],
  ['Gartentipps', '/gartentipps/'],
  ['Karriere', '/karriere/'],
  ['Kontakt', '/kontakt/'],
];

export const unternehmen: [string, string][] = [
  ['Über uns', '/ueber-uns/'],
  ['Team', '/ueber-uns/team/'],
  ['Geschichte', '/ueber-uns/geschichte-philosophie/'],
  ['Partner', '/ueber-uns/partner/'],
  ['Engagement', '/ueber-uns/engagement/'],
];

export const rechtliches: [string, string][] = [
  ['Impressum', '/impressum/'],
  ['Datenschutz', '/datenschutz/'],
  ['Barrierefreiheit', '/barrierefreiheit/'],
];

export const social: [string, string][] = [
  ['Facebook', firma.facebook],
  ['Instagram', firma.instagram],
];

export const claim =
  'Garten- und Landschaftsbau seit 1952. Planung, Pools, Schwimmteiche, Terrassen und Pflege im Dreiländereck – Weil am Rhein, Lörrach und Basel.';

export const [weil, basel] = firma.standorte;

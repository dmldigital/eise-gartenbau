import { firma } from './firma';

const adresse = (s: (typeof firma.standorte)[number]) => ({
  '@type': 'PostalAddress',
  streetAddress: s.strasse,
  postalCode: s.plz,
  addressLocality: s.ort,
  addressCountry: s.land,
});

/** LocalBusiness mit beiden Standorten – für Startseite und Kontakt. */
export const localBusiness = () => ({
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  '@id': `${firma.url}/#unternehmen`,
  name: firma.name,
  url: firma.url,
  image: `${firma.url}/images/og-eise.png`,
  logo: `${firma.url}/images/logo-512.png`,
  slogan: firma.slogan,
  foundingDate: String(firma.gegruendet),
  founder: { '@type': 'Person', name: firma.inhaber },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: firma.mitarbeitende },
  email: firma.email,
  telephone: firma.standorte[0].telefonTel,
  address: adresse(firma.standorte[0]),
  location: firma.standorte.map((s) => ({
    '@type': 'Place',
    name: `${firma.name} ${s.name}`,
    telephone: s.telefonTel,
    address: adresse(s),
  })),
  areaServed: ['Weil am Rhein', 'Lörrach', 'Basel', 'Dreiländereck'],
  sameAs: [firma.facebook, firma.instagram],
});

export const faqPage = (fragen: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: fragen.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

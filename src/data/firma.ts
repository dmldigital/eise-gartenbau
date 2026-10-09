// Stammdaten von eise.de (Impressum/Kontakt). Einzige Quelle für Adresse, Telefon, E-Mail.
export const firma = {
  name: 'Eise Garten- und Landschaftsbau',
  inhaber: 'Jürgen Eise',
  slogan: 'natürlich schöne Gärten',
  gegruendet: 1952,
  mitarbeitende: 35,
  url: 'https://eise.de',
  email: 'info@eise.de',
  facebook: 'https://www.facebook.com/eisegarten',
  instagram: 'https://www.instagram.com/eise.gartenlandschaftsbau/',
  standorte: [
    {
      id: 'weil-am-rhein',
      name: 'Weil am Rhein',
      land: 'DE',
      strasse: 'Lütemannsweg 2',
      plz: '79576',
      ort: 'Weil am Rhein',
      telefon: '07621 964 220',
      telefonTel: '+497621964220',
      fax: '07621 964 229',
    },
    {
      id: 'basel',
      name: 'Basel',
      land: 'CH',
      strasse: 'Hafenstraße 13',
      plz: '4057',
      ort: 'Basel',
      telefon: '+41 61 631 2000',
      telefonTel: '+41616312000',
    },
  ],
} as const;

export const hauptstandort = firma.standorte[0];

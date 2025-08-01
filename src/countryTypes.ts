export type CountryMain = CountryName & {
  flags: {
    svg: string;
    alt: string;
  };
  population: number;
  region: string;
  capital: string;
};

export type CountryDetails = CountryMain & {
  subregion: string;
  tld: string[];
  currencies: {
    [currencyCode: string]: {
      name: string;
    };
  };
  languages: {
    [languageCode: string]: string;
  };
  borders: string[];
};

export type CountryName = {
  name: {
    official: string;
    common: string;
    nativeName?: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
};

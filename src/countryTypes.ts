export type CountryMain = {
    flags:{
        svg:string,
        alt:string,
    }
    name:{
        official:string,
        common:string,
        nativeName?:{
            [languageCode: string]:{
                official:string,
                common: string,
            }
        }
    }
    population:number,
    region:string,
    capital:string,
}

export type CountryDetails = CountryMain & {
    subregion:string,
    tld:string[],
    currencies:{
        [currencyCode: string]:{
            name:string,
        }
    },
    languages:{
        [languageCode: string]:string,
    },
    borders:string[],
}
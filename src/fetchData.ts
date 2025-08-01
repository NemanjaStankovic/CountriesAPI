import { CountryDetails, CountryMain, CountryName } from './countryTypes.js';
const content: HTMLElement | null = document.querySelector('.content');

export async function getCountriesByRegion(
  region: string
): Promise<CountryMain[]> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${region}?fields=name,population,capital,region,flags`
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// export async function getBorderCountries(
//   countryBorders: string[]
// ): Promise<string[]> {
//   const loading: HTMLElement = document.createElement('div');
//   const requests: string[] = [];
//   loading.classList.add('loading-spinner');
//   content?.appendChild(loading);
//   try {
//     countryBorders.forEach((border) =>
//       fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           return response.json();
//         })
//         .then((data) => requests.push(data.name.common))
//         .catch((error) => {
//           console.error(error);
//         })
//     );
//     console.log(requests);
//     return requests;
//   } finally {
//     content?.removeChild(loading);
//   }
// }

export async function getBorderCountries(
  countryBorders: string[]
): Promise<string[]> {
  const loading: HTMLElement = document.createElement('div');
  const requests: string[] = [];
  loading.classList.add('loading-spinner');
  content?.appendChild(loading);

  try {
    for (const border of countryBorders) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${border}?fields=name`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: CountryName = await response.json();
        requests.push(data.name.common);
      } catch (error) {
        console.error(error);
      }
    }
    return requests;
  } finally {
    content?.removeChild(loading);
  }
}

export async function getCountryList(
  urlParams: string
): Promise<CountryDetails[]> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${urlParams}?fullText=true`
    );
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

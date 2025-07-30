import { CountryDetails, CountryMain } from "./countryTypes.js";
const content: HTMLElement | null = document.querySelector(".content");

export async function getCountriesByRegion(
  region: string
): Promise<CountryMain[]> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/${region}?fields=name,population,capital,region,flags`
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBorderCountries(
  countryBorders: string[]
): Promise<string[]> {
  const loading: HTMLElement = document.createElement("div");
  loading.classList.add("loading-spinner");
  content?.appendChild(loading);
  try {
    const requests = countryBorders.map((border) =>
      fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => data.name.common)
        .catch((error) => {
          console.error(error);
        })
    );
    return await Promise.all(requests);
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
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

import { CountryDetails } from './countryTypes.js';
import { checkDarkMode } from './darkMode.js';
import { getBorderCountries, getCountryList } from './fetchData.js';
const url: URLSearchParams = new URL(window.location.href).searchParams;
const content: HTMLElement | null = document.querySelector('.content');
const headerText: HTMLElement | null = document.querySelector('.headerText');
let counter: number = 0;

async function getCountryDetails() {
  let param: string | null = url.get('name');
  let urlParams = '';
  if (param) {
    urlParams = `name/${param.replace(' ', '%20')}`;
    const data: CountryDetails[] = await getCountryList(urlParams);
    renderBackButton();
    renderDetailedView(data[0]);
  }
}

function renderBackButton() {
  if (!content) return;
  const backButton = document.createElement(`button`);
  backButton.textContent = `Go Back`;
  backButton.onclick = () => {
    history.back();
  };
  backButton.classList.add('goBackButton');
  content.appendChild(backButton);
}
async function renderDetailedView(data: CountryDetails) {
  console.log('izvrsava');
  if (!content) return;
  const nfObject = new Intl.NumberFormat('en-US');
  const detailedView = document.createElement('div');
  detailedView.classList.add('detailsPageAllInfo');

  const countryImg = document.createElement('img');
  countryImg.src = data.flags.svg;
  countryImg.alt = data.flags.alt;
  countryImg.classList.add('imageDetailsView');

  const countryDetailsView = document.createElement('div');
  countryDetailsView.classList.add('countryDetailsView');

  const countryName = document.createElement('div');
  countryName.textContent = data.name.official;
  countryName.classList.add('detailsCountryName');

  const countryDetailsViewColumns = document.createElement('div');
  countryDetailsViewColumns.classList.add('countryDetailsViewColumns');

  const countryDetailsLeftColumn = document.createElement('div');
  countryDetailsLeftColumn.classList.add('countryDetailsColumns');
  const countryDetailsRightColumn = document.createElement('div');
  countryDetailsRightColumn.classList.add('countryDetailsColumns');

  const countryNativeName = document.createElement('div');
  const countryNativeNameLabel = document.createElement('strong');
  countryNativeNameLabel.innerText = 'Native Name: ';
  const countryNativeNameValue = document.createElement('span');
  countryNativeNameValue.textContent =
    data?.name?.nativeName?.[Object.keys(data.name?.nativeName)[0]].official ??
    'N/A';
  countryNativeName.appendChild(countryNativeNameLabel);
  countryNativeName.appendChild(countryNativeNameValue);

  const countryPopulation = document.createElement('div');
  const countryPopulationLabel = document.createElement('strong');
  countryPopulationLabel.innerText = 'Population: ';
  const countryPopulationValue = document.createElement('span');
  countryPopulationValue.textContent =
    nfObject.format(data?.population) ?? 'N/A';
  countryPopulation.appendChild(countryPopulationLabel);
  countryPopulation.appendChild(countryPopulationValue);

  const countryRegion = document.createElement('div');
  const countryRegionLabel = document.createElement('strong');
  countryRegionLabel.innerText = 'Region: ';
  const countryRegionValue = document.createElement('span');
  countryRegionValue.textContent = data?.region ?? 'N/A';
  countryRegion.appendChild(countryRegionLabel);
  countryRegion.appendChild(countryRegionValue);

  const countrySubregion = document.createElement('div');
  const countrySubregionLabel = document.createElement('strong');
  countrySubregionLabel.innerText = 'Sub Region: ';
  const countrySubregionValue = document.createElement('span');
  countrySubregionValue.textContent = data?.subregion ?? 'N/A';
  countrySubregion.appendChild(countrySubregionLabel);
  countrySubregion.appendChild(countrySubregionValue);

  const countryCapital = document.createElement('div');
  const countryCapitalLabel = document.createElement('strong');
  countryCapitalLabel.innerText = 'Capital: ';
  const countryCapitalValue = document.createElement('span');
  countryCapitalValue.textContent = data?.capital ?? 'N/A';
  countryCapital.appendChild(countryCapitalLabel);
  countryCapital.appendChild(countryCapitalValue);

  const countryTopLvlDom = document.createElement('div');
  const countryTopLvlDomLabel = document.createElement('strong');
  countryTopLvlDomLabel.innerText = 'Top Level Domain: ';
  const countryTopLvlDomValue = document.createElement('span');
  var tldList: string[] = [];
  tldList = data.tld;
  countryTopLvlDomValue.textContent = tldList?.length
    ? tldList.join(', ')
    : 'N/A';
  countryTopLvlDom.appendChild(countryTopLvlDomLabel);
  countryTopLvlDom.appendChild(countryTopLvlDomValue);

  const countryCurrencies = document.createElement('div');
  const countryCurrenciesLabel = document.createElement('strong');
  countryCurrenciesLabel.innerText = 'Currencies: ';
  const countryCurrenciesValue = document.createElement('span');
  const currenciesList: string[] = [];
  Object.entries(data.currencies || []).forEach(([_code, currency]) => {
    currenciesList.push(currency.name);
  });
  countryCurrenciesValue.textContent = currenciesList.length
    ? currenciesList.join(', ')
    : 'N/A';
  countryCurrencies.appendChild(countryCurrenciesLabel);
  countryCurrencies.appendChild(countryCurrenciesValue);

  const countryLanguages = document.createElement('div');
  const countryLanguagesLabel = document.createElement('strong');
  countryLanguagesLabel.innerText = 'Languages: ';
  const countryLanguagesValue = document.createElement('span');
  const languagesList: string[] = [];
  Object.entries(data.languages || []).forEach(([code, language]) => {
    languagesList.push(language);
  });
  countryLanguagesValue.textContent = languagesList.length
    ? languagesList.join(', ')
    : 'N/A';

  countryLanguages.appendChild(countryLanguagesLabel);
  countryLanguages.appendChild(countryLanguagesValue);

  detailedView.appendChild(countryImg);

  countryDetailsView.appendChild(countryName);
  countryDetailsLeftColumn.appendChild(countryNativeName);
  countryDetailsLeftColumn.appendChild(countryPopulation);
  countryDetailsLeftColumn.appendChild(countryRegion);
  countryDetailsLeftColumn.appendChild(countrySubregion);
  countryDetailsLeftColumn.appendChild(countryCapital);
  countryDetailsRightColumn.appendChild(countryTopLvlDom);
  countryDetailsRightColumn.appendChild(countryCurrencies);
  countryDetailsRightColumn.appendChild(countryLanguages);

  countryDetailsViewColumns.appendChild(countryDetailsLeftColumn);
  countryDetailsViewColumns.appendChild(countryDetailsRightColumn);

  countryDetailsView.appendChild(countryDetailsViewColumns);

  const countryDetailsBorders = document.createElement('div');
  countryDetailsBorders.classList.add('countryDetailsBorders');
  const countryBorders = data.borders ?? null;
  if (countryBorders) {
    let countryNames: string[] = [];
    const countryBordersLabel = document.createElement('div');
    const countryBordersText = document.createElement('strong');
    countryBordersText.innerText = 'Border Countries: ';
    countryBordersLabel.appendChild(countryBordersText);
    countryDetailsBorders.appendChild(countryBordersLabel);
    countryNames = await getBorderCountries(countryBorders);
    console.log('wddw', countryNames);
    countryNames.map((border: string) => {
      const borderButton = document.createElement(`button`);

      borderButton.classList.add('borderCountryButton');
      borderButton.textContent = border;
      borderButton.onclick = () => {
        window.location.href = `country.html?name=${border}`;
      };
      countryDetailsBorders.appendChild(borderButton);
    });
  }
  countryDetailsView.appendChild(countryDetailsBorders);
  detailedView.appendChild(countryDetailsView);
  content.appendChild(detailedView);
}

getCountryDetails();
document.addEventListener('DOMContentLoaded', checkDarkMode);
headerText &&
  headerText.addEventListener('click', () => {
    window.location.href = 'index.html?';
  });

import { toggleDarkMode, checkDarkMode } from './darkMode.js';
import { getCountriesByRegion } from './fetchData.js';
import { CountryMain } from './countryTypes.js';
const countyView: HTMLDivElement = document.createElement('div');
const regionSelect: HTMLSelectElement | null =
  document.querySelector('.regions');
const nameFilter: HTMLInputElement | null =
  document.querySelector('.nameFilter');
const content: HTMLDivElement | null = document.querySelector('.content');
const toggleDarkModeButton = document.querySelector('.toggleDarkMode');
const headerText: HTMLElement | null = document.querySelector('.headerText');
const sortSelect: HTMLSelectElement | null = document.querySelector('.sort');
var numberOfPages: number = 0;
var countries: CountryMain[] = [];
var filteredData: CountryMain[] = [];
var oldInput = '';
var page: number = 1;
enum Operation {
  RESET_PAGE = 'resetPage',
  SORT_DATA = 'sortData',
  NEXT_PAGE = 'nextPage',
  PREV_PAGE = 'prevPage',
}

async function fetchData() {
  const regionFilterValue: string = regionSelect?.value || '';
  if (oldInput != regionFilterValue) {
    countries = await getCountriesByRegion(regionFilterValue);
    oldInput = regionFilterValue;
  }

  renderCountries(Operation.RESET_PAGE);
}
function renderCountries(value: Operation) {
  const nameFilterValue: string = nameFilter?.value.toLowerCase() || '';
  countyView.classList.add('countryView');
  countyView.innerHTML = '';
  if (value == Operation.RESET_PAGE) {
    filteredData = countries.filter((country) =>
      country.name.common.toLowerCase().includes(nameFilterValue)
    );
    sortFilteredArray();
  }
  if (value == Operation.SORT_DATA) {
    sortFilteredArray();
  }
  numberOfPages = Math.ceil(filteredData.length / 24);
  changePageNumber(value);

  renderCountryView();
}
function renderCountryView() {
  if (!content) return;
  let i: number = 24 * (page - 1);
  const nfObject = new Intl.NumberFormat('en-US');
  while (i < filteredData.length && i < 24 * page) {
    let country: CountryMain = filteredData[i];
    const countryCard: HTMLDivElement = document.createElement('div');
    countryCard.classList.add('card');
    countryCard.innerHTML =
      `
            <img class="imageHomeView" src="${country?.flags?.svg}" alt="${
        country?.flags?.alt
      }">
            <div class="textHomeView">
                <div class="nunitoSansFont">${country?.name?.common}</div>
                <div class="countryDetails">
                    <div style="padding-block:0px"><strong>Population: </strong>${nfObject.format(
                      country?.population
                    )}</div>
                    <div style="padding-block:0px"><strong>Region: </strong>${
                      country?.region
                    }</div>
                    <div style="padding-block:0px"><strong>Capital: </strong>${
                      country?.capital
                    }</div>
                </div>
            </div>` || ``;
    countryCard.addEventListener('click', () => {
      window.location.href = `country.html?name=${country?.name?.official}`;
    });
    countyView.appendChild(countryCard);
    i++;
  }
  content.appendChild(countyView);

  const pageController = document.createElement('div');
  pageController.innerHTML = `
        <button class="previousPage" disabled></button>
        <div class="pageNumber">${page}</div>
        <button class="nextPage"></button>`;
  pageController.classList.add('pageController');
  const prevButton: HTMLButtonElement | null =
    pageController.querySelector('.previousPage');
  const nextButton: HTMLButtonElement | null =
    pageController.querySelector('.nextPage');
  prevButton &&
    (prevButton.onclick = () => renderCountries(Operation.PREV_PAGE));
  nextButton &&
    (nextButton.onclick = () => renderCountries(Operation.NEXT_PAGE));

  const pageControllerExists: HTMLElement | null =
    document.querySelector('.pageController');
  if (pageControllerExists) {
    pageControllerExists.remove();
  }
  content.appendChild(pageController);
  changePageNumberUI();
}

function changePageNumber(value: Operation) {
  var nextPage = 0;
  if (value == Operation.RESET_PAGE || value == Operation.SORT_DATA) {
    page = 1;
  }
  if (value == Operation.NEXT_PAGE) {
    nextPage = page + 1;
  }
  if (value == Operation.PREV_PAGE) {
    nextPage = page - 1;
  }
  if (
    nextPage > 0 &&
    nextPage <= numberOfPages &&
    value != Operation.RESET_PAGE &&
    value != Operation.SORT_DATA
  ) {
    page = nextPage;
  }
}

function changePageNumberUI() {
  let buttonToChange: HTMLButtonElement | null =
    document.querySelector('.previousPage');
  if (buttonToChange) {
    if (page == 1) {
      buttonToChange.disabled = true;
      buttonToChange.style.visibility = 'hidden';
    } else {
      buttonToChange.disabled = false;
      buttonToChange.style.visibility = 'visible';
    }
  }
  buttonToChange = document.querySelector('.nextPage');
  if (buttonToChange) {
    if (page == numberOfPages || numberOfPages == 0) {
      buttonToChange.disabled = true;
      buttonToChange.style.visibility = 'hidden';
    } else {
      buttonToChange.disabled = false;
      buttonToChange.style.visibility = 'visible';
    }
    if (page == 1 && numberOfPages <= 1) {
      const pageNumber: HTMLElement | null =
        document.querySelector('.pageNumber');
      pageNumber && (pageNumber.style.visibility = 'hidden');
    }
  }
  const pageNumberLabel: HTMLElement | null =
    document.querySelector('.pageNumber');
  pageNumberLabel && (pageNumberLabel.textContent = page.toString());
}

function returnToHomePage() {
  nameFilter && (nameFilter.value = '');
  regionSelect && (regionSelect.value = 'all');
  sortSelect && (sortSelect.value = 'none');
  fetchData();
}

function sortFilteredArray() {
  const sortBy = sortSelect?.value;
  switch (sortBy) {
    case 'name':
      filteredData.sort((a, b) =>
        a['name']['common'].localeCompare(b['name']['common'])
      );
      break;
    case 'population':
      filteredData.sort((a, b) => b['population'] - a['population']);
      break;
  }
}

function debounce(func: Function) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return func();
    }, 800);
  };
}

const debounceFunction = debounce(fetchData);

window.addEventListener('pageshow', fetchData);
regionSelect?.addEventListener('change', fetchData);
nameFilter?.addEventListener('input', debounceFunction);
toggleDarkModeButton?.addEventListener('click', toggleDarkMode);
document?.addEventListener('DOMContentLoaded', checkDarkMode);
headerText?.addEventListener('click', returnToHomePage);
sortSelect?.addEventListener('change', () =>
  renderCountries(Operation.SORT_DATA)
);

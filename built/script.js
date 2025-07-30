var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toggleDarkMode, checkDarkMode } from "./darkMode.js";
import { getCountriesByRegion } from "./fetchData.js";
const countyView = document.createElement("div");
const regionSelect = document.querySelector(".regions");
const nameFilter = document.querySelector(".nameFilter");
const content = document.querySelector(".content");
const toggleDarkModeButton = document.querySelector(".toggleDarkMode");
const headerText = document.querySelector(".headerText");
const sortSelect = document.querySelector(".sort");
var numberOfPages = 0;
var countries = [];
var filteredData = [];
var page = 1;
var Operation;
(function (Operation) {
    Operation["resetPage"] = "resetPage";
    Operation["sortData"] = "sortData";
    Operation["nextPage"] = "nextPage";
    Operation["prevPage"] = "prevPage";
})(Operation || (Operation = {}));
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const regionFilterValue = (regionSelect === null || regionSelect === void 0 ? void 0 : regionSelect.value) || "";
        countries = yield getCountriesByRegion(regionFilterValue);
        renderCountries(Operation.resetPage);
    });
}
function renderCountries(value) {
    const nameFilterValue = (nameFilter === null || nameFilter === void 0 ? void 0 : nameFilter.value.toLowerCase()) || "";
    countyView.classList.add("countryView");
    countyView.innerHTML = "";
    if (value == Operation.resetPage) {
        filteredData = countries.filter((country) => country.name.common.toLowerCase().includes(nameFilterValue));
        sortFilteredArray();
    }
    if (value == Operation.sortData) {
        sortFilteredArray();
    }
    numberOfPages = Math.ceil(filteredData.length / 24);
    changePageNumber(value);
    renderCountryView();
}
function renderCountryView() {
    var _a, _b, _c;
    if (!content)
        return;
    let i = 24 * (page - 1);
    const nfObject = new Intl.NumberFormat("en-US");
    while (i < filteredData.length && i < 24 * page) {
        let country = filteredData[i];
        const countryCard = document.createElement("div");
        countryCard.classList.add("card");
        countryCard.innerHTML =
            `
            <img class="imageHomeView" src="${(_a = country === null || country === void 0 ? void 0 : country.flags) === null || _a === void 0 ? void 0 : _a.svg}" alt="${(_b = country === null || country === void 0 ? void 0 : country.flags) === null || _b === void 0 ? void 0 : _b.alt}">
            <div class="textHomeView">
                <div class="nunitoSansFont">${(_c = country === null || country === void 0 ? void 0 : country.name) === null || _c === void 0 ? void 0 : _c.common}</div>
                <div class="countryDetails">
                    <div style="padding-block:0px"><strong>Population: </strong>${nfObject.format(country === null || country === void 0 ? void 0 : country.population)}</div>
                    <div style="padding-block:0px"><strong>Region: </strong>${country === null || country === void 0 ? void 0 : country.region}</div>
                    <div style="padding-block:0px"><strong>Capital: </strong>${country === null || country === void 0 ? void 0 : country.capital}</div>
                </div>
            </div>` || ``;
        countryCard.addEventListener("click", () => {
            var _a;
            window.location.href = `country.html?name=${(_a = country === null || country === void 0 ? void 0 : country.name) === null || _a === void 0 ? void 0 : _a.official}`;
        });
        countyView.appendChild(countryCard);
        i++;
    }
    content.appendChild(countyView);
    const pageController = document.createElement("div");
    pageController.innerHTML = `
        <button class="previousPage" disabled></button>
        <div class="pageNumber">${page}</div>
        <button class="nextPage"></button>`;
    pageController.classList.add("pageController");
    const prevButton = pageController.querySelector(".previousPage");
    const nextButton = pageController.querySelector(".nextPage");
    prevButton &&
        (prevButton.onclick = () => renderCountries(Operation.prevPage));
    nextButton &&
        (nextButton.onclick = () => renderCountries(Operation.nextPage));
    const pageControllerExists = document.querySelector(".pageController");
    if (pageControllerExists) {
        pageControllerExists.remove();
    }
    content.appendChild(pageController);
    changePageNumberUI();
}
function changePageNumber(value) {
    var nextPage = 0;
    if (value == Operation.resetPage || value == Operation.sortData) {
        page = 1;
    }
    if (value == Operation.nextPage) {
        nextPage = page + 1;
    }
    if (value == Operation.prevPage) {
        nextPage = page - 1;
    }
    if (nextPage > 0 &&
        nextPage <= numberOfPages &&
        value != Operation.resetPage &&
        value != Operation.sortData) {
        page = nextPage;
    }
}
function changePageNumberUI() {
    let buttonToChange = document.querySelector(".previousPage");
    if (buttonToChange) {
        if (page == 1) {
            buttonToChange.disabled = true;
            buttonToChange.style.visibility = "hidden";
        }
        else {
            buttonToChange.disabled = false;
            buttonToChange.style.visibility = "visible";
        }
    }
    buttonToChange = document.querySelector(".nextPage");
    if (buttonToChange) {
        if (page == numberOfPages || numberOfPages == 0) {
            buttonToChange.disabled = true;
            buttonToChange.style.visibility = "hidden";
        }
        else {
            buttonToChange.disabled = false;
            buttonToChange.style.visibility = "visible";
        }
        if (page == 1 && numberOfPages <= 1) {
            const pageNumber = document.querySelector(".pageNumber");
            pageNumber && (pageNumber.style.visibility = "hidden");
        }
    }
    const pageNumberLabel = document.querySelector(".pageNumber");
    pageNumberLabel && (pageNumberLabel.textContent = page.toString());
}
function returnToHomePage() {
    nameFilter && (nameFilter.value = "");
    regionSelect && (regionSelect.value = "all");
    sortSelect && (sortSelect.value = "none");
    fetchData();
}
function sortFilteredArray() {
    const sortBy = sortSelect === null || sortSelect === void 0 ? void 0 : sortSelect.value;
    switch (sortBy) {
        case "name":
            filteredData.sort((a, b) => a["name"]["common"].localeCompare(b["name"]["common"]));
            break;
        case "population":
            filteredData.sort((a, b) => b["population"] - a["population"]);
            break;
    }
}
window.addEventListener("pageshow", fetchData);
regionSelect === null || regionSelect === void 0 ? void 0 : regionSelect.addEventListener("change", fetchData);
nameFilter === null || nameFilter === void 0 ? void 0 : nameFilter.addEventListener("input", fetchData);
toggleDarkModeButton === null || toggleDarkModeButton === void 0 ? void 0 : toggleDarkModeButton.addEventListener("click", toggleDarkMode);
document === null || document === void 0 ? void 0 : document.addEventListener("DOMContentLoaded", checkDarkMode);
headerText === null || headerText === void 0 ? void 0 : headerText.addEventListener("click", returnToHomePage);
sortSelect === null || sortSelect === void 0 ? void 0 : sortSelect.addEventListener("change", () => renderCountries(Operation.sortData));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkDarkMode } from './darkMode.js';
import { getBorderCountries, getCountryList } from './fetchData.js';
const url = new URL(window.location.href).searchParams;
const content = document.querySelector('.content');
const headerText = document.querySelector('.headerText');
let counter = 0;
function getCountryDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let param = url.get('name');
        let urlParams = '';
        if (param) {
            urlParams = `name/${param.replace(' ', '%20')}`;
            const data = yield getCountryList(urlParams);
            renderBackButton();
            renderDetailedView(data[0]);
        }
    });
}
function renderBackButton() {
    if (!content)
        return;
    const backButton = document.createElement(`button`);
    backButton.textContent = `Go Back`;
    backButton.onclick = () => {
        history.back();
    };
    backButton.classList.add('goBackButton');
    content.appendChild(backButton);
}
function renderDetailedView(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        console.log('izvrsava');
        if (!content)
            return;
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
            (_d = (_b = (_a = data === null || data === void 0 ? void 0 : data.name) === null || _a === void 0 ? void 0 : _a.nativeName) === null || _b === void 0 ? void 0 : _b[Object.keys((_c = data.name) === null || _c === void 0 ? void 0 : _c.nativeName)[0]].official) !== null && _d !== void 0 ? _d : 'N/A';
        countryNativeName.appendChild(countryNativeNameLabel);
        countryNativeName.appendChild(countryNativeNameValue);
        const countryPopulation = document.createElement('div');
        const countryPopulationLabel = document.createElement('strong');
        countryPopulationLabel.innerText = 'Population: ';
        const countryPopulationValue = document.createElement('span');
        countryPopulationValue.textContent =
            (_e = nfObject.format(data === null || data === void 0 ? void 0 : data.population)) !== null && _e !== void 0 ? _e : 'N/A';
        countryPopulation.appendChild(countryPopulationLabel);
        countryPopulation.appendChild(countryPopulationValue);
        const countryRegion = document.createElement('div');
        const countryRegionLabel = document.createElement('strong');
        countryRegionLabel.innerText = 'Region: ';
        const countryRegionValue = document.createElement('span');
        countryRegionValue.textContent = (_f = data === null || data === void 0 ? void 0 : data.region) !== null && _f !== void 0 ? _f : 'N/A';
        countryRegion.appendChild(countryRegionLabel);
        countryRegion.appendChild(countryRegionValue);
        const countrySubregion = document.createElement('div');
        const countrySubregionLabel = document.createElement('strong');
        countrySubregionLabel.innerText = 'Sub Region: ';
        const countrySubregionValue = document.createElement('span');
        countrySubregionValue.textContent = (_g = data === null || data === void 0 ? void 0 : data.subregion) !== null && _g !== void 0 ? _g : 'N/A';
        countrySubregion.appendChild(countrySubregionLabel);
        countrySubregion.appendChild(countrySubregionValue);
        const countryCapital = document.createElement('div');
        const countryCapitalLabel = document.createElement('strong');
        countryCapitalLabel.innerText = 'Capital: ';
        const countryCapitalValue = document.createElement('span');
        countryCapitalValue.textContent = (_h = data === null || data === void 0 ? void 0 : data.capital) !== null && _h !== void 0 ? _h : 'N/A';
        countryCapital.appendChild(countryCapitalLabel);
        countryCapital.appendChild(countryCapitalValue);
        const countryTopLvlDom = document.createElement('div');
        const countryTopLvlDomLabel = document.createElement('strong');
        countryTopLvlDomLabel.innerText = 'Top Level Domain: ';
        const countryTopLvlDomValue = document.createElement('span');
        var tldList = [];
        tldList = data.tld;
        countryTopLvlDomValue.textContent = (tldList === null || tldList === void 0 ? void 0 : tldList.length)
            ? tldList.join(', ')
            : 'N/A';
        countryTopLvlDom.appendChild(countryTopLvlDomLabel);
        countryTopLvlDom.appendChild(countryTopLvlDomValue);
        const countryCurrencies = document.createElement('div');
        const countryCurrenciesLabel = document.createElement('strong');
        countryCurrenciesLabel.innerText = 'Currencies: ';
        const countryCurrenciesValue = document.createElement('span');
        const currenciesList = [];
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
        const languagesList = [];
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
        console.log(data.borders);
        const countryBorders = (_j = data.borders) !== null && _j !== void 0 ? _j : null;
        if (countryBorders) {
            let countryNames = [];
            const countryBordersLabel = document.createElement('div');
            const countryBordersText = document.createElement('strong');
            countryBordersText.innerText = 'Border Countries: ';
            countryBordersLabel.appendChild(countryBordersText);
            countryDetailsBorders.appendChild(countryBordersLabel);
            countryNames = yield getBorderCountries(countryBorders);
            console.log('wddw', countryNames);
            countryNames.map((border) => {
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
    });
}
getCountryDetails();
document.addEventListener('DOMContentLoaded', checkDarkMode);
headerText &&
    headerText.addEventListener('click', () => {
        window.location.href = 'index.html?';
    });

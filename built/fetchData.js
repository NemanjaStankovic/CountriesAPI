var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const content = document.querySelector(".content");
export function getCountriesByRegion(region) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/${region}?fields=name,population,capital,region,flags`);
            if (!response.ok)
                throw new Error("Failed to fetch data");
            return response.json();
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}
export function getBorderCountries(countryBorders) {
    return __awaiter(this, void 0, void 0, function* () {
        const loading = document.createElement("div");
        loading.classList.add("loading-spinner");
        content === null || content === void 0 ? void 0 : content.appendChild(loading);
        try {
            const requests = countryBorders.map((border) => fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
                .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
                .then((data) => data.name.common)
                .catch((error) => {
                console.error(error);
            }));
            return yield Promise.all(requests);
        }
        finally {
            content === null || content === void 0 ? void 0 : content.removeChild(loading);
        }
    });
}
export function getCountryList(urlParams) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://restcountries.com/v3.1/${urlParams}?fullText=true`);
            if (!response.ok)
                throw new Error("Failed to fetch data");
            return yield response.json();
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}

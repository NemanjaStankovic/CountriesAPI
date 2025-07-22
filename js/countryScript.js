import { checkDarkMode, toggleDarkMode } from "./darkMode.js";
const url = new URL(window.location.href).searchParams;
const content = document.getElementsByClassName("content")[0];

function getCountryDetails(){
    let param = url.get("name");    
    let urlParams="";
    if(param)
    {
        urlParams=`name/${param.replace(' ', '%20')}`;
    }
    else
    {
        if(url.get("alpha"))
        {
            urlParams=`alpha/${url.get(`alpha`)}`
        }
    }

    fetch(`https://restcountries.com/v3.1/${urlParams}?fullText=true`)
    .then(response => {
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(data => {
            renderBackButton();
            renderDetailedView(data[0]);
        })
        .catch(error => {
            console.error(error);
        });
}

function renderBackButton(){
    const backButton = document.createElement(`button`);
    backButton.textContent = `Go Back`;
    backButton.onclick = () => {history.back()}
    backButton.classList.add("goBackButton");
    content.appendChild(backButton);
}
function renderDetailedView(data){
    const nfObject = new Intl.NumberFormat('en-US');
    const detailedView = document.createElement("div");
    detailedView.classList.add("detailsPageAllInfo");

    const countryImg = document.createElement("img");
    countryImg.src = data.flags.svg;
    countryImg.alt=data.flags.alt;
    countryImg.classList.add("imageDetailsView");

    const countryDetailsView = document.createElement("div");
    countryDetailsView.classList.add("countryDetailsView");

    const countryName = document.createElement("div");
    countryName.textContent = data.name.official;
    countryName.classList.add("detailsCountryName");

    const countryDetailsViewColumns = document.createElement("div");
    countryDetailsViewColumns.classList.add("countryDetailsViewColumns");

    const countryDetailsLeftColumn = document.createElement("div");
    countryDetailsLeftColumn.classList.add("countryDetailsColumns");
    const countryDetailsRightColumn = document.createElement("div");
    countryDetailsRightColumn.classList.add("countryDetailsColumns");


    const countryNativeNameLabel = document.createElement("div");
    countryNativeNameLabel.innerText = "Native Name: "
    const countryNativeName = document.createElement("span");
    countryNativeName.textContent = data.name.nativeName[Object.keys(data.name.nativeName)[0]].official;
    countryNativeNameLabel.appendChild(countryNativeName);

    const countryPopulationLabel = document.createElement("div");
    countryPopulationLabel.innerText = "Population: ";
    const countryPopulation = document.createElement("span");
    countryPopulation.textContent = nfObject.format(data.population);
    countryPopulationLabel.appendChild(countryPopulation);

    const countryRegionLabel = document.createElement("div");
    countryRegionLabel.innerText = "Region: ";
    const countryRegion = document.createElement("span");
    countryRegion.textContent = data.region;
    countryRegionLabel.appendChild(countryRegion);


    const countrySubregionLabel = document.createElement("div");
    countrySubregionLabel.innerText = "Sub Region: ";
    const countrySubregion= document.createElement("span");
    countrySubregion.textContent = data.subregion;
    countrySubregionLabel.appendChild(countrySubregion);


    const countryCapitalLabel = document.createElement("div");
    countryCapitalLabel.innerText = "Capital: ";
    const countryCapital = document.createElement("span");
    countryCapital.textContent = data.capital;
    countryCapitalLabel.appendChild(countryCapital);

    const countryTopLvlDomLabel = document.createElement("div");
    countryTopLvlDomLabel.innerText = "Top Level Domain: ";
    const countryTopLvlDom = document.createElement("span");
    countryTopLvlDom.textContent = data.tld;
    countryTopLvlDomLabel.appendChild(countryTopLvlDom);

    const countryCurrenciesLabel = document.createElement("div");
    countryCurrenciesLabel.innerText = "Currencies: ";
    const countryCurrencies = document.createElement("span");
    countryCurrencies.textContent = data.currencies[Object.keys(data.currencies)[0]].name;
    countryCurrenciesLabel.appendChild(countryCurrencies);

    const countryLanguagesLabel = document.createElement("div");
    countryLanguagesLabel.innerText = "Languages: ";
    const countryLanguages = document.createElement("span");
    countryLanguages.textContent = data.languages[Object.keys(data.languages)[0]];
    countryLanguagesLabel.appendChild(countryLanguages);

    detailedView.appendChild(countryImg);

    countryDetailsView.appendChild(countryName);
    countryDetailsLeftColumn.appendChild(countryNativeNameLabel);
    countryDetailsLeftColumn.appendChild(countryPopulationLabel);
    countryDetailsLeftColumn.appendChild(countryRegionLabel);
    countryDetailsLeftColumn.appendChild(countrySubregionLabel);
    countryDetailsLeftColumn.appendChild(countryCapitalLabel);
    countryDetailsRightColumn.appendChild(countryTopLvlDomLabel);
    countryDetailsRightColumn.appendChild(countryCurrenciesLabel);
    countryDetailsRightColumn.appendChild(countryLanguagesLabel);

    countryDetailsViewColumns.appendChild(countryDetailsLeftColumn);
    countryDetailsViewColumns.appendChild(countryDetailsRightColumn);

    countryDetailsView.appendChild(countryDetailsViewColumns);

    const countryDetailsBorders = document.createElement("div");
    countryDetailsBorders.classList.add("countryDetailsBorders");

    const countryBorders = data.borders ?? null;
    if(countryBorders){
        let countryNames = [];
        const countryBordersLabel = document.createElement("div");
        countryBordersLabel.innerText = "Border Countries: ";
        countryDetailsBorders.appendChild(countryBordersLabel);
        
        const fetchPromises = countryBorders.map((border)=>
            fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => data.name.common)
            .catch(error => {
                console.error(error);
            })
        );

        Promise.all(fetchPromises).then(countryNames => {
            console.log(countryNames);
            countryBorders.map((border, index)=>{
            const borderButton = document.createElement(`button`);
            
            borderButton.classList.add("borderCountryButton");
            borderButton.textContent=countryNames[index];
            borderButton.onclick=()=>{window.location.href = `country.html?alpha=${border}`}
            countryDetailsBorders.appendChild(borderButton);
            })
        })
    }
    countryDetailsView.appendChild(countryDetailsBorders);
    detailedView.appendChild(countryDetailsView);
    content.appendChild(detailedView);
}

getCountryDetails();
document.addEventListener("DOMContentLoaded", checkDarkMode);

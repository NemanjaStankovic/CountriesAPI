import {toggleDarkMode, checkDarkMode} from './darkMode.js';
const countyView = document.createElement("div");
const regionSelect = document.getElementsByClassName("regions")[0];
const nameFilter = document.getElementsByClassName("nameFilter")[0];
const content = document.getElementsByClassName("content")[0];
const toggleDarkModeButton = document.getElementsByClassName("toggleDarkMode")[0];
var countries = [];

async function fetchData(){
    const regionFilterValue = regionSelect.value;

    countyView.innerHTML="";
    fetch(`https://restcountries.com/v3.1/${regionFilterValue}?fields=name,population,capital,region,flags`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        countries=data;
        console.log(regionFilterValue);
        renderCountries();
    })
    .catch(error => {
        console.error(error);
    })
    
}
function renderCountries(){
    const nameFilterValue = nameFilter.value.toLowerCase();
    countyView.classList.add("countryView");
    const nfObject = new Intl.NumberFormat('en-US')
    for(let country of countries)
        {
            if(country.name.official.toLowerCase().includes(nameFilterValue))
            {
                const countryCard = document.createElement("div");
                countryCard.classList.add("card");
                countryCard.innerHTML=`
                    <img class="imageHomeView" src="${country.flags.svg}" alt="${country.flags.alt}">
                    <div class="textHomeView">
                        <div class="nunitoSansFont">${country.name.common}</div>
                        <div class="countryDetails">
                            <div style="padding-block:4px"><strong>Population: </strong>${nfObject.format(country.population)}</div>
                            <div style="padding-block:4px"><strong>Region: </strong>${country.region}</div>
                            <div style="padding-block:4px"><strong>Capital: </strong>${country.capital}</div>
                        </div>
                    </div>`
                countryCard.addEventListener("click", ()=>{window.location.href = `country.html?name=${country.name.official}`});
                countyView.appendChild(countryCard);
            }
            
        }
        content.appendChild(countyView);
}

window.addEventListener("pageshow", fetchData);
regionSelect.addEventListener("change", fetchData);
nameFilter.addEventListener("input", fetchData);
toggleDarkModeButton.addEventListener("click", toggleDarkMode);
document.addEventListener("DOMContentLoaded", checkDarkMode);
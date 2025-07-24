import {toggleDarkMode, checkDarkMode} from './darkMode.js';
import { getCountriesByRegion } from './fetchData.js';
const countyView = document.createElement("div");
const regionSelect = document.querySelector(".regions");
const nameFilter = document.querySelector(".nameFilter");
const content = document.querySelector(".content");
const toggleDarkModeButton = document.querySelector(".toggleDarkMode");
const headerText = document.querySelector(".headerText");

var numberOfPages=0;
var countries = [];
var filteredData = [];
var page = 1;

async function fetchData(){
    const regionFilterValue = regionSelect.value;
    countries= await getCountriesByRegion(regionFilterValue);
    renderCountries(0);
}
function renderCountries(value){
    const nameFilterValue = nameFilter.value.toLowerCase();
    countyView.classList.add("countryView");
    const nfObject = new Intl.NumberFormat('en-US')    
    countyView.innerHTML="";
    filteredData = countries.filter(country => country.name.common.toLowerCase().includes(nameFilterValue));
    numberOfPages = Math.ceil(filteredData.length/24);
    changePageNumber(value);
    let i = 24*(page-1);

    while(i<filteredData.length && i<24*page)
    {
        let country = filteredData[i];
        const countryCard = document.createElement("div");
        countryCard.classList.add("card");
        countryCard.innerHTML=`
            <img class="imageHomeView" src="${country.flags.svg}" alt="${country.flags.alt}">
            <div class="textHomeView">
                <div class="nunitoSansFont">${country.name.common}</div>
                <div class="countryDetails">
                    <div style="padding-block:0px"><strong>Population: </strong>${nfObject.format(country.population)}</div>
                    <div style="padding-block:0px"><strong>Region: </strong>${country.region}</div>
                    <div style="padding-block:0px"><strong>Capital: </strong>${country.capital}</div>
                </div>
            </div>`
        countryCard.addEventListener("click", ()=>{window.location.href = `country.html?name=${country.name.official}`});
        countyView.appendChild(countryCard);
        i++;
    }
    content.appendChild(countyView);
    
    const pageController = document.createElement("div");
    pageController.innerHTML=`
        <button class="previousPage" disabled></button>
        <div class="pageNumber">${page}</div>
        <button class="nextPage"></button>`;
    pageController.classList.add("pageController");
    const prevButton = pageController.querySelector(".previousPage");
    const nextButton = pageController.querySelector(".nextPage");
    prevButton.onclick = () => renderCountries(-1);
    nextButton.onclick = () => renderCountries(1);

    const pageControllerExists = document.querySelector(".pageController");
    if(pageControllerExists)
    {
        pageControllerExists.remove();
    }
    content.appendChild(pageController);
    changePageNumberUI();
}

function changePageNumber(value){
    if(value==0)
    {
        page=1;
    }
    const nextPage = page + value;
    if(nextPage>0 && nextPage<=numberOfPages && value!=0)
    {
        page=nextPage;
    }
}

function changePageNumberUI(){
    let buttonToChange = document.querySelector(".previousPage");
    if(page==1)
    {
        buttonToChange.disabled=true;
        buttonToChange.style.visibility='hidden';
    }
    else
    {
        buttonToChange.disabled=false;
        buttonToChange.style.visibility='visible';
    }
    buttonToChange = document.querySelector(".nextPage");
    if(page==numberOfPages || numberOfPages==0)
    {
        buttonToChange.disabled =true;
        buttonToChange.style.visibility='hidden';
    }
    else
    {
       buttonToChange.disabled =false;
       buttonToChange.style.visibility='visible';

    }
    if(page==1 && numberOfPages<=1)
    {
        const pageNumber = document.querySelector(".pageNumber");
        pageNumber.style.visibility='hidden';
    }
    document.querySelector(".pageNumber").textContent=page;
}

function returnToHomePage(){
    nameFilter.value="";
    regionSelect.value="all";
    fetchData();
}

window.addEventListener("pageshow", fetchData);
regionSelect.addEventListener("change", fetchData);
nameFilter.addEventListener("input", fetchData);
toggleDarkModeButton.addEventListener("click", toggleDarkMode);
document.addEventListener("DOMContentLoaded", checkDarkMode);
headerText.addEventListener("click", returnToHomePage);
import {toggleDarkMode, checkDarkMode} from './darkMode.js';
import { getCountriesByRegion } from './fetchData.js';
const countyView = document.createElement("div");
const regionSelect = document.querySelector(".regions");
const nameFilter = document.querySelector(".nameFilter");
const content = document.querySelector(".content");
const toggleDarkModeButton = document.querySelector(".toggleDarkMode");
const headerText = document.querySelector(".headerText");
const sortSelect = document.querySelector(".sort");

var numberOfPages=0;
var countries = [];
var filteredData = [];
var page = 1;

async function fetchData(){
    const regionFilterValue = regionSelect.value;
    countries= await getCountriesByRegion(regionFilterValue);
    renderCountries("resetPage");
}
function renderCountries(value){
    console.log(value);
    const nameFilterValue = nameFilter.value.toLowerCase();
    countyView.classList.add("countryView");
    countyView.innerHTML="";
    if(value=="resetPage")
    {
        filteredData = countries.filter(country => country.name.common.toLowerCase().includes(nameFilterValue));
        sortFilteredArray();
    }
    if(value=="sortData")
    {
        sortFilteredArray();
    }
    numberOfPages = Math.ceil(filteredData.length/24);
    changePageNumber(value);
    
    renderCountryView();
}
function renderCountryView()
{
    let i = 24*(page-1);
    console.log(i);
    const nfObject = new Intl.NumberFormat('en-US');
    while(i<filteredData.length && i<24*page)
    {
        let country = filteredData[i];
        const countryCard = document.createElement("div");
        countryCard.classList.add("card");
        countryCard.innerHTML=`
            <img class="imageHomeView" src="${country?.flags?.svg}" alt="${country?.flags?.alt}">
            <div class="textHomeView">
                <div class="nunitoSansFont">${country?.name?.common}</div>
                <div class="countryDetails">
                    <div style="padding-block:0px"><strong>Population: </strong>${nfObject.format(country?.population)}</div>
                    <div style="padding-block:0px"><strong>Region: </strong>${country?.region}</div>
                    <div style="padding-block:0px"><strong>Capital: </strong>${country?.capital}</div>
                </div>
            </div>`|| ``;
        countryCard.addEventListener("click", ()=>{window.location.href = `country.html?name=${country?.name?.official}`});
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
    prevButton.onclick = () => renderCountries("prevPage");
    nextButton.onclick = () => renderCountries("nextPage");

    const pageControllerExists = document.querySelector(".pageController");
    if(pageControllerExists)
    {
        pageControllerExists.remove();
    }
    content.appendChild(pageController);
    changePageNumberUI();
}

function changePageNumber(value){
    var nextPage=0;
    if(value=="resetPage" || value=="sortData")
    {
        page=1;
    }
    if(value=="nextPage")
    {
        nextPage = page + 1;
    }
    if(value=="prevPage")
    {
        nextPage = page - 1;
    }
    if(nextPage>0 && nextPage<=numberOfPages && value!="resetPage" && value!="sortData")
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
    sortSelect.value="none";
    fetchData();
}

// function sort(){
//     renderCountries("sortData");
// }
function sortFilteredArray(){
    const sortBy = sortSelect.value;
    switch(sortBy){
        case "name":
            filteredData.sort((a,b)=>a["name"]["common"].localeCompare(b["name"]["common"]));
            break;
        case "population":
            filteredData.sort((a,b)=>b["population"] - a["population"]);
            break;
    }
}

window.addEventListener("pageshow", fetchData);
regionSelect.addEventListener("change", fetchData);
nameFilter.addEventListener("input", fetchData);
toggleDarkModeButton.addEventListener("click", toggleDarkMode);
document.addEventListener("DOMContentLoaded", checkDarkMode);
headerText.addEventListener("click", returnToHomePage);
sortSelect.addEventListener("change", ()=>renderCountries("sortData"));
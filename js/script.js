import {toggleDarkMode, checkDarkMode} from './darkMode.js';
const countyView = document.createElement("div");
const regionSelect = document.getElementsByClassName("regions")[0];
const nameFilter = document.getElementsByClassName("nameFilter")[0];
const content = document.getElementsByClassName("content")[0];
const toggleDarkModeButton = document.getElementsByClassName("toggleDarkMode")[0];
const headerText = document.getElementsByClassName("headerText")[0];
var countries = [];
var filteredData = [];
var page = 1;

async function fetchData(){
    const regionFilterValue = regionSelect.value;
    fetch(`https://restcountries.com/v3.1/${regionFilterValue}?fields=name,population,capital,region,flags`)
    .then(response => {
        if(!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        countries=data;
        changePageNumber(0);
    })
    .catch(error => {
        console.error(error);
    })
    
}
function renderCountries(){
    const nameFilterValue = nameFilter.value.toLowerCase();
    countyView.classList.add("countryView");
    const nfObject = new Intl.NumberFormat('en-US')
    let i = 24*(page-1);
    countyView.innerHTML="";
    filteredData = countries.filter(country => country.name.common.toLowerCase().includes(nameFilterValue));
    console.log(filteredData, nameFilterValue);
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
    
    const numberOfPages = Math.ceil(filteredData.length/24);
    const pageController = document.createElement("div");

    pageController.innerHTML=`
        <button class="previousPage" disabled></button>
        <div class="pageNumber">${page}</div>
        <button class="nextPage"></button>`;
    pageController.classList.add("pageController");
    const prevButton = pageController.getElementsByClassName("previousPage")[0];
    const nextButton = pageController.getElementsByClassName("nextPage")[0];
    prevButton.onclick = () => changePageNumber(-1);
    nextButton.onclick = () => changePageNumber(1);

    const pageControllerExists = document.getElementsByClassName("pageController")[0];
    if(pageControllerExists)
    {
        pageControllerExists.remove();
    }
    content.appendChild(pageController);
}

function changePageNumber(value){
    const numberOfPages = Math.ceil(filteredData.length/24);       

    if(value==0)
    {
        page=1;
        renderCountries();
    }
    if(page+value>0 && page+value<=numberOfPages && value!=0)
    {
        page+=value;
        renderCountries();
    }
    let buttonToChange = document.getElementsByClassName("previousPage")[0];
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
    buttonToChange = document.getElementsByClassName("nextPage")[0];
    if(page==numberOfPages)
    {
        buttonToChange.disabled =true;
        buttonToChange.style.visibility='hidden';
    }
    else
    {
       buttonToChange.disabled =false;
       buttonToChange.style.visibility='visible';

    }
    if(page==1 && numberOfPages==1)
    {
        const pageNumber = document.querySelector(".pageNumber");
        pageNumber.style.visibility='hidden';
    }
    document.getElementsByClassName("pageNumber")[0].textContent=page;
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
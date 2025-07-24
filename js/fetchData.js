export async function getCountriesByRegion(region) {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/${region}?fields=name,population,capital,region,flags`);
        if(!response.ok) throw new Error("Failed to fetch data");
        return response.json();
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

export async function getBorderCountries(countryBorders) {
    const requests = countryBorders.map((border)=>
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
    return await Promise.all(requests);
    
}

export async function getCountryList(urlParams) {
    try{
        const response = await fetch(`https://restcountries.com/v3.1/${urlParams}?fullText=true`);
        if(!response.ok) throw new Error("Failed to fetch data");
        return await response.json();
    }
    catch(error) {
        console.log(error);
        return [];
    }
}
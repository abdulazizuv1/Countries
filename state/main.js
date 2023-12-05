const country = new URLSearchParams(window.location.search).get("name");
var api_Link = `https://restcountries.com/v3.1/name/${country}`
const mode = document.querySelector(".mode")
const body = document.querySelector("body")
const block = document.querySelector(".block")

const savedMode = localStorage.getItem("mode");

if (savedMode) {
    body.classList.add(savedMode);
}

mode.addEventListener("click", ()=>{
    body.classList.toggle("active")
    const isActive = body.classList.contains("active");
    localStorage.setItem("mode", isActive ? "active" : "");
})

const getData = async (link)=>{
    const req = await fetch(link)
    const data = await req.json()
    console.log(data[0]);
    writeData(data)
}
getData(api_Link)

const writeData = (data)=>{
    block.innerHTML = ""
        const valuesArray1 = Object.values(data[0].languages);
        const borderCountries = data[0].borders || []; 
        const bordersHTML = borderCountries.map((borderCountry) => {
            return `<div class="border">${borderCountry}</div>`;
        }).join('');
        const currenciesHTML = [];
        for (const currencyCode in data[0].currencies) {
            if (data[0].currencies.hasOwnProperty(currencyCode)) {
                currenciesHTML.push(`<span>${data[0].currencies[currencyCode].name}</span>`);
            }
        }
        const currenciesString = currenciesHTML.join(', ');
        var id = 0
        if(data.length == 2){
            id = 1
        }
        block.innerHTML += `
        <div class="block_left">
                <img src="${data[id].flags.png}" alt="">
            </div>
            <div class="block_right">
                <h1>${data[id].name.common}</h1>
                <div class="block_info">
                    <div class="block_info_left">
                        <h4>Native Name: <span>${data[id].name.official}</span></h4>
                        <h4>Population: <span>${data[id].population}</span></h4>
                        <h4>Region: <span>${data[id].region}</span></h4>
                        <h4>Sub Region: <span>${data[id].subregion}</span></h4>
                        <h4>Capital: <span>${data[id].capital}</span></h4>
                    </div>
                    <div class="block_info_right">
                        <h4>Top Level Domain: <span>${data[id].tld[0]}</span></h4>
                        <h4>Currencies: ${currenciesString}</span></h4>
                        <h4>Languages: <span>${valuesArray1}</span></h4>
                    </div>
                </div>
                <div class="borders">
                    <h4>Border Countries: </h4>
                    <div class="border_countries">
                        ${bordersHTML}
                    </div>
                </div>
            </div>
        `
}
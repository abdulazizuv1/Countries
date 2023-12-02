var api_link = "https://restcountries.com/v3.1/all"
const main_modal = document.querySelector(".main_modal")
const boxes = document.querySelector(".boxes")
const mode = document.querySelector(".mode")
const body = document.querySelector("body")
const span = document.querySelector("span")
const select = document.querySelector("select")
const input = document.querySelector("input")

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
    main_modal.style = "display: flex;"
    const req = await fetch(link)
    const data = await req.json()
    writeData(data)
    main_modal.style = "display: none;"
    console.log(data);
}

getData(api_link)

const writeData = (data)=>{
    boxes.innerHTML = ""
    data.forEach((item) => {
        boxes.innerHTML +=`
        <a href="state/index.html?name=${item.name.common}" class="box">
                <img src="${item.flags.png}" alt="">
                <div class="box_info">
                    <h3 class="name">${item.name.common}</h3>
                    <h4>Population: <span>${item.population}</span></h4>
                    <h4>Region: <span class="regions"> ${item.continents}</span></h4>
                    <h4>Capital: <span class="span">${item.capital}</span></h4>   
                </div>             
            </div>
        `
    });
}



select.addEventListener("change", ()=>{
    const cards = document.querySelectorAll(".box")
    cards.forEach((item)=>{
        var region = item.querySelector(".regions").textContent.toLowerCase()
        var selectRegion = select.value
        if(selectRegion == "all"){
            item.classList.remove("hidden")
        }
        else if(!region.includes(selectRegion)){
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")
        }
    })
})

input.addEventListener("input", ()=>{
    const cards = document.querySelectorAll(".box")
    cards.forEach((item)=>{
        var name = item.querySelector(".name").textContent.toLowerCase()
        var inputValue = input.value.toLowerCase().trim().replaceAll(" ", "")
        if(!name.includes(inputValue)){
            item.classList.add("hidden")
        }else{
            item.classList.remove("hidden")
        }
    })
})
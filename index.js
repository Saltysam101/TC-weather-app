import { apiKey } from "./api.js";

//Select elements
let form = document.getElementById("form");
let cityInput = document.getElementById("city-input");
let citySearchInput = document.getElementById("city-search-input");
let stateInput = document.getElementById("state-input");
let stateSearchInput = document.getElementById("state-search-input");
let countryInput = document.getElementById("country-input");
let countrySearchInput = document.getElementById("country-search-input");
let formBtn = document.getElementById("form-btn");
let searchBtn = document.getElementById("search-btn");
let cityP = document.getElementById("city-name");

//modal event listener
formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    //Weather api url
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value},${stateInput.value},${countryInput.value}&appid=${apiKey}&units=imperial`;

    if (!cityInput.value || !stateInput.value) {
        alert("Please fill out the required information")
    } else {

        //Fetch data from api
        fetch(weatherUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                console.log(cityInput.value, stateInput.value)
                form.style.display = "none"
                cityP.textContent = data.name
            })
            .catch((error) => {
                console.error(error)
            })
    }
})

//search event listener
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    //Weather api url
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInput.value},${stateSearchInput.value},${countrySearchInput.value}&appid=${apiKey}&units=imperial`;

    if (!citySearchInput.value || !stateSearchInput.value) {
        alert("Please fill out the required information")
    } else {

        //Fetch data from api
        fetch(weatherUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                console.log(citySearchInput.value, stateSearchInput.value)
                form.style.display = "none"
                cityP.textContent = data.name
            })
            .catch((error) => {
                console.error(error)
            })
    }
})
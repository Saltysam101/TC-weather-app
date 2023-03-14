//imports
import { apiKey } from "../src/api.js";
import SaveLocations from "../src/SaveLocations.js";
import Weather from "../src/Weather.js";

//Select elements
let form = document.getElementById("nav-form");
let zipcodeSearchInput = document.getElementById("zipcode-search-input");
let countrySearchInput = document.getElementById("country-search-input");
let searchBtn = document.getElementById("search-btn");
let cityHeading = document.getElementById("city-name");
let tempHeading = document.getElementById("temperature");
let saveBtn = document.getElementById("save-btn");
let locationList = document.getElementById("locations");
let pWeatherDescription = document.getElementById("description");
let card = document.getElementById("card")

let saveLocation = new SaveLocations();

card.style.display = 'none'





//search event listener
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    card.style.display = "flex"
        //Weather api url
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcodeSearchInput.value},${countrySearchInput.value}&appid=${apiKey}&units=imperial`;

    if (!zipcodeSearchInput.value) {
        alert("Please fill out the required information")
    } else {

        //Fetch data from api
        fetch(weatherUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                console.log("end data")


                cityHeading.textContent = data.name
                tempHeading.textContent = `${data.main.temp.toFixed(0)}° F`;
                pWeatherDescription.textContent = data.weather[0].description


                saveBtn.addEventListener("click", (event) => {
                    let newWeather = new Weather(data.name, zipcodeSearchInput.value, countrySearchInput.value)
                    console.log(newWeather)
                    saveLocation.save(newWeather);
                    console.log(saveLocation)
                    let li = document.createElement("li");
                    li.textContent = newWeather.name;
                    locationList.appendChild(li)
                    console.log("end save")

                    li.addEventListener("click", () => {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${newWeather.zipcode},${newWeather.country}&appid=${apiKey}&units=imperial`)
                            .then((res) => {
                                return res.json()
                            })
                            .then((data) => {
                                cityHeading.textContent = data.name
                                tempHeading.textContent = `${data.main.temp.toFixed(0)}° F`;
                            })
                    })
                    li.addEventListener("dblclick", () => {
                        console.log("dbl click")
                        saveLocation.remove(li)
                        locationList.removeChild(li)
                    })
                }, { once: true })
            })
            .catch((error) => {
                console.error(error)
            })
    }

})

function toggle(v) {
    return { metric: 'imperial', imperial: 'metric' }[v];
}

function toggleUnit(v) {
    return { F: 'C', C: 'F' }[v]
}
var position = 'imperial';

var unit = 'F'


tempHeading.addEventListener('click', () => {
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcodeSearchInput.value},${countrySearchInput.value}&appid=${apiKey}&units=${position = toggle(position)}`
    console.log(position)
    fetch(weatherApi)
        .then((res) => res.json())
        .then((data) => {
            tempHeading.textContent = `${data.main.temp.toFixed(0)}° ${unit = toggleUnit(unit)}`
            console.log(unit)
        })
})
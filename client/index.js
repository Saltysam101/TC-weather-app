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

let weatherArray = [];


function fetchWeather(zipcode, country){
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${country}&appid=${apiKey}&units=imperial`)
    .then((res) => {
        return res.json();
    })
    .then((data)=> {
        console.log(data)
        //New instance of the Weather Obj
        const newWeather = new Weather(data.name, zipcode, data.sys.country);
        weatherArray.push(newWeather);
        console.log(weatherArray)
        cityHeading.textContent = data.name
        tempHeading.textContent = `${data.main.temp.toFixed(0)}° F`;
        pWeatherDescription.textContent = data.weather[0].description

    })
    .catch((error) => {
        console.error(error)
    })
}



//search event listener
searchBtn.addEventListener('click', (event) => {
    //prevents page reload
    event.preventDefault();

    card.style.display = "flex"

    if (!zipcodeSearchInput.value) {
        alert("Please fill out the required information")
    } else {
        fetchWeather(zipcodeSearchInput.value, countrySearchInput.value);
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

 saveBtn.addEventListener("click", (event) => {
    saveLocation.save(weatherArray);
    
    console.log(saveLocation)
    let li = document.createElement("li");
    console.log("array",weatherArray)
    li.textContent = weatherArray[weatherArray.length - 1].cityName;
    locationList.appendChild(li)
    console.log("end save")

    li.addEventListener("dblclick", () => {
        console.log("dbl click")
        saveLocation.remove(li)
        locationList.removeChild(li)
    })
    li.addEventListener("click", () => {
        //console.log(weatherArray.filter((weather) => weather.cityName === li.textContent), weatherArray)
        weatherArray.filter((weather) => {
            weather.cityName === li.textContent ?
            fetchWeather(weather.zipcode, weather.country):
            console.log("no")
        })
        //fetchWeather(weatherArray[0].zipcode, weatherArray[0].country)

        
    })
}) 


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
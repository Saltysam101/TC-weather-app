//Select elements
let form = document.getElementById("form");
let cityInput = document.getElementById("city-input");
let stateInput = document.getElementById("state-input");
let countryInput = document.getElementById("country-input");
let formBtn = document.getElementById("form-btn");
let cityP = document.getElementById("city-name");


formBtn.addEventListener('click', (event) => {
    event.preventDefault();

    //Weather api url
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value},${stateInput.value},${countryInput.value}&appid=6559e730bef63e694ade51c05d0d0371&units=imperial`;

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
                form.style.display = "none"
                cityP.textContent = data.name
            })
            .catch((error) => {
                console.error(error)
            })
    }
})
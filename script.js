// Construct selectors to DOM elements: text input, button, div and paragraphs ...
const textInputHandler = document.getElementById('cityInput');
const btnHandler = document.getElementById('btnSubmit');

const dataHandler = document.getElementsByClassName('weatherContent');
const tempHandler = document.getElementById('text-temp');
const pressureHandler = document.getElementById('text-pres');
const humidityHandler = document.getElementById('text-humi');
const latitudeHandler = document.getElementById('text-lati');
const longitudeHandler = document.getElementById('text-long');

if (dataHandler) {
    console.log('Success! Applied selectors to all data.');
} else {
    console.log('Error! Something went wrong ...');
}

// Necessary parts of the API URL path ...
const apiPath = 'https://api.openweathermap.org/data/2.5/find?q=';
const units = '&units=metric';
const apiKey = '&appid=65aaa9254ed8faa45d12a6be46313a09';

function fetchData() {
    const apiQuery = apiPath + textInputHandler.value + units + apiKey; // API query path (URL)

    fetch(apiQuery)
    .then(resp => resp.json())
    .then(data => {
        console.log('JSON data fetched: ', data);
        doWork(data);
    }).catch(err => {
        console.log(`An error has occurred while attempting to fetch JSON: ${err}`);
    });
}

function doWork(data) {
    // Grab weather data from JSON object
    // Also, choose first element in list array (distinguish between places with similar names)
    let weatherData = data.list[0].main;
    let coordinates = data.list[0].coord; 

    tempHandler.innerHTML = weatherData.temp;
    pressureHandler.innerHTML = weatherData.pressure;
    humidityHandler.innerHTML = weatherData.humidity;
    latitudeHandler.innerHTML = coordinates.lat;
    longitudeHandler.innerHTML = coordinates.lon;


    // Set temperature data text paragraph
    if (weatherData.temp >= 25) {
        tempHandler.style.color = 'Red';
        (weatherData.temp >= 40) ? tempHandler.style.color = 'DarkRed' : tempHandler.style.color = 'Red';
    } else if (weatherData.temp <= 0) { // Human body can survive naked for 20min at 0
        tempHandler.style.color = 'Blue';
        (weatherData.temp < -20) ? tempHandler.style.color = 'DarkBlue' : tempHandler.style.color = 'Blue';
    } else {
        tempHandler.style.color = 'Green';
    }

    // Set pressure data text paragraph
    if (weatherData.pressure < 800) { // Arbitrary limit (800)
        pressureHandler.style.color = 'Blue';
        (weatherData.pressure < 475) ? pressureHandler.style.color = 'DarkBlue' : pressureHandler.style.color = 'Blue';
    } else if (weatherData.pressure > 2000) { // Arbitrary limit (2000)
        pressureHandler.style.color = 'Red';
        (weatherData.pressure > 2500) ? pressureHandler.style.color = 'DarkRed' : pressureHandler.style.color = 'Red';
    } else {
        pressureHandler.style.color = 'Green';
    }

    // Set humidity data text paragraph
    if (weatherData.humidity >= 70) {
        humidityHandler.style.color = 'Red';
    } else if (weatherData.humidity < 50) {
        humidityHandler.style.color = 'Blue';
    } else {
        humidityHandler.style.color = 'Green';
    }
    initMap(coordinates.lat, coordinates.lon); // Set map to current location (lat, lon)
}
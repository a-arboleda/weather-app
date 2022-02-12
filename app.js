//Import/Select elements from index.html to manipulate them
//Importar/seleccionar los elementos de index.html que vana ser manipulados

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');


//App data
//Datos que la app va a a tener para luego ser mostrados al usuario

const weather = {};
weather.temperature = {
    unit: 'celsius'
};

// const and variables
//Constantes y variables
const KELVIN = 273; //unidad de temperatura para hallar el valor de la temperatura del usuario
const key = '00c8ec060053eaaa57fcefa2399fcb1e' //mi api key
//


//Check if the browser supports Geolocalization
//Verificar si el browser soporta la geolocalizacion
if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> Browser does not support Geolocalization`
}


//set user position
//Establecer la posicion del usuario


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude)
}

//show error when there is an issue with geolocalization service
//Mostrar un error si hay un problema con el servicio de geolocalizacion(Usamos elemento notification).

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p>${error.message}</p>`;

}

//get weather from api provider
//Obtener la API del proveedor

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    console.table(api);//me muestra los datos de mi ubicación
    fetch(api) // Fetch es el nombre de una nueva API para Javascript con la cuál podemos realizar peticiones HTTP asíncronas utilizando promesas
    .then(function(response){//despues de recibir los datos se almacenan en formato json en variable data
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country
    })

    
    .then(function(){
        displayWeather();
    });
}

//Display Weather to UI
//Mostrar el clima a los usuarios

function displayWeather(){
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png">`
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`

}
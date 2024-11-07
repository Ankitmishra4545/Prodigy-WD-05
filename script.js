// script.js

const apiKey = "ba1461d5b5c94386a2e64627240711"; // Replace with your actual WeatherAPI key
const weatherDisplay = document.getElementById("weatherDisplay");
const fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
const locationWeatherBtn = document.getElementById("locationWeatherBtn");

// Fetch weather by city name
fetchWeatherBtn.addEventListener("click", () => {
    const location = document.getElementById("locationInput").value;
    if (location) {
        fetchWeatherByCity(location);
    } else {
        alert("Please enter a city name.");
    }
});

// Fetch weather by user's current location
locationWeatherBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, error => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Fetch weather data by city name
function fetchWeatherByCity(city) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("Error fetching weather data."));
}

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("Error fetching weather data."));
}

// Display the weather data
function displayWeather(data) {
    if (data && data.location) {  // Ensure data is fetched successfully
        const { location, current } = data;
        weatherDisplay.innerHTML = `
            <h2>Weather in ${location.name}, ${location.region}</h2>
            <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${current.condition.text}</p>
            <p><strong>Humidity:</strong> ${current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
            <img src="https:${current.condition.icon}" alt="${current.condition.text}">
        `;
    } else {
        weatherDisplay.innerHTML = "<p>Location not found. Please try again.</p>";
    }
}

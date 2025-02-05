
const apiKey = "8f99ace072574da498f193508250402";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const weatherApp = document.querySelector('.weather-app'); // Select the .weather-app container

async function fetchWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("City not found! Please try again.");
            return;
        }

        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function updateWeatherUI(data) {
    cityName.textContent = data.location.name;
    temp.textContent = `${Math.round(data.current.temp_c)}°C`;
    description.textContent = data.current.condition.text;

    const iconUrl = `https:${data.current.condition.icon}`;
    weatherIcon.src = iconUrl;

    updateBackground(data.current.temp_c); // Pass temperature to update background
}

function updateBackground(temp) {
    let tempClass = '';
    if (temp <= 10) {
        tempClass = 'bg-cold';
    } else if (temp > 10 && temp <= 25) {
        tempClass = 'bg-warm';
    } else {
        tempClass = 'bg-hot';
    }

    // Remove any existing temperature background class and add the new one
    weatherApp.classList.remove('bg-cold', 'bg-warm', 'bg-hot');
    weatherApp.classList.add(tempClass);

    // Also change the body's background color
    document.body.classList.remove("bg-cold", "bg-warm", "bg-hot");
    document.body.classList.add(tempClass);
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

const apiKey = "512f10a56d5dba46b416f53049e1ec55"; // Replace with your OpenWeatherMap API key
const weatherDataDiv = document.getElementById("weatherData");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeatherByLocation(location);
  } else {
    alert("Please enter a location.");
  }
});

function fetchWeatherByLocation(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayWeatherData(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;

  weatherDataDiv.innerHTML = `
    <p><strong>Location:</strong> ${name}</p>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Condition:</strong> ${description}</p>
  `;
}

// Optionally, fetch weather by user's geolocation
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.warn("Geolocation is disabled or unavailable.");
      }
    );
  }
};

function fetchWeatherByCoordinates(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

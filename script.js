const api_key = '608e578f698683e323d358c5118c36cd';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
const cityInput = document.querySelector('.city');
const searchBtn = document.getElementById('search');
const weatherInfo = document.querySelector('.Weather');



// Search for weather data
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim()
    if (city) {

        // get weather data
        getWeatherData(city)
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiURL}?q=${city}&appid=${api_key}&units=metric`);
        const data = await response.json();
        if (data.cod===200) {
            displayWeatherInfo(data)
        } else {
            weatherInfo.innerHTML = `<p> Error : Data not found </p>`
        }

    } catch (error) {
        weatherInfo.innerHTML = '<p>Error: Unable to fetch weather data</p>';
        console.error(error);
    }
}

function displayWeatherInfo(data) {
    const { name, weather, main, wind } = data;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;

    weatherInfo.innerHTML = `
    <div class="b">
      <h1 class="temp">${temp}°C</h1>
      <h2 class="city">${name}</h2>
      <div class="icon">
      <img class="weather-image" src="weather.jpeg" alt="${description}">
      </div>
    </div>
    <div class="det">
      <div class="col">
        <img src="humidity.jpeg" alt="Humidity Icon">
        <div>
          <p class="humidity">${humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="wind.jpeg" alt="Wind Speed Icon">
        <div>
          <p class="wind">${speed} km/h</p>
          <p>Wind speed</p>
          </div>
        </div>
      </div>
    `;
  }
  
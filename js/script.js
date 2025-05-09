document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector(".city");
  const searchBtn = document.getElementById("search");
  const weatherInfo = document.querySelector(".Weather");

  cityInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) {
        getWeatherData(city);
      }
    }
  });

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  });

  async function getWeatherData(city) {
    weatherInfo.innerHTML = '<div class="loading">Loading...</div>';

    try {
      const response = await fetch(
        `${CONFIG.API_URL}?q=${city}&appid=${CONFIG.API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        displayWeatherInfo(data);
      } else {
        weatherInfo.innerHTML = `<div class="error-message">City not found. Please try again.</div>`;
      }
    } catch (error) {
      weatherInfo.innerHTML =
        "<div class='error-message'>Error: Unable to fetch weather data</div>";
      console.error(error);
    }
  }

  function displayWeatherInfo(data) {
    const { name, weather, main, wind, sys } = data;
    const { description, icon } = weather[0];
    const { temp, humidity } = main;
    const { speed } = wind;
    const roundedTemp = Math.round(temp);

    weatherInfo.innerHTML = `
      <div class="weather active">
        <div class="b">
          <h1 class="temp">${roundedTemp}°C</h1>
          <h2 class="city">${name}, ${sys.country}</h2>
          <p class="description">${description}</p>
          <div class="icon">
            <img class="weather-image" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          </div>
        </div>
        <div class="det">
          <div class="col">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#fff" d="M12 21.5q-3.325 0-5.663-2.3T4 13.6q0-1.575.613-3.012T6.35 8.05l4.25-4.175q.3-.275.663-.425T12 3.3t.738.15t.662.425l4.25 4.175q1.125 1.1 1.738 2.538T20 13.6q0 3.3-2.337 5.6T12 21.5m-6-7.9h12q0-1.175-.45-2.237T16.25 9.5L12 5.3L7.75 9.5q-.85.8-1.3 1.863T6 13.6"/></svg>
          <div>
            <p class="humidity">${humidity}%</p>
            <p class="label">Humidity</p>
          </div>
        </div>
        <div class="col">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 512 512"><defs><linearGradient id="meteoconsWindFill0" x1="138.5" x2="224.2" y1="5.1" y2="153.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient><linearGradient id="meteoconsWindFill1" x1="77.7" x2="169" y1="96.2" y2="254.4" href="#meteoconsWindFill0"/><symbol id="meteoconsWindFill2" viewBox="0 0 348 240"><path fill="none" stroke="url(#meteoconsWindFill0)" stroke-dasharray="148" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M267.2 24.3A40 40 0 1 1 296 92H12"><animate attributeName="stroke-dashoffset" dur="6s" repeatCount="indefinite" values="0; 2960"/></path><path fill="none" stroke="url(#meteoconsWindFill1)" stroke-dasharray="110" stroke-linecap="round" stroke-miterlimit="10" stroke-width="24" d="M151.2 215.7A40 40 0 1 0 180 148H12"><animate attributeName="stroke-dashoffset" dur="6s" repeatCount="indefinite" values="0; 1540"/></path></symbol></defs><use width="348" height="240" href="#meteoconsWindFill2" transform="translate(82 136)"/></svg>
          <div>
            <p class="wind">${speed} km/h</p>
            <p class="label">Wind Speed</p>
          </div>
        </div>
        </div>
      </div>
    `;
  }

  getWeatherData("Delhi");
});

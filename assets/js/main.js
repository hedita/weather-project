import {cities} from "./list-of-cities.js";
console.log(cities)
const cityDropdown = document.getElementById("cities");
const appId = "e0cb24360c821c3571a49c9d05be0fb1";

function generateValueFromCity(city) {
  return `${city.name},${city.countryCode}`;
}

function createCitiesOptions(cities) {
  let optionsHtml = "";
  cities.forEach((city) => {
    optionsHtml += `<option value="${generateValueFromCity(city)}">${
      city.name
    }</option>`;
  });
  cityDropdown.innerHTML = optionsHtml;
}

async function getCityLocation(city) {
  const data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${appId}`
  );

  const [{ lat, lon }] = await data.json();

  return { lat, lon };
}

async function getCityWeather(lat, lon) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appId}`
  );
  const result = await data.json();

  return result;
}

async function showCityWeather(city, list) {
  const cityNameElement = document.getElementById("city-name");
  const windSpeedElement = document.getElementById("wind");
  const humidityElement = document.getElementById("humidity");
  const tempElement = document.getElementById("temp");
  const descriptionElement = document.getElementById("description");
  const timeElement = document.getElementById("time");
  const iconElement = document.getElementById("current-icon");

  const windSpeed = list[0].wind.speed;
  const humidityPercent = list[0].main.humidity;
  const temperature = list[0].main.temp;
  const description = list[0].weather[0].description;
  const icon = list[0].weather[0].icon;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.toLocaleString("default", { month: "short" });
  const dayName = now.toLocaleString("en-us", { weekday: "long" });
  const dayNumber = now.getUTCDate();

  cityNameElement.innerHTML = city.name;
  windSpeedElement.innerHTML = windSpeed;
  humidityElement.innerHTML = `${humidityPercent}%`;
  tempElement.innerHTML = `${Math.round(temperature)}&#176;C`;
  descriptionElement.innerHTML = description;
  timeElement.innerHTML = `${dayName}, ${dayNumber} ${month} ${year}`;
  iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`;

  // Today
  const today = createDayBox(
    `http://openweathermap.org/img/wn/${list[0].weather[0].icon}@2x.png`,
    Math.round(list[0].main.temp),
    "Today"
  );

  // tomorrow
  const dayNameTomorrow = new Date(list[5].dt * 1000).toLocaleString("en-us", {
    weekday: "long",
  });
  const tomorrow = createDayBox(
    `http://openweathermap.org/img/wn/${list[5].weather[0].icon}@2x.png`,
    Math.round(list[5].main.temp),
    dayNameTomorrow
  );

  // day after tomorrow
  const dayNameDayAfterTomorrow = new Date(list[11].dt * 1000).toLocaleString(
    "en-us",
    {
      weekday: "long",
    }
  );
  const dayAfterTomorrow = createDayBox(
    `http://openweathermap.org/img/wn/${list[10].weather[0].icon}@2x.png`,
    Math.round(list[10].main.temp),
    dayNameDayAfterTomorrow
  );

  document.getElementById(
    "next-days-container"
  ).innerHTML = `${today}${tomorrow}${dayAfterTomorrow}`;
}

function createDayBox(iconUrl, temp, dayName) {
  return `<div>
            <div><img src="${iconUrl}"></div>
            <div>${temp}°C</div>
            <div>${dayName}</div>
          </div>`;
}

async function displayWeather(selectedCity) {
  const { lat, lon } = await getCityLocation(selectedCity);
  const { city, list } = await getCityWeather(lat, lon);

  showCityWeather(city, list);
}

cityDropdown.addEventListener("change", async () => {
  displayWeather(cityDropdown.value);
});

createCitiesOptions(cities);
displayWeather(generateValueFromCity(cities[0]));
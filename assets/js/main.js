const selectedCityName = document.getElementById("cities");
const lat = 37.2793607;
const lon = 49.5846102;

selectedCityName.addEventListener("click", () => {
  if (selectedCityName.value === "rasht") {
    getCityLocatin({ name: "Rasht", countryCode: "IR" });
  } else if (selectedCityName.value === "tehran") {
    getCityLocatin({ name: "Tehran", countryCode: "IR" });
  } else if (selectedCityName.value === "stockholm") {
    getCityLocatin({ name: "Stockholm", countryCode: "SE" });
  }
});

async function getCityLocatin(object) {
  const fetchedData = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${object.name},${object.countryCode}&limit=1&appid=e0cb24360c821c3571a49c9d05be0fb1`
  );
  const selectedCityLocation = await fetchedData.json();

  const lat = selectedCityLocation[0].lat;
  const lon = selectedCityLocation[0].lon;

  getWeather(lat, lon);
}

async function getWeather(lat, lon) {
  const result = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=e0cb24360c821c3571a49c9d05be0fb1`
  );
  const resultJson = await result.json();
  const cityName = document.getElementById("city-name");
  const { city, list } = resultJson;

  cityName.innerHTML = city.name;

  const wind = document.getElementById("wind");
  const windSpeed = list[0].wind.speed;
  wind.innerHTML = windSpeed;

  const humidity = document.getElementById("humidity");
  const humidityPercent = list[0].main.humidity;
  humidity.innerHTML = `${humidityPercent}%`;

  const temp = document.getElementById("temp");
  const todayTemp = document.getElementById("today-temp");
  const tomorrow = document.getElementById("tomorrow");
  const dayAfterTomorrow = document.getElementById("day-after-tomorrow");
  const temperature = list[0].main.temp;
  temp.innerHTML = `${Math.round(temperature)}&#176;C`;
  todayTemp.innerHTML = `${Math.round(temperature)}&#176;C`;
  const tomorrowTemperature = list[5].main.temp;
  tomorrow.innerHTML = `${Math.round(tomorrowTemperature)}&#176;C`;
  const dayAfterTomorrowTemp = list[10].main.temp;
  dayAfterTomorrow.innerHTML = `${Math.round(dayAfterTomorrowTemp)}&#176;C`;

  const description = document.getElementById("description");
  const descrip = list[0].weather[0].description;
  description.innerHTML = descrip;

  const iconId = document.getElementById("icon");
  const icon = list[0].weather[0].icon;
  iconId.innerHTML = icon;

  const time = document.getElementById("time");
  const now = new Date();
  const tomorrowDate = new Date(list[5].dt * 1000);
  const tomorrowDayName = document.getElementById("tomorrow-day-name");
  const dayNameTomorrow = tomorrowDate.toLocaleString("en-us", {
    weekday: "long",
  });
  tomorrowDayName.innerHTML = dayNameTomorrow;
  const dayAfterTomorrowDate = new Date(list[11].dt * 1000);

  const dayAfterTomorrowDayName = document.getElementById(
    "day-after-tomorrow-day-name"
  );
  const DayNameDayAfterTomorrow = dayAfterTomorrowDate.toLocaleString("en-us", {
    weekday: "long",
  });
  dayAfterTomorrowDayName.innerHTML = DayNameDayAfterTomorrow;

  const year = now.getFullYear();
  const month = now.toLocaleString("default", { month: "short" });
  const dayName = now.toLocaleString("en-us", { weekday: "long" });
  const dayNumber = now.getUTCDate();
  const date = `${dayName}, ${dayNumber} ${month} ${year}`;
  time.innerHTML = date;
}
getWeather(lat, lon);
async function getWeather() {
    const result = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=37.2713&lon=49.5921&units=metric&appid=e0cb24360c821c3571a49c9d05be0fb1")
    const resultJson = await result.json();
    const cityName = document.getElementById("city-name");
    const {city, list}  = resultJson;
    cityName.innerHTML = city.name;

    const wind = document.getElementById("wind");
    const windSpeed = list[0].wind.speed;
    wind.innerHTML = windSpeed;

    const rain = document.getElementById("rain");
    const rainChance = list[0].weather[0].rain;
    rain.innerHTML = rainChance;

    let temp = document.getElementById("temp");
    let temperature = list[0].main.temp;
    temp.innerHTML = `${Math.round(temperature)}&#176;C`;

    const description = document.getElementById("description");
    const descrip = list[0].weather[0].description;
    description.innerHTML = descrip;

    const iconId = document.getElementById("icon");
    //const icon = list[0].weather[0].icon;
    //iconId.innerHTML = icon;

   console.log(list[0])
}
  getWeather(); 

const time = document.getElementById("time");
const now = new Date();
const year = now.getFullYear();
const month = now.toLocaleString('default', { month: 'short' });
const dayName = now.toLocaleString('en-us', {weekday:'long'});
const dayNumber = now.getUTCDate();
const date = dayName + ", " + dayNumber + " " + month + " " + year;
time.innerHTML = date;
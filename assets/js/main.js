async function getWeather() {
    const result = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=37.2713&lon=49.5921&appid=e0cb24360c821c3571a49c9d05be0fb1")
    const resultJson = await result.json();
    const cityName = document.getElementById("city-name");
    const {city}  = resultJson;
    cityName.innerHTML = city.name;
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


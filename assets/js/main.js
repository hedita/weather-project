const cityName = document.getElementById("city-name");


async function getWeather() {
    const result = await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat=37.2713&lon=49.5921&limit=&exclude=daily,weather.icon&appid=9249d4649089f661a90f4514cc165a33")
    const resultJson = await result.json();
    const [{name}] = resultJson;
  console.log(resultJson)
    cityName.innerHTML = name;
}
  getWeather(); 

async function getWeather() {
    const result = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=37.2713&lon=49.5921&units=metric&appid=e0cb24360c821c3571a49c9d05be0fb1")
    const resultJson = await result.json();
    const cityName = document.getElementById("city-name");
    const {city, list}  = resultJson;
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
    const tomorrowDate = new Date(list[5].dt *1000);
    const tomorrowDayName = document.getElementById("tomorrow-day-name");
    const dayNameTomorrow = tomorrowDate.toLocaleString('en-us', {weekday:'long'});
    tomorrowDayName.innerHTML = dayNameTomorrow;
    const dayAfterTomorrowDate = new Date(list[11].dt *1000);
    
    const dayAfterTomorrowDayName = document.getElementById("day-after-tomorrow-day-name");
    const DayNameDayAfterTomorrow = dayAfterTomorrowDate.toLocaleString('en-us', {weekday:'long'});
    dayAfterTomorrowDayName.innerHTML = DayNameDayAfterTomorrow;
    
    const year = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'short' });
    const dayName = now.toLocaleString('en-us', {weekday:'long'});
    const dayNumber = now.getUTCDate();
    const date = dayName + ", " + dayNumber + " " + month + " " + year;
    time.innerHTML = date;  
   console.log(list)
}
  getWeather(); 
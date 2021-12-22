//variabelen
var cityName, weather, description, weatherIcon, minTemp, maxTemp, currTemp, feelTemp, pressure, humidity, windSpeed, windDeg, sunrise, sunset, curerntTimeStamp
var btnFahrenheit
var dropdown
//API ophalen
const getAPI = async (position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=44509530092aaf93cae9d19ed37440a8`)
        .then((r) => r.json())
        .catch((err) => console.error('Error: ', err))

    console.log(data)
    processData(data)
}

var calc_wind = function (deg) {
    if (deg > 11.25 && deg < 33.75) {
        return "NNE";
    } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
    } else if (deg > 56.25 && deg < 78.75) {
        return "E";
    } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
    } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
    } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
    } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
    } else if (deg > 168.75 && deg < 191.25) {
        return "S";
    } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
    } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
    } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
    } else if (deg > 258.75 && deg < 281.25) {
        return "W";
    } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
    } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
    } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
}

function currentTime() {
    let date = new Date();
    let month = date.toLocaleString('default', { month: 'long' })
    let day = date.getDay()
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();


    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = day + " " + month + ", " + hh + ":" + mm + ":" + ss;

    document.querySelector(".js-currenttimestamp").innerHTML = time;
    var t = setTimeout(function () { currentTime() }, 1000);

}



const processData = function (data) {
    console.log("Processing Data")
    weatherMain = data.weather
    for (var i of weatherMain) {
        weather = i.main
        description = i.description
        weatherIcon = i.icon
    }

    cityName = data.name

    //celsius
    minTempC = (data.main.temp_min - 273.15).toFixed(0) + '°C'
    maxTempC = (data.main.temp_max - 273.15).toFixed(0) + '°C'
    currTempC = (data.main.temp - 273.15).toFixed(0) + '°C'
    feelTempC = (data.main.feels_like - 273).toFixed(0) + '°C'

    //Fahrenheit
    minTempF = (((data.main.temp_min - 273.15) * 1.8) + 32).toFixed(0) + '°F'
    maxTempF = (((data.main.temp_max - 273.15) * 1.8) + 32).toFixed(0) + '°F'
    currTempF = (((data.main.temp - 273.15) * 1.8) + 32).toFixed(0) + '°F'
    feelTempF = (((data.main.feels_like - 273) * 1.8) + 32).toFixed(0) + '°F'


    pressure = data.main.pressure + ' hPa'
    humidity = data.main.humidity + '%'
    windSpeed = (data.wind.speed * 3.6).toFixed(1) + ' km/u'
    windDir = calc_wind(data.wind.deg)
    sunrise = timeConverterWithoutSeconds(data.sys.sunrise)
    sunset = timeConverterWithoutSeconds(data.sys.sunset)

    console.log(weather, description, cityName, minTemp, maxTemp, currTemp, pressure, humidity, windSpeed, sunrise, sunset)
    insertData()
}


const insertData = function () {
    document.querySelector(".js-location").innerHTML = cityName
    document.querySelector(".js-weatherdescription").innerHTML = weather
    document.querySelector(".js-weather-icon").src = `img/icons/${weatherIcon}.svg`
    document.querySelector(".js-mintemp").innerHTML = minTempC
    document.querySelector(".js-maxtemp").innerHTML = maxTempC
    document.querySelector(".js-feeltemp").innerHTML = feelTempC
    document.querySelector(".js-temperature").innerHTML = currTempC
    document.querySelector(".js-pressure").innerHTML = pressure
    document.querySelector(".js-humidity").innerHTML = humidity
    document.querySelector(".js-windfull").innerHTML = `${windDir} | ${windSpeed}`
    document.querySelector(".js-sunset").innerHTML = sunset
    document.querySelector(".js-sunrise").innerHTML = sunrise

    btnFahrenheit = document.querySelector(".js-fahrenheit")
    btnFahrenheit.addEventListener("click", function () {
        document.getElementById("animation").classList.add("c-animation")
        if (btnFahrenheit.checked) {
            document.querySelector(".js-mintemp").innerHTML = minTempF
            document.querySelector(".js-maxtemp").innerHTML = maxTempF
            document.querySelector(".js-feeltemp").innerHTML = feelTempF
            document.querySelector(".js-temperature").innerHTML = currTempF
        }
        else {
            document.querySelector(".js-mintemp").innerHTML = minTempC
            document.querySelector(".js-maxtemp").innerHTML = maxTempC
            document.querySelector(".js-feeltemp").innerHTML = feelTempC
            document.querySelector(".js-temperature").innerHTML = currTempC
        }
        setTimeout(() => { document.getElementById("animation").classList.remove("c-animation"); }, 1000);
    })
}


//Locatie ophalen
const getCurrentLocation = function () {
    currentLoc = navigator.geolocation.getCurrentPosition(getAPI)
}

//Hulp functies
const timeConverter = function (unix) {
    time = new Date(unix * 1000)
    hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return hour + ':' + min + ':' + sec
}

const timeConverterWithoutSeconds = function (unix) {
    time = new Date(unix * 1000)
    hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    sec = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    return hour + ':' + min
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script Loaded');
    getCurrentLocation()
    currentTime()
})

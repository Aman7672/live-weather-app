const apikey = "ed91416ccd8a96777b182480b80a8032";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    document.querySelector(".loader").style.display = "block";
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    document.querySelector(".loader").style.display = "none";

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".feelslike").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";
        document.querySelector(".pressure").innerHTML = "Pressure: " + data.main.pressure + " hPa";
        document.querySelector(".sunrise").innerHTML = "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString();

        let weatherCondition = data.weather[0].main.toLowerCase();
        switch (weatherCondition) {
            case "clouds":
                weatherIcon.src = "images/clouds.png"; break;
            case "clear":
                weatherIcon.src = "images/clear.png"; break;
            case "rain":
                weatherIcon.src = "images/rain.png"; break;
            case "drizzle":
                weatherIcon.src = "images/drizzle.png"; break;
            case "mist":
                weatherIcon.src = "images/mist.png"; break;
            default:
                weatherIcon.src = "images/default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkweather(searchBox.value);
    }
});

window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apikey}`)
                .then(res => res.json())
                .then(data => {
                    checkweather(data.name);
                });
        });
    }
});

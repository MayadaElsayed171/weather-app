document.addEventListener("DOMContentLoaded", function () {
  getWeather("Cairo");
});

document.getElementById("submit").addEventListener("click", function () {
  const city = document.getElementById("search").value.trim();
  if (city !== "") {
    getWeather(city);
  }
});



async function getWeather(city) {
  const apiKey = "de5ca0e76db0475c9dc74826252406";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  const container = document.getElementById("forecast");
  container.innerHTML = "";

  const days = data.forecast.forecastday;

  days.forEach((day, index) => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: 'long' });

    let content = "";

    if (index === 0) {
      content = `
        <div class="forecast today">
            <div class="forecast-header d-flex justify-content-between align-items-center py-2 px-3 bg-light-transparent">
                <div class="day">${dayName}</div>
                <div class="date">${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })}</div>
            </div>
            <div class="forecast-content p-3 text-white">
                <div class="location">${data.location.name}</div>
                <div class="degree text-start">
                    <div class="num display-6 fw-bold">${data.current.temp_c}<span>°C</span></div>
                    <div class="forecast-icon mt-2">
                        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                    </div>
                </div>
                <div class="custom text-primary my-2">${day.day.condition.text}</div>
                <div class="d-flex gap-4 justify-content-start">
                    <span><img src="img/icon-umberella.png" alt=""> ${day.day.daily_chance_of_rain}%</span>
                    <span><img src="img/icon-wind.png" alt=""> ${day.day.maxwind_kph}km/h</span>
                    <span><img src="img/icon-compass.png" alt=""> ${data.current.wind_dir}</span>
                </div>
            </div>
        </div>
      `;
    } else {
      content = `
        <div class="forecast forecast">
          <div class="forecast-header text-center py-2 px-3 bg-light-transparent">
            <div class="day">${dayName}</div>
          </div>
          <div class="forecast-content p-3 text-white text-center">
            <div class="forecast-icon my-3">
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="degree fw-bold fs-4">${day.day.maxtemp_c}<span>°C</span></div>
            <small class="d-block text-secondary">${day.day.mintemp_c}<span>°</span></small>
            <div class="custom text-primary mt-2">${day.day.condition.text}</div>
          </div>
        </div>
      `;
    }

    container.innerHTML += content;
    
  });
}


document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".mobile-navigation").classList.toggle("d-none");
  });


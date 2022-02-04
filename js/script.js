const elForm = document.querySelector(".top-banner form");
const elInput = document.querySelector(".top-banner input");
const countriesContainer = document.querySelector('.waether-resault .cities');

const apiKey = "f3dca072eb060ca2b0c978bdf2077248";

const renderWeather = function (data) {
  const { main, name, sys, weather } = data;
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
  const html = `
  <li class="city">
  <h2 class="city-name" data-name="${name},${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
  <figure>
  <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
  <figcaption>${weather[0]["description"]}</figcaption>
  </figure>
  </li>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  elInput.value = '';
};

const renderError = function (errMessage) {
  countriesContainer.insertAdjacentText('beforeend', errMessage);
};

const getWeather = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      renderWeather(data);
    } catch (err) {
      renderError(err.message)
    }
  };

  elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let inputVal = elInput.value;
    getWeather(inputVal);
  });
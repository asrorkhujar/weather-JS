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
    elInput.value.innerHTML = ''

  });


























  /* form.addEventListener("submit", evt => {
    evt.preventDefault();
    let inputVal = input.value;

    //check if there's already a city
    const listItems = list.querySelectorAll(".waether-resault .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter(el => {
        let content = "";
        //tashkent
        if (inputVal.includes(",")) {
          //taaashhkent->invalid country code, so we keep only the first part of inputVal
          if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split(",")[0];
            content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
          } else {
            content = el.querySelector(".city-name").dataset.name.toLowerCase();
          }
        } else {
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
        return content == inputVal.toLowerCase();
      });

      if (filteredArray.length > 0) {
        msg.textContent = `You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well 😉`;
        form.reset();
        input.focus();
        return;
      }
    }

    //waether-resault
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
      <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
      <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

    msg.textContent = "";
    form.reset();
    input.focus();
  }); */


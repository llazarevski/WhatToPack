const apiKey = "DNXZgQbuT1uA7GN9cfmNGyZ1NlK5jr1X";
const locationBaseUrl =
      "https://dataservice.accuweather.com/locations/v1/cities/search";
const forecastBaseUrl =
      "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";

function getPackCount(){
  var packCount = $('.js-pack-list-container li').not('.completed').length;
  $('.topack-Count').text('You have ' + packCount + ' items left to pack');
  console.log(packCount);
} 

function toggleCheckbox(){
  $('.js-pack-list-container').on('click', '.toggle', function(){
    $(this).parents('li').toggleClass('completed');
    getPackCount();
  });
};
     

function addPackText (){
  $('.js-toDoContainer').empty();
  const toDo = `<section class="js-toDoContainer">
  <div class='topack-Count'></div>
  <form>
    <label class="js-addToDoLabel">Add Item To Pack List:<br></label>
    <input type="text" name="js-addToDo" class="js-addToDo" required>
    <input type="submit" value="Add" class="js-add-button">
    </form></section>`
  $('.packList').append(toDo);
  getPackCount();
};

function submitAddToDo (){
        $(document).delegate('.packList .js-toDoContainer form', 'submit', (event) => {
          event.preventDefault();
          let toDoValue = $('.js-addToDo').val();
          console.log(toDoValue);
          $('.js-addToDo').val('');
          $(".js-pack-list-container").append(`<li class='js-toDoList'><label>
            <input type='checkbox' class="toggle">
            <span class='checkmark'> ${toDoValue} </span>
          </label></li>`);
          getPackCount();
        });
}; 

function getActivityList(lowestTemp) {
  let activity = $(".activity").val();
  console.log(activity);
  $(".js-pack-list-container").empty();
  $(".js-activityList-header").empty();
  $(".js-activityList-header").removeClass("header-hidden");
  $(".js-activityList-header").append(`<img src="Pictures/tent.png" alt="icon" class="icon"> <h2>Packing List</h2>`);
  $(".packList").removeClass("activityList-hidden");
  if (activity === "hiking" && lowestTemp >= 60) {
    for (let i = 0; i < hikingSummerList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${hikingSummerList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "hiking" && lowestTemp < 60) {
    for (let i = 0; i < hikingWinterList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${hikingWinterList[i]}</span>
        </label></li>`);
    }
  }  else if (activity === "kayaking" && lowestTemp >= 60) {
    for (let i = 0; i < kayakingSummerList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${kayakingSummerList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "kayaking" && lowestTemp < 60) {
    for (let i = 0; i < kayakingWinterList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${kayakingWinterList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "camping" && lowestTemp >= 60) {
    for (let i = 0; i < campingSummerList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${campingSummerList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "camping" && lowestTemp < 60) {
    for (let i = 0; i < campingWinterList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${campingWinterList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "surfing") {
    for (let i = 0; i < surfingList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${surfingList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "biking" && lowestTemp >= 60) {
    for (let i = 0; i < bikingSummerList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${bikingSummerList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "biking" && lowestTemp < 60) {
    for (let i = 0; i < bikingWinterList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${bikingWinterList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "rafting" && lowestTemp >= 60) {
    for (let i = 0; i < raftingSummerList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${raftingSummerList[i]}</span>
        </label></li>`);
    }
  } else if (activity === "rafting" && lowestTemp < 60) {
    for (let i = 0; i < raftingWinterList.length; i++) {
      $(".js-pack-list-container").append(`<li class="js-toDoList"><label>
        <input type='checkbox' class="toggle">
        <span class='checkmark'> ${raftingWinterList[i]}</span>
        </label></li>`);
    }
  };
  getPackCount();
  addPackText();
  watchForm();
};

function getLowestTemp(forecastResponseJson) {
  let lowestTempArray = [];
  for (let i = 0; i < forecastResponseJson.DailyForecasts.length; i++) {
    lowestTempArray.push(
      `${forecastResponseJson.DailyForecasts[i].Temperature.Minimum.Value}`
    );
    console.log(lowestTempArray);
  }
  let lowestTemp = lowestTempArray[0];
  for (var i = 0; i < lowestTempArray.length; i++) {
    if (lowestTempArray[i] < lowestTemp) {
      lowestTemp = lowestTempArray[i];
    }
  }
  console.log(lowestTemp);
  getActivityList(lowestTemp);
};

function displayForecast(forecastResponseJson) {
  let cityState = $(".city-state").val();
  const cityStateArray = formatCityState(cityState);
  const city = cityStateArray[0];
  const state = cityStateArray[1];
  console.log(forecastResponseJson);
  $(".js-error").addClass('hidden-error');
  $(".js-forecast-container").empty();
  $(".js-forecast-header").empty();
  $(".js-forecast-header").removeClass("header-hidden");
  $('.packListBackground').removeClass('header-hidden');
  $(".js-forecast-header").append(`<h2>5 Day Forecast / ${city}, ${state} </h2>`);
  for (let i = 0; i < forecastResponseJson.DailyForecasts.length; i++) {
    const summary = `${forecastResponseJson.DailyForecasts[i].Day.LongPhrase}`;
    const maxTemp = `${
      forecastResponseJson.DailyForecasts[i].Temperature.Maximum.Value
    }`;
    const minTemp = `${
      forecastResponseJson.DailyForecasts[i].Temperature.Minimum.Value
    }`;
    console.log([i]);
    console.log(summary);
    console.log(maxTemp);
    console.log(minTemp);
    $(".js-forecast-container").removeClass("forecast-hidden");
    $(".js-forecast-container").append(`<div class='js-dailyWeather weather-${[i]}'>
      <div class="date">${new Date(forecastResponseJson.DailyForecasts[i].Date).toDateString()}</div><br>
      <div class= "summary">${forecastResponseJson.DailyForecasts[i].Day.LongPhrase}</div>
      <div class="temp"><ul>
        <li><span class="bold">Max:</span>${forecastResponseJson.DailyForecasts[i].Temperature.Maximum.Value}°F</li>
        <li><span class="bold">Min:</span>${forecastResponseJson.DailyForecasts[i].Temperature.Minimum.Value}°F</li>
      </ul>
      </div>
    </div>`);
  }
  getLowestTemp(forecastResponseJson);
};

function getForecastParams(forecastParams) {
  const forecastQueryItems = Object.keys(forecastParams).map(
    key =>
    `${encodeURIComponent(key)}=${encodeURIComponent(forecastParams[key])}`
  );
  return forecastQueryItems.join("&");
  console.log(forecastQueryItems);
};

function getForecast(responseJson) {
  const locationKey = `${responseJson[0].Key}`;
  console.log(locationKey);
  let forecastParams = {
    apikey: apiKey,
    details: true
  };
  const forecastString = getForecastParams(forecastParams);
  const forecastUrl = forecastBaseUrl + locationKey + "?" + forecastString;
  console.log(forecastUrl);
  fetch(forecastUrl)
    .then(forecastResponse => {
    if (forecastResponse.ok) {
      updateCSS();
      return forecastResponse.json();
    }
    throw new forecastError(forecastResponse.statustext);
  })
    .then(forecastResponseJson => displayForecast(forecastResponseJson))
    .catch(err => {
      $(".js-error").removeClass('hidden-error');
      if (err == `Cannot read property Key of undefined`){
        $(".js-error").text(`Oops, we can't find that location. Please try again`);
      } else {
        $(".js-error").text(`Oops, something is wrong: Please try again later`);
        console.log(err.message);
      };
  });
};

function getLocationParams(locationParams) {
  const queryItems = Object.keys(locationParams).map(
    key =>
    `${encodeURIComponent(key)}=${encodeURIComponent(locationParams[key])}`
  );
  return queryItems.join("&");
  console.log(queryItems);
};

function getLocationKey(city, state) {
  let locationParams = {
    apikey: apiKey,
    q: city,
    alias: state
  };
  const queryString = getLocationParams(locationParams);
  const locationUrl = locationBaseUrl + "?" + queryString;
  console.log(locationUrl);
  fetch(locationUrl)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statustext);
  })
    .then(responseJson => getForecast(responseJson))
    .catch(err => {
      $(".js-error").removeClass('hidden-error');
      if (err == `Cannot read property Key of undefined`){
        $(".js-error").text(`Oops, we can't find that location. Please try again`);
      } else {
        $(".js-error").text(`Oops, something is wrong: Please try again later`);
        console.log(err.message);
      };
  });
};

function updateCSS() {
  $(".startContainer").addClass("startContainerAfterSubmit").removeClass("startContainer");
  $(".hero").addClass("startContainerAfterSubmit");
  $('h1').addClass('h1AfterSubmit');
  $('.description').addClass('hidden-description');
  $('.form-item').addClass('formItemAfterSubmit');
}


function formatCityState(cityState){
  const cityStateArray = cityState.split(/[ ,]+/);
  const city = cityStateArray[0];
  let upperCaseCity = city.charAt(0).toUpperCase() + city.slice(1);
  let state = cityStateArray[1].toUpperCase();
  return([upperCaseCity, state]);
}

function watchForm() {
  $(".formContainer").submit(event => {
    event.preventDefault();
    let cityState = $(".city-state").val();
    const cityStateArray = formatCityState(cityState);
    const city = cityStateArray[0];
    const state = cityStateArray[1];
    let validateCityState = new RegExp(/.,\s./);
    if (validateCityState.test(cityState)== true){
      console.log(validateCityState.test(cityState));
      getLocationKey(city, state);
    } else {
        alert("Please enter city and state in correct format")
      };
  });
};

$(toggleCheckbox);
$(watchForm);
$(submitAddToDo);

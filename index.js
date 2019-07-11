const hikingList = ['Backpack', 'Raincover', 'Trekking Poles', 'Headlamp', 'GoPro', 'GPS Satellite Tracker', 'Pocket Knife', 'Waterproof Bag', 'Sleep pad', 'Tent', 'Stove', 'Cooking Set', 'Bear Can', 'Hydration System', 'Water Sterlizer', 'Zip-off Pants', 'Shorts', 'Lightweight Shirts', 'Rain Jacket', 'Waterproof Hiking Boots', 'Sandals', 'Hat', 'Lightweight Gloves', 'Lightweight Jacket', 'Sunglasses', 'Towels', 'Bugspray', 'Sunscreen', 'Socks', 'Toiletries', 'Toilet Paper' ];



const apiKey ="DNXZgQbuT1uA7GN9cfmNGyZ1NlK5jr1X"; 
const locationBaseUrl = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const forecastBaseUrl = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";



function displayForecast(forecastResponseJson){
  console.log(forecastResponseJson);
for (let i=0; i < forecastResponseJson.DailyForecasts.length; i++){
  const summary = `${forecastResponseJson.DailyForecasts[i].Day.LongPhrase}`;
  const maxTemp = `${forecastResponseJson.DailyForecasts[i].Temperature.Maximum.Value}`;
  const minTemp = `${forecastResponseJson.DailyForecasts[i].Temperature.Minimum.Value}`;
  console.log(summary);
  console.log(maxTemp);
  console.log(minTemp);
  $('.js-forecast-container').removeClass('forecast-hidden');
$(".js-forecast-container").append(`<div class='js-dailyWeather'>
<div class="day${forecastResponseJson.DailyForecasts[i]}-weather">
${forecastResponseJson.DailyForecasts[i].Date}
${forecastResponseJson.DailyForecasts[i].Day.LongPhrase}
${forecastResponseJson.DailyForecasts[i].Temperature.Maximum.Value}
${forecastResponseJson.DailyForecasts[i].Temperature.Minimum.Value}
</div>
  </div>` );
};
};


function getForecastParams(forecastParams){
  const forecastQueryItems = Object.keys(forecastParams)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(forecastParams[key])}`)
  return forecastQueryItems.join('&');
  console.log(forecastQueryItems);
};

function getForecast(responseJson){
const locationKey = `${responseJson[0].Key}`; 
console.log(locationKey);
let forecastParams = {
 apikey: apiKey,
 details: true
}; 
const forecastString = getForecastParams(forecastParams)
const forecastUrl = forecastBaseUrl + locationKey + "?" + forecastString;
console.log(forecastUrl);
fetch(forecastUrl)
.then(forecastResponse => {
  if(forecastResponse.ok){
    return forecastResponse.json();
  }
  throw new forecastError(forecastResponse.statustext);
})
.then(forecastResponseJson => displayForecast(forecastResponseJson))
.catch(err => {
    $('.js-error').text(`Something went wrong: ${err.message}`)
  });
};

function getLocationParams(locationParams){
  const queryItems = Object.keys(locationParams)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(locationParams[key])}`)
  return queryItems.join('&');
  console.log(queryItems)
};

function getLocationKey(city, state){
  let locationParams = {
    apikey: apiKey,
    q: city,
    alias: state,
};
  const queryString = getLocationParams(locationParams);
  const locationUrl = locationBaseUrl + '?' + queryString;
  console.log(locationUrl);
    fetch(locationUrl)
  .then(response => {
  if (response.ok){
    return response.json();
  }
    throw new Error(response.statustext);
  })
  .then(responseJson => getForecast(responseJson))
  .catch(err => {
    $('.js-error').text(`Something went wrong: ${err.message}`)
  });
};

function getActivityList(activity){
if (activity === "hiking"){
 $('.js-pack-list-container').removeClass('activityList-hidden');
 for (let i=0; i < hikingList.length; i++){
  $(".js-pack-list-container").append(`<label class='js-toDoList'>
  <input type='checkbox' checked='checked'>
  <span class='checkmark'> ${hikingList[i]}</span>
</label>`)};
} 
};


function watchForm (){
  $('.formContainer').submit(event => {
    event.preventDefault();
    const activity = $('.activity').val();
    const cityState = $('.city-state').val();
    console.log(activity, cityState);
    const cityStateArray = cityState.split(", ");
    const city = cityStateArray[0];
    const state = cityStateArray[1];
    console.log(city);
    console.log(state);
    getLocationKey(city, state);
    getActivityList(activity);
      $('.startContainer').addClass("startContainerAfterSubmit").removeClass('startContainer');
  });
};

$(watchForm);

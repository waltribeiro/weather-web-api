let apiKey = "9eb05d381db07ca6a0d36e08a08087f1";

// search button captures the input you type in

document.getElementById('citySearchForm').addEventListener("submit", function(event) {
  event.preventDefault();
  let citySearchEntry = document.getElementById("citySearchInput").value;
  console.log(citySearchEntry)
  let queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchEntry + "&appid=" + apiKey;
  let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchEntry + "&appid=" + apiKey;

  console.log(queryURL1)
  console.log(queryURL2)
  // takes that string and sends it as an API call to the Open Weather API

  $.ajax({
    url: queryURL1,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    
    // Go through the JSON form and pull data from the objects

    console.log(response)
    console.log("==========")
    console.log(response.name);
    console.log(response.coord.lat);
    console.log(response.coord.lon);
    console.log(response.main.temp);
    
    
    let coords = response.coord
    let bigCityName1 = response.name;
    let bigTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32) + " degrees")
    let bigHumidity1 = response.main.humidity
    let bigWindSpeed1 = response.wind.speed
    let currentTime = $("#currentDay").text(moment().format("MM/DD/YYYY"));
    let currentTime1 = $("#currentDayPlus1").text(moment().add(1, 'days').format("MM/DD/YYYY"));
    let currentTime2 = $("#currentDayPlus2").text(moment().add(2, 'days').format("MM/DD/YYYY"));
    let currentTime3 = $("#currentDayPlus3").text(moment().add(3, 'days').format("MM/DD/YYYY"));
    let currentTime4 = $("#currentDayPlus4").text(moment().add(4, 'days').format("MM/DD/YYYY"));


let currentWeatherSun = "<i class=\"fas fa-sun d-flex justify-content-center\" style=\"margin:10px\"></i>"

let currentWeatherCloud = "<i class=\"fas fa-cloud d-flex justify-content-center\" style=\"margin:10px\"></i>"

let currentWeatherSnow = "<i class=\"fas fa-snowflake d-flex justify-content-center\" style=\"margin:10px\"></i>"

let currentWeatherRain = "<i class=\"fas fa-rainy d-flex justify-content-center\" style=\"margin:10px\"></i>"

let currentWeatherCloudRain = "<i class=\"fas fa-cloud-rain d-flex justify-content-center\" style=\"margin:10px\"></i>"


// local storage
let storedArrayString = localStorage.getItem("searches");
let mySearches;
if (storedArrayString === null) {
    mySearches = [];
} else { // a string representation of an array
  mySearches = JSON.parse(storedArrayString);

}

let mySearches = [];
//you can .push on arrays but you can not .push on strings, so you need to convert it
mySearches.push(citySearchEntry);

localStorage.setItem("searches", JSON.stringify(mySearches));

// parse converts from a string into a javascript object (in this case that would be an array)

let myData = JSON.parse(localStorage.getItem("searches"));
console.log(myData);

let myDataConverted = JSON.parse(localStorage.getItem("searches"))
console.log(myDataConverted);


let citySearchEntryTotal = 1;
function citySearchFunction() {
  $("#sidebar" + citySearchEntryTotal).append(citySearchEntry)
  citySearchEntryTotal++
}
citySearchFunction()


$("#currentWeather").append(currentWeatherSun);

console.log(currentWeather)

let weatherFromArray = list["0"].weather["0"];

if (weatherFromArray = "Clear") {
  $("#currentWeather").append(currentWeatherSun);
} else if (weatherFromArray = "Rain") {
  $("#currentWeather").append(currentWeatherRain);
} else if (weatherFromArray = "Snow") {
  $("#currentWeather").append(currentWeatherSnow);
} else {
  $("#currentWeather").append(currentWeatherCloud);
}



/*
let mainDiv1 = document.createElement("div");
let mainDiv1CityName = mainDiv1.textContent = bigCityName1;
    $("#mainCity").append(mainDiv1CityName);
*/

    getUVIndex(coords)

    let mainDiv1 = document.createElement("div");
    let mainDiv1CityName = mainDiv1.textContent = bigCityName1;
        $("#mainCity").append(mainDiv1CityName);

    let mainDiv2 = document.createElement("div");
    let mainDiv2Temperature = mainDiv2.textContent = bigTemperature1;
        $("#mainTemp").append(mainDiv2Temperature);
        
    $("#mainHumidity").text(bigHumidity1)

    $("#mainWind").text(bigWindSpeed1)





  });

  let indexOfArray = 0;
for (x = 0; x < 6; x++) {

}

function getUVIndex(coords) {
  console.log(coords)
  let lat = coords.lat;
  let lon = coords.lon;
  let queryUV = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=9eb05d381db07ca6a0d36e08a08087f1&lat=" + lat + "&lon=" + lon;


  $.ajax({
    url: queryUV,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    let valueUV = response[0].value;
    console.log(response)
    let el = $("<span>").text(valueUV);

    if (valueUV < 3) {
      el.addClass("heatIndexGreen")
    } else if (valueUV < 7) {
      el.addClass("heatIndexYellow")
    } else {
      el.addClass("heatIndexRed")
    }

    $("#mainUV").append(el)

  })
    
    // Go through the JSON form and pull data from the objects

}



  // takes that string and sends it as an API call to the Open Weather API

  $.ajax({
    url: queryURL2,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    
    // Go through the JSON form and pull data from the objects

    console.log(response)
    console.log("==========")
    console.log(response.city.name);
    console.log(response.city.coord.lat);
    console.log(response.city.coord.lon);
    console.log(main.temp);
    
    let cityName2 = response.city.name
    let temperature2 = ((Math.floor(response.list["0"].main.temp - 273.15) * 1.80 + 32) + " degrees")
    let humidity2 = response.list["0"].main.humidity
    let windSpeed2 = response.list["0"].wind.speed
    let uvIndex2 = response.city.name

    let mainDiv1 = document.createElement("div");
    let mainDiv1CityName = mainDiv1.textContent = cityName;
        $("#mainCity").append(mainDiv1CityName);

    let mainDiv2 = document.createElement("div");
    let mainDiv2Temperature = mainDiv2.textContent = temperature;
        $("#mainTemp").append(mainDiv2Temperature);

  });
  
});


// send that to each respective <div> elements

// make a loop of the 5 day forecast similiar to the Pearl Jam Quiz






// Password checker for private work
let chosenWord = "art";


function checkPass() {
    let promptInput = prompt("Please enter the password to see more work");
    if (promptInput === chosenWord) {
        window.location.replace("http://linkedin.waltrib.com");
    } else if (promptInput != chosenWord) {
        alert("Incorrect password")
    } else {

    }
};



/*
get the value of what we searched
push the value of what we searched ito an aray that is going to hold
an array that is empty and this array is going to hold all of our search queries
push this into our search history

srtingify

// UV Index = var queryURL = "https://api.openweathermap.org/data/2.5/uvi?q=
// 1 day = var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=
// 5 day = var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=
*/

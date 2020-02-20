var apiKey = "9eb05d381db07ca6a0d36e08a08087f1";

// search button captures the input you type in

document.getElementById('citySearchForm').addEventListener("submit", function(event) {
  event.preventDefault();
  var citySearchEntry = document.getElementById("citySearchInput").value;
  console.log(citySearchEntry)
  var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchEntry + "&appid=" + apiKey;
  var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchEntry + "&appid=" + apiKey;

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
    
    
var coords = response.coord
    var bigCityName1 = response.name;
    var bigTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32) + " degrees")
    var bigHumidity1 = response.main.humidity
    var bigWindSpeed1 = response.wind.speed
    var currentTime = $("#currentDay").text(moment().format("MM/DD/YYYY"));
    var currentTime1 = $("#currentDayPlus1").text(moment().add(1, 'days').format("MM/DD/YYYY"));
    var currentTime2 = $("#currentDayPlus2").text(moment().add(2, 'days').format("MM/DD/YYYY"));
    var currentTime3 = $("#currentDayPlus3").text(moment().add(3, 'days').format("MM/DD/YYYY"));
    var currentTime4 = $("#currentDayPlus4").text(moment().add(4, 'days').format("MM/DD/YYYY"));



    getUVIndex(coords)

    $("#mainHumidity").text(bigHumidity1)

    $("#mainWind").text(bigWindSpeed1)

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = bigCityName1;
        $("#mainCity").append(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = bigTemperature1;
        $("#mainTemp").append(mainDiv2Temperature);

  });

function getUVIndex(coords) {
  console.log(coords)
  var lat = coords.lat;
  var lon = coords.lon;
  var queryUV = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=9eb05d381db07ca6a0d36e08a08087f1&lat=" + lat + "&lon=" + lon;


  $.ajax({
    url: queryUV,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    var valueUV = response[0].value;
    console.log(response)
    var el = $("<span>").text(valueUV);

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
    
    var cityName2 = response.city.name
    var temperature2 = ((Math.floor(response.list["0"].main.temp - 273.15) * 1.80 + 32) + " degrees")
    var humidity2 = response.list["0"].main.humidity
    var windSpeed2 = response.list["0"].wind.speed
    var uvIndex2 = response.city.name

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = cityName;
        $("#mainCity").append(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = temperature;
        $("#mainTemp").append(mainDiv2Temperature);

  });
  
});


// send that to each respective <div> elements


localStorage.setItem('user', citySearchEntry)
// localStorage.getItem('user', citySearchEntry)


// make a loop of the 5 day forecast similiar to the Pearl Jam Quiz






// Password checker for private work
var chosenWord = "art";


function checkPass() {
    var promptInput = prompt("Please enter the password to see more work");
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

var history = local storage. setItem

srtingify

// UV Index = var queryURL = "https://api.openweathermap.org/data/2.5/uvi?q=
// 1 day = var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=
// 5 day = var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=
*/

// my local storage is overwriting my previous storage

// how do I clear out searches

// gitignore never works for me




//FUNCTION HANDLES AJAX FOR UV INDEX
function getUVIndex(coords) {

  // $("#citySearchForm").empty();
  // $("#citySearchInput").empty();
  // $("#citySearchButton").empty();
  // $("#mainCity").empty();
  // $("#currentDayPlus0").empty();

  $("#mainTemperature").empty();
  $("#mainHumidity").empty();
  $("#mainWind").empty();
  $("#mainUV").empty();
  // $("#currentDayPlus1").empty();
  $("#smallTemperature1").empty();
  $("#smallHumidity1").empty();
  // $("#currentDayPlus2").empty();
  $("#smallTemperature2").empty();
  $("#smallHumidity2").empty();
  // $("#currentDayPlus3").empty();
  $("#smallTemperature3").empty();
  $("#smallHumidity3").empty();
  // $("#currentDayPlus4").empty();
  $("#smallTemperature4").empty();
  $("#smallHumidity4").empty();
  // $("#currentDayPlus5").empty();
  $("#smallTemperature5").empty();
  $("#smallHumidity5").empty();
 
  $("#weatherIconSmall1").empty();
  $("#weatherIconSmall2").empty();
  $("#weatherIconSmall3").empty();
  $("#weatherIconSmall4").empty();
  $("#weatherIconSmall5").empty();


  var lat = coords.lat;
  var lon = coords.lon;
  var queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=9eb05d381db07ca6a0d36e08a08087f1&lat=" + lat + "&lon=" + lon;

  $.ajax({
    url: queryUV,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    // console.log(response)
      var valueUV = response.value;
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
      
}



//THIS FUNCTION HANDLES AJAX CALL FOR CURRENT WEATHER
function searchWeather(val) {
  var iconSun = "<i class='fas fa-sun fa-7x d-flex justify-content-center' style='margin:10px'></i>";
  var iconRain = "<i class='fas fa-cloud-rain fa-7x d-flex justify-content-center' style='margin:10px'></i>";
  var iconSnowflake = "<i class='far fa-snowflake fa-7x d-flex justify-content-center' style='margin:10px'></i>";
  var iconCloud = "<i class='fas fa-cloud fa-7x d-flex justify-content-center' style='margin:10px'></i>";
  
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + val + "&appid=" + apiKey,
    method: "GET"
    
  }).then(function(response) {
    
    // Go through the JSON form and pull data from the objects
    if (localStorageHistory.indexOf(val) === -1) {
          
      localStorageHistory.push(val);
      localStorage.setItem("history", JSON.stringify(localStorageHistory));
      console.log(val)
      var li = $("<li>").addClass("list-group-item list-group-item-action list-group-item text-dark").text(val);
      $(".list-group-history").append(li);
    }
    
    // console.log(response)

    // console.log("YEAEEE")

if (response.weather["0"].main == "Clouds") {
  $("#weatherIconMain").empty();
  $("#weatherIconMain").append(iconCloud);
} else if (response.weather["0"].main == "Clear") {
  $("#weatherIconMain").empty();
  $("#weatherIconMain").append(iconSun);
} else if (response.weather["0"].main == "Rain") {
  $("#weatherIconMain").empty();
  $("#weatherIconMain").append(iconRain);
} else {
  $("#weatherIconMain").empty();
  $("#weatherIconMain").append(iconSnowflake);
}



    var coords = response.coord
    var bigCityName1 = response.name;
//KELVIN TO FARENTHEIT DEGREES
    var bigTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32).toFixed(0))
    var bigHumidity1 = response.main.humidity
    var bigWindSpeed1 = response.wind.speed
  //   // var bigUVIndex1 = 

    getUVIndex(coords)

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = bigCityName1;
        $("#mainCity").text(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = bigTemperature1;
    $("#mainTemperature").text(mainDiv2Temperature + " °");

    $("#mainHumidity").text(bigHumidity1 + " %")

    $("#mainWind").text(bigWindSpeed1 + " mph")


  });
}

//MOMENT.js
    var currentTime = $("#currentDayPlus0").text(moment().format("ddd MMM D").toUpperCase());
    var currentTime1 = $("#currentDayPlus1").text(moment().add(1, 'days').format("ddd / D").toUpperCase());
    var currentTime2 = $("#currentDayPlus2").text(moment().add(2, 'days').format("ddd / D").toUpperCase());
    var currentTime3 = $("#currentDayPlus3").text(moment().add(3, 'days').format("ddd / D").toUpperCase());
    var currentTime4 = $("#currentDayPlus4").text(moment().add(4, 'days').format("ddd / D").toUpperCase());
    var currentTime5 = $("#currentDayPlus5").text(moment().add(5, 'days').format("ddd / D").toUpperCase());







//THIS FUNCTION HANDLES AJAX CALL FOR 5-DAY FORECAST
function searchForecast(val) {
  console.log("++++++++++++++++")
  console.log('val',val)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + val + "&appid=" + apiKey,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    console.log("11111111111111111")
    console.log(response.list["0"].main.temp)

    for (x = 0; x < 6; x++) {
      let weatherTemp = response.list[x].main.temp;
      $("#smallTemperature" + [x]).append((Math.floor(weatherTemp - 273.15) * 1.80 + 32).toFixed(0) + "°");     
    }
    
    for (x = 0; x < 6; x++) {
      let weatherHumidity = response.list[x].main.humidity;
      $("#smallHumidity" + [x]).append(weatherHumidity.toFixed(0) + "%");    
    }


    // Go through the JSON form and pull data from the objects
    if (localStorageHistory.indexOf(val) === -1) {
          
      localStorageHistory.push(val);
      localStorage.setItem("history", JSON.stringify(localStorageHistory));
      console.log(val)
      var li = $("<li>").addClass("list-group-item list-group-item-action list-group-item text-dark").text(val);
      $(".list-group-history").append(li);
    }
    
    var coords = response.coord
    var littleCityName1 = response.name;
    var littleTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32).toFixed(0) + "°");
    var littleHumidity1 = response.main.humidity;
    var littleWindSpeed1 = response.wind.speed;


  });
}











//EVENT LISTENER (.ON), SEARCH VALUE HISTORY BUTTONS SIDEAR
$(document).on('click', '.list-group-item', function() {
  //console.log($(this).text())
  var searchVal = $(this).text();
  searchWeather(searchVal)
  searchForecast(searchVal)
})

//EVENT LISTENER (.ON), GRABS AND STORES USER INPUT VALUE
$('#citySearchButton').on('click', function() {
  event.preventDefault();
  var searchVal = $('#citySearchInput').val();
  console.log('SearchVal', searchVal)
  searchWeather(searchVal);
  searchForecast(searchVal);

  $('#citySearchInput').val('');

})

 // GLOBAL VARS
var apiKey = "9eb05d381db07ca6a0d36e08a08087f1";
var localStorageHistory = JSON.parse(localStorage.getItem("history")) || [];

if (localStorageHistory.length > 0) {
  console.log(history);
  searchWeather(localStorageHistory[localStorageHistory.length-1]);
}

//THIS FOR LOOP, WILL CREATE A LIST ITEM AND APPEND TO PARENT DIV ON HTML (LIST OF SEARCHES)
for (var i = 0; i < localStorageHistory.length; i++) {
  console.log(localStorageHistory[i])
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(localStorageHistory[i]);
  $("#aside .list-group-history").append(li);
}

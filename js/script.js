// my local storage is overwriting my previous storage

// how do I clear out searches

// gitignore never works for me




//FUNCTION HANDLES AJAX FOR UV INDEX
function getUVIndex(coords) {

  var lat = coords.lat;
  var lon = coords.lon;
  var queryUV = "http://api.openweathermap.org/data/2.5/uvi?appid=9eb05d381db07ca6a0d36e08a08087f1&lat=" + lat + "&lon=" + lon;

  $.ajax({
    url: queryUV,
    method: "GET"
    
    // Open Weather returns a JSON form

  }).then(function(response) {
    console.log(response)
      var valueUV = response.value;
      var el = $("<span>").text(valueUV);

      if (valueUV < 3) {
        el.addClass("heatIndexGreen")
      } else if (valueUV < 7) {
        el.addClass("heatIndexYellow")
      } else {
        el.addClass("heatIndexRed")
      }
        $("#mainUV").empty();
        $("#mainUV").append(el)

  })
      
}



//THIS FUNCTION HANDLES AJAX CALL FOR CURRENT WEATHER
function searchWeather(val) {
  console.log('val',val)
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
    
    var coords = response.coord
    var bigCityName1 = response.name;
    var bigTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32).toFixed(2))
    var bigHumidity1 = response.main.humidity
    var bigWindSpeed1 = response.wind.speed
  //   // var bigUVIndex1 = 

    getUVIndex(coords)

    $("#mainHumidity").text(bigHumidity1)

    $("#mainWind").text(bigWindSpeed1)

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = bigCityName1;
        $("#mainCity").text(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = bigTemperature1;
    $("#mainTemp").text(mainDiv2Temperature);

  });
}

//MOMENT.js
    var currentTime = $("#currentDayPlus0").text(moment().format("dddd").toUpperCase() + " the " + (moment().format("D").toUpperCase() ));
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
      $("#smallTemp" + [x]).append((weatherTemp).toFixed(0) + "°");
    }

    console.log("============")
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
    var littleTemperature1 = ((Math.floor(response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
    var littleHumidity1 = response.main.humidity;
    var littleWindSpeed1 = response.wind.speed;



    


  //   // var bigUVIndex1 = 

    getUVIndex(coords)

    $("#mainHumidity").text(bigHumidity1)

    $("#mainWind").text(bigWindSpeed1)

    var mainDiv1 = document.createElement("div");
    var mainDiv1CityName = mainDiv1.textContent = bigCityName1;
        $("#mainCity").text(mainDiv1CityName);

    var mainDiv2 = document.createElement("div");
    var mainDiv2Temperature = mainDiv2.textContent = bigTemperature1;
    $("#mainTemp").text(mainDiv2Temperature);

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

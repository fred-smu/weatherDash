// var cityIn ;
var APIKey = "1caea8931f6bdb95be52d99e2752e33e";
var cityCount = 0;
var citySave="";

localStorage.setItem("cityHist" + 0,cityCount);
console.log("cityHist" + cityCount+ "  "+cityCount);
for (let index = 1; index <= 5; index++) {
 
  $("city-hist"+index).attr("placeholder","");
  console.log(("city-hist"+index));
  // cityHist" + index"
}

$("#getWeather").on("click", function () {
  cityCount++;
  if (cityCount >5) {cityCount = 1};
  event.preventDefault();
  cityIn = "q=" + $("#city-search").val();
  citySave=$("#city-search").val();
  console.log($("#city-search").val())
  console.log(cityIn);
  localStorage.setItem("cityHist" + cityCount,$("#city-search").val());
  $("city-hist"+cityCount).attr("placeholder",$("#city-search").val());
  apiCall();
});

function apiCall() {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";

  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + cityIn +
    "+ &units=imperial&appid=" + APIKey;
  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      $("#cityName").text(response.name);
     $("#curWeathIcn").attr("src", `http://openweathermap.org/img/w/${response.weather[0].icon}.png`);
      //  // Converts the temp to Kelvin with the below formula
      var tempF = ((response.main.temp - 273.15) * 1.80 + 32);
      $("#curTemp").text("Temp: " + response.main.temp);
      $("#curHum").text("Humidity: " + response.main.humidity + "%");
      $("#curWind").text("Windspeed: " + response.wind.speed + " MPH");
     
    });
    // newCityHist();
};




// function newCityHist() {
//   /*clears past citys and repops them*/
//   $("#old-search").empty();
//   /*repops citys*/
//   // for (let index = 0; index <= 5; index++) {
//     let pastCityDiv = $("<div >");
//     pastCityDiv.addClass("cityList");
//     pastCityDiv.attr("value", citySave);
//     pastCityDiv.text(citySave);
//     $("#old-cities").append(pastCityDiv);
//   // };
// }

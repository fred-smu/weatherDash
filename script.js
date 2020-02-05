// var cityIn ;
var APIKey = "1caea8931f6bdb95be52d99e2752e33e";
var cityCount = 0;
var citySave = "";
var count = 1;

for (let index = 1; index < 5; index++) {
  $('#old-search').empty();
  count++;
  if (count >=5) count = 1;
  var oldCity = localStorage.getItem("cityList" + index);
  if(oldCity){
    cityIn = localStorage.getItem("cityList" + index);
    citySave = localStorage.getItem("cityList" + index);
    var newListItem = '<li class = "cityhist">'+ cityIn+ '</li>';
    $('#old-search').append(newListItem);
    console.log(".append "+newListItem);
    // var newListItem = '<li class = "cityhist">'+ oldCity+ '</li>';
      // console.log("newListItem "+newListItem);
      // $('#old-search').append(newListItem);
   
   }
    // console.log(oldCity);
 
  
}

$("#getWeather").on("click", function () {
 
  cityIn = $("#city-search").val();
  citySave = $("#city-search").val();
  // localStorage.setItem('cityList'+ count, cityIn);
   var newListItem = '<li class = "cityhist">'+ cityIn+ '</li>';
   $('#old-search').append(newListItem);
   apiCall();
   
});

$("#old-search li").click(function () {
  console.log("on click");
  // drawHistory();
  cityIn = $(this).val();
  citySave = $(this).val();
  console.log("on click " + citySave);
  apiCall();
});  

function apiCall() {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";


  https://samples.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a1
  // Here we are building the URL we need to query the database
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityIn +
    "&appid=" + APIKey + "&units=imperial"


  // var queryURL = "api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid=" + APIKey;
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

      var index = 0;
      for (let i = 0; i < 7; i++) {
        let cur = response.list[i];
        $("#cityName" + i).text(response.city.name);
        // console.log("#cityName" + i +"    name "+ response.city.name);
        // console.log("#cityName" + i +"    icon "+ cur.weather[i].icon);
        $("#curWeathIcn"+ i).attr("src", `http://openweathermap.org/img/w/${cur.weather[0].icon}.png`);
        //  // Converts the temp to Kelvin with the below formula
        // var tempF = ((response.main.main[0]));
        // temp - 273.15) * 1.80 + 32);
        $("#curTemp" + i).text("Temp: " + cur.main.temp);
        $("#curHum" + i).text("Humidity: " + cur.main.humidity + "%");
        $("#curWind" + i).text("Windspeed: " + cur.wind.speed + " MPH");
        // cur.weather[0].description,
      };
    });
  // newCityHist();
};

function drawHistory() {
  // function to pull city history from local memory
 
  let cityList = localStorage.getItem("cityList");
console.log("cityList =" +cityList)
  $('#old-search').empty();
  $('<div>')
    let cityNameDiv = $('<div>');
    cityNameDiv.addClass("cityList");
    cityNameDiv.attr("value",cityList);
    cityNameDiv.text(cityList);
    console.log("cityNameDiv =" +cityNameDiv)
    $('#old-search').append(cityNameDiv);
  // }
  
};

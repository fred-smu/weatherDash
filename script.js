// var cityIn ;
var APIKey = "1caea8931f6bdb95be52d99e2752e33e";
var cityCount = 0;
var citySave = "";
var count = 1;
var utc = new Date().toJSON().slice(0,10);
var myyear = utc.slice(0,4);
var mymonth = utc.slice(5,7);
var myday = parseInt(utc.slice(8,10));
var mydate=" ";
dateCall(0);

//pulls from local storage and sets the history(needs work)
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
   }
}

// starts the search once the search button is clicked
$("#getWeather").on("click", function () {
  cityIn = $("#city-search").val();
   localStorage.setItem('city', cityIn);
   var newListItem = '<li class = "cityhist">'+ cityIn+ '</li>';
   $('#old-search').append(newListItem);
   apiCall();
   
});

//click event on the li's in histroy
$(document).on("click", ".cityhist", function() {
  cityIn=$(event.target).text();
  $("#city-search").attr("placeholder","");
  $("#city-search").attr("placeholder", $(event.target).text());
  apiCall();
})
  

function apiCall() {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
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
      var lat =" ";
      var lon =" ";
     // loops thu the arrys to pull and set data and display values.
      var index = 0;
      for (let i = 0; i < 7; i++) {
        dateCall(i);
        let cur = response.list[i];
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        myyear = utc.slice(0,4);
        mymonth = utc.slice(5,2);
        myday = utc.slice(8,2);
        $("#cityName" + i).text(response.city.name +" "+mydate );
      
        $("#curWeathIcn"+ i).attr("src", `http://openweathermap.org/img/w/${cur.weather[0].icon}.png`);
        $("#curTemp" + i).text("Temp: " + cur.main.temp);
        $("#curHum" + i).text("Humidity: " + cur.main.humidity + "%");
        $("#curWind" + i).text("Windspeed: " + cur.wind.speed + " MPH");
        lat = response.city.coord.lat;
        lon = response.city.coord.lon;
      };
      // call to teh UV api to set the UV values and colors
      uvApiCall(lat,lon);
    });
};

function uvApiCall(lat,lon) {
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=37.75&lon=-122.37&appid=" + APIKey;
 // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
     var index = 0;
      //loops thu the arry to pull data
      for (let i = 0; i < 7; i++) {
       
        let cur = response[i];
        let uvF = parseInt(cur.value);
        //sets the value        
        $("#curUv" + i).text("UV Index: "+(cur.value));
        //add/deletes the class so the colors are set acording to UV rating
        if (uvF < 3) { 
          $("#curUv" + i).removeClass('violet');
          $("#curUv" + i).addClass('green');
        } else if (uvF < 6) { 
          $("#curUv" + i).removeClass('violet');
          $("#curUv" + i).addClass('yellow');
        } else if (uvF < 8) { 
          $("#curUv" + i).removeClass('violet');
          $("#curUv" + i).addClass('orange');
        } else if (uvF < 11) { 
          $("#curUv" + i).removeClass('violet');
          $("#curUv" + i).addClass('red');
        }
     };
    });
};

function drawHistory() {
  // function to pull city history from local memory
 
  let cityList = localStorage.getItem("cityList");
  $('#old-search').empty();
  $('<div>')
    let cityNameDiv = $('<div>');
    cityNameDiv.addClass("cityList");
    cityNameDiv.attr("value",cityList);
    cityNameDiv.text(cityList);
    $('#old-search').append(cityNameDiv);
};

//my custom date funtion
function dateCall(itemNum) {
myyear = utc.slice(0,4);
mymonth = utc.slice(5,7);
myday = parseInt(utc.slice(8,10));
myday = myday + itemNum;
if (myday.length = 1 ){
  mydate=mymonth+"/0"+myday+"/"+myyear;
}else{
  mydate=mymonth+"/"+myday+"/"+myyear;
}
  
}

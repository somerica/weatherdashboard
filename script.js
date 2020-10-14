$(document).ready(function () {
  console.log("Hello World");

  $("#submitWeather").click(function () {
    var currentCity = document.getElementById("currentCity");
    var currentTemp = document.getElementById("temp");
    var currentHumidity = document.getElementById("humidity");
    var WindSpeed = document.getElementById("windSpeed");
    var UVIndex = document.getElementById("uvIndex");

    var city = $("#look-up").val();
    console.log(city);
    if (city != "") {
      $.ajax({
        url:
          " http://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=imperial&appid=10acdee4ac2bcdfc145d3f2d1200df23",
        type: "GET",
        datatype: "json",
        success: function (data) {
          currentCity.innerText = data.city.name;
          currentTemp.innerText = data.list[0].main.temp;
          currentHumidity.innerText = data.list[0].main.humidity;
          WindSpeed.innerText = data.list[0].wind.speed;
          UVIndex.innerText = data.list[0].uvindex;

          for (var i = 7; i < data.list.length; i += 8) {
            var date = $(`<p class="date">`).text(data.list[i].dt_txt);
            var temp = $(`<p class="temp">`).text(data.list[i].main.temp);
            var humidity = $("<p>").text(data.list[i].main.humidity);
            var parent = $(`<div class="col-sm card" />`);
            parent.append(date, temp, humidity);

            $("#Forcast-Holder").append(parent);
          }
        },
      });
    } else {
      $("error").html("Field cannot be empty");
    }
  });

  function show(data) {
    console.log(data);
    return (
      "<p><strong>weather</strong>:" +
      data.list[0].weather[0].main +
      "</p>" +
      "<p><strong>city</strong>:" +
      data.city.name +
      "</p>" +
      "<p><strong>temp</strong>:" +
      data.list[0].main.temp +
      "</p>" +
      "<p><strong>humidity</strong>:" +
      data.list[0].main.humidity +
      "</p>" +
      "<p><strong>windspeed</strong>:" +
      data.list[0].wind.speed +
      "</p>" +
      "<p><strong>uvindex</strong>:" +
      data.list[0].uvindex +
      "</p>"
    );
  }
});

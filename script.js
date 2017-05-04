$(document).ready(function() {
  var outDegree;
  var lat;
  var long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      var cityInfo =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        "&sensor=false";

      $.getJSON(cityInfo, function(data) {
        var address = data.results[0].address_components[2].long_name;
        $("#cityName").text(address);
      });

      var url =
        "https://api.darksky.net/forecast/8bfe73adbee0a652190e6c9ccd1e1d21/" +
        lat +
        "," +
        long +
        "?exclude=minutely,hourly,daily,alerts,flags&units=si&callback=?";

      $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: "json",
        success: function(data, status) {
          var weather = data.currently.icon;
          var description = data.currently.summary;
          outDegree = data.currently.temperature;
          var hum = Math.floor(data.currently.humidity * 100);
          var winds = data.currently.windSpeed;

          var snow = "https://s25.postimg.org/gtlrm0qv3/snow.jpg";
          var clearDay = "https://s25.postimg.org/7s2muo3jz/clear.jpg";
          var clearNight = "https://s25.postimg.org/y35hzs3r3/sky-moon.jpg";
          var rain = "https://s25.postimg.org/bhnm34pvj/rain.jpg";
          var cloudyDay = "https://s25.postimg.org/fyz7zzj0f/clouds.jpg";
          var cloudyNight =
            "https://s25.postimg.org/sqgnlnfun/cloudy-night.jpg";
          var sleet = "https://s25.postimg.org/x259anmrj/sleet.jpg";
          var wind = "https://s25.postimg.org/8yb877h8f/extreme.jpg";
          var foggy = "https://s25.postimg.org/xz3tqmltr/atmosphere.jpg";
          var img = "";

          if (weather === "clear-day") {
            img = clearDay;
          } else if (weather === "clear-night") {
            img = clearNight;
          } else if (weather === "rain") {
            img = rain;
          } else if (weather === "snow") {
            img = snow;
          } else if (weather === "sleet") {
            img = sleet;
          } else if (weather === "wind") {
            img = wind;
          } else if (weather === "fog") {
            img = foggy;
          } else if (weather === "cloudy" || weather === "partly-cloudy-day") {
            img = cloudyDay;
          } else if (weather === "partly-cloudy-night") {
            img = cloudyNight;
          }

          $("body").css("backgroundImage", "url(" + img + ")");
          $("#desc").text(description);
          $("#degree").text(Math.floor(outDegree) + "°");
          $("#humid").text(hum + "%");
          $("#knot").text(winds);
        }
      });
    });
  }
  // Animations and CSS
  setInterval(function() {
    $(".title h1,.stats").addClass("animated pulse");
  }, 1000);

  setInterval(function() {
    $("#lett1,#lett2,#lett3").css("color", "#E04006");
  }, 1080);

  // Metric Units Change
  var rightTemp = document.getElementById("degree");

  var animation = "animated shake";
  $(".temp").on("click", function() {
    $(".icon")
      .addClass(animation)
      .one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
          $(this).removeClass(animation);
        }
      );
    $("#degree").text(Math.floor(outDegree) + "°");
  });

  $(".temp2").on("click", function() {
    var faren = Math.floor(outDegree * 9 / 5 + 32);
    $("#degree").text(faren + "°");
  });
});

$(".temp").mouseup(function() {
  $(this).blur();
});

$(document).ready(function() {
  var outDegree;
  var lat;
  var long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      //API call

      var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=metric&APPID=10806f1d4ce199266fd576ecf86406da';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(xhttp.responseText);
          var temp = Math.floor(resp.main.temp);
          outDegree = temp;
          var weather = resp.weather[0].id;
          var name = resp.name;
          var hum = resp.main.humidity;
          var wind = resp.wind.speed;
          var main = resp.weather[0].main;
          var desc = resp.weather[0].description;

          //Dynamic Weather Condition Data

          var snow = 'https://s25.postimg.org/gtlrm0qv3/snow.jpg';
          var clear = 'https://s25.postimg.org/7s2muo3jz/clear.jpg';
          var rain = 'https://s25.postimg.org/w4vkmmo73/rain.png';
          var clouds = 'https://s25.postimg.org/fyz7zzj0f/clouds.jpg';
          var thunder = 'https://s25.postimg.org/kehn58ven/thunder.jpg';
          var drizzle = 'https://s25.postimg.org/faqdh1kan/drizzle.jpg';
          var extreme = 'https://s25.postimg.org/8yb877h8f/extreme.jpg';
          var atmosphere = 'https://s25.postimg.org/xz3tqmltr/atmosphere.jpg';
          var img = '';

          
                if (weather === 800) {
                            img = clear;
                    }else if(weather<299){
                            img = thunder;    
                   }else if(weather>299&&weather<350){
                            img = drizzle;
                   }else if(weather>499&weather<540){
                            img = rain;
                   }else if(weather>500&&weather<625){
                            img = snow;
                   }else if(weather>700&&weather<785){
                            img = atmosphere;
                    }else if(weather>800&&weather<805){
                            img = clouds;
                    }else if(weather<899&&weather<907){
                            img = extreme;
                    };
          
                                              
          $('body').css('backgroundImage', 'url(' + img + ')');

          $('#cityName').text(name);
          $('#main').text(main);
          $('#desc').text(desc);
          $('#degree').text(temp + '°');
          $('#humid').text(hum);
          $('#knot').text(wind);

        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();

    });

  }
  

  // Animations and CSS 
  setInterval(function() {
    $('.headerText,.stats').addClass('animated pulse')
  }, 1000);

  setInterval(function() {
    $('#lett1,#lett2,#lett3').css('color', '#E04006');
  }, 1080);

  // Metric Units Change
  var rightTemp = document.getElementById('degree');

  var animation = 'animated shake';
  $('.temp').on('click', function() {
    $('.icon').addClass(animation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass(animation);
    });
    $('#degree').text(outDegree + '°');
  });

  $('.temp2').on('click', function() {
    var faren = Math.floor(outDegree * 9 / 5 + 32);
    $('#degree').text(faren + '°');
  });

});
$(document).ready(function() {
    var key = localStorage.getItem("nextKey");
    
    function renderCity()  {

        $(".city-history").empty();
          // Loop through localStorage to get input cities and append them on the page 
      for (let j=0; j < localStorage.length; j++) {
          var key = localStorage.key(j)
          console.log("The key =", key)
          //console.log()
          // Create filter for nextKey
          if (key !== "nextKey") {
            var savedCity = localStorage.getItem(j);
        
            var addCity = $("<li>").text(savedCity);
            addCity.attr("data", j)
            addCity.addClass("list-group-item")
            $(".city-history").prepend(addCity)
          } 
         
      }
  
  } 

  $(".city-history").on("click", function(e) {
    console.log("Who is clicking me???");
     //use event.target to get the element you clicked
    console.log(e.target.tagName);
    //check if it is an li you clicked...
    if(e.target.tagName == "LI"){
        // Then get the city name from the li that you clicked on.
        console.log("you clicked on", e.target.innerText);
        var city = e.target.innerText;
        /*Now just call the fucntion to make the API call
        with the city name you got from the <li> :-)*/ 
        getWeather(city);

    }
})

    //When user click on the search button
    $("#searchBtn").on("click", function() {
        event.preventDefault();
        var city = $("#city").val();
        console.log("city in search", city)
        // if there is no value in the input box 
        if (city == "") {
            // Do nothing
            return;
        // If there is value, call 2 functions and empty out the value of the input box
        } else {
            getWeather(city);
            renderCity(city);
            $("#city").val("");
        }
    });
        // Don't refresh the page when clicked
        //event.preventDefault();
    function getWeather(para)  {  
        // Store the value of the user input into a variable
        console.log(para)
        // Save that input to localStorage
       if (city !== "") { 
        $("#image").empty();
        
        // Set an item with the next key
            localStorage.setItem(key++, para);
            // Making the next key
            var nextKey = key;
            console.log("city to be saved", nextKey)
            // 
            localStorage.setItem("nextKey",nextKey);
        
        
       
        // Store API key and API call links to variables
        var APIkey = "d3906bd231160a917af13b926a2b6749";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + para + "&appid=" + APIkey;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + para + "&units=imperial&appid=" + APIkey;
        var lat;
        var lon;
        
       }

       
     
        // Call the method ajax on the link
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            var icon = response.weather[0].icon
            var urlicon= "http://openweathermap.org/img/wn/" + icon +  "@2x.png";
            var img = $("<img>")
            img.attr("src",urlicon);
            $("#image").append(img);
           // lat = response.coord.lat;
           // lon = response.coord.lon;
        
            // Access to get info from response back 
            $("#city-name").text(response.name + " (" + moment().format('L') + ") ");
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $("#temp").text("Temperature: " + tempF.toFixed(2) + " F");
            $("#hum").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#index").text("UV Index: ")
        })
        
    
        // Call second ajax method for the second URL
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // Loop through the cards from day 1 to day 5
            x = 5;
            for (let i = 1; i < 6; i++) {
                var day = "#day" + i;
                $(".image" + i).empty();
                $(".temp" + i).empty();
                $(".hum" + i).empty();
                $(".card-title" + i).text(moment().add(i,"days").format('L'));
                var icon2 = response.list[x].weather[0].icon;
                var urlicon2 = "http://openweathermap.org/img/wn/" + icon2 +  "@2x.png";
                var image = $("<img>").attr("src", urlicon2)

                $(".image" + i).append(image);
                
                $(".temp" + i).text("Temperature: " + response.list[x].main.temp + " F");
                $(".hum" + i).text("Humidity: " + response.list[x].main.humidity + "%");
                x += 8;
            }
        })
      
    renderCity();
}
  

        /*var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function(uvresponse) {
            console.log(uvresponse);
        })*/
    
     
    renderCity();
    
})
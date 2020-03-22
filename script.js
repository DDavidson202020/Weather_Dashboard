$(document).ready(function() {
    //When user click on the search button
    $("#searchBtn").on("click", function() {
        // Don't refresh the page when clicked
        event.preventDefault();
        // Store the value of the user input into a variable
        var city = $("#city").val();
        // Save that input to localStorage
        localStorage.setItem(city,city);
        // Store API key and API call links to variables
        var APIkey = "d3906bd231160a917af13b926a2b6749";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + APIkey;
        var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIkey;
        var lat;
        var lon;
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
        // Empty the history of cities searched
        $(".city-history").empty();
        // Loop through localStorage to get input cities and append them on the page 
    for (let j=0; j < localStorage.length; j++) {
        var savedCity = localStorage.getItem(localStorage.key(j));
        var addCity = $("<li>").text(savedCity);
        addCity.addClass("list-group-item")
        $(".city-history").prepend(addCity)
    }

  });   

        /*var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIkey + "&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function(uvresponse) {
            console.log(uvresponse);
        })*/
    
    
    
    
    
})
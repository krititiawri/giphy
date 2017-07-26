
 // Initial array of food
    var food = ["CHEESEBURGER", "COFFEE","PIZZA","ALCOHOL"];

 $(document).ready(function(){
    function displayGiphy(){
        $("#foodImages").empty();
    var foodAttr = $(this).attr("data-name");

    console.log(foodAttr);
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        foodAttr + "&api_key=dc6zaTOxFJmzC&limit=10";
         $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response);
            var result = response.data;
            // console.log(r2);
                for(var j=0; j<result.length; j++){
                    var foodDiv = $("<div>"); 
                    foodDiv.attr("class","col-md-4");
                    // foodDiv.attr("class","gif");
                    foodGiphy = $("<img>");
                    // foodGiphy.attr("class","gif");
                    foodGiphy.attr("src",result[j].images.original_still.url);
                    foodGiphy.attr("data-still",result[j].images.original_still.url);
                    foodGiphy.attr("data-animate",result[j].images.fixed_height.url);
                    foodGiphy.attr("data-state","still");
                    foodGiphy.attr("class","col-md-12");
                    foodGiphy.addClass("giff");
                    // foodGiphy.css("width","50%","height","50%");
                    var p = $("<p>");
                    var rating = result[j].rating;
                    p.text("Rating"+":"+rating);
                    p.css("text-align","center");
                    // foodGiphy.attr("src",result[j].images.url);
                    foodDiv.append(p);
                    foodDiv.append(foodGiphy);
                    // $("#foodImages").attr("class","col-md-3");
                    $("#foodImages").append(foodDiv);                   
            console.log(foodGiphy);
            renderButtons();
 

        }
     $(".giff").click(function(){
// alert("hi");
  var state = $(this).attr("data-state");
      console.log(state);
      console.log(this);
      if(state === "still"){
        // var state = $(this).attr("data-still");
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");

      }
      else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
      }
    });
});

}

    // to display button on the browser
    function renderButtons(){
        $("#buttons-view").empty();
    	for(var i=0; i<food.length ;i++){
            // Creating a button dynamically
    		var btn = $("<button>");
            btn.addClass("movie");
            // console.log(foodAttr);
            // Adding class to the button
    		btn.attr("class","btn-toolbar btn-primary food");
            // btn.addClass(foodAttr);
            btn.attr("data-name",food[i]);
            
            // Adding the text to button based on the array input
    		btn.text(food[i]);
            // Append the button generated to the div buttons-view
    		$("#buttons-view").append(btn);
    	}
    }
// this will handle what will happen when the button is clicked

$("#add-food").on("click",function(){
    
    // To prevent erase of user input
    event.preventDefault();
    // To get the value of what is added to the input field
    var foodInput = $("#food-input").val().trim();
    // to push the value of input to the array food
    food.push(foodInput);
    console.log(food.length);
    console.log(food);
    console.log(foodInput);
    // calling function renderButtons() to display the button on click of addFood button
    renderButtons();

});

 $(document).on("click",".food",displayGiphy);

 renderButtons();

});
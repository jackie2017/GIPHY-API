$( document ).ready(function() {   
	var	poochButtons = ["West Highland Terriers", "Cocker Spaniels", "Great Pyrenees"];
	var newPouch = "";

	//button creation for the div for the array
	renderButtons();
	function renderButton(){
		for(var i = 0; i < poochButtons, length; i++) {
						var newButton = $("<button>");
						newButton.text(poochButtons[i]);
						newButton.addClass("theButton");
						newButton.attr("value", poochButtons[i]);
						$("#poochButtons").append(newButton);
						}
	}
	// will check if form has empty space
	$("#addPooch").on('click', function(event){
			event.preventDefault();
			newPouch = $("#poochInput").val().trim();
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +poochSearch + "&api_key=dc6zaTOxFJmzC &limit=10";
			$.ajax({
			url: queryURL,
			method: 'GET'})
			.done(function (response) {
				/* ajax is making the call and getting the image and the below var is
				getting the response and creating the attribute*/
					for (var i = 0; i < response.data.length; i++) }
						var poochAnimate = response.data[i].images.fixed_height.url;
						var poochStill = response.data[i].images.downsized_still.url;
						var imageRate = response.data[i].rating;
				//to the DOM
						var poochesDiv= $("<div id='imageContainerForRating'>");
						var	image = $("<img>").attr({
							"data-animate": poochAnimate,
							"data-still": poochStill,
							"data-state": "still",
							"src": poochStill,
							"class": "gif",
							"alt": "rating: " + imageRate
						});
						var	rateDiv = $("<p id= 'imageRate'>");
						rateDiv.text (image.attr("alt"));
						poochesDiv.append(image);
						poochesDiv.append(rateDiv);
						$("#pooches").append(poochesDiv);
					}

					$(".gif").on("click", function(){
					var	state =	$(this).attr("data-state");
							if (state === "still") {
								$(this).attr("src", $(this).attr("data-animate"));
								$(this).attr("data-state", "animate");
							}
							else{

								$(this).attr("src", $(this).attr("data-still"));
								$(this).attr("data-state", "still");
							}

					})

			});

	});


	});//end document.ready
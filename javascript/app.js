$( document ).ready(function() {   
	var	poochButtons = ["West Highland Terriers", "Cocker Spaniels", "Great Pyrenees"];
	var newPouch = "";

	//button creation for the div for the array
	
	function renderButton(){
		for(var i = 0; i < poochButtons.length; i++) {

			var newButton = $("<button>");
			newButton.text(poochButtons[i]);
			newButton.addClass("theButton");
			newButton.attr("value", poochButtons[i]);
			$("#pooches").append(newButton);
		}
	}

	renderButton();


	$("#addPooch").on('click', function (event) {
		$("#pooches").empty();
		event.preventDefault();
		var userVal = $("#poochInput").val();
		poochButtons.push(userVal);

		console.log(poochButtons);
		renderButton();

	});
	// will check if form has empty space
	$("#pooches").on('click', "button", function(event){
			$("#poochButton").empty();
			event.preventDefault();
			newPouch = $(this).attr('value').trim();
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newPouch + "&api_key=dc6zaTOxFJmzC &limit=10";
			$.ajax({
			url: queryURL,
			method: 'GET'})
			.done(function (response) {
				/* ajax is making the call and getting the image and the below var is
				getting the response and creating the attribute*/


					for (var i = 0; i < response.data.length; i++) {

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
						$("#poochButton").append(poochesDiv);
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
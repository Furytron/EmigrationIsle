(function() {
	
	//Create the JSON URI
	jsonurl = "data/" + window.personIndex + ".json";
	
	//Change the logo image to correspond to the currently navigated emigrant.
	var logoImage = '../img/home_page/homepage_logos/'+window.personIndex+'_logo.png';
	$('#homeLink').prop('src', logoImage);
	
	//If this is the first time on the site then the overlay shows up to the user.
	if(window.overlayBool == false){
		$('#overlay').show(); //Show overlay
		window.overlayBool = true; //Set the var to true, so its not shown again.
	}
	
	/**
	-----------------------------------------------------------
						GET JSON FILE
	----------------------------------------------------------
	**/
	/*---
		The code below is an AJAX request to get a JSON file and parse it.
	---*/
	$.getJSON(jsonurl, function(data, textStatus){
	
		//Empty the current content Div
		$('#content').empty();

		//Load in the other divs specific to the who page
		var mainContentDivs = '<div id="whoIconDiv"></div>';
			mainContentDivs += '<div id="whoTextDiv"></div>';
			mainContentDivs += '<div id="whoRulerDiv"></div>';
			mainContentDivs += '<div id="whoBarchartDiv"></div>';
			mainContentDivs += '<div id="whoFadeInDiv"></div>';

		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');
		
		//Set background of the #content div
		$('#content').css({'background-image': 'url(' + data.person.whoPage.whoBgURI + ')', 'background-size':'960px 490px;'});
		
		//Init variables
		var htmlWhoRuler="";
		var htmlwhoBarchart="";
		var htmlWhoIcon="";

		/*---
			ICON DIV
		---*/
		$.each(data.person.whoPage.whoIconDiv,function(iconIndex, icon){
			htmlWhoIcon += '<img class="'+icon.imgClass+'" src="'+icon.imgURI+'" alt="'+icon.imgAlt+'" title="'+icon.imgTitle+'"/>';                         
		});                  
		$('#whoIconDiv').append(htmlWhoIcon);
		
		/*---
			RULER DIV
		---*/
		htmlWhoRuler += '<ul>';
		$.each(data.person.whoPage.whoRulerDiv,function(rulerIndex, ruler){
			htmlWhoRuler += '<li><img id="'+ruler.imgID+'" class="'+ruler.imgClass+'" src="'+ruler.imgURI+'" alt="'+ruler.imgAlt+'" title="'+ruler.imgTitle+'"/></li>';                         
		});
		htmlWhoRuler += '</ul>';                 
		$('#whoRulerDiv').append(htmlWhoRuler);
		
		/*---
			TEXT DIV
		---*/
		var htmltext = '<p class="' + data.person.whoPage.whoTextDiv.textClass+'">'+ data.person.whoPage.whoTextDiv.whoText + '</p>';		
		$('#whoTextDiv').append(htmltext);
		
		/*---
			BARCHART DIV
		---*/
		htmlwhoBarchart += '<div class="value"><p>'+data.person.whoPage.whoBarchartDiv.whoBarchartDefaultText+'<span class="num">'+data.person.whoPage.whoBarchartDiv.whoBarchartDefaultNum+'</span></p></div>';
		$.each(data.person.whoPage.whoBarchartDiv.whoBarchartValues, function(chartIndex, chart){
			htmlwhoBarchart += '<div class="'+chart.barClass+'" ><p class="barValues">'+chart.barTextValue+'<span class="num">'+chart.barValue+'</span></p></div>';                         
		});
		htmlwhoBarchart += '<p class="'+data.person.whoPage.whoBarchartDiv.whoBarchartXaxisLabelClass+'">'+data.person.whoPage.whoBarchartDiv.whoBarchartXaxisLabel+'</p>';
		$('#whoBarchartDiv').append(htmlwhoBarchart);
		
		/*---
			FADE-IN DIV
		---*/
		var fadeImageHTML = '<div id="'+data.person.whoPage.whoFadeInDiv.imgID+'"class="fade">';
			fadeImageHTML += '<img class="'+data.person.whoPage.whoFadeInDiv.imgClass+'" src="'+data.person.whoPage.whoFadeInDiv.imgURI+'" alt="'+data.person.whoPage.whoFadeInDiv.imgAlt+'" title="'+data.person.whoPage.whoFadeInDiv.imgTitle+'"/>';
			fadeImageHTML += '<div>';
			fadeImageHTML += '<img class="'+data.person.whoPage.whoFadeInDiv.imgClassOver+'" src="'+data.person.whoPage.whoFadeInDiv.imgURIOver+'" alt="'+data.person.whoPage.whoFadeInDiv.imgAltOver+'" title="'+data.person.whoPage.whoFadeInDiv.imgTitleOver+'"/>';
			fadeImageHTML += '</div>';
			fadeImageHTML += '</div>';
		$('#' +data.person.whoPage.whoFadeInDiv.location).append(fadeImageHTML);

		/*---
			INFO POINT
		---*/
		var htmlWhoInfoPoint = '<img id="'+data.person.whoPage.whoInfoPoint.imgID+'" class="'+data.person.whoPage.whoInfoPoint.imgClass+'" src="'+data.person.whoPage.whoInfoPoint.imgURI+'" alt="'+data.person.whoPage.whoInfoPoint.imgAlt+'" title="'+data.person.whoPage.whoInfoPoint.imgTitle+'"/>';                         
		$('#content').append(htmlWhoInfoPoint);

		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		
		/*---
			BARCHART jQuery
		---*/
		$('#whoBarchartDiv .barHandle').slideDown(4000);
		//Store defaults of the barchart.
		var defaultText = $('#whoBarchartDiv .value').html();
		var defaultValue = $('#whoBarchartDiv .value .num').html();
		//Code for mouse over events on each of the bars.
		$('#content').off('mouseenter', '#whoBarchartDiv .barHandle').on('mouseenter', '#whoBarchartDiv .barHandle', function() {
			$(this).addClass(window.personIndex + 'BarsOver')
			var text = $(this).find('p').html(); //Get text
			console.log(text);
			var value = $(this).find('span').html(); //Get value
			console.log(value);
			$('#whoBarchartDiv .value p').html(text); //Set text
			 
		}).off('mouseleave', '#whoBarchartDiv .barHandle').on('mouseleave', '#whoBarchartDiv .barHandle', function() {
			$(this).removeClass(window.personIndex + 'BarsOver')
			$('#whoBarchartDiv .value').html(defaultText); //Reset text
			$('#whoBarchartDiv .value .num').html(defaultValue); //Reset values
		});

		/*---
			RULER jQuery
		---*/
		//First ruler button
		$("#content").off('click', '#whoRulerDivImg1').on('click', '#whoRulerDivImg1', function(){
			var $varThis = $(this); //Store this as a variable
			var imgChecker = $varThis.prop("src").split('rulerButton')[1]; //Get src of the ruler image and split it for checking later
			
			//If this object has its data toggled off, then.
			if (!$varThis.prop('data-toggled') || $varThis.prop('data-toggled') == 'off'){
				$varThis.prop('data-toggled','on'); //Turn data-toggled on
				
				//Check if the image is already showing its over image.
				if(imgChecker == 'over.png')
				{
					//If the image is showing the over state, the get source and replace the over with click1.png
					var src = $varThis.prop("src").replace("over.png", "click1.png");
					
					//Animate the image from its small size to the larger clicked size
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '0px'
					},200, function() {
						$varThis.removeClass('hover'); //Remove the hover class, as there is no hover state on the clicked image
						$varThis.prop("src", src); //Apply the clicked image to the hovered one.
					});			
				}
				//If the image ends in .png
				//When the user clicks on the image multiple times, the mouse is not classed as being over the image
				//this means that the hover image is not applied and when the code tries to change from the "over.png" to "click1.png"
				//it throws an error, as the image is only ".png".
				else if(imgChecker == '.png')
				{
					//Change the .png to click1.png.
					var src = $varThis.prop("src").replace(".png", "click1.png");
					//Animate the image from its small size to the larger clicked size
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '0px'
					},200, function() {
						$varThis.removeClass('hover'); //Remove the hover class, as there is no hover state on the clicked image
						$varThis.prop("src", src); //Apply the clicked image to the hovered one.
					});					
				}
			}
			//If this object has its data toggled on, then.
			else if ($varThis.prop('data-toggled') == 'on'){
				$varThis.prop('data-toggled','off'); //Set data-toggled off
				//if the end of the src is "click1.png"
				if(imgChecker == 'click1.png')
				{
					//Replace with the original image
					var src = $varThis.prop("src").replace("click1.png",".png" );
					//Animate the image from its large size to the small size
					$varThis.animate({
						width: '34px',
						height: '34px',
						top: '17px'
					},200, function() {
						$varThis.prop("src", src);
						$varThis.addClass('hover');//Add the hover class, as there is a hover state on the original image
					});
				}
			}
		});
		
		//Second ruler button, same as the first ruler button above.
		$("#content").off('click', '#whoRulerDivImg2').on('click', '#whoRulerDivImg2', function(){
			var $varThis = $(this); 
			var imgChecker = $varThis.prop("src").split('rulerButton')[1];
			
			if (!$varThis.prop('data-toggled') || $varThis.prop('data-toggled') == 'off'){
				$varThis.prop('data-toggled','on');
				if(imgChecker == 'over.png')
				{
					var src = $varThis.prop("src").replace("over.png", "click2.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '80px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});
				}
				else if(imgChecker == '.png')
				{
					var src = $varThis.prop("src").replace(".png", "click2.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '80px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});
				}
			}
			else if ($varThis.prop('data-toggled') == 'on'){
				$varThis.prop('data-toggled','off');
				if(imgChecker == 'click2.png')
				{
					var src = $varThis.prop("src").replace("click2.png",".png" );
					
					$varThis.animate({
						width: '34px',
						height: '34px',
						top: '97px'
					},200, function() {
						$varThis.prop("src", src);
						$varThis.addClass('hover');
					});
				}
			}
		});
		//Third ruler button, same as the first ruler button above
		$("#content").off('click', '#whoRulerDivImg3').on('click', '#whoRulerDivImg3', function(){
			var $varThis = $(this); 
			var imgChecker = $varThis.prop("src").split('rulerButton')[1];
			
			if (!$varThis.prop('data-toggled') || $varThis.prop('data-toggled') == 'off'){
				$varThis.prop('data-toggled','on');
				if(imgChecker == 'over.png')
				{
					var src = $varThis.prop("src").replace("over.png", "click3.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '185px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});
				}
				else if(imgChecker == '.png')
				{
					var src = $varThis.prop("src").replace(".png", "click3.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '185px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});	
				}
			}
			else if ($varThis.prop('data-toggled') == 'on'){
				$varThis.prop('data-toggled','off');
				if(imgChecker == 'click3.png')
				{
					var src = $varThis.prop("src").replace("click3.png",".png" );
					
					$varThis.animate({
						width: '34px',
						height: '34px',
						top: '202px'
					},200, function() {
						$varThis.prop("src", src);
						$varThis.addClass('hover');
					});
				}
			}
		});
		
		//Fourth ruler button, same as the first ruler button above
		$("#content").off('click', '#whoRulerDivImg4').on('click', '#whoRulerDivImg4', function(){
			var $varThis = $(this); 
			var imgChecker = $varThis.prop("src").split('rulerButton')[1];
			
			if (!$varThis.prop('data-toggled') || $varThis.prop('data-toggled') == 'off'){
				$varThis.prop('data-toggled','on');
				if(imgChecker == 'over.png')
				{
					var src = $varThis.prop("src").replace("over.png", "click4.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '317px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});
				}
				else if(imgChecker == '.png')
				{
					var src = $varThis.prop("src").replace(".png", "click4.png");
					
					$varThis.animate({
						width: '68px',
						height: '68px',
						top: '317px'
					},200, function() {
						$varThis.removeClass('hover');
						$varThis.prop("src", src);
					});
				}
			}
			else if ($varThis.prop('data-toggled') == 'on'){
				$varThis.prop('data-toggled','off');
				if(imgChecker == 'click4.png')
				{
					var src = $varThis.prop("src").replace("click4.png",".png" );
					
					$varThis.animate({
						width: '34px',
						height: '34px',
						top: '334px'
					},200, function() {
						$varThis.prop("src", src);
						$varThis.addClass('hover');
					});
				}
			}
		});
		//-------END RULER
		
		/*---
			Fade-in image transition effect - For Bottom Left div image
		---*/
		//This fades the layered images opacity, so we can view the real photo behind it.
		$('#content').off("hover", 'div.fade').on("hover", 'div.fade', function(event) {
			if (event.type == "mouseenter") {
				var fade = $('> div', this);
				// if the element is currently being animated to a fadeOut
				if (fade.is(':animated')) {
				  //take it's current opacity back to 1
				  fade.stop().fadeTo(250, 1);
				} 
				else {
				  // fade in quickly
				  fade.fadeIn(250);
				}
			} 
			else if (event.type == "mouseleave") {
				// on hovering out, fade the element out
				var fade = $('> div', this);
				if (fade.is(':animated')) {
				  fade.stop().fadeTo(2000, 0);
				} else {
				  // fade away slowly
				  fade.fadeOut(800);
				}
			}
		});
		
		/*---
			Re-initialize the tooltips
		---*/
		$(".tooltip").tipTip({
			delay: 100
		});
		
		//Hide the loading div
		$('.loading').hide();
		//Show the content div
		$('#content').css({'display':'block'});

		//Return false to stop a tag default action.
		return false;
	});
})();
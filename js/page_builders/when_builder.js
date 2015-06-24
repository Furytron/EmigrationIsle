(function() {
	
	//Create the JSON URI
	jsonurl = "data/" + window.personIndex + ".json";

	//Change the logo image to correspond to the currently navigated emigrant.
	var logoImage = '../img/home_page/homepage_logos/'+window.personIndex+'_logo.png';
	$('#homeLink').prop('src', logoImage);
	
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
		var mainContentDivs =  '<div id="whenDivTopLeft" class="when_div_class"></div>';
			mainContentDivs += '<div id="whenDivTopCenter" class="when_div_class"></div>';
			mainContentDivs += '<div id="whenDivTopRight" class="when_div_class"></div>';
			mainContentDivs += '<div id="whenDivBottomLeft" class="when_div_class"></div>';
			mainContentDivs += '<div id="whenDivBottomCenter" class="when_div_class"></div>';
			mainContentDivs += '<div id="whenDivBottomRight" class="when_div_class"></div>';
			
		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');
		
		//The main divs change in size only for joseph, so this is a conditional to sort that out.
		if(window.personIndex == 'joseph')
		{
			//Change the CSS of the div, expanding the bottom left div
			$('#whenDivBottomLeft').css({
				'height': '155px',
				'top': '324px'
			});
			//Change the CSS of the div, reducing the top-left div
			$('#whenDivTopLeft').css({
				'height': '293px'
			});
		}
		
		/*---
			WHEN DIV PINS
		---*/
		//Add the pins to the background.
		var whenPinImage = "";
		$.each(data.person.whenPage.whenPinImages,function(pinIndex, pin){
			whenPinImage += '<img id="'+pin.imgID+'" class="'+pin.imgClass+'" src="'+pin.imgURI+'" alt="'+pin.imgAlt+'" title="'+pin.imgTitle+'"/>';
		});
		$('#content').append(whenPinImage);		
		
		/*---
			WHEN TITLE IMAGE
		---*/
		var htmlImgTitle = '<img id="'+data.person.whenPage.whenTitleImg.imgID+'" class="'+data.person.whenPage.whenTitleImg.imgClass+'" src="'+data.person.whenPage.whenTitleImg.imgURI+'" alt="'+data.person.whenPage.whenTitleImg.imgAlt+'" title="'+data.person.whenPage.whenTitleImg.imgTitle+'"/>';
		$('#content').append(htmlImgTitle);
		
		/*---
			WHEN TEXT
		---*/
		var textHTML = "";
		var textlocale = "";
		$.each(data.person.whenPage.whenText , function(stringIndex, stringtext){
			textHTML = "";
			//alert('Start ' +stringtext.textID);
			if(stringtext.heading){
				//alert('In heading ' + stringtext.heading);
				//Heading
				textHTML += '<h2 id="'+stringtext.headingID+'" class="'+stringtext.headingClass+'">'+stringtext.heading+'</h2>';
			}
			if(stringtext.text){
				//alert('In text ' + stringtext.text);
				//Text
				textHTML += '<p id="'+stringtext.textID+'" class="'+stringtext.textClass+'" >'+stringtext.text+'</p>';
			}
			textlocale = stringtext.location;
			//alert('After ifs ' + textHTML);
			$('#' + textlocale).append(textHTML);
		});

		/*---
			WHEN IMAGES
		---*/
		var imgHTML = "";
		var imglocale = "";
		$.each(data.person.whenPage.whenImages,function(imageIndex, image){
			imgHTML = "";
			imgHTML += '<img id="'+image.imgID+'"class="'+image.imgClass+'" src="'+image.imgURI+'" alt="'+image.imgAlt+'" title="'+image.imgTitle+'"/>';
			imglocale = image.location;
			$('#'+imglocale).append(imgHTML);
		});

		/*---
			WHEN INTERACTIONS
		---*/
		//Initialise all the variables needed.
		var zoomHTML = "",
			audioHTML = "",
			fadeImageHTML = "",
			galleryHTML = "", 
			cycleButtonsHTML = "",
			videoHTML = "",
			vidSourceHTML = "";
		
		//Iterate through the interactions array
		$.each(data.person.whenPage.whenInteractions,function(interactionsIndex, interactions){
			
			//If the interaction has a type = zoomOnImage
			if(interactions.type == 'zoomOnImage'){
				
				//Build the zoomOnImage object and apply it to the DOM
				zoomHTML = '<a href="'+interactions.imgURIBigImage+'" class="'+interactions.imgClassBigImage+'" title="'+interactions.imgTitleBigImage+'">';
				zoomHTML += '<img id="'+interactions.imgID+'" class="'+interactions.imgClass+'" src="'+interactions.imgURI+'" alt="'+interactions.imgAlt+'" title="'+interactions.imgTitle+'"/>';
				zoomHTML += '</a>';
				$('#' +interactions.location).append(zoomHTML);
		
			}
			//If the interaction has a type = audioAssets
			else if(interactions.type == 'audioAssets'){
				audioHTML = "";
				//If its a text audio button
				if(interactions.audioButtonText){
					audioHTML = '<p id="'+interactions.audioButtonID+'" class="'+interactions.audioButtonClass+'" >'+interactions.audioButtonText+'</p>';
				}
				//If its an image audio button
				if(interactions.imgURI){
					audioHTML += '<img id="'+interactions.imgID+'" class="'+interactions.imgClass+'" src="'+interactions.imgURI+'" alt="'+interactions.imgAlt+'" title="'+interactions.imgTitle+'"/>';
				}
				//Build the audioAssets object and apply it to the DOM
				audioHTML +=  '<audio id="'+interactions.audioID+'">';
				audioHTML +=  '<source src="'+interactions.audioSourceOgg+'" type="audio/ogg"/>';
				audioHTML +=  '<source src="'+interactions.audioSourceMp3+'"  type="audio/mpeg" />';
				audioHTML +=  'Your browser does not support HTML5 Audio';
				audioHTML +=  '</audio>';	
				$('#' +interactions.location).append(audioHTML);
			}
			//If the interaction has a type = fadeInImage
			else if(interactions.type == 'fadeInImage'){
				//Build the fadeInImage object and apply it to the DOM
				fadeImageHTML = '<div id="'+interactions.imgID+'"class="fade">';
				fadeImageHTML += '<img class="'+interactions.imgClass+'" src="'+interactions.imgURI+'" alt="'+interactions.imgAlt+'" title="'+interactions.imgTitle+'"/>';
				fadeImageHTML += '<div>';
				fadeImageHTML += '<img class="'+interactions.imgClassOver+'" src="'+interactions.imgURIOver+'" alt="'+interactions.imgAltOver+'" title="'+interactions.imgTitleOver+'"/>';
				fadeImageHTML += '</div>';
				fadeImageHTML += '</div>';
				$('#' +interactions.location).append(fadeImageHTML);
			}
			//If the interaction has a type = imageGallery
			else if(interactions.type == 'imageGallery'){
				//Build the imageGallery object and apply it to the DOM
				galleryHTML = '<div id="'+interactions.mainGalleryDivID+'" class="'+interactions.mainGalleryDivClass+'">';
				//Iterate through the gallery images
				$.each(interactions.imageGallery,function(galleryIndex, gallery){
					galleryHTML += '<div class="'+gallery.imageDivWrapperClass+'">';
					galleryHTML += '<img class="'+gallery.imgClass+'" src="'+gallery.imgURI+'" alt="'+gallery.imgAlt+'" title="'+gallery.imgTitle+'"/>';
					galleryHTML += '<div class="'+interactions.maskDivClass+'">';
					galleryHTML += '<p>'+gallery.maskText+'</p>';
					galleryHTML +='</div>';
					galleryHTML +='</div>';	
				});
				galleryHTML += '</div>';
				$('#' +interactions.location).append(galleryHTML);		
			}
			//If the interaction has a type = cycleButtons
			else if(interactions.type == 'cycleButtons'){
				//Build the cycleButtons for the image galleries and apply it to the DOM. Iterate through each image, next and prev.
				$.each(interactions.buttonImages,function(buttonIndex, button){
					cycleButtonsHTML =  '<div id="'+button.divID+'" class="'+button.divClass+'"><img class="'+button.imgClass+' " src = "'+button.imgURI+'" alt="'+button.imgAlt+'" title="'+button.imgTitle+'" /></div>'; 	
					//This needs to be inside the .each to append both buttons.
					$('#' +interactions.location).append(cycleButtonsHTML);
				});				
			}
			//If the interaction has a type = videoAssets
			else if(interactions.type == 'videoAssets'){
				//Build the videoAssets and apply it to the DOM.
				videoHTML += '<video id="'+interactions.videoID+'" controls="controls" preload="auto" poster="'+interactions.posterURI+'" ></video>';
				$('#' +interactions.location).append(videoHTML);
				$.each(interactions.videoSources,function(vidIndex, vid){
					vidSourceHTML += '<source src="'+vid.videoSource+'" type="'+vid.mimeType+'"/>';
				});
				$('#' +interactions.videoID).append(vidSourceHTML);
			}
		});
	
		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		
		/*---
			INITIATE ZOOM-IN
		---*/
		//ZOOM IMAGE OPTIONS AND THEN INIT's
		var options1 = {
			position:'right',
			xOffset: -20,  
            yOffset: 0, 
			//position:'right',
			preloadImages:true,
			preloadText:'Loading zoom',
			title:true,
			lens:false,
			imageOpacity:0.9,
			zoomType: 'standard',  
            alwaysOn : false,  
            zoomWidth: 250,  
            zoomHeight:200,  
            showEffect : 'show',  
            hideEffect: 'hide'
		};
		var options2 = {
			position:'right',
			preloadImages:true,
			preloadText:'Loading zoom',
			title:true,
			lens:false,
			imageOpacity:0.9,
			zoomType: 'standard',  
            alwaysOn : false,  
            zoomWidth: 250,  
            zoomHeight:200,  
            xOffset: -20,  
            yOffset: 0,  
            showEffect : 'show',  
            hideEffect: 'hide'
		};
		var options3 = {
			position:'right',
			preloadImages:true,
			preloadText:'Loading zoom',
			title:true,
			lens:false,
			imageOpacity:0.9,
			zoomType: 'standard',  
            alwaysOn : false,  
            zoomWidth: 250,  
            zoomHeight:200,  
            xOffset: -20,  
            yOffset: 0,  
            showEffect : 'show',  
            hideEffect: 'hide'
		};
		
		//Initialize the zoom-in objects
		$('.zoomImage_Washing').jqzoom(options1);
		$('.zoomImage_Yeats').jqzoom(options2);
		$('.zoomImage_memorial_zoom').jqzoom(options3);
		$('.zoomImage_george_zoom').jqzoom(options3);
		$("#content").off("mouseleave",".zoomImage_Washing").on("mouseleave",".zoomImage_Washing", function(){
			$(".zoomImage_Washing").stop();
		});
		//-----END ZOOM PLUGIN
		
		/*---
			AUDIO PLAY HANDLERS
		---*/
		//To play audio on when page. For the images that play audio. (Train steam, bell)
		$("#content").off("click",".whenAudioImageButton").on("click",".whenAudioImageButton", function(){
				var $imgID = $(this).prop('id').split('img')[1]; //Get ID (1_1)
				var $audID = 'audioID' + $imgID; //Apply ID to audio ID. (audioID1_1)
				var src = $(this).prop('src').replace("over.png", "click.png"); //Store new image source
				$(this).prop("src", src); //Apply new image source
				$(this).removeClass('hover'); //Remove hover class
				$('#' + $audID ).get(0).play(); //Play coressponding audio
		});
		
		//This code plays and stops the audio. It also changes the text on the button.
		var playing = false;
		$('#content').off('click','.audioTextButtonClass').on('click','.audioTextButtonClass', function() {
			var tmpID = $('.audioTextButtonClass').prop('id').split('Button')[1];
			var audioID = 'audioID'+ tmpID;
			if (playing === false) {
				$('#' + audioID).get(0).play();
				playing = true;
				$(this).html("&#9632; STOP SOUND");
			} else {
				$('#' + audioID).get(0).pause();
				playing = false;
				$(this).html("&#9658; CLICK TO PLAY");
			}
		});
		//----END AUDIO
		
		/*---
			FADE-IN: image transition effect
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
				  fade.fadeOut(1000);
				}
			}
		});
		
		/*---
			IMAGE GALLERY CYCLE
		---*/
		//Initialize cycle plugin. 
		//Margaret Page
		$('#whenDivTopLeftGalleryID1_1').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTLButtonNextID1_1',
			prev : '#whenDivTLButtonPrevID1_1'
		});
		$('#whenDivTopRightGalleryID1_2').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTRButtonNextID1_2',
			prev : '#whenDivTRButtonPrevID1_2'
		});
		//Steve page.
		$('#whenDivTopLeftGalleryID2_1').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTLButtonNextID2_1',
			prev : '#whenDivTLButtonPrevID2_1'
		});
		$('#whenDivTopCenterGalleryID2_2').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTCButtonNextID2_2',
			prev : '#whenDivTCButtonPrevID2_2'
		});
		//Joseph page.
		$('#whenDivTopCenterGalleryID3_1').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTCButtonNextID3_1',
			prev : '#whenDivTCButtonPrevID3_1'
		});
		$('#whenDivBottomRightGalleryID3_2').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivBRButtonNextID3_2',
			prev : '#whenDivBRButtonPrevID3_2'
		});
		//Anne's page.
		$('#whenDivTopRightGalleryID4_1').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTRButtonNextID4_1',
			prev : '#whenDivTRButtonPrevID4_1'
		});
		//---END IMAGE GALLERY CYCLE
		
		/*---
			IMAGE GALLERY TEXT MASKS
		---*/
		//This code displays the text on the image masks for the galleries.
		//This class must be applied to the buttons and the gallery itself
		//An ID must be also on that same div, and must end in ID1_1 (Explained: Margaret_Gallery1)
		$('#content').off('mouseover', '.when_image_gallery_elements').on('mouseover', '.when_image_gallery_elements', function(){
			var $varThis = $(this);
			//Get id of the mask
			var $mask = $varThis.prop('id').split('ID')[1];
			//Change CSS values of view-first p tags. Making it visible, and translating it from below the image, up onto the image.
			$('.view-first p').css({
					'opacity': '1',
					'filter' : 'alpha(opacity=100)',
					'transform' : 'translateY(0px)',
					'transition-delay' : '0.1s'
			});
			var selector = '.when_image_mask_ID' + $mask;
			//Change CSS to show the corresponding mask to the gallery, this also allows you to see the text.
			$(selector).css({
				'opacity': '1',
				'filter' : 'alpha(opacity=100)'
			});
		});
		
		//Mouseout event, does the opposite of above. 
		//GEts IDs, and hides the mask and the text of the gallery.
		$('#content').off('mouseout', '.when_image_gallery_elements').on('mouseout', '.when_image_gallery_elements', function(){
			var $varThis = $(this);
			var $mask = $varThis.prop('id').split('ID')[1];	
			$('.view-first p').css({
				'opacity': '0',
				'filter' : 'alpha(opacity=0)',
				'transform' : 'translateY(100px)',
				'transition-delay' : 'all 0.2s linear'
			});
			var selector = '.when_image_mask_ID' + $mask;
			$(selector).css({
				'opacity': '0',
				'filter' : 'alpha(opacity=0)'
			});
		});
		
		/*---
			ROTATING SPINNING IMAGES
		---*/
		var value = 0;
		var value2 = 0;
		//Clicking on any object with a class of spinners causes the cogs to spin.
		$('#content').on('click','.spinners',function(){
			value +=300; //Spin right
			value2 -=300; //Spin left
			//Spin the cogs
			$('.spinRight').rotate({ animateTo:value}); 
			$('.spinLeft').rotate({ animateTo:value2});
		});
		
		//Hide the loading div
		$('.loading').hide();
		//Show the content div
		$('#content').css({'display':'block'});

		//Return false to stop a tag default action.
		return false;
	});
})();
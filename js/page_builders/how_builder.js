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
		var mainContentDivs = '<div id="howTextDiv"></div>';
			mainContentDivs += '<div id="howTransportDiv"></div>';
			mainContentDivs += '<div id="howAudioDiv"></div>';
			mainContentDivs += '<div id="howAccordionDiv"></div>';
			
		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');
		
		//Append new background image
		$('#content').css({'background-image':'url(' + data.person.howPage.howBgURI + ')', 'background-size':'960px 490px;'});
		
		/*---
			TEXT DIV
		---*/
		var htmlText = '<p class="'+data.person.howPage.howTextDiv.textClass+'" >' +data.person.howPage.howTextDiv.howText+ '</p>';
		$('#howTextDiv').append(htmlText);

		/*---
			TRANSPORT BUTTONS
		---*/
		//Load in the amount of buttons needed.
		//Add the divs for the buttons onto the page.
		var htmlTransportButton = "";
		$.each(data.person.howPage.howTransportButtons,function(buttonIndex, button){
			htmlTransportButton += '<div id="'+button.transportButtonWrapperID+'" class="'+button.transportButtonWrapperClass+'">';
			htmlTransportButton += '<div id="'+button.transportButtonID+'" class="'+button.transportButtonClass+'"> </div>';
			htmlTransportButton += '</div>'	
		});
		$('#howTransportDiv').append(htmlTransportButton);
		
		/*---
			LARGE TRANSPORTATION IMAGES - for the buttons
		---*/
		var htmlTransportButtonImages = "";
		$.each(data.person.howPage.howTransportButtonImages,function(buttonImageIndex, buttonImage){
			htmlTransportButtonImages += '<img id="'+buttonImage.imgID+'" class="'+buttonImage.imgClass+'" src="'+buttonImage.imgURI+'" alt="'+buttonImage.imgAlt+'" title="'+buttonImage.imgTitle+'" />';                      
		});
		$('#howTransportDiv').append(htmlTransportButtonImages);
		
		/*---
			HOW AUDIO
		---*/
		var htmlAudio = '<p id="'+data.person.howPage.howAudioDiv.audioButtonID+'" class="'+data.person.howPage.howAudioDiv.audioButtonClass+'" >'+data.person.howPage.howAudioDiv.audioButtonText+'</p>';
		htmlAudio +=  '<audio id="'+data.person.howPage.howAudioDiv.audioID+'">'
		htmlAudio +=  '<source src="'+data.person.howPage.howAudioDiv.audioSourceOgg+'" type="audio/ogg" />'
		htmlAudio +=  '<source src="'+data.person.howPage.howAudioDiv.audioSourceMp3+'" type="audio/mpeg" />'
		htmlAudio +=  'Your browser does not support HTML5 Audio'
		htmlAudio +=  '</audio>'					
		$('#howAudioDiv').append(htmlAudio);
		
		/*---
			ACCORDION DIV
		---*/
		var htmlAccordionTitleHTML = '<img id="infobar_Title_ID" src="../img/how_page/InfoBar/infobar_title.png" alt="" title="" />';
		$('#content').append(htmlAccordionTitleHTML);

		var htmlAccordionHTML = '<div id="accordion">';
		$.each(data.person.howPage.howAccordionDiv,function(iconIndex, icon){
			htmlAccordionHTML += '<h3 class="'+icon.accordionTitleClass+'">'+icon.accordionTitle+'</h3>';
			htmlAccordionHTML += '<div class="'+icon.accordionContentDivClass+'">';
			htmlAccordionHTML += '<img class="'+icon.imgClass+'" src="'+icon.imgURI+'" alt="'+icon.imgAlt+'" title="'+icon.imgTitle+'"/>';                         
			htmlAccordionHTML += '</div>';
		});
		htmlAccordionHTML += '</div>';
		$('#howAccordionDiv').append(htmlAccordionHTML);

		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/

		/*---
			AUDIO EVENT HANDLER
		---*/
		var playing = false; //Set playing to false
		//Create click event handler for the audio
		$('#content').off('click','.audioTextButtonClass').on('click','.audioTextButtonClass', function() {
			//Get the ID of the audio button
			var tmpID = $('.audioTextButtonClass').prop('id').split('Button')[1];
			var audioID = 'audioID'+ tmpID; //Apply the ID number to the audioID, which is the corresponding audio tag ID
			//If not playing
			if (playing === false) {
				$('#' + audioID).get(0).play(); //Get the corresponding audio, and play
				playing = true; //Set playing to true
				$(this).html("&#9632; STOP SOUND"); //Change the html of the button, so the user knows to click again to stop
			} else { //If its not equal to false
				$('#' + audioID).get(0).pause(); //Get the corresponding audio, and pause
				playing = false; //Set playing to false
				$(this).html("&#9658; CLICK TO PLAY"); //Change the html of the button to the original text.
			}
		});
		
		/*---
			TRANSPORT BUTTON GLOWING EFFECT
		---*/
		//If the interval has has a value, or is not undefined clear the interval
		if(window.intervalID != '' || window.intervalID != 'undefined' ){window.clearInterval(window.intervalID);} //Clear the interval if there is something in it.
		//Create a new interval for the page, that toggles the CSS class "how_transport_button_glow". This creates the glowing effect using transitions
		window.intervalID = setInterval('$("div.how_transport_button_wrapper").toggleClass("how_transport_button_glow");', 1000);
		
		/*---
			TRANSPORT BUTTON CLICK HANDLER
		---*/
		//Click to add, and click image to remove. Also need to add toggle to the button.
		$("#content").off('click','.how_transport_button_wrapper').on('click','.how_transport_button_wrapper', function(event){
			var $varThis = $(this);
			var tmpID = $varThis.prop('id').split('ID')[1];
			//Use the data-toggled property to see if the button has been toggled.
			if (!$varThis.prop('data-toggled') || $varThis.prop('data-toggled') == 'off'){
				$varThis.prop('data-toggled','on');
				//Show the image
				$('#how_transport_button_image_ID'+tmpID).css({'display': 'block'});
			}
			else if ($varThis.prop('data-toggled') == 'on'){
				$varThis.prop('data-toggled','off');
				//Hide the image
				$('#how_transport_button_image_ID'+tmpID).css({'display': 'none'});
			}
		});
		//Click handler, to handle clicks on the actual transport butttons.
		$('#content').off('click', '.how_transport_button_images').on('click', '.how_transport_button_images' , function(){
			var $varThis = $(this);
			var tmpID = $varThis.prop('id').split('ID')[1];
			//Hide the image
			$('#how_transport_button_image_ID'+tmpID).css({'display': 'none'});
			//Set data-toggled to off
			$('#how_transport_button_wrapper_ID'+tmpID).prop('data-toggled','off');
		});
		
		/*---
			ACCORDION DIV
		---*/
		//Initialize the accordion
		$( "#accordion" ).accordion();			
		
		//Create click handlers for the tab/titles of the accordion
		$('#howAccordionDiv').off('click','.accordion_title_class').on('click','.accordion_title_class',function(){
			var $thisAcc = $(this);
			var src = '../img/how_page/InfoBar/Buttons/infoBar_button.png';
			//Set all the accordion titles to the normal state
			$('.accordion_title_class').css({
				'background-image':'url("'+src+'")',
				'width' : '112px',
				'height' : '48px',
				'left' : '0'
			});
			$('.accordion_title_class').removeClass('openAcc');
			
			//Set this accordion title to the active state.
			var src = '../img/how_page/InfoBar/Buttons/infoBar_clicked.png';
			$($thisAcc).css({
				'background-image':'url("'+src+'")',
				'width' : '120px',
				'height' : '58px',
				'left' : '-4px'
			});
			$($thisAcc).addClass('openAcc');				
		});
				
		//Set the first child as the open image.
		$('.accordion_title_class:first').trigger('click');
		
		//Hide the loading div
		$('.loading').hide();
		//Show the content div
		$('#content').css({'display':'block'});

		//Return false to stop a tag default action.
		return false;
	});
})();
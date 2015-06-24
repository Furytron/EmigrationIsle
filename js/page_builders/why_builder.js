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
		var mainContentDivs = '<div id="whyMainImgDiv"></div>';
			mainContentDivs += '<div id="whyMinorImgDiv"></div>';
			
		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');
		
		/*---
			APPEND TITLE
		---*/
		var whyTitle = '<img id="'+data.person.whyPage.whyTitle.imgID+'" class="'+data.person.whyPage.whyTitle.imgClass+'" src="'+data.person.whyPage.whyTitle.imgURI+'" alt="'+data.person.whyPage.whyTitle.imgAlt+'" title="'+data.person.whyPage.whyTitle.imgTitle+'"/>';
		$('#content').append(whyTitle);
					
		/*---
			APPEND MAIN REASONS
		---*/
		var htmlMain = '<ul class="hover_block">';
		$.each(data.person.whyPage.whyMainImgDiv,function(imgIndex, img){
			htmlMain += '<li><img src="'+img.imgURI+'" alt="alt" /><p>'+img.infoText+'</p></li>'; 
			//<a href="/"></a></li>';              
		});                  
		htmlMain += '</ul>';
		$('#whyMainImgDiv').append(htmlMain);
		
		/*---
			APPEND MINOR REASONS
		---*/
		//Add background image of minor reasons
		$('#whyMinorImgDiv').css({'background-image': 'url(' + data.person.whyPage.whyMinorBgURI + ')', 'background-size':'914px 96px;'});

		//MINOR REASONS GALLERY
		var galleryHTML = '<div id="whyMinorGallery">';
		$.each(data.person.whyPage.whyMinorImgDiv,function(galleryIndex, gallery){
			galleryHTML += '<div class="view-first">';
			galleryHTML += '<img class="'+gallery.imgClass+'" src="'+gallery.imgURI+'" alt="'+gallery.imgAlt+'" title="'+gallery.imgTitle+'"/>';
			galleryHTML +='</div>';	
		});
		galleryHTML += '</div>';
		$('#whyMinorImgDiv').append(galleryHTML);		
		
		/*---
			APPEND IMAGE GALLERY BUTTONS
		---*/
		var cycleButtonsHTML = ""
		$.each(data.person.whyPage.whyButtonDiv,function(buttonIndex, button){
			cycleButtonsHTML +=  '<div id="'+button.divID+'"><img class="'+button.imgClass+' " src = "'+button.imgURI+'" alt="'+button.imgAlt+'" title="'+button.imgTitle+'" /></div>'; 			
		});	
		$('#whyMinorImgDiv').append(cycleButtonsHTML);
		
		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		
		/*---
			HOVER EFFECT - MAIN REASONS
		---*/
		//Mouseenter the main reasons, the image animates down by 290px
		$('#content').off('mouseenter', 'ul.hover_block li').on('mouseenter', 'ul.hover_block li',  function(){
			$(this).find('img').animate({top:'290px'},{queue:false,duration:500});
		}).on('mouseleave', 'ul.hover_block li', function() {//Mouseleave the main reasons, the image animates back up to 0px
			$(this).find('img').animate({top:'0px'},{queue:false,duration:500});
		});
		//Return flase on clicks that are made on the main reasons
		$('#content').off('click', 'ul.hover_block li a').on('click', 'ul.hover_block li a',  function(){
			return false;
		});
		
		/*---
			IMAGE GALLERY CYCLE
		---*/
		$('#whyMinorGallery').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whyMinorNextButton',
			prev : '#whyMinorBackButton'
		});
	
		//Hide the loading div
		$('.loading').hide();
		//Show the content div
		$('#content').css({'display':'block'});

		//Return false to stop a tag default action.
		return false;
	});
})();
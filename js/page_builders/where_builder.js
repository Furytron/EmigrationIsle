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
		var mainContentDivs = '<div id="whereMapDiv" class="cursor" style ="height: 380px; width: 525px;" ></div>'; //data-projection="mill" data-name="au_mill_en"
			mainContentDivs += '<div id="whereInfoDiv" ></div>';
			
		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');
		
		//Append new background image
		$('#content').css({'background-image':'url(' + data.person.wherePage.whereBgURI + ')', 'background-size':'960px 490px;'});
		
		/*---
			Get map builder for the emigrant
		---*/
		var map_builder_file = window.personIndex + "_map.js";
		$.getScript('js/map_builders/'+ map_builder_file);
		
		/*---
			INFORMATION DIV - Large Images on right side. 
		---*/
		//Apply the splash image to the content div
		var htmlInfoImg = '<img class="'+data.person.wherePage.whereInfoDiv.imgClass+'" id="'+data.person.wherePage.whereInfoDiv.imgID+'"src="'+data.person.wherePage.whereInfoDiv.imgURI+'" alt="'+data.person.wherePage.whereInfoDiv.imgAlt+'" title="'+data.person.wherePage.whereInfoDiv.imgTitle+'"/>';
		$('#whereInfoDiv').append(htmlInfoImg);
		
		/*---
			INFO POINTS
		---*/
		//Apply all info points for all locations for the specific emigrant
		var htmlInfoPoint = "";
		$.each(data.person.wherePage.whereInfoDivInfoPoints,function(InfoPointIndex, infoPoint){
			htmlInfoPoint += '<img id ="'+infoPoint.imgID+'" class="'+infoPoint.imgClass+'" src="'+infoPoint.imgURI+'" alt="'+infoPoint.imgAlt+'" title="'+infoPoint.imgTitle+'" />';                      
		});
		$('#whereInfoDiv').append(htmlInfoPoint);
		
		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		var selectedRegion = '';
		
		//Hide all infopoints
		$('.whereInfoPoints').hide();
		
		//Show only Splash info points
		$('#infoPointSplash_'+window.personIndex+'_1,#infoPointSplash_'+window.personIndex+'_2,#infoPointSplash_'+window.personIndex+'_3').show();
		
		/*---
			REGION OVER - Mouse over the regions on a map
		---*/
		$('#content').off('regionOver.jvectormap','#whereMapDiv').on('regionOver.jvectormap','#whereMapDiv', function(event, code){
			//Get the region label
			var codesplit = code.split('-')[1];
			
			//If currently on Margaret
			if(window.personIndex == 'margaret'){
				//If any of these regions
				if(codesplit == 'QLD' || codesplit == 'NT' || codesplit == 'ACT' || codesplit == 'NSW')
				{
					//Highlight all the above regions
					event.preventDefault(); //Prevent the default actions
					//Define colours
					var myCustomColors = {
						'AU-QLD': '#DDCD87',
						'AU-NSW': '#DDCD87',
						'AU-ACT': '#DDCD87',
						'AU-NT': '#DDCD87'
					};
					//Apply colours
					map.series.regions[0].setValues(myCustomColors);
				}
			}
			//If currently on Joseph
			if(window.personIndex == 'joseph'){
				//If on any of these regions (greyed out regions)
				if(codesplit == 'ID' || codesplit == 'IN' || codesplit == 'KY' || codesplit == 'MI' ||
					codesplit == 'MN' || codesplit == 'MO' || codesplit == 'AR' || codesplit == 'TN'||
					codesplit == 'VA' || codesplit == 'WV' || codesplit == 'OH' || codesplit == 'NC'||
					codesplit == 'MD' || codesplit == 'DE' || codesplit == 'NT' || codesplit == 'CT'||
					codesplit == 'RI' || codesplit == 'NM' || codesplit == 'VT' || codesplit == 'ME' ||
					codesplit == 'NJ'|| codesplit == 'WI' || codesplit == 'IA'|| codesplit == 'NH')
				{
					//Prevent default actions (highlighting, opcaity change)
					event.preventDefault();
				}
			}
			//If currently on Anne
			if(window.personIndex == 'anne'){
				//If on any of these regions (greyed out regions)
				if(codesplit == 'NT' || codesplit == 'NB' || codesplit == 'NL' || codesplit == 'YT' ||
					codesplit == 'PE'|| codesplit == 'NS' || codesplit == 'NV'||
					codesplit == 'SK' || codesplit == 'MB' || codesplit == 'NU')
				{
					//Prevent default actions (highlighting, opcaity change)
					event.preventDefault();
				}
			}
		});
		
		/*---
			REGION OUT
		---*/
		$('#content').off('regionOut.jvectormap','#whereMapDiv').on('regionOut.jvectormap','#whereMapDiv', function(event, code){
			//Get place label
			var codesplit = code.split('-')[1]; 
			
			if(codesplit == selectedRegion){//Skip the mouse out event if the region is selected.
				event.preventDefault(); 
				return false;
			}
			
			//If currently on Margaret
			if(window.personIndex == 'margaret'){
				//If leaving any of these regions
				if(codesplit == 'QLD' || codesplit == 'NT' || codesplit == 'ACT' || codesplit == 'NSW')
				{
					//Un-highlight all the above regions
					event.preventDefault();//Prevent default action
					var myCustomColors = {
						'AU-QLD': '#344B5E',
						'AU-NSW': '#344B5E',
						'AU-ACT': '#344B5E',
						'AU-NT': '#344B5E'
					};
					//Apply colour changes
					map.series.regions[0].setValues(myCustomColors);
				}
			}
		});
		
		/*---
			REGION CLICK
		---*/
		$('#content').off('regionClick.jvectormap','#whereMapDiv').on('regionClick.jvectormap','#whereMapDiv', function(event, code){
			//Get place label
			var codesplit = code.split('-')[1];
			
			var imageSrc = $('#imgInfo').prop("src").split('infoDivImg')[0]; //get image source (EG: img/margaret/...)
			var currImageCheck = $('#imgInfo').prop("src").split('infoDivImg')[1]; //Get current image. (EG: NSW, SA)	
			
			//If the current page is margaret, then excute the following code for region click handling.
			if(window.personIndex == 'margaret'){
				//Hide all infopoints
				$('.whereInfoPoints').hide();
				
				//If these labels, do this. These regions are joined together.
				if(codesplit == 'QLD' || codesplit == 'NT' || codesplit == 'ACT' || codesplit == 'NSW')
				{
					event.preventDefault(); //Prevent default
					map.clearSelectedRegions(); //Clear other selected regions
					//Highlight the regions together.
					map.setSelectedRegions('AU-QLD');
					map.setSelectedRegions('AU-NSW');
					map.setSelectedRegions('AU-ACT');
					map.setSelectedRegions('AU-NT');
					
					//if the current image is not already nsw.png.
					if(currImageCheck != 'NSW.png')
					{
						//Append that image to the DOM
						var newImageSrc = imageSrc + 'infoDivImgNSW.png';
						//Animation to remove current image and deploy new image.
						$('#imgInfo').slideUp('fast', function(){
							$('#imgInfo').prop("src", newImageSrc).slideDown('fast');
						});
						//Show only Splash info points
						$('#infoPointNSW1, #infoPointNSW2, #infoPointNSW3').slideDown();
					}
					else{
						//All points were hidden above, so they need to be redisplayed.
						$('#infoPointNSW1, #infoPointNSW2, #infoPointNSW3').slideDown();
					}
						
				}
				else{
					//Apply the new image to the variable
					var newImageSrc = imageSrc + 'infoDivImg' + codesplit + '.png';
					//Append new image
					$('#imgInfo').slideUp('fast', function(){
						$('#imgInfo').prop("src", newImageSrc).slideDown('fast');
					});
					$('#infoPoint'+codesplit+'1, #infoPoint'+codesplit+'2,#infoPoint'+codesplit+'3, #infoPoint'+codesplit+'4').slideDown();
				}
			}
			//If currently on Joseph
			if(window.personIndex == 'joseph'){
			
				//Hide info points
				$('.whereInfoPoints').hide();
				
				//If any of the regions are clicked
				if(codesplit == 'ID' || codesplit == 'IN' || codesplit == 'KY' || codesplit == 'MI' ||
					codesplit == 'MN' || codesplit == 'MO' || codesplit == 'AR' || codesplit == 'TN'||
					codesplit == 'VA' || codesplit == 'WV' || codesplit == 'OH' || codesplit == 'NC'||
					codesplit == 'MD' || codesplit == 'DE' || codesplit == 'NT' || codesplit == 'CT'||
					codesplit == 'RI' || codesplit == 'NM' || codesplit == 'VT' || codesplit == 'ME' ||
					codesplit == 'NJ'|| codesplit == 'WI' || codesplit == 'IA'|| codesplit == 'NH')
				{
					//Prevent default action
					event.preventDefault();
				}
				else{
					//Apply the new image to the variable
					var newImageSrc = imageSrc + 'infoDivImg' + codesplit + '.png';
					//Append new image
					$('#imgInfo').slideUp('fast', function(){
						$('#imgInfo').prop("src", newImageSrc).slideDown('fast');
					});
					$('#infoPoint'+codesplit+'1').slideDown();
				}
			}
			//If currently on Anne
			if(window.personIndex == 'anne'){
				//Hide all infopoints
				$('.whereInfoPoints').hide();
				
				//If any of the regions are clicked
				if(codesplit == 'NT' || codesplit == 'NB' || codesplit == 'NL' || codesplit == 'YT' ||
					codesplit == 'PE'|| codesplit == 'NS' || codesplit == 'NV'||
					codesplit == 'SK' || codesplit == 'MB' || codesplit == 'NU')
				{
					//Prevent default action
					event.preventDefault();
				}
				else{
					//Apply the new image to the variable
					var newImageSrc = imageSrc + 'infoDivImg' + codesplit + '.png';
					//Append new image
					$('#imgInfo').slideUp('fast', function(){
						$('#imgInfo').prop("src", newImageSrc).slideDown('fast');
					});
					$('#infoPoint'+codesplit+'1,#infoPoint'+codesplit+'2,#infoPoint'+codesplit+'3').slideDown();
				}
			}
		});
		
		/*---
			MARKER CLICK
		---*/
		$('#content').off('markerClick.jvectormap','#whereMapDiv').on('markerClick.jvectormap','#whereMapDiv', function(event, index){
			//Hide all infopoints
			$('.whereInfoPoints').hide();
			
			var imageSrc = $('#imgInfo').prop("src").split('infoDivImg')[0]; //get image source (EG: img/margaret/...)
			
			//If the image is not already shown, show new image
			if(index + '_' +window.personIndex + '.png' != $('#imgInfo').prop("src").split('infoDivImg')[1]) 
			{
				//Apply the new image to the variable
				var newImageSrc = imageSrc + 'infoDivImg' + index + '_' +window.personIndex + '.png';
				$('#imgInfo').slideUp('fast', function(){
						$('#imgInfo').prop("src", newImageSrc).slideDown('fast');
					});
				//Below for showing infomation points.
				$('#infoPoint'+index + '_' +window.personIndex + '_1, #infoPoint'+index + '_' +window.personIndex + '_2, #infoPoint'+index + '_' +window.personIndex + '_3, #infoPoint'+index + '_' +window.personIndex + '_4').slideDown();
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
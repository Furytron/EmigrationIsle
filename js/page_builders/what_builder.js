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
		var mainContentDivs = '<div id="luggageDiv" class="ui-widget-content ui-state-default"></div>';
			mainContentDivs += '<div id="luggageClasp"></div>';
			mainContentDivs += '<div id="textboxDiv"></div>';
			mainContentDivs += '<div id="whatTitleDiv"></div>';
			mainContentDivs += '<div id="itemContainerDiv1"></div>';
			mainContentDivs += '<div id="itemContainerDiv2"></div>';
			//mainContentDivs += '<div id="itemContainerDiv3"></div>';
			
		//Append mainDiv to the content div
		$('#content').append(mainContentDivs);
		
		//Clear Background image
		$('#content').css('background-image', 'none');		
		
		//Put luggage image into the luggageDiv background
		$('#luggageDiv').css({'background-image': 'url(' + data.person.whatPage.whatBg.imgURI + ')', 'background-size': '' + data.person.whatPage.whatBg.imgWidth + ' ' + data.person.whatPage.whatBg.imgHeight});
		
		//Using classes to change the ul within the suitcase itself. class > ul
		$('#luggageDiv').addClass(data.person.whatPage.whatLuggageClass);
		
		
		var htmlItemCon1 = "";
		var htmlItemCon2 = "";
		var htmlItemCon3 = "";
		
		/*---
			PAGE IDENTIFIER DIV
		---*/
		var htmlPageID = '<img class="'+data.person.whatPage.whatTitleDiv.imgClass+'" src="'+data.person.whatPage.whatTitleDiv.imgURI+'" alt="'+data.person.whatPage.whatTitleDiv.imgAlt+'" title="'+data.person.whatPage.whatTitleDiv.imgTitle+'"/>';
		$('#whatTitleDiv').append(htmlPageID);
		
		/*---
			LUGGAGE CLASP DIV
		---*/
		var htmlPageID = '<img id="'+data.person.whatPage.whatluggageClasp.imgID+'" src="'+data.person.whatPage.whatluggageClasp.imgURI+'" alt="'+data.person.whatPage.whatluggageClasp.imgAlt+'" title="'+data.person.whatPage.whatluggageClasp.imgTitle+'"/>';
		$('#luggageClasp').append(htmlPageID);

		/*---
			TEXT BOX DIV
		---*/
		$('#textboxDiv').css({'background-image': 'url(' + data.person.whatPage.whatTextbox.imgURI + ')'});
		var htmlTextbox = "";
		
		$.each(data.person.whatPage.whatTextboxInfo,function(tbIndex, tb){
			htmlTextbox += '<div id="'+tb.divID+'" class="'+tb.divClass+'">';
			htmlTextbox += '<h3>'+tb.headingText+'</h3>';
			htmlTextbox += '<p>'+tb.text+'</p>';
			htmlTextbox += '</div>';
		});
		$('#textboxDiv').append(htmlTextbox);
		//Show the splash text. (Pack the suitcase)
		$('#textboxDiv div:first-child').show();
		
		/*---
			ITEM CONTAINER DIV 1
		---*/
		htmlItemCon1 += '<ul id="items1" class="items ui-helper-reset ui-helper-clearfix">';
		$.each(data.person.whatPage.itemContainerDiv1,function(itmIndex, itm){
			htmlItemCon1 += '<li id="'+itm.imgLiID+'" class="'+itm.imgLiClass+'"><img class="'+itm.imgClass+'" src="'+itm.imgURI+'" alt="'+itm.imgAlt+'" title="'+itm.imgTitle+'"/></li>';                         
		});
		htmlItemCon1 += '</ul>';                 
		$('#itemContainerDiv1').append(htmlItemCon1);
		
		/*---
			ITEM CONTAINER DIV 2
		---*/
		htmlItemCon2 += '<ul id="items2" class="items ui-helper-reset ui-helper-clearfix">';
		$.each(data.person.whatPage.itemContainerDiv2,function(itmIndex, itm){
			htmlItemCon2 += '<li id="'+itm.imgLiID+'" class="'+itm.imgLiClass+'"><img class="'+itm.imgClass+'" src="'+itm.imgURI+'" alt="'+itm.imgAlt+'" title="'+itm.imgTitle+'"/></li>';                         
		});
		htmlItemCon2 += '</ul>';                 
		$('#itemContainerDiv2').append(htmlItemCon2);
		
		/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		
		//Create variables items for dragging and dropping
		var $luggage = $('#luggageDiv');
		var $draggables = $('.draggableItems');
		var margaretPacked = 0,stevePacked = 0,josephPacked = 0,annePacked = 0;
		
		/*---
			MAKE ITEMS DRAGGABLE
		---*/
		//#items1, #items2, .draggableItems, 
		//On entering the image, make this item draggable
		$('#content').off('mouseenter', '.draggableItems').on('mouseenter', '.draggableItems', function() {
		  var $this = $(this); //Store value in $this
		  if(!$this.is(':data(draggable)')) { //If the object is not draggable set it to draggable
			$this.draggable({
				cancel: ".notDraggable",  // clicking an icon won't initiate dragging
				revert: "invalid", // when not dropped, the item will revert back to its initial position
				containment: "#content", //This containment should be the div surrounding the entire drag and drop thing
				helper: "original", //Clone the image, look into this.
				cursor: "move", //Move original image
				stack: "li" //Stack the li list
			});
		  }
		});
		
		/*---
			MAKE LUGGAGE DROPPABLE
		---*/
		$('#content').off('mouseenter', '#luggageDiv').on('mouseenter', '#luggageDiv' , function() {
			var $this = $(this);
			if(!$this.is(':data(droppable)')) {
				$this.droppable({
					accept: function(d){ 
					if(d.hasClass("draggableItems")){ 
						return true;}
					},
					activeClass: "ui-state-highlight",
					drop: function( event, ui )	{
						luggageIn( ui.draggable );
					}
				});
			}
		});	
		
		/*---
			luggageIn function - Called when an item is dropped into the droppable area.
		---*/
		function luggageIn( $item ) {
			//Change image to another image and animate into the luggages
			//find attr of src and change so that it adds small to the end
			//then animate
			
			//If statements are to check the person the user is on, and +1 per packed item.
			if(window.personIndex == 'margaret'){margaretPacked++;}
			if(window.personIndex == 'steve'){stevePacked++;}
			if(window.personIndex == 'joseph'){josephPacked++;}
			if(window.personIndex == 'anne'){annePacked++;}
			
			//Fade out big image, change images, and fade in the new small/packed image into the list within the luggage.
			$item.fadeOut(function() {
				var $list = $( "ul", $luggage ).length ? //if it exists, append to luggage, if not create new ul list.
					$( "ul", $luggage ) :
					$( "<ul class='ui-helper-reset'/>" ).appendTo( $luggage );
				
				//Set the smaller image as source
				var src = $item.find("img").attr("src").replace(".png", "_small.png");
			
				//Show the text associated with the image
				var tmp = $(this).prop('id').split('ID')[1];
				$('.what_textBox_class').hide(); //Hide all text
				$('#textbox_ID'+tmp).show(); //Show this text
				
				//If full pack the case
				if(margaretPacked == 10 || stevePacked == 6 || josephPacked == 8 || annePacked == 6){
					//Show the luggage clasp
					$('div#luggageClasp').show();
					
					//Create a fade effect, animate the opacity in, and then out and callback this function to repeat.
					var luggageClasp_fade = $('div#luggageClasp');
					function fadingClasp() {
						luggageClasp_fade.animate({opacity:'+=1'}, 1000);
						luggageClasp_fade.animate({opacity:'-=0.9'}, 1000, fadingClasp);
					}
					fadingClasp();
					
					//Set a timeout to tell the user to close the case
					setTimeout(function(){
						$('.what_textBox_class').hide();
						var newtmp = tmp.split('_')[0]; 
						$('#textbox_ID'+newtmp+'_End').show();
					},4000);
				}
				/*
					1.Change the image source to the small/packed item.
					2.Change CSS so the item, is packed properly and its previous values are wiped
					3.End the current manipulation of the img within the li tag
					4.Append the li to the $list in the suitcase
					5.Fade in the image.
				*/
				$item
					.find("img").attr("src", src)
					.css({ 'width': '50px', 'height': '50px', 'left' : '0', 'top' : '0' })
					.end()
					.appendTo( $list )
					.fadeIn();
				//Make the item undraggable, and add class packed.
				$list.find("li").removeClass("draggableItems ui-draggable").addClass('notDraggable packed');
				//li of class packed, but not the last li within the luggage div, is to have these classes removed.
				$('li.packed:not(#luggageDiv ul li:last-child)').removeClass('highlighted non_highlighted_other_items');
			});
		}
		
		/*---
			notDraggable click event handlerss
		---*/
		//Clicking on the non dragggable items shows the text for the in the side text box.
		$('#content').off('click', '.notDraggable').on('click', '.notDraggable', function(){
				
				/* 
					1. if the .notDraggable class is clicked
					2. Set the CSS of the last child in the suitcase to normal
					3. If the current item is clicked, and has class packed
					4. Add 'highlighted' class to this 'packed' item, then all next items of packed add the class non-highlighted, it sets border
					5. Set the text box on the side.
				*/
				$('#luggageDiv ul li:last-child img').css({
					'border': '0px hidden #DDCD87'
				});
				$('#luggageDiv ul li:last-child').css({
					'margin': '15px 0 0 5px'
				});
				
				// 2. Remove all the highlighted boxes
				$('li.packed').removeClass('highlighted non_highlighted_other_items');
				
				// 3. 
				if($(this).hasClass('packed')){
					// 4.
					//If this is the 5th li child, then highlight, but dont add the other class
					if($(this).is('#luggageDiv ul li:nth-child(5)')){
						$(this).addClass('highlighted');
					}
					else{
						//Add highlighted class to this packed element.
						$(this).addClass('highlighted').next('li.packed').addClass('non_highlighted_other_items'); 
					}
				}
				
				// 5.
				var tmp = $(this).prop('id').split('ID')[1];
				$('.what_textBox_class').hide();
				$('#textbox_ID'+tmp).show();
		});
		
		//Trigger mouseovers on all elements, to initialise the items as draggables.
		setTimeout(function(){$('.draggableItems, #luggageDiv ').trigger('mouseenter');},200);
		
		/*
			CLOSING SUITCASE - CLASPS
		*/
		//Close the suitcase with a click on the clasps.
		$('#content').off('click','#luggageClasp').on('click', '#luggageClasp', function(){
			//If all the items are packed for the repective person then close the case.
			if(margaretPacked == 10 || stevePacked == 6 || josephPacked == 8 || annePacked == 6)
			{	
				//Close suitcase, might need to increase z-index.
				var tmpSrc = $('#luggageDiv').css('background-image').replace('.png', '_closed.png');
				$('#luggageClasp').empty();
				$('#luggageDiv').empty().css({
					'background-image':tmpSrc,
					'z-index' : '100'
				});
			}
		});
		
		//Hide the loading div
		$('.loading').hide();
		//Show the content div
		$('#content').css({'display':'block'});

		//Return false to stop a tag default action.
		return false;
	});
})();
(function() {
	
	jsonurl = "data/" + window.personIndex + ".json";
	
	jQuery.getJSON(jsonurl, function(data, textStatus){
				
		if(window.console){console.log('JSON has loaded: ' + textStatus);}
		
		//Empty the current content Div
		jQuery('#content').empty();

		//Load in the other divs specific to the who page
		var mainContentDivs =  '<div id="whenDivTopLeft"></div>';
			mainContentDivs += '<div id="whenDivTopCenter"></div>';
			mainContentDivs += '<div id="whenDivTopRight"></div>';
			mainContentDivs += '<div id="whenDivBottomLeft"></div>';
			mainContentDivs += '<div id="whenDivBottomCenter"></div>';
			mainContentDivs += '<div id="whenDivBottomRight"></div>';
			
		//Append mainDiv to the content div
		jQuery('#content').append(mainContentDivs);
		
		//Clear Background image
		jQuery('#content').css('background-image', 'none');
		
		//Set background of the #content div
		jQuery('#content').css({'background-image': 'url(' + data.person.whenPage.whenBgURI + ')', 'background-size':'960px 490px;'});
		
		/*
		-----WHEN TITLE
		*/
		var htmlImgTitle = '<img id="'+data.person.whenPage.whenTitleImg.imgID+'" class="'+data.person.whenPage.whenTitleImg.imgClass+'" src="'+data.person.whenPage.whenTitleImg.imgURI+'" alt="'+data.person.whenPage.whenTitleImg.imgAlt+'" title="'+data.person.whenPage.whenTitleImg.imgTitle+'"/>';
		jQuery('#content').append(htmlImgTitle);
		
		/*
		-----TOP_LEFT_DIV
		*/
		var htmlTLD = '<div id="whenDivTopLeftGallery" class="slideshow">';
		jQuery.each(data.person.whenPage.whenDivTopLeft,function(galleryIndex, gallery){
			htmlTLD += '<div class="view view-first">'
			htmlTLD += '<img class="'+gallery.imgClass+'" src="'+gallery.imgURI+'" alt="'+gallery.imgAlt+'" title="'+gallery.imgTitle+'"/>';
			htmlTLD += '<div class="mask">';
			htmlTLD += '<p>'+gallery.overlayText+'</p>';
			htmlTLD +='</div>';
			htmlTLD +='</div>';	
		});
		htmlTLD += '</div>'
		jQuery('#whenDivTopLeft').append(htmlTLD);
		
		//Previous and Next buttons for the first Img Div, top left.
		var whenImgButtons =  '<div id="whenDivTLButtonPrev"><img class="'+data.person.whenPage.whenImgNext.imgClass+' " src = "'+data.person.whenPage.whenImgNext.imgURI+'" alt="'+data.person.whenPage.whenImgNext.imgAlt+'" title="'+data.person.whenPage.whenImgNext.imgTitle+'" /></div>'; 
			whenImgButtons += '<div id=" "><img class="'+data.person.whenPage.whenImgPrev.imgClass+' " src = "'+data.person.whenPage.whenImgPrev.imgURI+'" alt="'+data.person.whenPage.whenImgPrev.imgAlt+'" title="'+data.person.whenPage.whenImgPrev.imgTitle+'" /></div>';
		jQuery('#whenDivTopLeft').append(whenImgButtons);
		
		//Top-Left heading
		var htmlTLDHeading = '<h2 id="'+data.person.whenPage.whenDivTopLeftText.headingID+'">'+data.person.whenPage.whenDivTopLeftText.heading+'</h2>';
		jQuery('#whenDivTopLeft').append(htmlTLDHeading);
		
		//Top-Left text
		var htmlTLDText = '<p id="'+data.person.whenPage.whenDivTopLeftText.textID+'" >'+data.person.whenPage.whenDivTopLeftText.text+'</p>';
		jQuery('#whenDivTopLeft').append(htmlTLDText);
		
		//Top-Left text
		var htmlTLDAudioTextButton = '<p id="'+data.person.whenPage.whenDivTopLeftText.audioTextButtonID+'" >'+data.person.whenPage.whenDivTopLeftText.audioTextButton+'</p>';
		jQuery('#whenDivTopLeft').append(htmlTLDAudioTextButton);
		
		//Top-Left Audio button and source
		var htmlWhenAudio1 =  '<audio id="'+data.person.whenPage.whenTopLeftAudio.audioID+'">'
		htmlWhenAudio1 +=  '<source src="'+data.person.whenPage.whenTopLeftAudio.audioSourceOgg+'" type="audio/ogg"/>'
		htmlWhenAudio1 +=  '<source src="'+data.person.whenPage.whenTopLeftAudio.audioSourceMp3+'" type="audio/mpeg"/>'
		htmlWhenAudio1 +=  'Your browser does not support HTML5 Audio'
		htmlWhenAudio1 +=  '</audio>'					
		jQuery('#whenDivTopLeft').append(htmlWhenAudio1);
		
		//Init cycle plugin.
		jQuery('#whenDivTopLeftGallery').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTLButtonNext',
			prev : '#whenDivTLButtonPrev'
		});
		
		/*
		-----TOP_CENTER_DIV
		*/
		
		//Top-Center images
		var htmlTCD = "";
		jQuery.each(data.person.whenPage.whenDivTopCenter,function(galleryIndex, gallery){
			htmlTCD += '<img id="'+gallery.imgID+'"class="'+gallery.imgClass+'" src="'+gallery.imgURI+'" alt="'+gallery.imgAlt+'" title="'+gallery.imgTitle+'"/>';                         
		});
		jQuery('#whenDivTopCenter').append(htmlTCD);
		
		//Top-Center Audio button and source
		var htmlWhenAudio2 = '<img id="'+data.person.whenPage.whenAudioTopCenter.imgID+'" class="'+data.person.whenPage.whenAudioTopCenter.imgClass+'" src="'+data.person.whenPage.whenAudioTopCenter.imgURI+'" alt="'+data.person.whenPage.whenAudioTopCenter.imgAlt+'" title="'+data.person.whenPage.whenAudioTopCenter.imgTitle+'"/>';                         
		htmlWhenAudio2 +=  '<audio id="'+data.person.whenPage.whenAudioTopCenter.audioID+'">'
		htmlWhenAudio2 +=  '<source src="'+data.person.whenPage.whenAudioTopCenter.audioSourceOgg+'" type="audio/ogg"/>'
		htmlWhenAudio2 +=  '<source src="'+data.person.whenPage.whenAudioTopCenter.audioSourceMp3+'"  type="audio/mpeg" />'
		htmlWhenAudio2 +=  'Your browser does not support HTML5 Audio'
		htmlWhenAudio2 +=  '</audio>'					
		jQuery('#whenDivTopCenter').append(htmlWhenAudio2);
	
		//Top-Center heading
		var htmlTCDHeading = '<h2 id="'+data.person.whenPage.whenDivTopCenterText.headingID+'">'+data.person.whenPage.whenDivTopCenterText.heading+'</h2>';
		jQuery('#whenDivTopCenter').append(htmlTCDHeading);
		
		//Top-Center text
		var htmlTCDText = '<p id="'+data.person.whenPage.whenDivTopCenterText.textID+'" >'+data.person.whenPage.whenDivTopCenterText.text+'</p>';
		jQuery('#whenDivTopCenter').append(htmlTCDText);
		
		/*
		-----TOP_RIGHT_DIV
		*/
		var htmlTRD = '<div id="whenDivTopRightGallery" class="slideshow">';
		jQuery.each(data.person.whenPage.whenDivTopRight,function(galleryIndex, gallery){
			htmlTRD += '<div class="view view-first">'
			htmlTRD += '<img class="'+gallery.imgClass+'" src="'+gallery.imgURI+'" alt="'+gallery.imgAlt+'" title="'+gallery.imgTitle+'"/>';
			htmlTRD += '<div class="mask1">';
			htmlTRD += '<p>'+gallery.overlayText+'</p>';
			htmlTRD +='</div>';
			htmlTRD +='</div>';	                      
		});  
		jQuery('#whenDivTopRight').append(htmlTRD);
		
		//Previous and Next buttons for Img Div, top right.
		var whenImgButtons2 =  '<div id="whenDivTRButtonPrev"><img class="'+data.person.whenPage.whenImgNext.imgClass+' " src = "'+data.person.whenPage.whenImgNext.imgURI+'" alt="'+data.person.whenPage.whenImgNext.imgAlt+'" title="'+data.person.whenPage.whenImgNext.imgTitle+'" /></div>'; 
			whenImgButtons2 += '<div id="whenDivTRButtonNext"><img class="'+data.person.whenPage.whenImgPrev.imgClass+' " src = "'+data.person.whenPage.whenImgPrev.imgURI+'" alt="'+data.person.whenPage.whenImgPrev.imgAlt+'" title="'+data.person.whenPage.whenImgPrev.imgTitle+'" /></div>';
		jQuery('#whenDivTopRight').append(whenImgButtons2);
		
		//Top-Center text
		var htmlTRDText = '<p id="'+data.person.whenPage.whenDivTopRightText.textID+'" >'+data.person.whenPage.whenDivTopRightText.text+'</p>';
		jQuery('#whenDivTopRight').append(htmlTRDText);
		
		jQuery('#whenDivTopRightGallery').cycle({
			fx:     'fade', 
			speed:  'fast',
			timeout: 0,
			next:   '#whenDivTRButtonNext',
			prev : '#whenDivTRButtonPrev'
		});
		
		/*
		-----BOTTOM_LEFT_DIV
		*/
		var htmlBLD = '<div id="'+data.person.whenPage.whenDivBottomLeft.imgID+'"class="fade">'
			htmlBLD += '<img class="'+data.person.whenPage.whenDivBottomLeft.imgClass+'" src="'+data.person.whenPage.whenDivBottomLeft.imgURI+'" alt="'+data.person.whenPage.whenDivBottomLeft.imgAlt+'" title="'+data.person.whenPage.whenDivBottomLeft.imgTitle+'"/>';
			htmlBLD += '<div>';
			htmlBLD += '<img class="'+data.person.whenPage.whenDivBottomLeft.imgClassOver+'" src="'+data.person.whenPage.whenDivBottomLeft.imgURIOver+'" alt="'+data.person.whenPage.whenDivBottomLeft.imgAltOver+'" title="'+data.person.whenPage.whenDivBottomLeft.imgTitleOver+'"/>';
			htmlBLD += '</div>';
			htmlBLD += '</div>';
		jQuery('#whenDivBottomLeft').append(htmlBLD);
		
		/*
		jQuery('#' + data.person.whenPage.whenDivBottomLeft.imgID).css({
			'width': data.person.whenPage.whenDivBottomLeft.imgWidth,
			'height': data.person.whenPage.whenDivBottomLeft.imHeight,
			'position': data.person.whenPage.whenDivBottomLeft.imgPosition,
			'top':data.person.whenPage.whenDivBottomLeft.imgTop,
			'left':data.person.whenPage.whenDivBottomLeft.imgLeft,
			'right':data.person.whenPage.whenDivBottomLeft.imgRight,
			'bottom':data.person.whenPage.whenDivBottomLeft.imgBottom
		});
		*/
		
		var htmlBLDText = '<p id="'+data.person.whenPage.whenDivBottomLeft.textID+'" >'+data.person.whenPage.whenDivBottomLeft.text+'</p>';
		jQuery('#whenDivBottomLeft').append(htmlBLDText);

		/*
		//This stores the data of the image
		jQuery('img').load(function() {
			var $this = jQuery(this);
			$this.data({
				'orig-width': $this.width(),
				'orig-height': $this.height(),
				'orig-top': $this.position().top
			});
		});

		//When the image is hovered the image is enlarged and then reduced to original size when mouseout event occurs
		jQuery('#content').on("hover", '.resizeImage', function(e) {
			var $this = jQuery(this);
			if (e.type == "mouseenter") {
				$this.stop().animate({
					top: $this.data('orig-top') - 20,
					width: $this.data('orig-width') * 1.2,
					height: $this.data('orig-height') * 1.2
				}, 200);
			} else if (e.type == "mouseleave") {
				$this.stop().animate({
					top: $this.data('orig-top'),
					width: $this.data('orig-width'),
					height: $this.data('orig-height')
				}, 200);
			}
		});*/

		/*
		-----BOTTOM_CENTER_DIV
		*/
		var htmlBCD = '<a href="'+data.person.whenPage.whenDivBottomCenter.imgURIBigImage+'" class="'+data.person.whenPage.whenDivBottomCenter.imgClassBigImage+'" title="'+data.person.whenPage.whenDivBottomCenter.imgTitleBigImage+'">'
			htmlBCD += '<img id="'+data.person.whenPage.whenDivBottomCenter.imgID+'" class="'+data.person.whenPage.whenDivBottomCenter.imgClass+'" src="'+data.person.whenPage.whenDivBottomCenter.imgURI+'" alt="'+data.person.whenPage.whenDivBottomCenter.imgAlt+'" title="'+data.person.whenPage.whenDivBottomCenter.imgTitle+'"/>';
			htmlBCD += '</a>';
		jQuery('#whenDivBottomCenter').append(htmlBCD);
		
		//Bottom-Center heading
		var htmlBCDHeading = '<h2 id="'+data.person.whenPage.whenDivBottomCenterText.headingID+'">'+data.person.whenPage.whenDivBottomCenterText.heading+'</h2>';
		jQuery('#whenDivBottomCenter').append(htmlBCDHeading);
		
		//Bottom-Center text
		var htmlBCDText = '<p id="'+data.person.whenPage.whenDivBottomCenterText.textID+'" >'+data.person.whenPage.whenDivBottomCenterText.text+'</p>';
		jQuery('#whenDivBottomCenter').append(htmlBCDText);
		
		/*
		-----BOTTOM_RIGHT_DIV
		*/
		//MAP DIV
		var htmlBRD = '<img id="'+data.person.whenPage.whenDivBottomRight.imgID+'" class="'+data.person.whenPage.whenDivBottomRight.imgClass+'" src="'+data.person.whenPage.whenDivBottomRight.imgURI+'" alt="'+data.person.whenPage.whenDivBottomRight.imgAlt+'" title="'+data.person.whenPage.whenDivBottomRight.imgTitle+'"/>';
		jQuery('#whenDivBottomRight').append(htmlBRD);
		
		//Bottom-Right heading
		var htmlBRDHeading = '<h2 id="'+data.person.whenPage.whenDivBottomRightText.headingID+'">'+data.person.whenPage.whenDivBottomRightText.heading+'</h2>';
		jQuery('#whenDivBottomRight').append(htmlBRDHeading);
		
		//Bottom-Right text
		var htmlBRDText = '<p id="'+data.person.whenPage.whenDivBottomRightText.textID+'" >'+data.person.whenPage.whenDivBottomRightText.text+'</p>';
		jQuery('#whenDivBottomRight').append(htmlBRDText);
		
			/**
		-----------------------------------------------------------
							RE-INITIALIZE jQUERY
		-----------------------------------------------------------
		**/
		//ZOOM IMAGE method
		var options = {
			zoomType:'innerzoom',
			zoomWidth:125,
			zoomHeight:100,
			xOffset:10,
			yOffset:0,
			position:'right',
			preloadImages:true,
			preloadText:'Loading zoom',
			title:true,
			lens:false,
			imageOpacity:0.9,
			showEffect:'fadein',
			hideEffect:'fadeout',
			fadeinSpeed:'fast',
			fadeoutSpeed:'slow',
			alwaysOn : false
		}
		jQuery('.zoomImage').jqzoom(options);
		
		//var audioIndex1 = true; ADD 
		jQuery("#content").on("mouseover",".whenAudioButton", function(){
			jQuery(this).css( 'cursor', 'pointer' );
		});
		jQuery("#content").on('mouseout','.whenAudioButton',function() {
			jQuery(this).css('cursor', 'auto');
		});
		
		
		
		//To play audio on when page. For 
		jQuery("#content").on("click",".whenAudioButton", function(){
				var audID = jQuery('#whenDivTopCenter').find('audio').prop('id')
				jQuery('#' + audID ).get(0).play();
				var src = jQuery('#whenDivTopCenter').find('#imgDivTC3').prop('src').replace("over.png", "click.png");
				jQuery('#imgDivTC3').prop("src", src);
				jQuery('#imgDivTC3').removeClass('hover');
		});
		
		//This code plays and stops the audio. It also changes the text on the button.
		var playing = false;
		jQuery('#content').on('click','#audioTextButtonTL1', function() {
			var audID = jQuery('#whenDivTopLeft').find('audio').prop('id')
			if (playing == false) {
				jQuery('#' + audID).get(0).play();
				playing = true;
				$(this).text("Stop sound");
			} else {
				jQuery('#' + audID).get(0).pause();
				playing = false;
				$(this).text("Click to play");
			}
		});
		
		
		//Fade-in image transition effect - For Bottom Left div image
		jQuery('#content').on("hover", 'div.fade', function(e) {
			if (e.type == "mouseenter") {
				var fade = jQuery('> div', this);
				// if the element is currently being animated (to a fadeOut)...
				if (fade.is(':animated')) {
				  // ...take it's current opacity back up to 1
				  fade.stop().fadeTo(250, 1);
				} 
				else {
				  // fade in quickly
				  fade.fadeIn(250);
				}
			} 
			else if (e.type == "mouseleave") {
				// on hovering out, fade the element out
				var fade = jQuery('> div', this);
				if (fade.is(':animated')) {
				  fade.stop().fadeTo(2000, 0);
				} else {
				  // fade away slowly
				  fade.fadeOut(2000);
				}
			}
		});
		
		jQuery(".tooltip").tipTip({
			delay: 100
		});
		return false;
	});
})();
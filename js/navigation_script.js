//Define Global variables
window.pageIndex = undefined; //Variable to hold page index
window.personIndex = undefined; //Variable to hold person index
window.intervalID = undefined; //For intervals on how page
window.overlayBool = false;
$(window).load(function(){

	/**
	-----------------------------------------------------------
					PRELOADING IMAGES
	-----------------------------------------------------------
	**/
	var imgList = [];
	var i = 0;
	$.extend({
		preload: function(imgArr, option) {
			var setting = $.extend({
				init: function(loaded, total) {},
				loaded: function(img, loaded, total) {},
				loaded_all: function(loaded, total) {}
			}, option);
			var total = imgArr.length;
			var loaded = 0;
			
			setting.init(0, total);
			for (i = 0; i < imgArr.length; i++) {
				imgList.push($("<img />").load(function() {
					loaded++; setting.loaded(this, loaded, total);
					if(loaded == total) {
						setting.loaded_all(loaded, total); 
					} 
				}).attr("src", imgArr[i]));
				//console.log(imgArr[i]) 
			}
		}
	});
	//IMAGE ARRAY
    $.preload([
	
		//Home_Page
		'../img/home_page/homepage_emigrants/margaret_icon.png',
		'../img/home_page/homepage_emigrants/joseph_icon.png',
		'../img/home_page/homepage_emigrants/steve_icon.png',
		'../img/home_page/homepage_emigrants/anne_icon.png',
		'../img/home_page/homepage_emigrants/margaret_icon_over.png',
		'../img/home_page/homepage_emigrants/joseph_icon_over.png',
		'../img/home_page/homepage_emigrants/steve_icon_over.png',
		'../img/home_page/homepage_emigrants/anne_icon_over.png',
		
		'../img/home_page/logo.png',
		'../img/home_page/homepage_logos/main_logo.png',
		'../img/home_page/homepage_logos/margaret_logo.png',
		'../img/home_page/homepage_logos/joseph_logo.png',
		'../img/home_page/homepage_logos/steve_logo.png',
		'../img/home_page/homepage_logos/anne_logo.png',
		
		'../img/home_page/homepage_timeline/home_timeline.png',
		'../img/home_page/social_media/social_icon_wordpress.png',
		'../img/home_page/social_media/social_icon_site.png',
		'../img/home_page/social_media/social_icon_facebook.png',
		'../img/home_page/social_media/social_icon_twitter.png',
		'../img/home_page/social_media/social_icon_wordpress_over.png',
		'../img/home_page/social_media/social_icon_site_over.png',
		'../img/home_page/social_media/social_icon_facebook_over.png',
		'../img/home_page/social_media/social_icon_twitter_over.png',
		
		//Navigation_top
		'../img/nav_img/Top_nav/how.png',
		'../img/nav_img/Top_nav/why.png',	
		'../img/nav_img/Top_nav/who.png',	
		'../img/nav_img/Top_nav/where.png',
		'../img/nav_img/Top_nav/when.png',
		'../img/nav_img/Top_nav/what.png',

		'../img/nav_img/Top_nav/howover.png',
		'../img/nav_img/Top_nav/whyover.png',	
		'../img/nav_img/Top_nav/whoover.png',	
		'../img/nav_img/Top_nav/whereover.png',
		'../img/nav_img/Top_nav/whenover.png',
		'../img/nav_img/Top_nav/whatover.png',

		//Navigation_side
		'../img/nav_img/Side_nav/margaret_icon.png',
		'../img/nav_img/Side_nav/margaret_iconover.png',
		'../img/nav_img/Side_nav/joseph_icon.png',
		'../img/nav_img/Side_nav/joseph_iconover.png',
		'../img/nav_img/Side_nav/steve_icon.png',
		'../img/nav_img/Side_nav/steve_iconover.png',
		'../img/nav_img/Side_nav/anne_icon.png',
		'../img/nav_img/Side_nav/anne_iconover.png',
		'../img/nav_img/Side_nav/sidebar.png',
		/*
			GENERAL
		*/
		'../img/general/info_point.png',
		
		//Who
		'../img/who_page/general/born_icon.png',
		'../img/who_page/general/house_icon.png',
		//When
		'../img/when_page/when-pin.png',
		'../img/when_page/tile_bg.png',
		'../img/when_page/nextbuttonover.png',
		'../img/when_page/nextbutton.png',
		'../img/when_page/backbutton.png',
		'../img/when_page/backbuttonover.png',
		//What
		'../img/what_page/what_description.png',
		//How
		'../img/how_page/InfoBar/infobar_bg.png',
		'../img/how_page/InfoBar/Buttons/infoBar_clicked.png',
		'../img/how_page/InfoBar/Buttons/infoBar_button.png',
		//Why
		'../img/why_page/minor_reasons_panel.png',
		'../img/why_page/minor_reasons_arrow/backbutton.png',
		'../img/why_page/minor_reasons_arrow/backbuttonover.png',
		'../img/why_page/minor_reasons_arrow/nextbutton.png',
		'../img/why_page/minor_reasons_arrow/nextbuttonover.png',

		/*
			MARGARET
		*/
		
		//Margaret_who
		'../img/who_page/margaret/bg.png',
		
		'../img/who_page/margaret/icons/convict_icon.png',
		'../img/who_page/margaret/icons/family_icon.png',
		'../img/who_page/margaret/icons/ireland_icon.png',
		'../img/who_page/margaret/icons/maid_icon.png',

		'../img/who_page/margaret/ruler_buttons/rulerButton.png',
		'../img/who_page/margaret/ruler_buttons/rulerButtonover.png',
		'../img/who_page/margaret/ruler_buttons/rulerButtonclick1.png',
		'../img/who_page/margaret/ruler_buttons/rulerButtonclick2.png',
		'../img/who_page/margaret/ruler_buttons/rulerButtonclick3.png',
		'../img/who_page/margaret/ruler_buttons/rulerButtonclick4.png',
		
		'../img/who_page/margaret/fadeIns/magaretFadeIn.png',
		'../img/who_page/margaret/fadeIns/magaretFadeInOver.png',
		
		//Margaret_when
		'../img/when_page/margaret/thomas_croke/crokepark.jpg',
		'../img/when_page/margaret/thomas_croke/thomascroke.jpg',
		
		'../img/when_page/margaret/train/steam.png',
		'../img/when_page/margaret/train/steamover.png',
		'../img/when_page/margaret/train/steamclick.png',
		'../img/when_page/margaret/train/steam_train.png',
		'../img/when_page/margaret/train/steam_whistle.png',
		
		'../img/when_page/margaret/bethoven/bethoven1.png',
		'../img/when_page/margaret/bethoven/bethoven2.png',
		'../img/when_page/margaret/bethoven/bethoven3.png',
		
		'../img/when_page/margaret/australia_map/australia.png',
		'../img/when_page/margaret/australia_map/australiaover.png',
		
		'../img/when_page/margaret/washing_machine.png',
		'../img/when_page/margaret/when_currach.png',
		'../img/when_page/margaret/when_currachover.png',
		
		//Margaret_what
		'../img/what_page/margaret/suitcase.png',
		'../img/what_page/margaret/suitcase_closed.png',
		
		'../img/what_page/margaret/margaret_what_prohibited_potatoes.png',
		'../img/what_page/margaret/margaret_what_prohibited_pots.png',
		'../img/what_page/margaret/margaret_what_jacket.png',
		'../img/what_page/margaret/margaret_what_soap.png',
		'../img/what_page/margaret/margaret_what_apron.png',
		'../img/what_page/margaret/margaret_what_petticoat.png',
		'../img/what_page/margaret/margaret_what_boots.png',
		'../img/what_page/margaret/margaret_what_shiftdress.png',
		'../img/what_page/margaret/margaret_what_sewingKit.png',
		'../img/what_page/margaret/margaret_what_stockings.png',
		'../img/what_page/margaret/margaret_what_bonnet.png',
		'../img/what_page/margaret/margaret_what_hankerchief.png',
		'../img/what_page/margaret/margaret_what_prohibited_potatoesover.png',
		'../img/what_page/margaret/margaret_what_prohibited_potsover.png',
		'../img/what_page/margaret/margaret_what_jacket_small.png',
		'../img/what_page/margaret/margaret_what_soap_small.png',
		'../img/what_page/margaret/margaret_what_apron_small.png',
		'../img/what_page/margaret/margaret_what_petticoat_small.png',
		'../img/what_page/margaret/margaret_what_boots_small.png',
		'../img/what_page/margaret/margaret_what_shiftdress_small.png',
		'../img/what_page/margaret/margaret_what_sewingKit_small.png',
		'../img/what_page/margaret/margaret_what_stockings_small.png',
		'../img/what_page/margaret/margaret_what_bonnet_small.png',
		'../img/what_page/margaret/margaret_what_hankerchief_small.png',
		
		//Margaret_how
		'../img/how_page/margaret/bg.png',
		
		'../img/how_page/margaret/info_bar/distance.png',
		'../img/how_page/margaret/info_bar/captain.png',
		'../img/how_page/margaret/info_bar/length.png',
		'../img/how_page/margaret/info_bar/passengers.png',
		'../img/how_page/margaret/info_bar/duration.png',
		'../img/how_page/margaret/info_bar/weight.png',
		
		'../img/how_page/margaret/transport_images/how_margaret_button_image_1.png',
		'../img/how_page/margaret/transport_images/how_margaret_button_image_2.png',
		'../img/how_page/margaret/transport_images/how_margaret_button_image_3.png',
		'../img/how_page/margaret/transport_images/how_margaret_button_image_4.png',
		
		//Margaret_where
		'../img/where_page/margaret/bg.png',
		
		'../img/where_page/margaret/infoDiv/infoDivImgNSW.png',
		'../img/where_page/margaret/infoDiv/infoDivImgSA.png',
		'../img/where_page/margaret/infoDiv/infoDivImgSplash.png',
		'../img/where_page/margaret/infoDiv/infoDivImgTAS.png',
		'../img/where_page/margaret/infoDiv/infoDivImgVIC.png',
		'../img/where_page/margaret/infoDiv/infoDivImgWA.png',
		
		//Margaret_why
		'../img/why_page/margaret/why_title.png',
		
		'../img/why_page/margaret/main_reasons_margaret/reason1.png',
		'../img/why_page/margaret/main_reasons_margaret/reason2.png',
		'../img/why_page/margaret/main_reasons_margaret/reason3.png',

		'../img/why_page/margaret/minor_reasons_margaret/minor_reasons_margaret_0.png',
		'../img/why_page/margaret/minor_reasons_margaret/minor_reasons_margaret_1.png',
		'../img/why_page/margaret/minor_reasons_margaret/minor_reasons_margaret_2.png',
		'../img/why_page/margaret/minor_reasons_margaret/minor_reasons_margaret_3.png',
		/*
			STEVE
		*/
		//Steve_who
		'../img/who_page/steve/bg.png',
		
		'../img/who_page/steve/icons/alone_icon.png',
		'../img/who_page/steve/icons/job_icon.png',
		'../img/who_page/steve/icons/ireland_icon.png',
		'../img/who_page/steve/icons/mechanic_icon.png',
		
		'../img/who_page/steve/ruler_buttons/rulerButton.png',
		'../img/who_page/steve/ruler_buttons/rulerButtonover.png',
		'../img/who_page/steve/ruler_buttons/rulerButtonclick1.png',
		'../img/who_page/steve/ruler_buttons/rulerButtonclick2.png',
		'../img/who_page/steve/ruler_buttons/rulerButtonclick3.png',
		'../img/who_page/steve/ruler_buttons/rulerButtonclick4.png',
		
		'../img/who_page/steve/fadeIns/steveFadeIn.png',
		'../img/who_page/steve/fadeIns/steveFadeInOver.png',
		
		//Steve_why
		'../img/why_page/steve/why_title.png',
		
		'../img/why_page/steve/main_reasons_steve/reason1.png',
		'../img/why_page/steve/main_reasons_steve/reason2.png',
		'../img/why_page/steve/main_reasons_steve/reason3.png',
		
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_0.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_1.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_2.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_3.png',
		
		//Steve_when
		'../img/when_page/steve/whenTitle.png',
		
		'../img/when_page/steve/ghandi_video_poster.jpg',
		'../img/when_page/steve/wizard_of_oz.png',

		'../img/when_page/steve/WB_Yeats/Yeats.jpg',
		'../img/when_page/steve/WB_Yeats/Yeatsbig.jpg',
		
		'../img/when_page/steve/The_Emergency/TheEmergency1.jpg',
		'../img/when_page/steve/The_Emergency/TheEmergency2.jpg',
		'../img/when_page/steve/The_Emergency/TheEmergency3.jpg',
		/*'../img/when_page/steve/Spinning_Cogs/spin_cogs_1.png',
		'../img/when_page/steve/Spinning_Cogs/spin_cogs_2.png',
		'../img/when_page/steve/Spinning_Cogs/spin_cogs_3.png',
		'../img/when_page/steve/Spinning_Cogs/spin_cogs_4.png',*/
		
		'../img/when_page/steve/IRA_Bombings/ira1.jpg',
		'../img/when_page/steve/IRA_Bombings/ira2.jpg',
		'../img/when_page/steve/IRA_Bombings/ira3.jpg',
		
		//Steve_what
		'../img/what_page/steve/suitcase.png',
		'../img/what_page/steve/suitcase_closed.png',
		
		'../img/what_page/steve/steve_what_bottle.png',
		'../img/what_page/steve/steve_what_bottle_small.png',
		'../img/what_page/steve/steve_what_braces.png',
		'../img/what_page/steve/steve_what_braces_small.png',
		'../img/what_page/steve/steve_what_ID.png',
		'../img/what_page/steve/steve_what_ID_small.png',
		'../img/what_page/steve/steve_what_prohibited_bike.png',
		'../img/what_page/steve/steve_what_prohibited_bikeover.png',
		'../img/what_page/steve/steve_what_shirt.png',
		'../img/what_page/steve/steve_what_shirt_small.png',
		'../img/what_page/steve/steve_what_socks.png',
		'../img/what_page/steve/steve_what_socks_small.png',
		'../img/what_page/steve/steve_what_tie.png',
		'../img/what_page/steve/steve_what_tie_small.png',		
		
		//Steve_how
		'../img/how_page/steve/bg.png',
		
		'../img/how_page/steve/info_bar/distance.png',
		'../img/how_page/steve/info_bar/cost.png',
		'../img/how_page/steve/info_bar/length.png',
		'../img/how_page/steve/info_bar/passengers.png',
		'../img/how_page/steve/info_bar/duration.png',
		'../img/how_page/steve/info_bar/weight.png',
		
		'../img/how_page/steve/transport_images/how_steve_button_image_1.png',
		'../img/how_page/steve/transport_images/how_steve_button_image_2.png',
		'../img/how_page/steve/transport_images/how_steve_button_image_3.png',
		'../img/how_page/steve/transport_images/how_steve_button_image_4.png',
		
		//Steve_where
		'../img/where_page/steve/bg.png',
		
		'../img/where_page/steve/infoDiv/infoDivImgSplash_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg0_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg1_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg2_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg3_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg4_steve.png',
		'../img/where_page/steve/infoDiv/infoDivImg5_steve.png',
		
		//Steve_why
		'../img/why_page/steve/why_title.png',
		
		'../img/why_page/steve/main_reasons_steve/reason1.png',
		'../img/why_page/steve/main_reasons_steve/reason2.png',
		'../img/why_page/steve/main_reasons_steve/reason3.png',

		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_0.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_1.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_2.png',
		'../img/why_page/steve/minor_reasons_steve/minor_reasons_steve_3.png',
		
		/*
			Joseph
		*/
		//Joseph_who
		'../img/who_page/joseph/bg.png',
		
		'../img/who_page/joseph/icons/family_icon.png',
		'../img/who_page/joseph/icons/job_icon.png',
		'../img/who_page/joseph/icons/ireland_icon.png',
		'../img/who_page/joseph/icons/job_icon.png',
		'../img/who_page/joseph/icons/key_icon.png',
		
		'../img/who_page/joseph/ruler_buttons/rulerButton.png',
		'../img/who_page/joseph/ruler_buttons/rulerButtonover.png',
		'../img/who_page/joseph/ruler_buttons/rulerButtonclick1.png',
		'../img/who_page/joseph/ruler_buttons/rulerButtonclick2.png',
		'../img/who_page/joseph/ruler_buttons/rulerButtonclick3.png',
		'../img/who_page/joseph/ruler_buttons/rulerButtonclick4.png',
		
		'../img/who_page/joseph/fadeIns/josephFadeIn.png',
		'../img/who_page/joseph/fadeIns/josephFadeInOver.png',
		
		//Joseph_when
		'../img/when_page/joseph/whenTitle.png',
		
		'../img/when_page/joseph/bewleys/joseph_bewleys1.png',
		'../img/when_page/joseph/bewleys/joseph_bewleys2.png',
		'../img/when_page/joseph/bewleys/joseph_bewleys3.png',
		'../img/when_page/joseph/bewleys/joseph_bewleys4.png',
		
		'../img/when_page/joseph/coca_cola_bottle/when_cola.png',
		'../img/when_page/joseph/coca_cola_bottle/when_colaover.png',
		
		'../img/when_page/joseph/memorial_zoom/memorial_zoom.png',
		'../img/when_page/joseph/memorial_zoom/memorial_zoom_big.png',
		
		'../img/when_page/joseph/plague/plague1.png',
		'../img/when_page/joseph/plague/plague2.png',
		'../img/when_page/joseph/plague/plague3.png',
		'../img/when_page/joseph/plague/plague4.png',
		
		'../img/when_page/joseph/static_images/railroad_worker.png',
		'../img/when_page/joseph/static_images/video_poster.png',
		
		//Joseph_what
		'../img/what_page/joseph/suitcase.png',
		'../img/what_page/joseph/suitcase_closed.png',
		
		'../img/what_page/joseph/joseph_what_bible.png',
		'../img/what_page/joseph/joseph_what_bible_small.png',
		'../img/what_page/joseph/joseph_what_blanket.png',
		'../img/what_page/joseph/joseph_what_blanket_small.png',
		'../img/what_page/joseph/joseph_what_bread.png',
		'../img/what_page/joseph/joseph_what_bread_small.png',
		'../img/what_page/joseph/joseph_what_money.png',
		'../img/what_page/joseph/joseph_what_money_small.png',
		'../img/what_page/joseph/joseph_what_note.png',
		'../img/what_page/joseph/joseph_what_note_small.png',
		'../img/what_page/joseph/joseph_what_picture.png',
		'../img/what_page/joseph/joseph_what_picture_small.png',
		'../img/what_page/joseph/joseph_what_prohibited_shoes.png',
		'../img/what_page/joseph/joseph_what_prohibited_shoesover.png',
		'../img/what_page/joseph/joseph_what_rosaryBeads.png',
		'../img/what_page/joseph/joseph_what_rosaryBeads_small.png',
		'../img/what_page/joseph/joseph_what_ticket.png',
		'../img/what_page/joseph/joseph_what_ticket_small.png', //30

		//Joseph_how
		'../img/how_page/joseph/bg.png',
		
		'../img/how_page/joseph/info_bar/distance.png',
		'../img/how_page/joseph/info_bar/cost.png',
		'../img/how_page/joseph/info_bar/length.png',
		'../img/how_page/joseph/info_bar/passengers.png',
		'../img/how_page/joseph/info_bar/duration.png',
		'../img/how_page/joseph/info_bar/weight.png',
		
		'../img/how_page/joseph/transport_images/how_joseph_button_image_1.png',
		'../img/how_page/joseph/transport_images/how_joseph_button_image_2.png', //20
		'../img/how_page/joseph/transport_images/how_joseph_button_image_3.png', //20
		'../img/how_page/joseph/transport_images/how_joseph_button_image_4.png',
		
		//Joseph_where
		'../img/where_page/joseph/bg.png',
		
		'../img/where_page/joseph/infoDiv/infoDivImgIL.png',
		'../img/where_page/joseph/infoDiv/infoDivImgMA.png',
		'../img/where_page/joseph/infoDiv/infoDivImgNY.png',
		'../img/where_page/joseph/infoDiv/infoDivImgPA.png',
		'../img/where_page/joseph/infoDiv/infoDivImgSplash.png',
		
		//Joseph_why
		'../img/why_page/joseph/why_title.png',
		
		'../img/why_page/joseph/main_reasons_joseph/reason1.png',
		'../img/why_page/joseph/main_reasons_joseph/reason2.png',
		'../img/why_page/joseph/main_reasons_joseph/reason3.png',

		'../img/why_page/joseph/minor_reasons_joseph/minor_reasons_joseph_0.png',
		'../img/why_page/joseph/minor_reasons_joseph/minor_reasons_joseph_1.png',
		'../img/why_page/joseph/minor_reasons_joseph/minor_reasons_joseph_2.png',
		'../img/why_page/joseph/minor_reasons_joseph/minor_reasons_joseph_3.png',
		
		/*
			Anne
		*/
		//Anne_who
		'../img/who_page/anne/bg.png',
		
		'../img/who_page/anne/icons/family_icon.png',
		'../img/who_page/anne/icons/job_icon.png',
		'../img/who_page/anne/icons/ireland_icon.png',
		'../img/who_page/anne/icons/blast_icon.png', //50 - 280
		
		'../img/who_page/anne/ruler_buttons/rulerButton.png',
		'../img/who_page/anne/ruler_buttons/rulerButtonover.png',
		'../img/who_page/anne/ruler_buttons/rulerButtonclick1.png',
		'../img/who_page/anne/ruler_buttons/rulerButtonclick2.png',
		'../img/who_page/anne/ruler_buttons/rulerButtonclick3.png',
		'../img/who_page/anne/ruler_buttons/rulerButtonclick4.png',
		
		'../img/who_page/anne/fadeIns/anneFadeIn.png',
		'../img/who_page/anne/fadeIns/anneFadeInOver.png',

		//Anne_when
		'../img/when_page/anne/whenTitle.png',
		
		'../img/when_page/anne/when_anne_boxingBell/when_bell.png',
		'../img/when_page/anne/when_anne_boxingBell/when_bellclick.png',
		'../img/when_page/anne/when_anne_boxingBell/when_bellover.png',
		'../img/when_page/anne/when_anne_boxingBell/when_boxingbell.png',
		
		'../img/when_page/anne/when_anne_eu_pres/eu1.png',
		'../img/when_page/anne/when_anne_eu_pres/eu2.png',
		'../img/when_page/anne/when_anne_eu_pres/eu3.png',

		'../img/when_page/anne/when_anne_georgebest/george_zoom.png',
		'../img/when_page/anne/when_anne_georgebest/george_zoom_big.png',
		
		'../img/when_page/anne/when_anne_piano/when_piano.png',
			
		'../img/when_page/anne/when_anne_rip/when_rip.png',
		'../img/when_page/anne/when_anne_rip/when_ripover.png',
		'../img/when_page/anne/video_poster.png',

		//Anne_what
		'../img/what_page/joseph/suitcase.png',
		'../img/what_page/joseph/suitcase_closed.png',
		
		//Anne_how
		'../img/how_page/anne/bg.png',
		
		'../img/how_page/anne/info_bar/distance.png',
		'../img/how_page/anne/info_bar/cost.png',
		'../img/how_page/anne/info_bar/length.png',
		'../img/how_page/anne/info_bar/passengers.png',
		'../img/how_page/anne/info_bar/duration.png',
		'../img/how_page/anne/info_bar/weight.png',
		
		'../img/how_page/anne/transport_images/how_anne_button_image_1.png',
		'../img/how_page/anne/transport_images/how_anne_button_image_2.png',
		'../img/how_page/anne/transport_images/how_anne_button_image_3.png',
		
		//Anne_where
		'../img/where_page/anne/bg.png',
		
		'../img/where_page/anne/infoDiv/infoDivImgAB.png',
		'../img/where_page/anne/infoDiv/infoDivImgON.png',
		'../img/where_page/anne/infoDiv/infoDivImgBC.png',
		'../img/where_page/anne/infoDiv/infoDivImgQC.png',
		'../img/where_page/anne/infoDiv/infoDivImgSplash.png',
		
		//Anne_why
		'../img/why_page/anne/why_title.png',
		
		'../img/why_page/anne/main_reasons_anne/reason1.png',
		'../img/why_page/anne/main_reasons_anne/reason2.png',
		'../img/why_page/anne/main_reasons_anne/reason3.png',

		'../img/why_page/anne/minor_reasons_anne/minor_reasons_anne_0.png',
		'../img/why_page/anne/minor_reasons_anne/minor_reasons_anne_1.png',
		'../img/why_page/anne/minor_reasons_anne/minor_reasons_anne_2.png',
		'../img/why_page/anne/minor_reasons_anne/minor_reasons_anne_3.png'
		
	  ], {
			init: function(loaded, total) {
				$('#loading_gif').show(); //Show the loading image
			},
			loaded: function(img, loaded, total) {			
			},
			loaded_all: function(loaded, total) {
				//if(window.console){console.log(loaded+'    '+ total);}
				$('#loading_gif').hide(); //Hide the loading image
				$('#loading_enter_button').show(); //When loaded show the button to enter the site
			}
	});

	/*---
		Click handler for the enter button on the loading page
	---*/
	$('.loading').on('click','#loading_enter_button',function(){
		$('.loading, #loading_enter_button').hide(); //Hide the loading div and the loading_enter_button
		//Empty the loading div and put in the loading gif, for the rest of the sites loading
		$('.loading').empty().html('<img id="loading_gif_general" src="img/general/ajax-loader.gif" alt=""/>');
		$('#content,#pageHeader').fadeIn(); //Fade in the homepage content
	});
	
	/*---
		Prevent the default dragging of all images bar the draggable ones
	---*/
	$("#content,#pageHeader,.side_nav").on('mousedown','img:not(.draggableItems)', function(e){
		return false;
	});
		
	/**
	-----------------------------------------------------------
					HOME NAVIGATION EVENT HANDLER
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the mouseover, mouseout, and click events for the emigrant links on the home page.
	---*/
	try {
	//For dynamically loaded content. 
	$('#content').on({
	
		'mouseover' : function(){ //On Mouseover, home navigation links		
			var switcher = $(this).find('a').attr('href').split('/')[1]; // Find href of anchor
			
			//Create the corresponding URI of the logo and apply it
			var switcher2 = switcher + '_logo.png'; 
			var srcLogo = $('#homeLogo').prop("src").replace('main_logo.png',switcher2);
			$('#homeLogo').prop("src", srcLogo).end();
			
			//Create the URI of the on over image and apply it
			var srcEmigrants = $(this).find('img').prop('src').replace('.png','_over.png');
			$(this).find('img').prop('src', srcEmigrants).end();
			
		},
		
		'mouseout' : function(){ //On Mouseout, home navigation links.
			
			//Create the corresponding URI of the main logo and apply it
			var alink = $(this).find('a').attr('href').split('/')[1];
			var completeSrcLogo = $('#homeLogo').prop('src').split(alink)[0]+ 'main_logo.png'; 
			$('#homeLogo').prop('src', completeSrcLogo).end();
			
			//Create the URI of the on out image and apply it
			var srcEmigrants = $(this).find('img').prop('src').replace('_over.png', '.png');
			$(this).find('img').prop('src', srcEmigrants).end();
		},
		
		'click' : function(event){ //On Click, home navigation links
			
			var tmp = $(this).find('a').attr('href'); // Find href of anchor
			window.personIndex = tmp.split('/')[1]; //Set name of person in personIndex
			window.pageIndex = 'who'; //Set the page to who
		
			event.preventDefault(); //Prevent default actions
			$('#content').css({'display':'none'});//hide(); //Hide the div
			$('.loading').show(); //Show loading gif
			

			//Empty homepage divs
			$('#pageHeader').empty();
			$('#content').empty();
			
			//Function to load in side and top navigation.
			loadNavigation();
			
			//Get the required script for the page.
			$.getScript("js/page_builders/"+ window.pageIndex +"_builder.js", function(data, textStatus, jqxhr) {if(window.console){console.log("Page load success " + window.pageIndex);}});
			
			//Set the first top link to the "on over" state.
			var src = $('.topNavLinks:first').find('img').prop("src").replace(".png","over.png");
			$('.topNavLinks:first').find('img').prop("src", src);
			$('.topNavLinks:first').addClass('activeImage'); //Add the class 'activeImage'
			
			/*---
				THE FOLLOWING CHANGES THE SIDE NAVIGATION IMAGE TO ACTIVE DEPENDING ON WHAT EMIGRANT THE USER CLICKS ON
			---*/
			//Find person and mark them as the current image.
			//Set the first side link to the on over state.
			if(window.personIndex == 'margaret'){
				/*
					STEPS:
					1. Gets the correct <a> element, with specific persons name that has href that ends in margaret
					2. Removes all other active images
					3. Add active image class to current link
					4. Remove active timebar.
					5. Adds active timebar and timebarhovered classes
					6. Makes brown bar visible
				*/
				var $thisNav = $('a.sideNavLinks[href$="margaret"]');
				
				//Changes the source of the image, to over state.
				var src = $($thisNav).find('img').prop("src").replace(".png","over.png");
				$($thisNav).find('img').prop("src", src);
				
				$('.activeImageSide').not($thisNav).removeClass('activeImageSide').trigger('mouseout');
				$thisNav.addClass('activeImageSide');		
				var $thisDiv = $('#timeBar1');
				
				//Remove all active bars
				$('.timeBar,.timeBarHovered').removeClass('activeTimeBar');
				
				$thisDiv.removeClass('timeBar');
				$thisDiv.addClass('timeBarHovered activeTimeBar'); //Might not need activeTimeBar, as we can just rely on the link having the active element.
				$('#brownBar1').css("visibility", "visible");
				
			}
			//if joseph is clicked.
			if(window.personIndex == 'joseph'){
				var $thisNav = $('a.sideNavLinks[href$="joseph"]');
				
				//Changes the source of the image, to over state.
				var src = $($thisNav).find('img').prop("src").replace(".png","over.png");
				$($thisNav).find('img').prop("src", src);
				
				$('.activeImageSide').not(this).removeClass('activeImageSide').trigger('mouseout');
				// set new active state
				$thisNav.addClass('activeImageSide');		
				var $thisDiv = $('#timeBar2');
				//Remove all active bars
				$('.timeBar,.timeBarHovered').removeClass('activeTimeBar');
				$thisDiv.removeClass('timeBar');
				$thisDiv.addClass('timeBarHovered activeTimeBar');
				$('#brownBar2').css("visibility", "visible");
			}
			//if steve is clicked.
			if(window.personIndex == 'steve'){
				var $thisNav = $('a.sideNavLinks[href$="steve"]');
				
				//Changes the source of the image, to over state.
				var src = $($thisNav).find('img').prop("src").replace(".png","over.png");
				$($thisNav).find('img').prop("src", src);
				
				$('.activeImageSide').not(this).removeClass('activeImageSide').trigger('mouseout');
				// set new active state
				$thisNav.addClass('activeImageSide');		
				var $thisDiv = $('#timeBar3');
				//Remove all active bars
				$('.timeBar,.timeBarHovered').removeClass('activeTimeBar');
				$thisDiv.removeClass('timeBar');
				$thisDiv.addClass('timeBarHovered activeTimeBar');
				$('#brownBar3').css("visibility", "visible");
			}
			//if joseph is clicked.
			if(window.personIndex == 'anne'){
				var $thisNav = $('a.sideNavLinks[href$="anne"]');
				
				//Changes the source of the image, to over state.
				var src = $($thisNav).find('img').prop("src").replace(".png","over.png");
				$($thisNav).find('img').prop("src", src);
				
				$('.activeImageSide').not(this).removeClass('activeImageSide').trigger('mouseout');
				// set new active state
				$thisNav.addClass('activeImageSide');		
				var $thisDiv = $('#timeBar4');
				//Remove all active bars
				$('.timeBar,.timeBarHovered').removeClass('activeTimeBar');
				$thisDiv.removeClass('timeBar');
				$thisDiv.addClass('timeBarHovered activeTimeBar');
				$('#brownBar4').css("visibility", "visible");
			}
			
			//Must return false!!
			return false;
		}
	},'.homeNavLinks');
	} catch (ex) { alert(ex); }
	
	/**
	-----------------------------------------------------------
					TOP NAVIGATION EVENT HANDLER
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the mouseover, mouseout, and click events for the top navigation links on all the pages.
	---*/
	$("#pageHeader").on({
	
		'mouseover' : function(){ //On Mouseover, top navigation links
			
			if ($(this).hasClass('activeImage')) return; // Skip mouseover for active image
			var src = $(this).find('img').prop("src").replace(".png","over.png");
			$(this).find('img').prop("src", src);
		}, 
		
		'mouseout' : function(){ //On Mouseout, top navigation links.
			
			if ($(this).hasClass('activeImage')) return; // Skip mouseout for active image
			var src = $(this).find('img').prop("src").replace("over.png", ".png");
			$(this).find('img').prop("src", src);
		},
		
		'click' : function(event){ //On Click, top navigation links
			
			event.preventDefault();
			$('#content').hide(); //Hide the div
			$('.loading').show(); //Show loading gif
			
			// remove previous active state
			$('#navBar a').not(this).removeClass('activeImage').trigger('mouseout');
			// set new active state
			$(this).addClass('activeImage');
			
			//Get the page
			var tmp = $(this).attr('href');
			window.pageIndex = tmp.split('/')[1];
			//Get the required script for the page.
			$.getScript("js/page_builders/"+ window.pageIndex +"_builder.js", function(data, textStatus, jqxhr) {if(window.console){console.log("Page load success " + window.pageIndex );}});
			//Must return false!!
			return false;		
		}
	},'.topNavLinks');
	
	/**
	-----------------------------------------------------------
					SIDE NAVIGATION EVENT HANDLER
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the mouseover, mouseout, and click events for the emigrant links on the side of each page.
	---*/
	$('.side_nav').on({ //Change container to content
		'mouseover' : function(){
			if ($(this).is('.activeImageSide')) return; // Skip mouseover for active image

			var src = $(this).find('img').prop("src").replace(".png","over.png");
			$(this).find('img').prop("src", src).end();
		
			var $thisID = $(this).attr('id').split('personID')[1];
			//Find corressponding blue div
			var $thisDiv = $('#timeBar'+$thisID);
			$thisDiv.removeClass('timeBar');
			$thisDiv.addClass('timeBarHovered');
			$('#brownBar'+$thisID).css("visibility", "visible");
		
		},	
		'mouseout' : function(){
			if ($(this).is('.activeImageSide')) return; // Skip mouseout for active image
			var src = $(this).find('img').prop("src").replace("over.png", ".png");
			$(this).find('img').prop("src", src).end()
			
			var $thisID = $(this).attr('id').split('personID')[1];
			var $thisDiv = $('#timeBar'+$thisID);
			$thisDiv.removeClass('timeBarHovered');
			$thisDiv.addClass('timeBar');
			$('#brownBar'+$thisID).css("visibility", "hidden");
		},
		
		'click' : function(event){ //On Click, top navigation links
			
			event.preventDefault();
			event.stopPropagation();
			$('#content').css({'display':'none'});
			//hide(); //Hide the div
			$('.loading').show(); //Show loading gif
			var $thisSrc = $(this).attr('href');
			var $thisID = $(this).prop('id').split('personID')[1];
			
			//remove previous active state
			//might be issue, as it doesnt select the image.
			$('.activeImageSide').not(this).removeClass('activeImageSide').trigger('mouseout');
			// set new active state
			$(this).addClass('activeImageSide');		
			var $thisDiv = $('#timeBar'+ $thisID);
			
			//Remove all active bars
			$('.timeBar,.timeBarHovered').removeClass('activeTimeBar');
			
			$thisDiv.removeClass('timeBar');
			$thisDiv.addClass('timeBarHovered activeTimeBar');
			$('#brownBar' + $thisID).css("visibility", "visible");
			
			//Set personIndex
			window.personIndex = $thisSrc.split('/')[1];
			//Call page builders
			$.getScript("js/page_builders/"+ window.pageIndex +"_builder.js", function(data, textStatus, jqxhr) {if(window.console){console.log("Page load success " + window.pageIndex );}});
			
			//Must return false!!
			return false;		
		}
	},'.sideNavLinks');
	
	/**
	-----------------------------------------------------------
					HOME NAVIGATION EVENT HANDLER
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the click event for the logo at the center top of the screen. It brings the user back to the home page
	---*/
	$('#pageHeader').on('click','.homeNavLink',function(){
		loadHomepage();
		return false;
	});
	
	/**
	-----------------------------------------------------------
					SOCIAL MEDIA EVENT HANDLERs
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the mouseenter event for the social media links on the home page.
	---*/
	$("#pageHeader").on('mouseenter','.social_media_class',function(){
		var src = $(this).find('img').prop("src").replace(".png","_over.png"); //Set variable to the on over image src
		$(this).find('img').prop("src", src); //Apply new source
		if($(this).hasClass('right_social_media')){ //If the social media icon is on the right.
			$(this).animate({'left':'581px'}, {'queue': false, 'duration': 200}); //Animate to the right
		}
		else
		{
			$(this).animate({'left':'292px'},{'queue': false, 'duration': 200}); //Otherwise animate to the left.
		}

	});
	
	/*---
		The below code handles the mouseleave event for the social media links on the home page.
	---*/
	$("#pageHeader").on('mouseleave','.social_media_class',function() {
		if($(this).hasClass('right_social_media')){ //If the social media icon is on the right.
			$(this).animate({'left':'561px'},{'queue': false, 'duration': 200}); //Animate to the left
		}
		else
		{
			$(this).stop(true, true).animate({'left':'312px'},{'queue': false, 'duration': 200}); //Otherwis animate to the right
		}
		var src = $(this).find('img').prop("src").replace("_over.png", ".png"); //Set variable to the original image src
		$(this).find('img').prop("src", src); //Apply new source
	});
	
	/**
	-----------------------------------------------------------
					OVERLAY EVENT HANDLERs
	-----------------------------------------------------------
	**/
	/*---
		The below code handles the click event for the exit button on the overlay
	---*/
	$('#overlay').on('click', '#overlay_ID_7', function(){
		$('#overlay').hide().remove(); //First hide then, completely remove the div, as it is not used again.
	});
	
	/*---
		The below code handles pressing escape when the user is on the overlay page.
	---*/
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#overlay').hide().remove(); //First hide then, completely remove the div, as it is not used again.
		}   // esc
	});
	
	
	/**
	-----------------------------------------------------------
					NAVIGATION LOADING FUNCTION
	-----------------------------------------------------------
	**/
	/*---
		The below code creates two objects that represent the two navigations. These are loaded in dynamically into the page.
	---*/
	function loadNavigation(){
		//Top navigation
		var headerDiv = '<nav id="navBar">';
			headerDiv += '<a class="topNavLinks" href="/who"><img class="" src="../img/nav_img/Top_nav/who.png" alt="" /></a>';
			headerDiv += '<a class="topNavLinks" href="/why"><img class="" src="../img/nav_img/Top_nav/why.png" alt="" /></a>';
			headerDiv += '<a class="topNavLinks" href="/when"><img class="" src="../img/nav_img/Top_nav/when.png" alt="" /></a>';
			headerDiv += '<a class="homeNavLink" href="/home"><img id="homeLink" src="../img/home_page/logo.png" alt="" /></a>';
			headerDiv += '<a class="topNavLinks" href="/what"><img class="" src="../img/nav_img/Top_nav/what.png" alt="" /></a>';
			headerDiv += '<a class="topNavLinks" href="/how"><img class="" src="../img/nav_img/Top_nav/how.png" alt="" /></a>';
			headerDiv += '<a class="topNavLinks" href="/where"><img class="" src="../img/nav_img/Top_nav/where.png" alt="" /></a>';
			headerDiv += '</nav>';
		
		$('#pageHeader').append(headerDiv);

		//Side navigation
		var sideDiv =   '<a class="handle" href="NAV">';
			sideDiv +=	'<div id="timebarplace">';
			sideDiv +=	'<div id="timeBar1" class="timeBar"><div id="brownBar1" class="brownBars"></div></div>';
			sideDiv +=	'<div id="timeBar2" class="timeBar"><div id="brownBar2" class="brownBars"></div></div>';
			sideDiv +=	'<div id="timeBar3" class="timeBar"><div id="brownBar3" class="brownBars"></div></div>';
			sideDiv +=	'<div id="timeBar4" class="timeBar"><div id="brownBar4" class="brownBars"></div></div>';
			sideDiv +=	'</div>';
			sideDiv +=	'</a>';
			sideDiv +=	'<img class="slide-out-background" src="../img/nav_img/Side_nav/sidebarpanel.png" alt="" />';
			sideDiv +=	'<nav>';
			sideDiv +=	'<a id="personID1" class="sideNavLinks" href="/margaret" ><img src="../img/nav_img/Side_nav/margaret_icon.png" alt="../img/" title=""/></a>';
			sideDiv +=	'<a id="personID2" class="sideNavLinks" href="/joseph" ><img src="../img/nav_img/Side_nav/joseph_icon.png" alt="" title=""/></a>';
			sideDiv +=	'<a id="personID3" class="sideNavLinks" href="/steve" ><img src="../img/nav_img/Side_nav/steve_icon.png" alt="" title=""/></a>';
			sideDiv +=	'<a id="personID4" class="sideNavLinks" href="/anne" ><img src="../img/nav_img/Side_nav/anne_icon.png" alt="" title=""/></a>';
			sideDiv +=	'</nav>';
			
		$('.side_nav').append(sideDiv);
		$('.side_nav').css('visibility','visible'); //Show the sidebar
		
		/*---
			The below code initializes the slide-out side bar
		---*/
		$('.side_nav').tabSlideOut({
			tabHandle: '.handle', //Class of the element that will become your tab
			pathToTabImage: '../img/nav_img/Side_nav/sidebar.png', //The image for the tab
			imageHeight: '519px', //Height of tab image  
			imageWidth: '76px',  //Width of tab image
			tabLocation: 'left', //side of screen
			speed: 300, //speed of animation
			action: 'click', //Click to open the side bar
			topPos: '120px', //Position from the top
			leftPos: '0px', //position from left/ use if tabLocation is bottom or top
			fixedPosition: false, //Fixed position on scroll, false
			onLoadSlideOut: true //Slide out the sidebar when it first loads.
		});
	}
	
	/**
	-----------------------------------------------------------
					HOMEPAGE LOADING FUNCTION
	-----------------------------------------------------------
	**/
	/*---
		The below code creates an object of the homepage and loads in the homepage if the user chooses to navigate back to the homepage.
	---*/
	function loadHomepage(){
	
		//empty side navigation
		$('.side_nav,.open').empty();
		//empty content
		$('#content').empty();
		//empty header
		$('#pageHeader').empty();
		
		//clear the background
		$('#content').css('background-image', 'none');

		$('#content').trigger('click'); //Trigger click to make sure the side-bar retracts.
		//Load new header
		var homeHeaderhtml = '<a id="wordpress_link_ID" class="social_media_class" href="http://emigrationisle.wordpress.com/" target="_blank" ><img src="img/home_page/social_media/social_icon_wordpress.png" alt="" /></a>';
			homeHeaderhtml += '<a id="site_link_ID" class="social_media_class" href="http://creativecriations.wix.com/criations" target="_blank" ><img src="img/home_page/social_media/social_icon_site.png" alt="" /></a>';
			homeHeaderhtml += '<img id="homeLogo" src="img/home_page/homepage_logos/main_logo.png" alt="" />';
			homeHeaderhtml += '<a id="facebook_link_ID" class="social_media_class right_social_media" href="https://www.facebook.com/EmigrationIsle" target="_blank" ><img src="img/home_page/social_media/social_icon_facebook.png" alt="" /></a>';
			homeHeaderhtml += '<a id="twitter_link_ID" class="social_media_class right_social_media" href="https://twitter.com/EmigrationIsle" target="_blank" ><img src="img/home_page/social_media/social_icon_twitter.png" alt="" /></a>';
			
		$('#pageHeader').append(homeHeaderhtml);
		
		//Load new content
		var homeContenthtml = '<nav id="homeNavigation">';
			homeContenthtml += '<div id="margaret_div_ID" class="homeNavLinks"><a href="/margaret"><img id="margaret_home_ID" src="img/home_page/homepage_emigrants/margaret_icon.png" alt="" title="" /></a></div>';
			homeContenthtml += '<div id="joseph_div_ID" class="homeNavLinks"><a href="/joseph"><img  id="joseph_home_ID" src="img/home_page/homepage_emigrants/joseph_icon.png" alt="" title=""/></a></div>';
			homeContenthtml += '<div id="steve_div_ID" class="homeNavLinks"><a href="/steve"><img  id="steve_home_ID" src="img/home_page/homepage_emigrants/steve_icon.png" alt="" title=""/></a></div>';
			homeContenthtml += '<div id="anne_div_ID" class="homeNavLinks"><a href="/anne"><img  id="anne_home_ID" src="img/home_page/homepage_emigrants/anne_icon.png" alt="" title="" /></a></div>';
			homeContenthtml += '</nav>';
			homeContenthtml += '<img id="home_timeline_ID"src="img/home_page/homepage_timeline/home_timeline.png" alt="" />';
			homeContenthtml += '<img id="home_timeline_bg_ID"src="img/home_page/homepage_timeline/home_timeline_bg.png" alt="" />';

		$('#content').append(homeContenthtml);
	}

	/**
	-----------------------------------------------------------
					COMMON jQUERY METHODS
	-----------------------------------------------------------
	**/
	/*---
		Switch the image to the over image, on all objects with the hover class
	---*/
	$('#content, #pageHeader').on({ //Change container to content
		'mouseover' : function(){
			var src = $(this).prop("src").replace(".png","over.png");
			$(this).prop("src", src).end();
		},
		'mouseout' : function(){
			var src = $(this).prop("src").replace("over.png", ".png");
			$(this).prop("src", src).end();
		}
	},'.hover');
	
	/*---
		Set cursor to pointer on all objects that have the class cursor
	---*/
	$('#content').on({ //Change container to content
		'mouseover' : function(){
			$(this).css( 'cursor', 'pointer' );
		},
		'mouseout' : function(){
			$(this).css( 'cursor', 'auto' );
		}
	},'.cursor');
	
});
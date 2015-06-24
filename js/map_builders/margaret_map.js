(function() {
	//Set colours for certain regions
	//Region codes are found in the map data file
	var myCustomColors = {
        'AU-SA': '#344B5E',
        'AU-WA': '#344B5E',
        'AU-VIC': '#344B5E',
        'AU-TAS': '#344B5E',
        'AU-QLD': '#344B5E',
        'AU-NSW': '#344B5E',
        'AU-ACT': '#344B5E',
        'AU-NT': '#344B5E'
    };
	//Build a new map for Margaret
    map = new jvm.WorldMap({
        map: 'au_mill_en', //Reference the australian map
        container: $('#whereMapDiv'), //Target container for the map
        backgroundColor: 'none', //Make background transparent
		zoomOnScroll: false, //Remove zoom controls
		regionsSelectable : true, //make region selectable
		regionsSelectableOne: true, //Make a single region selectable
		//Region styles
		regionStyle: {
			initial:{ //Initial state
				fill: '#344B5E', //Set colour
				stroke: 'none',
				"stroke-width": 0
			},
			selected: { //Once clicked set a different colour
				fill: '#DDCD87'
			},
			hover: { //On mouse over colour
				fill : '#DDCD87'
			}
		},
	  series: {
            regions: [{
                attribute: 'fill'}]
        }
    });
	//Set the values of the colours to the regions
    map.series.regions[0].setValues(myCustomColors);
})();
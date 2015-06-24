(function() {
	//Set colours for certain regions
	//Region codes are found in the map data file
	var myCustomColors = {
        'CA-ON': '#344B5E',
		'CA-QC': '#344B5E',
		'CA-BC': '#344B5E',
		'CA-AB': '#344B5E'
    };
	//Build a new map for Anne
    map = new jvm.WorldMap({
        map: 'ca_lcc_en', //Reference the Canada map
        container: $('#whereMapDiv'), //Target container for the map
        backgroundColor: 'none', //Make background transparent
		zoomOnScroll: false, //Remove zoom controls
		regionsSelectable : true, //make region selectable
		regionsSelectableOne: true, //Make a single region selectable
		//Focus on certain area
		focusOn : {
			x: 0.5,
			y: 0.7,
			scale: .6
		},
		//Region styles
		regionStyle: {
			initial:{ //Initial state
				stroke: 'none',
				"stroke-width": 0,
				fill: '#808080' //Set colour
			},
			selected: { //Once clicked set a different colour
				fill: '#DDCD87'
			},
			hover: { //On mouse over colour
				fill : '#DDCD87'
			}
		},
		//Fill the regions with their colours
        series: {
            regions: [{
                attribute: 'fill'}]
        }
    });
	//Set the values of the colours to the regions
    map.series.regions[0].setValues(myCustomColors);
})();
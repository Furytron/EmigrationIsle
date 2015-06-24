(function() {
	//Build a new map for Steve
    map = new jvm.WorldMap({
        map: 'uk_mill_en', //Reference the United Kingdom map
        container: $('#whereMapDiv'), //Target container for the map
        backgroundColor: 'none', //Make background transparent
		zoomOnScroll: false, //Remove zoom controls
		//Focus on certain area
		focusOn : {
			x: 1.0, //x-axis
			y: 0.8, //y-axiz
			scale: 0.67 //Zoomed in
		},
		//Region styles
		regionStyle: {
			initial: { //Initial state
				fill: '#808080' //Set colour
			},
			hover: { //On mouse over colour
				"fill-opacity": 1.0
			}
		},
		//Set marker style
		markerStyle: {
		  initial: { //Initial marker state
			fill: '#334b5e', //Set colour
			stroke: 'black', //Set stroke
			"fill-opacity": 1,
			"stroke-width": 1,
			"stroke-opacity": 1,
			r: 10 //Set size of the marker
		  },
		  selected: { //Once clicked set a different colour
			fill: '#ddcd87',
			stroke: '#334b5e',
			"stroke-width": 2
		  },
		  hover: { //On mouse over colour
			stroke: '#334b5e',
			"stroke-width": 2,
			fill: '#ddcd87'
		  }
		},
		//Set the markers
		markers: [
			//Markers are set by the longditude and latitude of the place.
			//Indexes are set by the order of the inputed values here. London - index = 0, Luton - index = 1....
			{latLng: [51.507335, -0.127683], name: 'London'},
			{latLng: [51.878671, -0.420025], name: 'Luton'},
			{latLng: [52.486243, -1.890401], name: 'Birmingham'},
			{latLng: [ 53.479251, -2.247926], name: 'Manchester'},
			{latLng: [ 53.408371, -2.991573], name: 'Liverpool'},
			{latLng: [ 52.406822, -1.519693], name: 'Coventry'}
		],
		markersSelectable: true, //Make marker selectable
        markersSelectableOne: true //Make marker selectable one at a time
    });
})();
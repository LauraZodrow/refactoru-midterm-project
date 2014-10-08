//Google Map
function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      // var image = {
      //   url: place.icon,
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(17, 34),
      //   scaledSize: new google.maps.Size(25, 25)
      // };

      // Create a marker for each place.
      // var marker = new google.maps.Marker({
      //   map: map,
      //   icon: image,
      //   title: place.name,
      //   position: place.geometry.location
      // });

  	var loc=new Location(place, map);
  	loc.render(); 

      markers.push(loc.marker);

      bounds.extend(place.geometry.location);
      console.log(markers)

      map.fitBounds(bounds);
      }
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


// =================================================
// My Library Button
// =================================================

var Button = function(title) {
	this.title = title;
}

Button.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<div><h4>My Library</h4></div>');

	this.element 
		.addClass('btn-library')
		.appendTo('body');

	this.element.on('click', function () {
		$('.my-library').slideDown(600);
		$('.btn-library').hide();
	});	

	$('.my-library').on('click', 'h4', function() {
		$('.my-library').slideUp(600);
		$('.btn-library').show();
	})

	return this.element;
};

var btnLibrary = new Button('My Library');
btnLibrary.render();


// =================================================
// TravelLine - Timeline
// =================================================

var Timeline = function() {
	this.locations = [];
}

var Location = function(place, map) {
	this.place = place;
	this.map = map;
	// this.date = date;
	// this.description = description;
	console.log(place);
}

Location.prototype.render = function() {
  var image = {
    url: this.place.icon,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25)
  };

   this.marker = new google.maps.Marker({
        map: this.map,
        icon: image,
        title: this.place.name,
        position: this.place.geometry.location
      });

   google.maps.event.addListener(this.marker, 'click', this.markerclick.bind(this));
};

Location.prototype.markerclick = function(e) {
	console.log('clicked', this)
};

// Location.prototype.render = function() {
// 	this.marker.on('click', function(){
// 		this.element = $('<div>Add to TravelLine</div>');

// 		this.element
// 			.addClass('addButton')
// 			.appendTo(this.marker);
// 	})
// 	return this.element;
// };

// var addToTimeline = new Location();
// addToTimeline.render();


// =================================================
// Bookmark Board
// =================================================

// var CustomBoard = function(title) {
// 	this.title = title;
// }

// var Schools = function (title) {
// 	this.title = title;
// }

// Schools.prototype.render = function() {
// 	if(this.element) return this.element;

// 	this.element = $('<div><h4>Schools</h4</div>');

// 	this.element 
// 		.addClass('schoolBox')
// 		.appendTo('body');

// 	return this.element;
// };

// var mySchools = new Schools('Schools');
// mySchools.render();

















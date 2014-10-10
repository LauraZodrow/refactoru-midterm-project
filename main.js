//Google Map
function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#004b76"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fff6cb"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7f7d7a"
            },
            {
                "lightness": 10
            },
            {
                "weight": 1
            }
        ]
    }
]
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

//When Marker is clicked Modal appears, asks to add to Timeline.
//If say yes, place name will be added to timeline
Location.prototype.markerclick = function(e) {
  //THIS SHOWS MODAL TO 'ADD TO TIMELINE'
  $('#myModal').modal('show');
  $('.timelineContainer').show();
  var location = this;
  $('.addButton').one('click', function () {
      $('#myModal').modal('hide');

      var places = [];

      //Object stores 'dot' marker information
      var placeMarker = {
        img: $("<div class='placeMarkerImage'><img src='./images/dot.png'></div>"),
        name: location.marker.title,
        description: $("<div class='timelineDetailsText'><textarea></textarea></div>")
      };

      places.push(placeMarker);

      var positioning = function () {
        places.length * 100;
      }
      positioning(placeMarker.img);
      console.log(positioning);

      $('.timelineDetails').empty();

      $('.placeMarkerImageWrapper').append(placeMarker.img);
      $('.timelineDetails').append("<h4 class='timelineDetailsName'>" + placeMarker.name + "</h4>");
      $('.timelineDetails').append(placeMarker.description);

      placeMarker.img.click(function(){
        $('.timelineDetails').empty();

        $('.timelineDetails').append('<h4>' + placeMarker.name + '</h4>');
        $('.timelineDetails').append(placeMarker.description);
      })

      console.log(placeMarker);
      console.log(places);
  });

  console.log('clicked', this);
};

// =================================================
// Bookmark Board - Add Buttons
// =================================================

$(document).on('click', '.addBtnBoard', function() {
    $('.addBtnBoard li').slideToggle(600);
}); 

$(document).on ('click', '.addSchools', function() {
    // if this.element return !this.element;
    $('.schools').show();
})

$(document).on ('click', '.addRestaurants', function() {
    // if this.element return !this.element;
    $('.restaurants').show();
})

$(document).on ('click', '.addHostels', function() {
    // if this.element return !this.element;
    $('.hostels').show();
})

$(document).on ('click', '.addMuseums', function() {
    // if this.element return !this.element;
    $('.museums').show();
})

$(document).on ('click', '.addPubs', function() {
    // if this.element return !this.element;
    $('.pubs').show();
})

// =================================================
// Bookmark Board - Delete Buttons
// =================================================

$(document).on('click', '.btnBoardSchool', function(){
    $('.btnBoardSchool').closest('.schools').hide();
});

$(document).on('click', '.btnBoardRestaurants', function(){
    $('.btnBoardRestaurants').closest('.restaurants').hide();
});

$(document).on('click', '.btnBoardHostels', function(){
    $('.btnBoardHostels').closest('.hostels').hide();
});

$(document).on('click', '.btnBoardMuseums', function(){
    $('.btnBoardMuseums').closest('.museums').hide();
});

$(document).on('click', '.btnBoardPubs', function(){
    $('.btnBoardPubs').closest('.pubs').hide();
});

$(document).on('click', '.btnBoardCreateOwn', function(){
    $('.btnBoardCreateOwn').closest('.createOwn').hide();
});




















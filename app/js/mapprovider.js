define(['config'],

function(config, styles, markers) {
  var gMap, gCurrentResults, gInfoWindow, gLocalSearch, gMarker, gMarkerShadow

  function MapProvider() {
    this.init();
  }

  _.extend(MapProvider.prototype, Backbone.Events);

  MapProvider.prototype.init = function() {
    if (gMap) return;

    gCurrentResults = [];
    gMarker = markers[config.markerColor];
    gMarkerShadow = markers['shadow'];

    var mapDiv = document.getElementById("map");

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(37.7750, -122.4167),
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      },
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    };
    gMap = new google.maps.Map(mapDiv, mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    gMap.mapTypes.set('map_style', styledMap);
    gMap.setMapTypeId('map_style');

    var $win = $(window);
    var setMapSize = function() {
      if ($win.width() >= 500) {
        $(mapDiv).height($win.height())
      } else {
        $(mapDiv).height(300)
      }
    };
    $win.resize(setMapSize);
    setMapSize();

    gLocalSearch = new GlocalSearch();
    gLocalSearch.setSearchCompleteCallback(null, OnLocalSearch);
  };

  MapProvider.prototype.executeSearch = function(query) {
    if (typeof query === "undefined") return;
    query = query + "";
    var idx = query.indexOf("(");
    if (idx > 0) {
      var idx2 = query.indexOf(")", idx);
      query = query.substring(idx + 1, idx2);
    }


    gLocalSearch.setCenterPoint(gMap.getCenter());
    gLocalSearch.execute(query + ", San Francisco, CA");
  }

  // Called when Local Search results are returned, we clear the old
  // results and load the new ones.
  function OnLocalSearch() {
    if (!gLocalSearch.results || gLocalSearch.results.length == 0) return;

    for (var i = 0; i < gCurrentResults.length; i++) {
      gCurrentResults[i].marker.setMap(null);
    }
    gCurrentResults = [];
    for (var i = 0; i < gLocalSearch.results.length; i++) {
      gCurrentResults.push(new LocalResult(gLocalSearch.results[i]));
    }

    // Move the map to the first result
    var first = gLocalSearch.results[0];
    gMap.setCenter(new google.maps.LatLng(parseFloat(first.lat), parseFloat(first.lng)));

  }

  // A class representing a single Local Search result returned by the
  // Google AJAX Search API.
  function LocalResult(result) {
    var position = new google.maps.LatLng(parseFloat(result.lat), parseFloat(result.lng))
    this.marker = new google.maps.Marker({position: position, icon: gMarker, shadow: gMarkerShadow, map: gMap});
  }

  return MapProvider;
});
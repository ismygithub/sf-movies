requirejs.config({
  baseUrl: 'js',

  paths: {
  	text: 'lib/text',
    mapsSensor: 'http://maps.google.com/maps/api/js?sensor=false',
    mapsApi: 'http://www.google.com/uds/api?file=uds.js&v=1.0&key=ABQIAAAAjU0EJWnWPMv7oQ-jjS7dYxQ82LsCgTSsdpNEnBsExtoeJv4cdBSUkiLH6ntmAr_5O4EfjDwOa0oZBQ'
  },

  shim: {
    'lib/underscore-min': {
      exports: '_'
    },
    'lib/backbone-min': {
      deps: ['lib/underscore-min']
    , exports: 'Backbone'
    },
    'app': {
      deps: ['lib/underscore-min', 'lib/backbone-min']
    }
  }
});

require([
  'app'
],

function(App) {
  window.uber = new App();
});
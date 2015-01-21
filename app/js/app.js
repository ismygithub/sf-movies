define(['dataprovider', 'mapprovider', 'views/app', 'views/movielist', 'datamodels/movies'],

//set up data models, map, and data provider, provider calls json
function(DataProvider, MapProvider, AppView, MovieListView, Movies) {
  var App = function() {
    this.views.app = new AppView();
    this.views.app.render();

    this.collections.movies = new Movies();

    this.views.movieList = new MovieListView({ collection: this.collections.movies });

    this.setupDataProvider();
    this.setupMapProvider();
  };

    //define prototype
  App.prototype = {
    views: {}
    , collections: {}
    , setupDataProvider : function () {
    	var self = this;
    	this.dataprovider = new DataProvider();
    	this.dataprovider.on('ready', function() {
		   self.collections.movies.fetch({success: function(res) {
		    	self.views.movieList.render();
		   }});
		});
    }
    , setupMapProvider : function () {
    	var self = this;
    	this.mapprovider = new MapProvider();
    	this.mapprovider.on('ready', function() {
		});
    }
  };

  return App;
});
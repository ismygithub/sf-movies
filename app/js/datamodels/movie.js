define(function() {
  var Movie = Backbone.Model.extend({
    Actor1: null
	, Actor2: null
	, Actor3: null
	, Director: null
	, Distributor: null
	, FunFacts: null
	, Location: {}
	, Locations: null
	, ProductionCompany: null
	, ReleaseYear: null
	, Title: ""
  });

  return Movie;
});
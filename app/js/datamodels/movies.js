define(['datamodels/movie'], function(Movie) {
  var Movies = Backbone.Collection.extend({
    model: Movie
  });

  return Movies;
});
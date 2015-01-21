define(['config'], 
//get movie data from moviedata.json
function(config) {
  var movies;

  function DataProvider() {
    this.init();
  }

  _.extend(DataProvider.prototype, Backbone.Events);

  DataProvider.prototype.init = function() {
    var self = this;

    //make ajax call
    $.getJSON("/movies", function(data) {
      movies = data;
      self.trigger('ready');
    })
  };
//using backbone sync to update data info on search bar
  Backbone.sync = function(method, model, options) {
    options || (options = {});

    switch (method) {
      case 'create':
      break;

      case 'update':
      break;

      case 'delete':
      break;

      case 'read':
        options.success(movies)
      break;
    }
  };

  return DataProvider;
});
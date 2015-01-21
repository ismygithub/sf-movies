define(['text!templates/movieitem.html','views/moviedetails'], 

function(template, MovieDetailsView) {
  var MovieItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'movie-item',

    template: _.template(template),

    events: {
      'click': 'open'
    },

    render: function() {
      var $el = $(this.el);
      var modelJson = this.model.toJSON();
      var renderedTemplate = this.template(modelJson);
      $el.html(renderedTemplate);
      return this;
    },

    open: function() {
      var view = new MovieDetailsView({model:this.model});
      var locations = this.model.get("Locations");
      uber.mapprovider.executeSearch(locations);
      view.render();
      return false;
    }
  });

  return MovieItemView;
});
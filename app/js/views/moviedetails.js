define(['text!templates/moviedetails.html'], function(template) {
  var MovieDetailsView = Backbone.View.extend({
    el: '.movie-details',
    tagName: 'div',
    className: 'list-menu-item',

    template: _.template(template),

    events: {
      //'click': 'open'
    },

    initialize: function() {

    },

    render: function() {
      var $el = $(this.el);
      $el.data('listId', this.model.get('id'));
      $el.html(this.template(this.model.toJSON()));
      return this;
    },

    open: function() {
      var self = this;
      
      return false;
    }
  });

  return MovieDetailsView;
});
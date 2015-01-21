define(['views/movieitem'], 

function(MovieItemView) {
  var MovieListView = Backbone.View.extend({
    el: '.movie-list',
    tagName: 'ul',
    className: 'nav nav-list lists-nav',
    filter: null,

    events: {
    },

    initialize: function() {
      var self = this;
      $(".js-movie-search").on("keyup", function(event) {
        self.filter = $(event.currentTarget).val();
        self.render();
      });
    },

    render: function() {
      var $el = $(this.el)
        , self = this;

      var filter = (this.filter + "").toUpperCase();;

      var count = 0;
      $el.empty();
      this.collection.each(function(movie) {
        var title = movie.get("Title").toUpperCase();
        if (filter && title.indexOf(filter) > -1) {
          var item, sidebarItem;
          item = new MovieItemView({ model: movie });
          $el.append(item.render().el);
          count++;
        }
      });
      if (count > 2) {
        $el.parent().css({overflowY:'scroll'})
      }

      return this;
    }
  });

  return MovieListView;
});
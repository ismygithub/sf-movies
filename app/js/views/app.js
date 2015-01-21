define(['text!templates/app.html'],

//display view from templates
function(template) {
  var AppView = Backbone.View.extend({
    id: 'main',
    tagName: 'div',
    className: 'container-fluid',
    el: '#main',
    template: _.template(template),

    render: function() {
      this.$el.html(this.template());
      this.trigger('ready');
      return this;
    }
  });

  return AppView;
});
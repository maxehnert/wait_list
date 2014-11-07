(function () {

  App.Collections.Coffees = Backbone.Collection.extend({
    model: App.Models.Coffee,
    comparator: function (model) {
      return -parseInt(model.get('rating'));
    },
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/coffee-max1'
  });

}());

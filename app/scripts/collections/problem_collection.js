(function () {

  App.Collections.Problems = Backbone.Collection.extend({
    model: App.Models.Problem,
    comparator: function (model) {
      return model.get('created');
    },

    //server URL
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/waitlist-max1'
  });
}());

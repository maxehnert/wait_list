(function () {

  App.Collections.Problems = Backbone.Collection.extend({
    model: App.Models.Problem,

    //default comparator when the page loads
    comparator: function (model) {
      return model.get('created');
    },

    //server URL
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/waitlist-max1'
  });
}());

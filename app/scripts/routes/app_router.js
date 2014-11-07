(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:coffeeID' : 'editCoffee',
      'add' : 'addCoffee',
      'sort/:sortby' : 'home'
    },

    home: function (sortby) {
      new App.Views.ListCoffee({ collection: App.coffees, showTwitter: false, sort: sortby });
    },

    editCoffee: function (coffeeID) {

      var c = App.coffees.get(coffeeID);
      new App.Views.SingleCoffee({ coffee: c });
    },

    addCoffee: function () {

      new App.Views.AddCoffee();

    }

  });

}());

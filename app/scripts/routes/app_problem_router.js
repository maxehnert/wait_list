(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:problemID' : 'editProblem',
      'add' : 'addProblem',
      'sort/:sortby' : 'home'
    },

    home: function (sortby) {
      new App.Views.ListProblem({ collection: App.problems, showTwitter: false, sort: sortby });
    },

    editProblem: function (problemID) {

      var p = App.problems.get(problemID);
      new App.Views.SingleProblem({ problem: p });
    },

    addProblem: function () {

      new App.Views.AddProblem();

    }

  });

}());

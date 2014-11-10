(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:problemID' : 'editProblem',
      'add' : 'addProblem',
      'sort/:sortby' : 'home'
    },

    home: function (sortby) {
      new App.Views.ListProblem({collection: App.problems, sort: sortby});
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

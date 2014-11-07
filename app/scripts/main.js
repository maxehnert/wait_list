(function () {

  // Create Instance of Collection
  App.problems = new App.Collections.Problems();

  // Fetch any server-side problems
  App.problems.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());

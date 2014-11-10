Parse.initialize("ZO4qawRUIEJLDZzd5IgySbKiGd4zBxVlhX0shB29", "ev82Q8YiQdA9Z9V0Z2Wc2lVBR5S3KyJyozQZ3lXq");
(function () {

  // Create Instance of Collection
  App.problems = new App.Collections.Problems();

  // Fetch any server-side problems
  App.problems.fetch().done( function () {

    App.router = new App.Routers.AppRouter();
  });
}());

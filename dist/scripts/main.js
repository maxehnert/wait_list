(function () {

  App.Models.Problem = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      name: '',
      topic: '',
      problem: '',
      rating: ''
    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    }

  });

}());

(function () {

  App.Collections.Problems = Backbone.Collection.extend({
    model: App.Models.Problem,
    comparator: function (model) {
      return -parseInt(model.get('rating'));
    },
    url: 'https://tiy-atl-fe-server.herokuapp.com/collections/waitlist-max1'
  });

}());

(function () {

  App.Views.AddProblem = Backbone.View.extend({

    events: {
      'submit #addProblem' : 'addProblem'
    },

    initialize: function () {
      this.render();
      $('#problemList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());

    },

    addProblem: function (e) {
      e.preventDefault();

      var p = new App.Models.Problem({
        name: $('#problem_name').val(),
        topic: $('#problem_topic').val(),
        problem: $('#problem_problem').val()
      });

      App.problems.add(p).save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());

(function () {

  App.Views.ListProblem = Backbone.View.extend({

    tagName: 'ul',
    className: 'allProblems',

    events: {},

    template: _.template($('#listTemp').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      // Get our Element On Our Page
      $('#problemList').html(this.$el);



    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();

      // Sorting On The Fly
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
        var local_collection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(local_collection, function (p) {
          self.$el.append(self.template(p.toJSON()));
        })
      } else {
        // Sort from our default comparator in our collection constructor
        this.collection.sort();
        this.collection.each(function (p) {
          self.$el.append(self.template(p.toJSON()));
        });
      }


      if (this.options.showTwitter) {
        $('.hero-unit h1 a').html('Twitter');
      } else {
        $('.hero-unit h1 a').html('Wait List');
      }
      return this;
    }

  });

}());

(function () {

  App.Views.SingleProblem = Backbone.View.extend({

    tagName: 'ul',
    className: 'problemSingle',

    events: {
      'submit #updateInfo' : 'updateInfo',
      'click #delete' : 'deleteInfo'
    },

    template: _.template($('#informationTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#problemForm').empty();

      // Get our Element On Our Page
      $('#problemList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

    this.$el.html(this.template(this.options.problem.toJSON()));

    },

    updateInfo: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.problem.set({
        name: $('#update_name').val(),
        topic: $('#update_topic').val(),
        problem: $('#update_problems').val(),
        rating: $('input[name="rating"]:checked').val()
      });

      // Save Instance
      this.options.problem.save();

      //Todo - Check on promise
      App.router.navigate('', {trigger: true});

    },

    deleteInfo: function (e) {
      e.preventDefault();

      // Remove problem
      this.options.problem.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

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

(function () {

  // Create Instance of Collection
  App.problems = new App.Collections.Problems();

  // Fetch any server-side problems
  App.problems.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());
(function () {

  App.Models.Problem = Parse.Object.extend({

    className: 'Problem',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      topic: '',
      problem: '',
      counter: '',
      time: '',
      rating: '',
      created: ''
    },

    initialize: function () {
      var t = this.get('name');
    }
  });
}());

(function () {

  App.Collections.Problems = Parse.Collection.extend({
    model: App.Models.Problem,

    //default comparator when the page loads
    comparator: function (model) {
      return model.get('created');
    }

    //server URL
    //url: 'https://tiy-atl-fe-server.herokuapp.com/collections/waitlist-max1'
  });
}());

(function () {

  App.Views.AddProblem = Parse.View.extend({

    events: {
      'submit #addProblem' : 'addProblem'
    },

    initialize: function () {
      this.render();
      $('#problemList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').fadeIn('fast').html());

    },

    addProblem: function (e) {
      e.preventDefault();

      //cannot submit new problem without filling out the form complete
      if(
        $('#problem_name').val() === '' || $('#problem_problem').val() === ''){
        return false;
      }

      var p = new App.Models.Problem({
        name: $('#problem_name').val(),
        topic: $('#problem_topic').val(),
        problem: $('#problem_problem').val(),
        counter: $('.accordian').length,
        time: moment().fromNow(),
        created: moment().format('MMMM Do YYYY, h:mm:ss a')
      });

      // App.problems.add(p).save(null, {
      //   success: function () {
      //     App.router.navigate('', { trigger: true });
      //   }
      // });

      p.save(null, {
        success: function(){
          App.problems.add(p);
          App.router.navigate('', {trigger: true});
        }
      });
    },
  });
}());

(function () {

  App.Views.ListProblem = Parse.View.extend({

    tagName: 'ul',
    className: 'allProblems',

    events: {
      'mouseover .js-accordion-trigger' : 'openA',
      'mouseout .js-accordion-trigger' : 'closeA',
      'click .backbtn' : 'backPage'
      //'click #delete' : 'deleteInfo'
    },

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
        var local_collection = this.collection.sortBy(function(model){
          return model.get(self.options.sort);
        });
        _.each(local_collection, function (p) {
          self.$el.append(self.template(p.toJSON()));
        })
      }
      else {
        // Sort from our default comparator in our collection constructor
        this.collection.sort();
        this.collection.each(function (p) {
          self.$el.append(self.template(p.toJSON()));
        });
      }
      return this;
    },

    openA: function(e){
      e.preventDefault();
      $(e.target).parent().find('.submenu').slideToggle('fast');
      // apply the toggle to the ul
      $(e.target).parent().toggleClass('is-expanded');
    },

    closeA: function(e){
      e.preventDefault();
      $(e.target).parent().find('.submenu').slideToggle('fast');
      // apply the toggle to the ul
      $(e.target).parent().toggleClass('is-expanded');
    },

    backPage: function(e){
      e.preventDefault();
      window.History.back();
      console.log('test');
    }
  });
}());

(function () {

  App.Views.SingleProblem = Parse.View.extend({

    tagName: 'ul',
    className: 'problemSingle',

    events: {
      'submit #updateInfo' : 'updateInfo',
      'click #delete' : 'deleteInfo'
    },

    //create a template from html script
    template: _.template($('#informationTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      //empty the form after submission
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

      //cannot update form unless complete
      if(
        $('#update_name').val() === '' || $('#update_problem').val() === ''){
        return false;
      }

      // Update our Model Instance
      this.options.problem.set({
        name: $('#update_name').val(),
        topic: $('#update_topic').val(),
        problem: $('#update_problem').val(),
        rating: $('input[name="rating"]:checked').val()
      });

      // Save Instance
      this.options.problem.save();

      //change url tag
      App.router.navigate('', {trigger: true});
    },

    deleteInfo: function (e) {
      e.preventDefault();

      // Remove the problem
      this.options.problem.destroy();

      // REturn to Home Page
      App.router.navigate('', {trigger: true});
    }
  });
}());

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

Parse.initialize("ZO4qawRUIEJLDZzd5IgySbKiGd4zBxVlhX0shB29", "ev82Q8YiQdA9Z9V0Z2Wc2lVBR5S3KyJyozQZ3lXq");
(function () {

  // Create Instance of Collection
  App.problems = new App.Collections.Problems();

  // Fetch any server-side problems
  App.problems.fetch().done( function () {

    App.router = new App.Routers.AppRouter();
  });
}());

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

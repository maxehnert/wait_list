(function () {

  App.Views.SingleProblem = Backbone.View.extend({

    tagName: 'ul',
    className: 'problemSingle',

    events: {
      'submit #updateInfo' : 'updateInfo',
      'click #delete' : 'deleteInfo',
      'mouseover #delete' : 'AreYouSure'
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

      //Todo - Check on promise
      App.router.navigate('', {trigger: true});

    },

    deleteInfo: function (e) {
      e.preventDefault();

      // Remove problem
      this.options.problem.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    },

    AreYouSure: function(){
      $('#delete').tooltip();
    }

  });

}());

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

      App.problems.add(p).save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });
    },
  });
}());

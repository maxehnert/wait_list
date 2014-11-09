(function () {

  App.Models.Problem = Backbone.Model.extend({

    idAttribute: '_id',

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
      //console.log(t + " has been added");
    }

  });

}());

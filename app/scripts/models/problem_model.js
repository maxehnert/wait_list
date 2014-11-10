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

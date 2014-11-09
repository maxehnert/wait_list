(function () {

  App.Models.Coffee = Backbone.Model.extend({

    idAttribute: '_id',

    defaults: {
      name: '',
      brand: '',
      comments: '',
      count: '',
      rating: ''
    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    }

  });

}());

(function () {

  App.Views.AddCoffee = Backbone.View.extend({

    events: {
      'submit #addCoffee' : 'addCoffee'
    },

    initialize: function () {
      this.render();

      $('#coffeeList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addCoffee: function (e) {
      e.preventDefault();

      var c = new App.Models.Coffee({
        name: $('#coffee_name').val(),
        brand: $('#coffee_brand').val()
      });

      App.coffees.add(c).save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());

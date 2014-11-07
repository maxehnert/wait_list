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

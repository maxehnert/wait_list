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

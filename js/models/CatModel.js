define(["backbone"], function (Backbone) {

  var CatModel = Backbone.Model.extend({

    defaults: {
      votes: 0
    },

    rankUp: function () {
      this.set({rank: this.get('rank') - 1});
    },

    addVote: function () {
      this.set('votes', this.get('votes') + 1);
    },

    rankDown: function() {
      this.set({rank: this.get('rank') + 1});
    }

  });

  return CatModel;
});
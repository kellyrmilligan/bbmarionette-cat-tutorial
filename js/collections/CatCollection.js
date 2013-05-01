define(["backbone", "models/CatModel", "vent"], function (Backbone, CatModel, vent) {

  var CatCollection = Backbone.Collection.extend({

    model: CatModel,

    initialize: function (cats) {
      var rank = 1;

      _.each(cats, function(cat){
        cat.set('rank', rank);
        rank++;
      });

      vent.on('rank:up', this.rankUp.bind(this));

      vent.on('rank:down', this.rankDown.bind(this));

      vent.on("cat:disqualify", this.disqualify.bind(this));

      this.on('add', function (cat) {
        if( ! cat.get('rank') ) {
          var error =  Error("Cat must have a rank defined before being added to the collection");
          error.name = "NoRankError";
          throw error;
        }
      });
    },

    comparator: function (cat) {
      return cat.get('rank');
    },

    rankUp: function (cat) {

      if (cat.get('rank') === 1){
        return true;
      }

      var rankToSwap = cat.get('rank') - 1,
          otherCat = this.at(rankToSwap - 1);

      cat.rankUp();
      otherCat.rankDown();
      this.sort()
    },

    rankDown: function (cat) {
      if (cat.get('rank') == this.size()) {
        return true;
      }
      var rankToSwap = cat.get('rank') + 1,
          otherCat = this.at(rankToSwap - 1);
      cat.rankDown();
      otherCat.rankUp();
      this.sort();
    },

    disqualify: function (cat) {
      var disqualifiedRank = cat.get('rank'),
          catsToUprank = this.filter(
            function(cat){
              return cat.get('rank') > disqualifiedRank;
            }
          );
      catsToUprank.forEach(function(cat){
        cat.rankUp();
      });
      this.trigger('reset');
    }

  });

  return CatCollection;
});
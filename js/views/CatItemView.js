define(["marionette", "hbs!templates/cat-item", 'vent'], function (Marionette, CatItemTemplate, vent) {

  var CatItemView = Marionette.ItemView.extend({
    template: CatItemTemplate,
    tagName: 'tr',
    className: 'angry-cat',
    events: {
      'click .rank_up img': 'rankUp',
      'click .rank_down img': 'rankDown',
      'click .disqualify': 'disqualify'
    },

    initialize: function () {
      this.listenTo(this.model, "change:votes", this.render);
    },

    rankUp: function () {
      this.model.addVote();
      vent.trigger("rank:up", this.model);
    },

    rankDown: function () {
      this.model.addVote();
      vent.trigger("rank:down", this.model);
    },

    disqualify: function () {
      vent.trigger("cat:disqualify", this.model);
      this.model.destroy();
    }
  });

  return CatItemView;
});
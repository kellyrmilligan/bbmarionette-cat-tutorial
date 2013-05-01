define(["marionette", "views/CatItemView", "hbs!templates/cat-collection"], function (Marionette, CatItemView, CatCollectionTemplate) {

  var CatCompositeView = Marionette.CompositeView.extend({
    template: CatCollectionTemplate,
    tagName: 'table',
    id: 'angry-cats',
    className: 'table-striped table-bordered',
    itemView: CatItemView,

    itemViewContainer: "tbody",

    initialize: function () {
      this.listenTo(this.collection, "sort", this.render);
    }

  });

  return CatCompositeView;
});
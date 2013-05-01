define(["marionette", "views/CatCompositeView"], function (Marionette, CatCompositeView) {

  var app = new Marionette.Application();

  app.addRegions({
    mainRegion: '#content'
  });

  app.addInitializer(function(options){
    var catCompositeView = new CatCompositeView({
      collection: options.cats
    });

    app.mainRegion.show(catCompositeView);

  });

  return app;
});
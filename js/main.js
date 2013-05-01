require.config({
  paths : {
    backbone : 'lib/backbone-min',
    underscore : 'lib/underscore-min',
    jquery : 'lib/jquery.min',
    marionette : 'lib/backbone.marionette',
    'backbone.wreqr' : 'lib/backbone.wreqr',
    'backbone.babysitter' : 'lib/backbone.babysitter',
    hbs : 'lib/hbs',
    Handlebars : 'lib/Handlebars'
  },
  shim : {
    jquery : {
      exports : 'jQuery'
    },
    underscore : {
      exports : '_'
    },
    backbone : {
      deps : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'backbone.wreqr': {
      deps : ['backbone']
    },
    'backbone.babysitter': {
      deps : ['backbone']
    }
  },

  hbs: {
    disableI18n: true,

    disableHelpers: true

  }
});



require(["models/CatModel", "collections/CatCollection", "app"], function (CatModel, CatCollection, app) {

  $(function() {
    var cats = new CatCollection([
      new CatModel({ name: 'Wet Cat', image_path: 'assets/images/cat2.jpg' }),
      new CatModel({ name: 'Bitey Cat', image_path: 'assets/images/cat1.jpg' }),
      new CatModel({ name: 'Surprised Cat', image_path: 'assets/images/cat3.jpg' })
    ]);

    app.start({cats: cats});

    cats.add(new CatModel({
      name: 'Cranky Cat',
      image_path: 'assets/images/cat4.jpg',
      rank: cats.size() + 1
    }));

  });

});
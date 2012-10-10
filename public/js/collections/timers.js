(function () {
  
  App.Collections.Timers = Backbone.Collection.extend({

    models:App.Models.Timer,
    url: 'timers',
    socket:window.socket,

    initialize: function () {
      _.bindAll(this, 'serverCreate', 'collectionCleanup');
      this.ioBind('create', this.serverCreate, this);
    },
    serverCreate: function (data) {
      // make sure no duplicates, just in case
      var exists = this.get(data.id);
      if (!exists) {
        this.add(data);
      } else {
        data.fromServer = true;
        exists.set(data);
      }
    },
    collectionCleanup: function (callback) {
      this.ioUnbindAll();
      this.each(function (model) {
        model.modelCleanup();
      });
      return this;
    }

  });

})();

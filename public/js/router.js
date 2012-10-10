(function() {
  var Home = {
    routes: {
      // Define some URL routes
      '!/': 'home'
    },
    home: function() {
      // We have no matching route, lets display the home page
      if(typeof this.currentView !=='undefined'){
          this.currentView.close();
      }
      App.currentView = App.views.main = new App.Views.Main();
      
      $('#main-view').html(App.views.main.render());
      // FIXME: This is not working, should leave this item in the header active
       
    },
  }

  App.Routers.Home = Backbone.Router.extend(Home);
})();
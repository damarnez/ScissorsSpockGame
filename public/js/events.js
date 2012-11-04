(function() {
   var self = this;
  
 //START GAME 
  window.socket.on('NEW_GAME', function (data) {
      //console.log(data);
      // We have no matching route, lets display the home page
      // if(typeof App.currentView !=='undefined'){
      //     App.currentView.close();
      // }
      App.currentView = App.views.play = new App.Views.Play();
      self.$("#content").empty();
      self.$('#content').html(App.views.play.render());
     
  });
  window.socket.on('FINISH_ROUND', function (data) {
      console.log(data);  
      self.$("#content").empty();
      App.currentView = App.views.win = new App.Views.Win({user:data});
      self.$('#content').html(App.currentView.render());
  });
  
})();
//Socket IO
if(typeof window.socket==='undefined')
  window.socket = io.connect('http://'+window.location.host);
//Backbone

window.App = {
  models: {},
  Models: {},
  collections: {},
  Collections: {},
  views: {griddevices:[]},
  Views: {GridDevices:[]},
  routers: {},
  Routers: {},
  login:false,
  currentView:null
}




$(function() {

  // **** Socket IO
   window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console) {
      arguments.callee = arguments.callee.caller;
      var newarr = [].slice.call(arguments);
      (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
  };

  

  /**************** Custom function *********/

  Backbone.View.prototype.close = function(){
    this.remove();
    this.unbind();
    if (this.onClose){
      //This si for customize
      this.onClose();
    }
  }
  //id value is _id (Mongo)
  //Backbone.Model.prototype.idAttribute = "_id";

  /******************************************/
  App.collections.users = new App.Collections.Users();
  App.collections.timers = new App.Collections.Timers();
  
 

  if (window.location.hash === '') {
    window.location.hash = '#!/';
  }
  //initialing router..
  App.routers.home = new App.Routers.Home();
  Backbone.history.start();


});
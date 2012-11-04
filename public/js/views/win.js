(function() {
	var win = {

		events :{ 
			"click .next":"nextRound"
		},
		nextRound:function(e){
			//App.currentView = App.views.play = new App.Views.Play();
		    this.$("#content").empty();
		    window.socket.emit("NEW_GAME",null);
		},
		initialize:function(data) {
			console.log(data);
			this.win_user = data.user;
		}, 
		render:function() {
		    var self = this; 
		 	//Render main home
			$.get("/templates/home/win.html", function(mainTemplate) {
				var _users = App.collections.users.toJSON();
				console.log(self.win_user);
				var data = {
					_: _ ,
					user:self.win_user
				};
				var compiledTemplate = _.template(mainTemplate, data);
				$(self.el).html(compiledTemplate);
			});//TEMPLATE MAIN
			 
			return self.el;
		}
	};
	App.Views.Win = Backbone.View.extend(win);
})();
(function() {
	var wait = {

		events :{ 
			"click .next":"nextRound"
		},
		nextRound:function(e){
			App.currentView = App.views.play = new App.Views.Play();
		    this.$("#content").empty();
		    this.$('#content').html(App.views.play.render());
		},
		initialize:function(user) {
			this.user = user;
		}, 
		render:function() {
		    var self = this; 
		 	//Render main home
			$.get("/templates/home/win.html", function(mainTemplate) {
				var _users = App.collections.users.toJSON();
				var data = {
					_: _,
					user:self.user
				};
				var compiledTemplate = _.template(mainTemplate, data);
				$(self.el).html(compiledTemplate);
			});//TEMPLATE MAIN
			 
			return self.el;
		}
	};
	App.Views.Wait = Backbone.View.extend(wait);
})();
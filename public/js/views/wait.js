(function() {
	var wait = {

		events :{ 

		},
		initialize:function() {

		}, 
		render:function() {
		    var self = this; 
		 	//Render main home
			$.get("/templates/home/wait.html", function(mainTemplate) {
				var _users = App.collections.users.toJSON();
				var data = {
					_: _,
					users:_users
				};
				var compiledTemplate = _.template(mainTemplate, data);
				$(self.el).html(compiledTemplate);
			});//TEMPLATE MAIN
			 
			return self.el;
		}
	};
	App.Views.Wait = Backbone.View.extend(wait);
})();
(function() {
	var listUsers = {

		events :{ 

		},
		initialize:function() {
			App.collections.users.ioBind('add', this.render, this);
			App.collections.users.ioBind('delete', this.render, this);
			App.collections.users.ioBind('update', this.render, this);
 		}, 
		render:function() {
		     
			var self = this;
			App.collections.users.fetch({success:function(){
				//Render main home
				$.get("/templates/home/list_users.html", function(mainTemplate) {
					var _users = App.collections.users.toJSON();
					var data = {
						_: _,
						users:_users
					};
					var compiledTemplate = _.template(mainTemplate, data);
					$(self.el).html(compiledTemplate);
				});//TEMPLATE MAIN
			}});
			 
			return self.el;
		}
	};
	App.Views.ListUsers = Backbone.View.extend(listUsers);
})();
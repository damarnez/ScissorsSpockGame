(function() {
	var Main = {

		events :{ 
			'click .btn-primary':'saveUser'
		},
		initialize:function() {
			  App.views.listUsers = new App.Views.ListUsers();

		},saveUser:function(){
			var self = this;
			var new_user = new App.Models.User({name:$("#user_name").val()});
		    new_user.save({},{
		        success: function (model, response) {
		        	console.log("success");
		            localStorage.id_user = model.id;
		            App.login = true;
		            App.views.wait = new App.Views.Wait();
		            self.$("#content").empty();
		        	self.$("#content").html(App.views.wait.render());
		        }
   			 });
		 	 
		},
		render:function() {

			var self = this;
			$.get("/templates/home/content.html", function(mainTemplate) {

				var compiledTemplate = _.template(mainTemplate);
				$(self.el).html(compiledTemplate);

				//Render users
				self.$("#users").html(App.views.listUsers.render());

				//If the user is new
	    		$.get("/templates/home/login.html", function(mainTemplate) {
					var _users = App.collections.users.toJSON();
					var data = {
						_: _,
						users:_users
					};
					var compiledTemplate = _.template(mainTemplate, data);
					self.$("#content").html(compiledTemplate);
				});//TEMPLATE LOGIN
		 
			});//TEMPLATE CONTENT	
			return self.el;
		},
		renderTime:function() {
			console.log("ist time date:"+App.collections.timers.length);
		}

	};
	App.Views.Main = Backbone.View.extend(Main);
})();
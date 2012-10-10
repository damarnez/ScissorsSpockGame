(function() {
	var play = {

		events :{ 
			'click .select':'new_select'
		},
		initialize:function() {

		}, 
		new_select:function(e){
			var id_item = $(e.currentTarget).data("item");
			App.models.item = new App.Models.Item({item:id_item});
			App.models.item.save({},{
		        success: function (model, response) {
		        	console.log("success");
		            App.login = true;
		            App.views.wait = new App.Views.Wait();
		            self.$("#content").empty();
		        	self.$("#content").html(App.views.wait.render());
		        }
   			});
			console.log("save");
		},
		render:function() {
		    var self = this; 
		 	//Render main home
			$.get("/templates/home/play.html", function(mainTemplate) {
				var _users = App.collections.users.toJSON();
				var data = {
					_: _,
					users:_users
				};
				var compiledTemplate = _.template(mainTemplate, data);
				$(self.el).html(compiledTemplate);
			});//TEMPLATE MAIN
			 console.log("llega aqui?");
			return self.el;
		}
	};
	App.Views.Play = Backbone.View.extend(play);
})();
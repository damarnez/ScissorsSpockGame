var _ = require("underscore");
//ROUTER.JS
module.exports = function(app,io){
	var MAXUSERS = 2;
	//array in memory active users
	var active_users = [];
	var count_id = 0;
	var items = [];
	/*
	Example Backbone.IO call sockets
	posts:create
	posts:read
	posts:update
	posts/id:update
	posts:delete
	
	*/
	io.sockets.on('connection', function(socket) {
	    console.log("--- io.sockets.on connection");
	  
	    /******************** ON DISCONNECT ****************************/
	    socket.on('disconnect', function () {
			//This function is for disable users	
			if(typeof socket.id_user !== 'undefined'){
				//var user =  active_users[socket.id_user];
				//console.log(user);
				//delete active_users[socket.id_user];
				var _new = [];
				var _user ;
				var new_active_users = _.clone(active_users);
				_.each(new_active_users,function(user){
					if(typeof user !=='undefined' && user.id !== socket.id_user){
						console.log(user);
						_new.push(user);
					}else{
						if(user.id === socket.id_user){
							_user = user;
						}
					}
				});
				active_users = _.clone(_new);
				console.log(active_users);
				//If users is disconnected delete the user
				socket.emit('users:delete', _user);
				socket.broadcast.emit('users:delete',_user);
				console.log(active_users);
				
				
			}
		});

	    //************* Users *********************************
	 	socket.on('users:create', function (data,callback) {
			console.log("user:create");
	    	var _user = {};
	    	_user.id = count_id;
	    	count_id = count_id +1;
	    	_user.name = data.name;
	    	_user.img = "user_"+Math.floor((Math.random()*6)+1)+".jpeg";	
	    	_user.lives = 3;
	    	//Related socket width user
			socket.id_user = _user.id
			active_users.push(_user);

			//Response ok
		 	socket.emit('users:create', active_users);
		    socket.broadcast.emit('users:create',active_users);

		    callback(null, active_users);
		    if (active_users.length === MAXUSERS){
			    	console.log("Socket -> NEW_GAME");
					socket.emit('NEW_GAME', active_users);
			   		socket.broadcast.emit('NEW_GAME',active_users);
			}else{
	     		console.log(active_users.length);
	     	}
			
		});
		socket.on('users:read', function (data,callback) {
			console.log("user:read"); 

			var _new = [];
			var new_active_users = _.clone(active_users);
			_.each(new_active_users,function(user){
				if(typeof user !=='undefined'){
					console.log(user);
					_new.push(user);
				}
			});
			active_users = _.clone(_new);
			callback(null, active_users);
		}); 	
		socket.on('users:update', function (data,callback) {
			console.log("UPDATE");
		});
		socket.on('users:delete', function (data,callback) {
			console.log("DELETE");
		});

		//************* ITEM *************************************
		socket.on('items:create', function (data,callback) {

		  	console.log(data);
		  	data.id_user = socket.id_user;
			items.push(data);
			socket.broadcast.emit('items:create',data);
			callback(null, data);
			console.log("add? "+socket.id_user);
			console.log("items --->"+items.length); 

			var new_items =[];

			if(items.length === MAXUSERS){
				console.log("FINISH ROUND");
				console.log("LOGICA");

				_.each(items,function(it){
						
					/*
						1 - Scissors
						2 - Paper
						3 - Rock
						4 - Lizard
						5 - Spock
					*/	
					var points ;


					switch(it.item){
						case 1: //Scissors
							points = _.filter(items,function(item){
								//LOSE ROCK(3) and SPOCK(5)
								if(item.item == 3 || item.item == 5){
									return item;
								}
							});

							break;
						case 2: //PAPER
							points = _.filter(items,function(item){
								//LOSE SICSSORS(1) and LIZARD(4)
								if(item.item == 1 || item.item == 4){
									return item;
								}
							});
							break;
						case 3: //Rock
							points = _.filter(items,function(item){
								//LOSE PAPER(2) and SPOCK(5)
								if(item.item == 2 || item.item == 5){
									return item;
								}
							});
							break;
						case 4: //Lizard
							points = _.filter(items,function(item){
								//LOSE ROCK(3) and SCISSORS(1)
								if(item.item == 3 || item.item == 1){
									return item;
								}
							});
							break;	
						case 5:
							points = _.filter(items,function(item){
								//LOSE PAPER(2) and LIZARD(4)
								if(item.item == 2 || item.item == 4){
									return item;
								}
							});
							break;
						default:
							console.log("No option found ");
							break;				
					};
					 
					it.negative = points.length;
					new_items.push(it);
					
				});
				console.log(new_items);
				//NOW searc the user width min negatives
				var win_user = _.min(new_items,function(item){return item.item});
				
				socket.emit('FINISH_ROUND', win_user);
			   	socket.broadcast.emit('FINISH_ROUND',win_user);
			   	//If all is ok show this.
			   	items = [];
			}

		});
		socket.on('items:update', function (data,callback) {
			console.log("UPDATE");
		});
		socket.on('items:delete', function (data,callback) {
			console.log("DELETE");
		});
		socket.on('items:read', function (data,callback) {
		
		});

	});

	app.get('/', function(request, response) {
   		response.render('index.html');
	});	 
		
};

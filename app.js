var express = require("express");

var app = express()
  , mongooseInit = require('./lib/mongoose_init')
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

//Socket message off 
io.set('log level', 1);

//mongooseInit.connect();
 
app.configure(function(){
	//app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: "catwalk" }));
	// app.use(passport.initialize());
	// app.use(passport.session());
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/public');
	app.set("view options", { layout: false });
	app.engine('html', require('ejs').renderFile);
	app.use(app.router);
	app.use(function(err, req, res, next){
	  // if an error occurs Connect will pass it down
	  // through these "error-handling" middleware
	  // allowing you to respond however you like
	  res.send(500, { error: 'Sorry something bad happened!' });
	});
});

/* Router */
require('./lib/router')(app,io);

server.listen(3002);
 




 

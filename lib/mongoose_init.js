var mongoose = require('mongoose');

module.exports = (function() {

	var connected = false;

	return {
		connect: function(connectionString) {
			if (!connected) {
				connectionString = connectionString || 'mongodb://localhost/scissors3';
				mongoose.connect(connectionString);
				connected = true;	
			}
		}
	};
}());
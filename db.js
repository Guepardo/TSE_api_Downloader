var mongoose = require("mongoose"); 

module.exports = function(){
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/tse'); 

	var db = mongoose.connection; 
	db.on('error', console.error.bind(console,'connection error: ')); 

	db.on('open', function(){
		console.log('Mongo up'); 
	}); 
}; 

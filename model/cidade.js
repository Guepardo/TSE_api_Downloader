var mongoose = require('mongoose'); 

var schema = mongoose.Schema({
	codigo    : {type: String, unique: true}, 
	nome      : {type: String}, 
	estado    : {type: String}, 
	index     : {type: Boolean, default: false}
}); 

module.exports = mongoose.model('Cidade', schema ); 
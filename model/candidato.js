var mongoose = require('mongoose'); 

var schema = mongoose.Schema({
	codigo    : {type: String, unique: true}, 
	nome      : {type: String}, 
	cargo     : {type: String}, 
	cidade    : {type: mongoose.Schema.Types.ObjectId, ref: 'Cidade'}, 
	numero    : {type: Number}, 
	partido   : {type: String}, 
	situacao  : {type: String}, 
	grauInstru: {type: String}, 
	bens      : {type: Number}, 
	sexo      : {type: String},
	raca      : {type: String}, 
	ocupacao  : {type: String}, 
	index     : {type: Boolean, default: false}
}); 

module.exports = mongoose.model('Candidato', schema ); 
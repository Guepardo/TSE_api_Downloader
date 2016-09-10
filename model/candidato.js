var mongoose = require('mongoose'); 

var schema = mongoose.Schema({
	codigo    : {type: String, unique: true}, 
	cargo     : {type: String}, 
	cidade    : {type: mongoose.Schema.Types.ObjectId, ref: 'Cidade'}, 
	numero    : {type: Number}, 
	partido   : {type: String}, //tenho
	nome      : {type: String}, 
	situacao  : {type: String}, 
	grauInstru: {type: String}, 
	bens      : {type: Number}, 
	sexo      : {type: String},
	raca      : {type: String}, 
	estado    : {type: String, default: null}, 
	ocupacao  : {type: String}, 
	index     : {type: Boolean, default: false}
}); 

module.exports = mongoose.model('Candidato', schema ); 
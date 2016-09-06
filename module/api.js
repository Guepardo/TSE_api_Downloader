var request = require('sync-request'); 

var Api = function(){}; 

Api.prototype.sender = function(url){

	var statusCode = true; 
	var response; 

	do{
		console.log("Aguardando para o próximo request"); 
		this.sleep(200 * 3 ); 
		response = request('GET', url,{
			timeout: 1000 * 3, 
			retry : true
		});

		statusCode = response.statusCode; 

		console.log('requisição status: '+ statusCode); 

	}while(statusCode != 200 ); 

	return JSON.parse(response.getBody());  
}

Api.prototype.municipios = function(siglaEstado){
	var url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/eleicao/buscar/'+siglaEstado+'/2/municipios'; 
	return this.sender(url); 
}; 

Api.prototype.prefeitos = function(idCidade){
	var url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/'+idCidade+'/2/11/candidatos'; 
	return this.sender(url); 
}; 

Api.prototype.vicePrefeitos = function(idCidade){
	var url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/'+idCidade+'/2/12/candidatos'; 
	return this.sender(url); 
}; 

Api.prototype.vereadores = function(idCidade){
	var url = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/'+idCidade+'/2/13/candidatos'; 
	return this.sender(url); 
}; 

Api.prototype.sleep = function (milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}; 


module.exports = new Api(); 
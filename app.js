var db        = require('./db')(); 
var api 	  = require('./module/api'); 

var Candidato = require('./model/candidato'); 
var Cidade    = require('./model/cidade'); 

var siglaEstados = [
'AC',
'AL',
'AP',
'AM',
'BA',
'CE',
'DF',
'ES',
'GO',
'MA',
'MT',
'MS', 
'MG',
'PA',
'PB',
'PR',
'PE',
'RJ',
'RN',
'RS',
'RO',
'RR',
'SC',
'SP',
'SE',
'TO'
]; 	



function start(){
	console.log('começando'); 

	//Registrando cidades
	// for(sigla of siglaEstados){
	// 	var result = api.municipios(sigla); 

	// 	for(cidade of result.municipios){
	// 		console.log(cidade.nome); 

	// 		var cidade = new Cidade({
	// 			codigo: cidade.codigo, 
	// 			nome   : cidade.nome, 
	// 			estado: sigla
	// 		}); 

	// 		cidade.save(function(error, ci){
	// 			if(error)console.log(error.errmsg); 

	// 			console.log(ci); 
	// 		}); 
	// 	}
	// }

	

	Cidade.count({estado: 'SP', index: false}, function(err, count){
		console.log('concluído '+ count +' capturadas'); 
	}); 


	Cidade.find({
		index : false, 
		estado: 'SP'
	}). 
	limit(100).
	exec((error, cidades) =>{
		if(error){
			console.log(error.errmsg); 
			return;
		}; 

		console.log('Recuperando canditados para cada cidade'); 

		var count = 0; 
		for(cidade of cidades){
			if(cidade.index){
				console.log('Cidade ' + cidade.nome+ 'Já foi indexada'); 
				continue;
			}	

			console.log('-------'+cidade.nome+' numero '+ ++count +'--------'); 

			console.log('Recuperando prefeitos');
			var prefeitos = api.prefeitos(cidade.codigo);  

			for(prefeito of prefeitos.candidatos){
				console.error(prefeito.nomeCompleto); 
				var candidato = new Candidato({
					codigo    : prefeito.id, 
					cargo     : prefeito.cargo.nome,
					cidade    : cidade._id, 
					numero    : prefeito.numero, 
					partido   : prefeito.partido.sigla, 
				}); 

				candidato.save(function (error, ci){
					if(error)console.log(error.errmsg); 

					console.log(ci); 
				}); 
			}

			console.log('Recuperando vice-prefeitos'); 
			var vices = api.vicePrefeitos(cidade.codigo);  
			for(vice of vices.candidatos){
				console.log(vice.nomeCompleto); 
				var candidato = new Candidato({
					codigo    : vice.id, 
					cargo     : vice.cargo.nome,
					cidade    : cidade._id, 
					numero    : vice.numero, 
					partido   : vice.partido.sigla, 
				}); 

				candidato.save(function(error, ci){
					if(error)console.log(error.errmsg); 

					console.log(ci); 
				}); 
			}

			console.log('Recuperando vereadores'); 
			var vereadores = api.vereadores(cidade.codigo);  
			for(vereador of vereadores.candidatos){
				console.log(vereador.nomeCompleto); 
				var candidato = new Candidato({
					codigo    : vereador.id, 
					cargo     : vereador.cargo.nome,
					cidade    : cidade._id, 
					numero    : vereador.numero, 
					partido   : vereador.partido.sigla, 
				}); 

				candidato.save(function(error, ci){
					if(error)console.log(error.errmsg); 

					console.log(ci); 
				}); 
			}

			cidade.index = true; 
			Cidade.findOne({
				_id : cidade._id
			}). 
			exec(function(error, ci){
				if(error) console.log(error.errmsg); 

				ci.index = true; 
				ci.save(); 
			}); 
		}
	}); 

}


setTimeout(start, 1000 * 3 ); 
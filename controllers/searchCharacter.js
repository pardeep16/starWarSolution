

var querySearch=require('.././searchPatternsApis/searchCharactersFromAPI');
var apiUrl="https://swapi.co/api/people/";
var planetApi="https://swapi.co/api/planets/";
var searchCharacter=function(req,res,next){
	var query=req.params.name;

	if(query){
		querySearch.findPossiblePatterns(query,function(err,result){
			if(err){
				res.send(err);
			}
			else{
		//res.send(result);
//
				res.render('character',{
					"result":result
				});
			}	
		});
	}
	else{
		res.send({"status":false,"data":[]});
	}
}

var getCharacters=function(req,res,next){
	var query="";
	if(req.query){
		query=req.query.sort;
	}
	querySearch.getCharactersFromStarWar(req,apiUrl,query,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
}

var getResidents=function(req,res,next){
	querySearch.getResidentsData(req,planetApi,function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
}




module.exports={
	searchCharacter:searchCharacter,
	getCharacters:getCharacters,
	getResidents:getResidents
}


"use strict";

var apiUrl="https://swapi.co/api/people/";
var request=require('request');
var pagination = require('pagination');

var LocalStorage = require('node-localstorage').LocalStorage;

//var obj=require('./data');
class Records {
	constructor(){
		this.total_Record = 0;
	this.page_Size  = 10;
	this.page_Count = 0;
    this.start_Page      = 0;
	this.current_Page = 1;
	this.limit_all_records=50;
	this.next_url="";
	this.updateData=new Array();
	}

	updateRecords(record){
		this.total_Record=this.total_Record+record;
	}

	getTotalRecords(){
		return this.total_Record;
	}

	updateNextUrl(url){
		this.next_url=url;
	}
	getNextUrl(){
		return this.next_url;
	}

	updateItems(item){
		this.updateData.push(item);
	}

	getAllItems(){
		return this.updateData;
	}

	sortAllItems(query){
		if(typeof query==="undefined"){
			
		}
		else{
			console.log(query.toLowerCase().toString());
		switch(query.toLowerCase().toString()){
			case "name":
				this.updateData.sort(function(a,b){
					var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
 					if (nameA < nameB){ //sort string ascending
  						return -1;
  					}
 					if (nameA > nameB){
  						return 1;
  					}
  					return 0;
 					
				});
				break;
			case "mass":
			this.updateData.sort(function(a,b){
				var mass1=a.mass.replace(/,/g, "");
				var mass2=b.mass.replace(/,/g, "");
				var m1=parseInt(mass1);
				var m2=parseInt(mass2);
				return m1-m2;
			});
			break;
			case "height":
			this.updateData.sort(function(a,b){
				var height1=a.height;
				var height2=b.height;
				var h1=parseInt(height1);
				var h2=parseInt(height2);
				return h1-h2;
			});
			break;
		}
		}
		
	}

	paginated(req,cb){
		
		/*console.log(localforage);
		var store = localforage.createInstance({
  		name: "keyvaluepairs"
		});*/

		cb(null,{"status":true,"total_Record":this.total_Record,"results":this.updateData});

		
	}
}



class Planets {
	constructor(){
		this.totatRecord=0;
		this.nextUrl="";
		this.planedata={};
		this.planetResData=new Array();

		this.planetWithCharData=new Array();
		this.residents=new Array();
	}

	updateCharData(data){
		this.planetResData.push(data);
	}
	getTotalData(){
		return this.planetResData;
	}
	getTotalRecords(){
		return this.totatRecord;
	}

	getNext(){
		return this.nextUrl;
	}

	response(req,cb){
		//cb(null,{"ststus":true,"toatal_records":this.totatRecord,"results":this.planetResData})
	
		for(var i=0;i<this.planetResData.length;i++){
			this.planetWithCharData.push({
				"planet":this.planetResData[i].name,
				"residents":this.planetResData[i].residents
			});
		}
		cb(null,{"status":true,"total_records":this.totatRecord,"result":this.planetWithCharData});


		


	}

	


	/*this.getName(,function(err,res){
					if(err){

					}
					else{
						this.residents.push(resp);
					}
				});*/

	getName(url){
		getCharctersData(url,function(err,resp){
					if(err){
						return null
					}
					else{
						return resp.name;
					}
		});
	}
}



var planet=new Planets();





var findPossiblePatterns=function(query,cb){
	var pattern=query.toLowerCase().trim();
	findPattern(pattern,function(err,result){
		if(err){
			cb({"status":false,"data":[]},null);
			
		}
		else{
			//console.log("result "+result[0]);
			cb(null,{"status":true,"data":result});
		}
	});

	/*if(matchPatterns){
		cb(null,{"status":true,"data":matchPatterns});
	}
	else{
		cb({"status":false,"data":[]},null);
	}*/

}


function findPattern(pattern,cb){
		const findData={};

		/*
		});*/

		
		requestCharApi(apiUrl,function(err,resp){
				if(err){
					cb(err,null);
				}
				else{
					getResponseFromAPI(pattern,resp,function(err,resu){
			if(err){
				//console.log(err);
				cb(err,null);
			}
			else{
				//console.log("find data"+findData);
				cb(null,resu);
			}
		});

				}
		});
		
				

		
//	console.log("hello");	

}


function getResponseFromAPI(pattern,data,cb){


	var query=pattern;
	var jsonData=JSON.parse(data);
	//console.log("jsonData  :"+jsonData);
	var results=jsonData.results;

	//console.log(results);
	var matchNames=new Array();

	//var getDatafromApi=requestCharApi(apiUrl);


	for(var i=0;i<results.length;i++){
		var resultObj=results[i];
		/*console.log(pattern);
		console.log(resultObj);*/
		
		var name=resultObj.name.trim().toLowerCase();
		//console.log(name);
		if(name.match(pattern)){
			//console.log("match");
			matchNames.push(resultObj);
			//continue;
		}
		else{
			//console.log("hello");
		}
	}

	
	//console.log(matchNames);
	if(matchNames.length>0){
		//console.log(matchNames.length);
		cb(null,matchNames);
		
	}
	else{
		/*cb("No Result found",null);*/
		//console.log(jsonData);
		var nextUrl=jsonData.next.toString();
		//console.log("next url :"+nextUrl);
		if(nextUrl!=null){
			//console.log("Next Url:"+jsonData.next);
			
			requestCharApi(nextUrl,function(err,result){
				if(err){
					return null;
				}
				else{
					getResponseFromAPI(pattern,result,cb);
				}
			});
		}
		else{
			return null;
		}
	}
	
}



function requestCharApi(url,cb){
	//console.log("request");
	//console.log(url);
	/*var data={

	};*/

	console.log("url :"+url);
	request.get(url,function(err,response){
			if(err){
				//console.log(err);
				cb(err,null);
			}
			else{
				//console.log(response.body);
				//console.log(response.body);
				cb(null,response.body);
			}
	});

	//return data;


}
/// get Character and sort queries

var i=0;
var recordd=new Records();

var getCharactersFromStarWar=function(req,url,query,cb){

	
	//const get_data=new Array();
	
	if(typeof url==="undefined"){
		url=apiUrl;
	}


	var query=query;
	console.log(query);
	getRawCharactersFromAPI(url,function(err,result){
		if(err){
			var tot_rec=recordd.getTotalRecords(); 
			cb({"status":false,"total_Record":tot_rec},null);
		}
		else{
			var results=result.results;
			recordd.updateNextUrl(result.next);
			for(var i=0;i<results.length;i++){
				recordd.updateItems(results[i]);
			}
			recordd.updateRecords(results.length);
			/*console.log(recordd.getTotalRecords());
			console.log("next url :"+recordd.getNextUrl());
			var len=recordd.getTotalRecords();*/
			var recordds=recordd.getTotalRecords();
			if(recordds<50){
				var next=recordd.getNextUrl();
				getCharactersFromStarWar(req,next,query,cb);
			}
			else{
				/*var tot_rec=recordd.getTotalRecords();
				var data_Items=recordd.getAllItems();
				cb(null,{"status":true,"total_Record":tot_rec,"results":data_Items});*/
				var lenth1=recordd.getAllItems().length;
			//	console.log("length :"+lenth1);

				recordd.sortAllItems(query);
				recordd.paginated(req,cb);
			}

		}
	});


}





/**/


function getExtraData(recordd,cb){
	var next=recordd.getNextUrl();

	console.log("next url :"+next);

	if(next!=null){
		requestCharApi(next,function(err,resp){
		if(err){
			console.log(err);
			return null;
		}
		else{
			parseDataCharactters(resp,function(err,result){
				if(err){
					console.log("parse err"+err);
					return null;
				}
				else{
					console.log("parse :"+result);
					return result;

				}
			});
		}
	});
	}
	else{
		console.log("nulll");
		return null;
	}
}

function getCharctersData(url,cb){
	requestCharApi(url,function(err,resp){
		if(err){
			callback(err,null);
		}
		else{
			console.log(resp);
			callback(null,JSON.parse(resp));
		}
	});
}


function getRawCharactersFromAPI(url,callback){
	
	requestCharApi(url,function(err,resp){
		if(err){
			callback(err,null);
		}
		else{
			parseDataCharactters(resp,function(err,result){
				if(err){
					callback(err,null);
				}
				else{
					callback(null,result);

				}
			});
		}
	});
}

function parseDataCharactters(result,callback){
	var data=JSON.parse(result);

	var count_size=data.count;
	var result=data.results;

	var nexturl=data.next.toString();
	var data=new Array();

	if(result.length>0){
		//console.log("data next :"+data);
		callback(null,{"results":result,"next":nexturl});
	}
	else{
		callback("err",null);
	}
}

var getResidentsData=function(req,url,cb){


	getRawCharactersFromAPI(url,function(err,resultt){
		if(err){
			cb({"status":false,"results":[]});
		}
		else{
			for(var i=0;i<resultt.results.length;i++){
				planet.updateCharData(resultt.results[i]);
			}

			//console.log(resultt);
			planet.nextUrl=resultt.next;
			planet.totatRecord=planet.totatRecord+resultt.results.length;

			var len=planet.getTotalRecords();

			if(len<20){
				var next=planet.getNext();
				getResidentsData(req,next,cb);
			}
			else{
				planet.response(req,cb);


			}

		}
	});	
}



module.exports={
	findPossiblePatterns:findPossiblePatterns,
	getCharactersFromStarWar:getCharactersFromStarWar,
	getResidentsData:getResidentsData
}
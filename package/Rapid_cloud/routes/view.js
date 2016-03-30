var express = require('express');
var zerorpc = require("zerorpc");
var app     = express();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://172.29.59.62:27017/test';

exports.preview = function(req, res){

	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('template_details');
										
					instance.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{	
							//console.log(result);							
							res.render('PreView', { data : result });
							}
					 db.close();					
					});				
				}		 
			});	
};

exports.viewdata = function(req,res){
	
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);
		console.log(Obj);
		var list=Obj.d1;
		var list2=list.split(',');
		//console.log(list2[0]);
	
	MongoClient.connect(url, function(err, db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
	   } else {
		console.log('Connection established');
		var instance=db.collection('template_details');
							
		instance.find({ "cloud": { "$in": list2 } }).toArray(function(err,result){
			if(err){
				throw err
			}
			else{
				//console.log(result);
				res.send(result)
			}
			db.close();
			});
		}
		
	});
};

exports.org_temp=function(req,res){
	var role=[];

	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var glotemp=db.collection('org_temp1');
										
					glotemp.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							//res.render('org_temp', {data : result});
							res.send(result);
							}
					 db.close();					
					});				
				}		 
			});	
};

exports.create_org_temp=function(req,res){
	var role=[];

	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var glotemp=db.collection('org_temp2');
										
					glotemp.find().toArray(function(err,result){
					if(err){
							throw err
							}
						else{
							res.send(result);
							}
					 db.close();					
					});				
				}		 
			});	
};


exports.node_store=function(req,res){
	var result=JSON.stringify(req.body);	
	var Obj = JSON.parse(result);
	var d1 = Obj.d1;
	console.log(d1);
	var d2 = Obj.d2;
	var d1_obj = JSON.parse(d1);
	console.log(d1_obj);
	//console.log(d2);
	var c_date = Date();
	var tt_type="Generic Template";
	MongoClient.connect(url, function (err, db) {
		  if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		  } else {    
		    console.log('Connection established to');    
			var collection=db.collection('generic_template_information');
		    var DB_data = {Template_name : d2, Template_type : tt_type, Created_at : c_date, Template_Role:d1_obj };

		   collection.insert([DB_data], function (err, result) {

		    					if (err) {
		    						console.log(err);
		    						res.send(err);
		    					} else {
		    						console.log('Inserted values sucess fully');
		    						res.send("Success");
		    					}
		    					db.close();

		    			});
		  	}	
		});	
};

exports.name_check=function(req, res){
	MongoClient.connect(url, function(err, db){
		if (err){
			console.log('Unable to connect to the MongoDB server. Error:',err);
		}
		else{
			console.log('Connection established to');
			var gts=db.collection('generic_template_information');
			gts.find().toArray(function(err, result){
				if (err)
					{
					console.log('Unable to connect to the MongoDB server. Error:',err);
					}
				else{
					res.send(result);					
				}
				db.close();
			});
		}
	});
}

exports.gen_view=function(req, res){
	
		MongoClient.connect(url, function (err, db){
		if (err) {
			console.log('Unable to connect to the MongoDB server. Error:',err);
		}	else{
					console.log('Connection established to');
					var evn=db.collection('generic_template_information');
					evn.find().toArray(function(err,result){
					if(err)
					{
						throw err
					}
				else{
						res.send(result);
					}
				db.close();
			});
			}		
	});
};
exports.my_view=function(req, res){
	
	MongoClient.connect(url, function (err, db){
	if (err) {
		console.log('Unable to connect to the MongoDB server. Error:',err);
	}	else{
				console.log('Connection established to');
				var evn=db.collection('pvd_template_information');
				evn.find().toArray(function(err,result){
				if(err)
				{
					throw err
				}
			else{				
					res.send(result);
				}
			db.close();
		});
		}		
});
};


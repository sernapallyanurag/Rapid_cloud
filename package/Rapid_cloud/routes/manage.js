var http = require('http');
var express = require('express');
var pg = require("pg");
var zerorpc = require("zerorpc");
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var fs=require('fs');

var myObject =  require("./manage_nodes.js");

var conString = "pg://postgres:cloud123@172.29.59.63:5432/Rapid";
var client_pg = new pg.Client(conString);

var rpcConString = "tcp://172.29.93.97:4242";
var client = new zerorpc.Client();
client.connect(rpcConString);

//var conString = "pg://postgres:admin@localhost:5432/Rapid";


var url = 'mongodb://172.29.59.62:27017/test';
var MongoClient = require('mongodb').MongoClient;
var action;
var res1;
var template_id;

var vpc_name = [];
var vpc_id = [];
var p_name = [];
var subnet_name = [];
var auth=[];

var client_pg = new pg.Client(conString);
client_pg.connect();

exports.manageEnv = function(req, res){
	res.render('manageEnv');
}

exports.manage = function(req, res){
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM azure_details where status <> 'terminated';", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	res.render('manage', {data : rows});
	 });	 
};

exports.manage_env_nodes = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	//console.log(Obj);
	var inst_id=Obj.inst_id,
	    action = Obj.action,
	    region = Obj.region,
	    pvd_name = Obj.pvd,
	    cldsrvc = Obj.cldsrvc,
	    role = Obj.role;
	if(pvd_name == "AWS")
		{
			var arr=["AWS","manage_node",auth[0], auth[1],region,inst_id,action];
			//console.log(arr);
			client.invoke("assign", arr, function(error, res, more) {});			
			 //res.send("Success");
		}else{
			if(action == "Reboot"){action = "Reboot";}
			else if(action == "Terminate"){action = "Terminate";}
			else{return;}
			var arr = ["Azure", "manage_node", action, role, cldsrvc];
			console.log(arr);
			client.invoke("assign", arr, function(error, res, more) {});			
			 res.send("Success");
		}	
};
exports.manage_env = function(req, res){
	var proj_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM project3;", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	var row_length = rows.length;
	console.log(row_length);
	for(var i=0;i<row_length;i++){
		proj_name[i] = rows[i].p_name;
	}
	res.send(rows);
	//console.log(proj_name);
	//res.render('manage_env', {data : rows});
	 });	 
};

exports.deploy=function(req,res){
	//var pid=req.query.prov_id;
	//console.log(pid);
	MongoClient.connect(url, function (err, db) {
		  if (err) {
						console.log('Unable to connect to the mongoDB server. Error:', err);
				   } else {
					console.log('Connection established');
					var instance=db.collection('pvd_template_information');
					//var region=db.collection('region');					
					instance.find().toArray(function(err,result){
					if(err){
							throw err;
							}
						else{	//console.log(result);					
								res.render('deploy', {data : result});
							}
					 db.close();					
					});					
				}		 
			});	
};

exports.actions = function(req,res){	
	var dns=req.query.id;
	action=req.query.status;	
	var arr=[action, dns];
	 /*var client = new zerorpc.Client();
	 client.connect("tcp://172.29.93.87:4242");
	 client.invoke("sendazure2", arr, function(error, res, more) {
		 console.log(res);
		 res1="true";
		 console.log(res1);
		 console.log(action);
		    if(action == "terminate" && res1 == "true")
		    	{		    	
		    	var check="Terminated";
		    	var client_pg = new pg.Client(conString);
		    	client_pg.connect();
		    	client_pg.query("UPDATE azure_details SET status = ($1) WHERE proj_name= ($2)",[check,dns]);
		    	}
		    else if(action == "reboot" && res1 == "true")
		    {
		    	var check="Reboot";
		    	var client_pg = new pg.Client(conString);
		    	client_pg.connect();
		    	client_pg.query("UPDATE azure_details SET status = ($1) WHERE proj_name= ($2)",[check,dns]);	
		    }
		    else{console.log("error has oocured");}
		});*/
};

exports.create_vpc=function(req,res){
	console.log(auth[0]);
	res.render('create_vpc');	
};
 
/* Functions for new screens*/
exports.vpc=function(req,res){
	  
	  var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  console.log(Obj);
	  var region = Obj.region;
	  var cidr = Obj.cidr;
	  var vpc = Obj.vpc;
	  var tenancy = Obj.tenancy;
	  var pvd = Obj.provider;              
	      
    
	     var arr = ["AWS", "create_vpc",auth[0], auth[1], region , cidr, vpc, tenancy];
	      console.log(arr);

	     client.invoke("assign", arr, function(error, resq, more) {
	   	         
	      });
	     res.send("Success");
};
exports.subnet=function(req,res){
	  
	  var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  var pvd = Obj.provider;
	  var snRegion = Obj.region;
	  var cidrBlkSn = Obj.cidrBlkSn;
	  var snVpc = Obj.snVpc;
	  var snName = Obj.snName;
	  var snZone = Obj.snZone;
			      /*var client = new zerorpc.Client();
			      client.connect(rpcConString);*/     
			      var arr = [pvd, "create_subnet",auth[0], auth[1], snRegion , cidrBlkSn, snVpc, snZone, snName];
			      console.log(arr);
			  
		
			     client.invoke("assign", arr, function(error, resq, more) {
			   	         
			      });

	     res.send("Success");
};
exports.routeTable = function(req,res){
	  var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  var pvd = Obj.provider;
	  var routeRegion = Obj.region;
	  var routeName = Obj.routeName;
	  var routeVpc = Obj.routeVpc;
	  var routeSubnet = Obj.routeSubnet;
	  //console.log(pvd+routeRegion+routeName+routeVpc+routeSubnet);
	  
	   /* var client = new zerorpc.Client();
      	client.connect("rpcConString");*/     
     		var arr = [pvd, "route_table",auth[0], auth[1], routeRegion , routeName, routeVpc, routeSubnet];
      		console.log(arr);

     		client.invoke("assign", arr, function(error, resq, more) {
   	         console.log(resq);
      		});
	  
	  res.send("Success");
}
exports.gateWay = function(req,res){
	  var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  var pvd = Obj.provider;
	  var gtWayRegion = Obj.region;
	  var gtWayName = Obj.gtWayName;
	  var gtWayVpc = Obj.gtWayVpc;
	  console.log(pvd+gtWayRegion+gtWayName+gtWayVpc);
	  
	    /*var client1 = new zerorpc.Client();
		   client1.connect("rpcConString"); */    
		   var arr = [pvd, "internet_gateway",auth[0], auth[1], gtWayRegion , gtWayName, gtWayVpc];
		   console.log(arr);

		   client.invoke("assign", arr, function(error, resq, more) {
	         
		   });
	  res.send("success");
}
exports.createStorage = function(req, res){
	 var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  var pvd = Obj.provider;
	  var vRegion = Obj.region;
	  var vType = Obj.vType;
	  var vSize = Obj.vSize;
	  var vIops = Obj.vIops;
	  var vName = Obj.vName;
	  var vZone = Obj.vZone;
	  //console.log(pvd+vRegion+vType+vSize+vIops+vName);
	  /* var client = new zerorpc.Client();
	   client.connect("rpcConString"); */    
	   var arr = [pvd, "create_volume",auth[0], auth[1], vRegion , vZone, vName, vSize, vIops, vType];
	   console.log(arr);

	   client.invoke("assign", arr, function(error, resq, more) {
        
	   });
	  res.send("Success");
}
exports.createSecGroup = function(req, res){
	 var result=JSON.stringify(req.body);
	  var Obj = JSON.parse(result);
	  var pvd = Obj.provider;
	  var sgRegion = Obj.region;
	  var sgName = Obj.sgName;
	  var sgFPort = Obj.sgFPort;
	  var sgTPort = Obj.sgTPort;
	  var sgCidrIp = Obj.sgCidrIp;
	  var sgVpcId = Obj.vpcId;
	  console.log(sgVpcId);
	 // console.log(pvd+sgRegion+sgName+sgFPort+sgTPort+sgCidrIp);
	  /* var client = new zerorpc.Client();
	   client.connect("rpcConString");*/     
	   var arr = [pvd, "create_sg",auth[0], auth[1], sgRegion , sgName, sgVpcId, sgFPort, sgTPort, sgCidrIp];
	   console.log(arr);

	   client.invoke("assign", arr, function(error, resq, more) {
        
	   });
	  res.send("Success");
}
exports.createKeyPair = function(req, res){
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result);
	 var pvd = Obj.provider;
	 var kpRegion = Obj.region;
	 var keyPair = Obj.keyPair;
	  var arr = [pvd, "create_key_pair",auth[0], auth[1], kpRegion , keyPair];
	   console.log(arr);

	   client.invoke("assign", arr, function(error, resq, more) {
       
	   });
	res.send("Success");
}
//create snashot for volume
exports.createSnapShot = function(req, res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	  var arr = [pvd, "create_snap",auth[0], auth[1], volName , snapName];
	   //console.log(arr);

	   /*client.invoke("assign", arr, function(error, resq, more) {
      
	   });*/
	res.send("Success");
}

exports.deployTemplate = function(req, res){
	
	var arr=[];
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var d1 = Obj.d1;
	var d1arr = d1.split(',');
	if(d1arr[0] == 'AWS'){
			d1arr.splice(2, 0, auth[0]);
			d1arr.splice(3, 0, auth[1]);
			for(var i=0;i<d1arr.length;i++)
				{
					arr.push(d1arr[i]);
				}
			
			var d2 = Obj.d2;
			var d3 = d2.split(',');
			console.log(d3.length);
			
			if(d3.length>6)
				{
					var results = [];
					  while (d3.length) {
					    results.push(d3.splice(0, 6));
					  }
					  for(var i=0;i<results.length;i++)
						  {
						  	arr.push(results[i]);
						  }
				}else{arr.push(d3);}
			  console.log(arr);
			  client.invoke("assign", arr, function(error, resq, more) {});
			res.send("Success");
	}else{
			for(var i=0;i<d1arr.length;i++)
			{
				arr.push(d1arr[i]);
			}
		
			var d2 = Obj.d2;
			var d3 = d2.split(',');
			console.log(d3.length);
			
			if(d3.length>3)
				{
					var results = [];
					  while (d3.length) {
					    results.push(d3.splice(0, 3));
					  }
					  for(var i=0;i<results.length;i++)
						  {
						  	arr.push(results[i]);
						  }
				}else{arr.push(d3);}
			  console.log(arr);
			 client.invoke("assign", arr, function(error, resq, more) {});
			res.send("Success");
			}
}


//New screen function end
/*Old screen functions*/
exports.deploy_data = function(req, res){
	
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	template_id=Obj.id1;
	//os=Obj.os;
	MongoClient.connect(url, function(err, db) {
		if(err) { return console.dir(err); }
		  else {
			//console.log(template_id); 
		    //console.log("connected");
			var template_new = db.collection('pvd_template_information');
			//var region = db.collection('region');
			
				template_new.find({"Template_name":template_id}).toArray(function(err,resultq){
					if(err){
						throw(err);
					}
					else{
						var result_inst = [];
						var result_role = [];
						var result_img =[];
						var len_q=resultq.length;
						var id = resultq[0].Instances;	
						var inst_length = id.length;

						var template_name = resultq[0].Template_name;
						var template_region = resultq[0].Region;

			
						for(var i=0;i<inst_length;i++)
							{
								result_inst[i]=id[i].node;
								result_img[i]=id[i].image;
								result_role[i]=id[i].role;		
							}
						
						res.send(result_inst.toString()+"~"+result_img.toString()+"~"+result_role.toString()+"~"+template_name.toString()+"~"+template_region.toString());
				}
				});
				
				
		
		  }		
		});    
};

exports.vpc_deploy = function(req, res){
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM vpc", function(err, result){
	if(err){
	throw err;
	}
	var vpc_rows = result.rows;
	/*var vpc_len = vpc_rows.length;
	console.log(vpc_rows);
	for (var i=0;i<vpc_len;i++)
		{
		vpc_name[i] = vpc_rows[i].vpc_name;
		vpc_id[i] = vpc_rows[i].vpc_id;
		}
	console.log(vpc_name);
	console.log(vpc_id);
	var rows = result.rows;
	res.send(vpc_name.toString()+"~"+vpc_id.toString());*/
	res.send(vpc_rows);
	 });
	
};

exports.project = function(req, res){
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	//client_pg.query("SELECT p_name FROM project", function(err, result){
	client_pg.query("SELECT * FROM project", function(err, result){
	if(err){
	throw err;
	}
	var proj_rows = result.rows;
	//console.log(proj_rows);
	res.send(proj_rows);
	/*console.log(proj_rows[0].p_name);
	var proj_len = proj_rows.length;
	console.log(proj_rows);
	console.log(proj_len);
	for (var i=0;i<proj_len;i++)
		{
			p_name[i] = proj_rows[i].p_name;
		}
	//console.log(p_name.length);
	//var rows = result.rows;
	res.send(p_name.toString());*/
	 });	 
};

exports.subnet_deploy = function(req, res){
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM subnet", function(err, result){
	if(err){
	throw err;
	}
	var subnet_rows = result.rows;
	console.log(subnet_rows);
	res.send(subnet_rows);
	//console.log(result);
	/*var subnet_len = subnet_rows.length;
	//console.log(vpc_rows);
	for (var i=0;i<subnet_len;i++)
		{
		subnet_name[i] = subnet_rows[i].subnet_name;
		//vpc_id[i] = vpc_rows[i].vpc_id;
		}
	//console.log(subnet_name);
	//console.log(vpc_id);
	//var rows = result.rows;
	res.send(subnet_name.toString());*/	
	 });
	
};

exports.store_template = function(req, res){
	var result=JSON.stringify(req.body);
	console.log(result);
	var Obj = JSON.parse(result);
	var inst = 0;
	var rl = 0;
	var img = 0;
	var new_role = [];
	var new_inst = [];
	var new_img = [];
	//console.log(Obj.vpc);
	//var newstr = 'role[]'
	//var obj_len = roles.length;
	//console.log(obj_len);
	//var check_len = Obj.length;
	//var ele = Obj[0];
//console.log(ele);
	var d1 = Obj.d1;
	var d1_array=d1.split(',');
console.log(d1_array[0]);
var prov = d1_array[0];
var vpc = d1_array[1];
var subnet = d1_array[2];
var project = d1_array[3];
var tename = d1_array[4];
var d2 = Obj.d2;
var d2_array=d2.split(',');
var d2_len = d2_array.length;
console.log(d2_len);
for(var k = 2; k<d2_len; k+=3){
	//console.log(k);
	new_role[rl] =  d2_array[k];
	rl++;
}

for(var k = 0; k<d2_len; k+=3){
	//console.log(k);
	new_inst[inst] =  d2_array[k];
	inst++;
}

for(var k = 1; k<d2_len; k+=3){
	//console.log(d2_array[k]);
	new_img[img] =  d2_array[k];
	img++;
}
console.log(new_role);
console.log(new_inst);
console.log(new_img);
var client = new zerorpc.Client();
client.connect("tcp://172.29.59.61:4242");     
//var arr = ["aws", "create_environment_aws","rapidcloud","lledx" , new_inst[0], new_img[0], new_role[0],new_inst[1], new_img[1], new_role[1]];
var arr = ["aws", "create_environment", auth[0], auth[1], "ap-northeast-1", vpc, subnet,project, tename, "t2.micro","ami-383c1956", "app_server", "t2.medium", "ami-0dd8f963", "web_server", "m3.medium", "ami-f8220896", "data_base" ]
client.invoke("assign", arr, function(error, resq, more) {
	 console.log(resq);
   });
for(var i= 0;i<3;i++){
var client_pg = new pg.Client(conString);
client_pg.connect();
var nrole = new_role[i];
var ninst = new_inst[i];

//client_pg.query("INSERT INTO environment2(role,inst_type,vpc_id,subnet_id,p_id) values($1, $2, $3, $4, $5)", [nrole, ninst, vpc, subnet, project]);
}
//console.log(Obj.role[0]); 
	res.send("Hello");
	
};


exports.manage_template = function(req, res){
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	client_pg.query("SELECT * FROM enviroment3;", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	console.log(rows);
	res.render('manage_template', {data : rows});
	 });
	
};
//client_pg.connect();
exports.filter_env = function(req,res){
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result); 
	 var proj_id=Obj.id;
	 console.log(proj_id);
	 console.log("Project before Index.js:  "+proj_id);

	
	  client_pg.query("SELECT env_name FROM deployment_env where p_id = ($1) GROUP BY env_name", [proj_id], function(err,result){
		  if(err){
		   throw err;
	  }
		  var rows = result.rows;
		  console.log(rows);
		  res.send(rows);
	 });
};

exports.popup_nodes = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var t_name=Obj.tname;
	console.log(t_name);
	client_pg.query("Select role,inst_type,inst_id,status from deployment_env where template_name = ($1)", [t_name], function(err,result){
		if(err){
			throw err;
		}
		
		var rows = result.rows;
		console.log(rows);
		var pinst = [];
		var prole = [];
		var ptype = [];
		var pstatus = [];
		var temp = [];
		var m =0;

		for (var i=0; i<rows.length;i++){
			//console.log(m);
			pinst[i] = rows[i].inst_id;
			prole[i] = rows[i].role;
			ptype[i] = rows[i].inst_type;
			pstatus[i] = rows[i].status;
			temp[m] = rows[i].role;
			m= m + 1;
			temp[m] = rows[i].inst_type;
			m= m +1;
			temp[m] = rows[i].inst_id;
			m = m+1;
			temp[m] = rows[i].status;
			m = m+1;
			//console.log(m);
		}
		//console.log(temp);
		//console.log(temp);
		res.send(pinst.toString()+"~"+prole.toString()+"~"+ptype.toString()+"~"+pstatus.toString()+"~"+temp.toString());
	});
	//res.send("hi");
};

exports.node_details = function(req,res){
	 var result=JSON.stringify(req.body);
	 var Obj = JSON.parse(result);
	 console.log(Obj);
	 var t_name=Obj.env_name;
	 var proj_id = Obj.proj_id;
	 console.log(t_name);
	 client_pg.query("Select * from deployment_env where env_name = ($1) AND p_id = ($2)", [t_name, proj_id], function(err,result){
	  if(err){
	   throw err;
	  }
	  var rows = result.rows;
	  //console.log(rows);
	  res.send(rows);
	 });
	 
	};

fs.readFile('new.txt', 'utf-8', function(err,data){
    if(err){
    return console.log(err);}
    
    else
    {
    ndata = data.toString().split('~');
    dec = ndata[0];
    dec2 = ndata[1];
    decrypt1(dec);
    
    
    function decrypt1(text){
    var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    }     
    decrypt2(dec2);

    function decrypt2(text){
    var decipher2 = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    dec2 = decipher2.update(text,'hex','utf8')
    dec2 += decipher2.final('utf8');  
    }               
     
     var client = new zerorpc.Client();
     client.connect("tcp://172.29.93.87:4242");     
     access = dec;
     secret = dec2;
     //console.log(access+secret);
     auth.push(access);
     auth.push(secret);
     //var arr = ["aws", "create_vpc",access, secret, region , cidr, vpc, tenancy];
    // console.log(arr);


    } 
    
    }); 

exports.cloud_project = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var project=Obj.project;
	var c_name = [];
	client_pg.query("Select cloud_name from cloudservice where p_name = ($1)", [project], function(err,result){
		if(err){
			throw err;
		}
		var rows = result.rows;

		console.log(rows);
		var cloud_len = rows.length;
		if(cloud_len == 0){
			res.send("Empty");
		}
		else{
			
			for(i=0;i<cloud_len;i++){
				c_name[i] = rows[i].cloud_name;
			}
			res.send(c_name.toString());
		}
		
	});
};

exports.filter_slot = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);	
	var cloud=Obj.cloud_service;
	var slot_name = [];
	client_pg.query("Select deploy_name from deployslot where cloud_name = ($1)", [cloud], function(err,result){
		if(err){
			throw err;
		}
		var rows = result.rows;

		console.log(rows);
		var slot_len = rows.length;
		if(slot_len == 0){
			res.send("Empty");
		}
		else{
			
			for(i=0;i<slot_len;i++){
				slot_name[i] = rows[i].deploy_name;
			}
			res.send(slot_name.toString());
		}
		
	});
};

exports.list_cloud_service = function(req, res){
	var vpc_name = [];
	/*var client_pg = new pg.Client(conString);
	client_pg.connect();*/
	console.log("Hi");
	client_pg.query("SELECT cloud_name FROM cloudservice", function(err, result){
	if(err){
	throw err;
	}
	var rows = result.rows;
	console.log(rows);
	res.send(rows);
	 });
	
};


//Manage storage, sec group, key pair, 
exports.volumeDetails = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var inst_id = "i-f9491f79";
	client_pg.query("SELECT * FROM volume where inst_id = ($1)",[inst_id], function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		res.send(rows);
		 });
}
exports.keyPairDetails = function(req, res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	client_pg.query("SELECT * FROM key_pair", function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		res.send(rows);
	});
}
exports.secGrpDetails = function(req, res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	client_pg.query("SELECT * FROM security_group", function(err, result){
		if(err){
		throw err;
		}
		var rows = result.rows;
		console.log(rows);
		res.send(rows);
	});
}
exports.attachVolume = function(req, res){	
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pv_name = "AWS";
	var arr2 =[["t2.micro", "stg1"],["t3.micro","stg2"]]
	var region = "california";
	var obj1 = new myObject(pv_name,"attach_volume",auth[0],auth[1],region,arr2);
	var result= obj1.attach();	
	res.send(result);
}
exports.attachKeyPair = function(req, res){	
	var result=JSON.stringify(req.body),
	    Obj = JSON.parse(result),
	    pv_name = "AWS";
	var arr2 =[["t2.micro", "kp1"],["t3.micro","kp2"]]
	var region = "california";
	var obj1 = new myObject(pv_name,"attach_key",auth[0],auth[1],region,arr2);
	var result= obj1.attach();	
	res.send(result);
}
exports.attachSecGrp = function(req,res){
	var result=JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pv_name = "AWS";
	var arr2 =[["t2.micro", "sg1"],["t3.micro","kg2"]]
	var region = "california";
	var obj1 = new myObject(pv_name,"attach_secGroup",auth[0],auth[1],region,arr2);
	var result= obj1.attach();	
	res.send(result);
}

exports.loadBalancerCreate = function(req, res){
	var result = JSON.stringify(req.body);
	var Obj = JSON.parse(result);
	var pv_name ="AWS";
	var region = "us_east_1";	
	var arr = [pvd, "create_load_bal",auth[0], auth[1], Region , loadName, port, protocol, algorithem, members];	
		/*client.invoke("assign", arr, function(error, resq, more) {
	       
		   });*/
}

//Attach security group





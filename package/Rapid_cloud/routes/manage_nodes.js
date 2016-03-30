var zerorpc = require("zerorpc");

var rpcConString = "tcp://172.29.93.97:4242";
var client = new zerorpc.Client();
client.connect(rpcConString);
//Constructor for manage volumes, security groups, keypairs 
function AttachObject(pvName, methodName, acc, sec, region, sgArr) {
	  this.pvName = pvName;
	  this.methodName = methodName;
	  this.acc = acc;
	  this.sec = sec;
	  this.sgArr = sgArr;
	  this.region = region;
	  
	}

AttachObject.prototype.attach = function() {
	  var arr=this.sgArr;
	  arr.splice(0,0,(this.pvName));
	  arr.splice(1,0,(this.methodName));
	  arr.splice(2,0,(this.acc));
	  arr.splice(3,0,(this.sec));
	  arr.splice(4,0,(this.region));
	  console.log(arr);
	  /*client.invoke("assign", arr, function(error, resq, more) {
	       
	   });*/
	  
	  return "Success";
	};


module.exports = AttachObject;
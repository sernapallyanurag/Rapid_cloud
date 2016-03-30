var AWS = require('aws-sdk');

var ec2 = new AWS.EC2();


/*new AWS.EC2().attachClassicLinkVpc(params, function(err, data) {
		  if (err) console.log(err, err.stack); // an error occurred
		  else     console.log("Success"+data);           // successful response
		});

new AWS.EC2().describeInstances(function(error, data) {
	  if (error) {
	    console.log(error); // an error occurred
	  } else {
	    console.log((data.Reservations)[0].Instances); // request succeeded
	    console.log((data.Reservations)[1].Instances);
	  }
	});*/
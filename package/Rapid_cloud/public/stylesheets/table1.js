var jxm = require('jxm');
var http = require('http');
var express = require('express');
var app     = express();


app.get('/', function(req, res) {
	var id = req.query.prov_id;
  res.send("prov_id is set to " + id);
  
  });

  app.listen(8081, function() {
  console.log('Server running at http://127.0.0.1:8081/');
});
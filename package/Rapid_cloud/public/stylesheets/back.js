var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/myaction', function(req, res) {
  //var region = req.body.region;
  var prov_id  = req.body.name;
  console.log(prov_id);
  res.send(prov_id);
  
  });
  
  app.listen(8081, function() {
  console.log('Server running at http://127.0.0.1:8081/');
});
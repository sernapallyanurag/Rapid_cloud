var http = require('http');
var express = require('express');
var app     = express();

exports.project_page = function(req,res){
	res.render('project');
};
exports.project_view = function(req,res){
	res.render('project_view');
};
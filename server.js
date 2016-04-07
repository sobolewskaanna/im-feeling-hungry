// require express
var express = require('express');

//generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//serve static files in public
app.use(express.static('public'));

//body parser configuration to accept datatypes
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/////DATABASE
var database = require('./models');

/////HTML ENDPOINTS
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


////JSON API ENDPOINTS


////SERVER
//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

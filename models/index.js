var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-01');

var Search = require('./search');
var Result = require('./result');
var Discussion = require('./discussion');

module.exports.Search = Search;
module.exports.Result = Result;
module.exports.Discussion = Discussion;

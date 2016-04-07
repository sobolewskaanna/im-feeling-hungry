var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project-01');

var Search = require('./search');
var Result = require('./result');

module.exports.Search = Search;
module.exports.Result = Result;

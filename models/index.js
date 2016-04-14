var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||
                  'mongodb://localhost/project-01');

var Search = require('./search');
var Result = require('./result');
var Review = require('./review');

module.exports.Search = Search;
module.exports.Result = Result;
module.exports.Review = Review;

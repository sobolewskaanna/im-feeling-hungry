var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var result = require('./result.js');

var SearchSchema = new Schema({
  category: String,
  searchTimeStamp: true, //createdAt
  result: [Result.Schema]
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;

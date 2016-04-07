var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var result = require('./result');

var SearchSchema = new Schema({
  category: String,
  searchTimeStamp: String, //type true -- createdAt
  result: String
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;

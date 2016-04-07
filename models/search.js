var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var result = require('./result');

var SearchSchema = new Schema({
  category: String,
  searchTimeStamp: true, //createdAt
  result: [Result.schema]
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;

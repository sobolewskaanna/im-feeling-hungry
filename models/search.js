var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Result = require('./result');

var SearchSchema = new Schema({
  query: String,
  location: {
              formattedAddress: String,
              lat: Number,
              lng: Number
            },
   time: {
            type : Date,
            default: Date.now
          },
   result: [Result.schema]
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;

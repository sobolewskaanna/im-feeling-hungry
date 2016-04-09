var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  venueName: String,
  venueLocation: String,
  rating: Number
});

var Result = mongoose.model('Result', ResultSchema);

module.exports = Result;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  venueName: String,
  venueLocation: {
    location: String,
    lat: Number,
    lng: Number
  }
});

var Result = mongoose.model('Result', ResultSchema);

module.exports = Result;

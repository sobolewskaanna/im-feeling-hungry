var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  restaurantName: String,
  restaurntLocation: String
});

var Result = mongoose.model('Result', ResultSchema);

module.exports = Result;

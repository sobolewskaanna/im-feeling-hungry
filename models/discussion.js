var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
  topic: String,
  description: String
});

var Discussion = mongoose.model('Discussion', DiscussionSchema);

module.exports = Discussion;

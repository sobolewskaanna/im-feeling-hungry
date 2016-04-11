//populates empty database
//node seed.js

var database = require('./models');

var discussionList = [
  {
    topic: 'Thai',
    description: 'I love thai food!!! It is my favorite!'
  },
  {
    topic: 'I love this app',
    description: 'I didnt know what to eat today! This app helped me figure it out!'
  },
  {
    topic: 'Best app ever',
    description: 'Love it'
  }
];

database.Search.remove({}, function(err, albums) {
  database.Search.create(discussionList, function(err, discussions) {
    if (err) {
      return console.log('ERROR', err);
    } else {
      console.log('all searches', discussions);
    }
    process.exit();
  });
});

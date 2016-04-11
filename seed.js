//populates empty database
//node seed.js

var database = require('./models');

var reviewList = [
  {
    title: 'Thai',
    description: 'I love thai food!!! It is my favorite!'
  },
  {
    title: 'I love this app',
    description: 'I didnt know what to eat today! This app helped me figure it out!'
  },
  {
    title: 'Best app ever',
    description: 'Love it'
  }
];

database.Review.remove({}, function(err, reviews) {
  database.Review.create(reviewList, function(err, reviews) {
    if (err) {
      return console.log('ERROR', err);
    } else {
      console.log('all searches', reviews);
    }
    process.exit();
  });
});

var database = require('.models');

var searches = [
  {
    category: 'Thai',
    searchTimeStamp: '030405',
    result: 'Good Thai'
  },
  {
    category: 'Tacos',
    searchTimeStamp: '030405',
    result: 'Good Tacos'
  },
  {
    category: 'Burger',
    searchTimeStamp: '030405',
    result: 'Good Burger'
  }

];

database.Search.remove({}, function(err, albums) {
  database.Search.create(seachList, function(err, searches) {
    if (err) {
      return console.log('ERROR', err);
    } else {
      console.log('all searched', searches);
    }
    process.exit();
  });
});

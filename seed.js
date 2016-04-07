var database = require('.models');



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

// require express
var express = require('express');

// require and load dotenv
var dotenv = require('dotenv').load();

//generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request');

//serve static files in public
app.use(express.static('public'));

//body parser configuration to accept datatypes
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/////DATABASE
var database = require('./models');


/////HTML ENDPOINTS
//localhost3000/
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
// goes to localhost3000/searches/somekindofId
app.get('/searches/:id', function searchResult (req, res) {
  res.sendFile(__dirname + '/views/search_result.html');
});
// goes to localhost3000/searches/somekindofId
app.get('/discussions', function searchResult (req, res) {
  res.sendFile(__dirname + '/views/discussions.html');
});


////JSON API ENDPOINTS

app.post('/api/searches', function (req, res) {
  var newSearch = database.Search ({
    query: req.body.query,
    city: req.body.city
  });
  newSearch.save(function(err, search){
    if (err) {
      res.send(err);
    } else {
      res.json(search);
    }
  });
});


app.get('/api/searches/:id/results', function (req, res) {
  database.Search.findById(req.params.id, function (err, foundSearch) {
    var searchQuery = foundSearch.query;
    var searchCity = foundSearch.city;
    var foursquareClientId = process.env.FOURSQUARE_CLIENT_ID;
    var foursquareClientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
    var requestUrl = 'https://api.foursquare.com/v2/venues/search?near=' + searchCity + '&query=' + searchQuery +'&client_id=' + foursquareClientId + '&client_secret=' + foursquareClientSecret + '&v=20140806&';

    if (err) {
      res.send(err);
    } else {
      request.get(requestUrl, function (error, response, body) {
        if (error) {
          res.send('error receiving data from fourquare API', error);
        } else {
          var foursquareApiOutput = JSON.parse(body);
          var results = foursquareApiOutput.response.venues;
          if (results === undefined) {
            res.send('there were no venues');
          } else {
              results.forEach(function (result) {
                var newResult = new database.Result({
                  venueName: result.name,
                  venueLocation: {
                    location: result.location.formattedAddress,
                    lat: result.location.lat,
                    lng: result.location.lng
                  }
                });
                foundSearch.result.push(newResult);
                foundSearch.save(function (err, newResult) {
                  if (err) {
                    res.send('error saving result', err);
                  }
                });
              });
              res.json(foundSearch);
            }
          }
        });
      }
  });
});


app.get('/api/searches', function (req, res) {
  database.Search.find({}).sort('-time').limit(5).exec(function (err, searches) {
    if (err) {
      res.send(err);
    } else {
      res.send(searches);
    }
  });
});

////SERVER
//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

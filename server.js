////API
{
  meta: {
    code: 200
    requestId: "57070393498ebc6867ed9c9c"
  }
  notifications: [
    {
      type: "notificationTray"
      item: {
        unreadCount: 0
      }
    }
  ]
  response: {
    venue: {
      id: "40a55d80f964a52020f31ee3"
      name: "Clinton St. Baking Co. & Restaurant"
      contact: {
        phone: "6466026263"
        formattedPhone: "(646) 602-6263"
      }
      location: {
        address: "4 Clinton St"
        crossStreet: "at E Houston St"
        lat: 40.72107924768216
        lng: -73.98394256830215
        postalCode: "10002"
        mayNotNeedAddress: false
        cc: "US"
        city: "New York"
        state: "NY"
        country: "United States"
        formattedAddress: [
          "4 Clinton St (at E Houston St)"
          "New York, NY 10002"
        ]
      }
    }
  }
}



// require express
var express = require('express');

//generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//serve static files in public
app.use(express.static('public'));

//body parser configuration to accept datatypes
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

/////DATABASE
var database = require('./models');

/////HTML ENDPOINTS
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


////JSON API ENDPOINTS
app.post('/api/searches', function (req, res) {
  database.Search.create(req.body, function (err, search) {
    if (err) {
      console.log('error from post', err);
    } else {
      res.json(search);
    }
  });
});

app.get('/api/searches', function(req, res) {
  database.Search.find({}, function (err, searches) {
    if (err) {
      console.log('couldnt find any searches', err);
    } else {
      res.json(searches);
    }
  });
});

////SERVER
//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

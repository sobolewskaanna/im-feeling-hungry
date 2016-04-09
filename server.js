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





////API
var foursquareApiOutput = [
  {
    meta: {
      code: 200,
      requestId: "57070393498ebc6867ed9c9c"
    },
    notifications: [
      {
        type: "notificationTray",
        item: {
          unreadCount: 0
        }
      }
    ],
    response: {
      venue: {
        id: "40a55d80f964a52020f31ee3",
        name: "Clinton St. Baking Co. & Restaurant",
        contact: {
          phone: "6466026263",
          formattedPhone: "(646) 602-6263"
        },
        location: {
          address: "4 Clinton St",
          crossStreet: "at E Houston St",
          lat: 40.72107924768216,
          lng: -73.98394256830215,
          postalCode: "10002",
          mayNotNeedAddress: false,
          cc: "US",
          city: "New York",
          state: "NY",
          country: "United States",
          formattedAddress: [
            "4 Clinton St (at E Houston St)",
            "New York, NY 10002"
          ]
        },
        canonicalUrl: "https://foursquare.com/v/clinton-st-baking-co--restaurant/40a55d80f964a52020f31ee3",
        categories: [
          {
            id: "4bf58dd8d48988d16a941735",
            name: "Bakery",
            pluralName: "Bakeries",
            shortName: "Bakery",
            icon: {
              prefix: "https://ss3.4sqi.net/img/categories_v2/food/bakery_",
              suffix: ".png"
            },
            primary: true
          },
          {
            id: "4bf58dd8d48988d143941735",
            name: "Breakfast Spot",
            pluralName: "Breakfast Spots",
            shortName: "Breakfast",
            icon: {
              prefix: "https://ss3.4sqi.net/img/categories_v2/food/breakfast_",
              suffix: ".png"
            }
          },
          {
            id: "4bf58dd8d48988d16d941735",
            name: "Café",
            pluralName: "Cafés",
            shortName: "Café",
            icon: {
              prefix: "https://ss3.4sqi.net/img/categories_v2/food/cafe_",
              suffix: ".png",
            }
          }
        ],
        verified: false,
        stats: {
          checkinsCount: 21241,
          usersCount: 15919,
          tipCount: 645,
          visitsCount: 22609
        },
        url: "http://www.clintonstreetbaking.com",
        price: {
          tier: 2,
          message: "Moderate",
          currency: "$"
        },
        hasMenu: true,
        likes: {
          count: 1012,
          groups: [
            {
              type: "others",
              count: 1012,
              items: [ ]
            }
          ],
          summary: "1012 Likes"
        },
        like: false,
        dislike: false,
        ok: false,
        rating: 9.1,
        ratingColor: "00B551",
        ratingSignals: 1571,
        menu: {
          type: "Menu",
          label: "Menu",
          anchor: "View Menu",
          url: "https://foursquare.com/v/clinton-st-baking-co--restaurant/40a55d80f964a52020f31ee3/menu",
          mobileUrl: "https://foursquare.com/v/40a55d80f964a52020f31ee3/device_menu"
        }
      }
    }
  }
];




/////HTML ENDPOINTS
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/search_result', function searchResult (req, res) {
  res.sendFile(__dirname + '/views/search_result.html');
});


////JSON API ENDPOINTS

app.post('/api/searches', function (req, res) {
  // var venueName = foursquareApiOutput[0].response.venue.name;
  // var venueLocation = foursquareApiOutput[0].response.venue.location.formattedAddress;
  // var rating = foursquareApiOutput[0].response.venue.rating;

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



////SERVER
//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});

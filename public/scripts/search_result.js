console.log('sanity check');

  var map;

$(document).ready(function() {

  var source = $('#result-template').html();
  var resultTemplate = Handlebars.compile(source);
  var windowPath = window.location.pathname;
  var windowPathSplit = windowPath.split("/");
  var id = windowPathSplit[2];
  var url = '/api/searches/' + id + '/results';
  var outsideResults;

  createMap();

  $.ajax({
    method: 'GET',
    url: url,
    success: handleSuccess,
    error: handleError
  });

  $('#not-feeling-it-button').on('click', function (event) {
    createMap();
    renderResult(outsideResults);
  });

  function handleSuccess (results) {
    outsideResults = results;
    renderResult(outsideResults);
  }

  $('#back-button').on('click', function (event) {
    window.location.href = '/';
  });

  function renderResult (results) {
    if (results.result === undefined) {
      alert('Location does not exist.');
      window.location.href = '/';
    } else {
      var resultsAmount = results.result.length;
      var randomNumber = Math.floor((Math.random() * resultsAmount) + 0);
      var result = results.result[randomNumber];
      var lat = results.result[randomNumber].venueLocation.lat;
      var lng = results.result[randomNumber].venueLocation.lng;
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
      });
      var resultsHtml = resultTemplate(result);
      $('#results').html(resultsHtml);
    }
  }

  function handleError (err) {
    console.log ('there is an error', err);
  }

  function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.78, lng: -122.44},
      zoom: 12
    });
  }

});

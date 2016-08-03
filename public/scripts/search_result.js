console.log('sanity check');

  var map;
  var lat;
  var lng;

$(document).ready(function() {

  var source = $('#result-template').html();
  var resultTemplate = Handlebars.compile(source);
  var windowPath = window.location.pathname;
  var windowPathSplit = windowPath.split("/");
  var id = windowPathSplit[2];
  var url = '/api/searches/' + id + '/results';
  var outsideResults;


  $.ajax({
    method: 'GET',
    url: url,
    success: handleSuccess,
    error: handleError
  });

  $('#not-feeling-it-button').on('click', function (event) {
    createMap(lat, lng);
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
      lat = results.result[randomNumber].venueLocation.lat;
      lng = results.result[randomNumber].venueLocation.lng;
      createMap(lat, lng);
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

  function createMap(lat, lng) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: lat, lng: lng },
      zoom: 12
    });
  }

});

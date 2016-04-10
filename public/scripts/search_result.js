console.log('sanity check');

$(document).ready(function(){

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

  $('#notFeelingItButton').on('click', function (event) {
    renderResult(outsideResults);
  });

  function handleSuccess (results) {
    outsideResults = results;
    renderResult(outsideResults);
  }

});

  function renderResult (results) {
    var resultsAmount = results.result.length;
    var randomNumber = Math.floor((Math.random() * resultsAmount) + 0);
    var venueName = results.result[randomNumber].venueName;
    var venueLocation = results.result[randomNumber].venueLocation;
    $('.results').html(venueName);
  }

function handleError (err) {
  console.log ('there is an error', err);
}

console.log('sanity check');

$(document).ready(function(){

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

  $('#notFeelingItButton').on('click', function (event) {
    renderResult(outsideResults);
  });

  function handleSuccess (results) {
    outsideResults = results;
    renderResult(outsideResults);
  }

  $('#backButton').on('click', function (event) {
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
      var resultsHtml = resultTemplate(result);
      console.log(resultsHtml);
      $('#results').html(resultsHtml);
    }
  }

  function handleError (err) {
    console.log ('there is an error', err);
  }

});

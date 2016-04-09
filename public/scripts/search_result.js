console.log('sanity check');

$(document).ready(function(){

  var windowPath = window.location.pathname;
  var windowPathSplit = windowPath.split("/");
  var id = windowPathSplit[2];
  var url = '/api/searches/' + id + '/results';

  $.ajax({
    method: 'GET',
    url: url,
    success: handleSucces,
    error: handleError
  });

});

function handleSucces (json) {
  console.log('hello');
  console.log(json);
  $('.results').append(json);
}

function handleError (err) {
  console.log ('there is an error', err);
}

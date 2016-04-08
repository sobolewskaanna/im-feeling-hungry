console.log('sanity check');

$(document).ready(function(){

  $('#searchButton').on('click', function(event) {
    $.ajax({
      method: 'GET',
      url: '/api/searches',
      success: handleSucces,
      error: handleError
    });
  });
});

function handleSucces (json) {
  console.log('these are my results', json);
}

function handleError (err) {
  console.log ('there is an error', err);
}

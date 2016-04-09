console.log('sanity check');

$(document).ready(function(){

  $('#newSearchForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/searches',
      data: $(this).serialize(),
      success: handleSucces,
      error: handleError
    });
  });
});

function handleSucces (json) {
  var id = json._id;
  window.location.href = '/api/searches/' + id;
}

function handleError (err) {
  console.log ('there is an error', err);
}

console.log('sanity check');

$(document).ready(function(){

  populateWithRecentSearches();
  function populateWithRecentSearches () {
    $.ajax({
      method: 'GET',
      url: '/api/searches',
      success: findSearches,
      error: handleError
    });
  }

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

function findSearches (data) {
    $('.recent-searches').append(data);
    // setTimeout(populateWithRecentSearches, 5000)
}

function handleSucces (json) {
  var id = json._id;
  window.location.href = '/searches/' + id;
}

function handleError (err) {
  console.log ('there is an error', err);
}

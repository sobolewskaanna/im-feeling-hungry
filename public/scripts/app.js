console.log('sanity check');

$(document).ready(function(){

  // compile handlebars template
  var source = $('#search-template').html();
  var searchTemplate = Handlebars.compile(source);

  function populateWithRecentSearches () {
    $.ajax({
      method: 'GET',
      url: '/api/searches',
      success: function findSearches (searches) {
        var searchesHtml = searchTemplate({searches: searches});
        $('#recentSearches').html(searchesHtml);
      },
      error: handleError
    });
    setTimeout(populateWithRecentSearches, 1000);
  }
  populateWithRecentSearches();

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

  $('#menu').on('click', function (event) {
    window.location.href = '/reviews';
  });
});

function handleSucces (json) {
  var id = json._id;
  window.location.href = '/searches/' + id;
}

function handleError (err) {
  console.log ('there is an error', err);
}

console.log('sanity check');

$(document).ready(function(){

  // compile handlebars template
  var source = $('#search-template').html();
  var searchTemplate = Handlebars.compile(source);

  populateWithRecentSearches();
  function populateWithRecentSearches () {
    $.ajax({
      method: 'GET',
      url: '/api/searches',
      success: function findSearches (searches) {
        var searchesHtml = searchTemplate({searches: searches});
        $('#recentSearches').append(searchesHtml);

        // searches.forEach(function (search) {
        //   $('.recent-searches').append(search.query);
        // });
        // setTimeout(populateWithRecentSearches(), 5000);
      },
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

function handleSucces (json) {
  var id = json._id;
  window.location.href = '/searches/' + id;
}

function handleError (err) {
  console.log ('there is an error', err);
}

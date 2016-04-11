console.log('sanity check');

$(document).ready(function(){

  // compile handlebars template
  var source = $('#reviews-template').html();
  var template = Handlebars.compile(source);

  var allReviews = [];
  //GET all todos on page load
  $.ajax({
    method: 'GET',
    url: 'api/reviews',
    success: function onIndexSuccess(data) {
      allReviews = data.reviews;
      renderReview();
    }
  });


  var renderReview = function () {
    $('#reviews-list').empty();
    var reviewsHtml = template({ reviews: allReviews });
    $('#reviews-list').append(reviewsHtml);
  };

});

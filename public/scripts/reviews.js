console.log('sanity check');

$(document).ready(function(){

  // compile handlebars template
  var source = $('#reviews-template').html();
  var template = Handlebars.compile(source);

  var allReviews = [];

  //GET all reviews on page load
  $.ajax({
    method: 'GET',
    url: 'api',
    success: function onIndexSuccess(data) {
      allReviews = data.reviews;
      renderReview();
    }
  });

  $.ajax({
    method: 'GET',
    url: 'api/reviews',
    success: function onIndexSuccess(reviews) {
      console.log(reviews);
      allReviews = reviews;
      renderReview();
    }
  });

  var renderReview = function () {
    $('#reviews-list').empty();
    var reviewsHtml = template({ reviews: allReviews });
    $('#reviews-list').append(reviewsHtml);
  };

  //create a new review on form submit
  $('#create-review').on('submit', function (event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'api/reviews',
      data: $(this).serialize(),
      success: function onCreateSuccess (response) {
        console.log(response);
        allReviews.push(response);
        renderReview();
      }
    });
  });

});

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
    },
    error: onError
  });

  $.ajax({
    method: 'GET',
    url: 'api/reviews',
    success: function onIndexSuccess(reviews) {
      allReviews = reviews;
      renderReview();
    },
    error: onError
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
        allReviews.push(response);
        renderReview();
      },
      error: onError
    });
  });

  //delete a review
  $('#reviews-list').on('click','.delete-review', function (event) {
    //find id of the clicked element
    var reviewId = $(this).closest('.review').attr('data-id');
    //find and store the review to delete from the array by id
    var reviewToDelete = allReviews.filter(function (review) {
      return review._id === reviewId;
    })[0];

    event.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: 'api/reviews/' + reviewId,
      data: reviewId,
      success: function onDeleteSuccess (response) {
        var toDelete = allReviews.indexOf(reviewToDelete);
          allReviews.splice((allReviews.indexOf(reviewToDelete)), 1);
          renderReview();
      },
      error: onError
    });
  });

  // //update a review
  // $('#reviews-list').on('submit','.update-review', function (event) {
  //   //find id of the clicked element
  //   var reviewId = $(this).closest('.review').attr('data-id');
  //   //find and store the review to delete from the array by id
  //   var reviewToUpdate = allReviews.filter(function (review) {
  //     return review._id === reviewId;
  //   })[0];
  //
  //   event.preventDefault();
  //   $.ajax({
  //     method: 'PUT',
  //     url: 'api/reviews/:id',
  //     data: reviewId,
  //     success: function onUpdateSuccess (response) {
  //         var result = allReviews.splice(allReviews.indexOf(reviewToDelete), 1, response);
  //         console.log(result);
  //         renderReview();
  //     },
  //     error: onError
  //   });
  // });
});

function onError (error) {
  console.log('error from reviews', error);
}

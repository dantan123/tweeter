$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    // console.log($(this).val());
    let tweetLength = $(this).val().length;
    $(".counter").text(140 - tweetLength);
    if (tweetLength > 140) {
      $(".counter").addClass('over-limit');
    } else {
      $(".counter").removeClass('over-limit');
    }
  })
})
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // listen for tweet sending
  sendTweet();

  // load all tweets
  loadTweets();
});

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  })
  .then(function(res) {
    renderTweets(res);
  })
};

const validateTweet = function() {
  const tweetContent = $('#tweet-text').val();
  if (tweetContent.trim().length === 0) {
    $('.error-display').html(`<span> &#9888; Your tweet cannot be empty &#9888; </span>`);
    $('.error-display').css('display', 'block');
    $('.new-tweet form').slideDown(1200);
  } else if (tweetContent.length > 140) {
    $('.error-display').html(`<span> &#9888; Your tweet cannot be longer than 140 characters &#9888; </span>`);
    $('.error-display').css('display', 'block');
    $('.new-tweet form').slideDown(500);
  } else {
    $('.error-display').css('display', 'none');
    return true;
  }
};

const sendTweet = function() {
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();

    if (!validateTweet()) return;

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
    .then(function() {
      console.log('Success!');
      $('#tweet-text').val('');
      loadTweets();
    });
  });
};

const renderTweets = function(tweets) {
  $(".all-tweets").empty();
  $.each(tweets, function(key, value) {
    let $tweet= createTweetElement(tweets[key]);
    $(".all-tweets").append($tweet);
  });
};

const createTweetElement = function(tweetData) {
  const $tweet = $(`<article class="tweet"></article>`);

  // create header
  const $header = $(`<header></header>`);
  $header.append($(`<div class="user-profile"><img src=${tweetData.user.avatars}><h4>${tweetData.user.name}</h4></div>`));
  $header.append($(`<div><h4 class="account">${tweetData.user.handle}</h4></div>`));
  $tweet.append($header);

  // create textarea
  const $textarea = $(`<textarea>${tweetData.content.text}</textarea>`);
  $tweet.append($textarea);

  // create footer
  const $footer = $(`<footer></footer>`);
  $footer.append($(`<div class="tweet-date">${moment(tweetData.created_at).startOf("miliseconds").fromNow()}</div>`));
  $footer.append($(`<div><img src="/images/flag.png"><img src="images/share.png"><img src="images/like.png"></div>`));
  $tweet.append($footer);

  return $tweet;
};

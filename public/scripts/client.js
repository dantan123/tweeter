/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function() {
  renderTweets(data);
  // handle form submission
  $(function() {
    $(".new-tweet form").submit(function(event) {
      event.preventDefault();
      console.log($(this).serialize());
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      })
      .then(function(res) {
        console.log('Success: ', res);
      });
    });
  });
});


const renderTweets = function(tweets) {
  $.each(tweets, function(key, value) {
    let $tweet= createTweetElement(tweets[key]);
    $(".all-tweets").append($tweet);
  });
};

const createTweetElement = function(tweetData) {
  // console.log(tweetData);
  const $tweet = $(`<article class="tweet"></article>`);

  // create header
  const $header = $(`<header></header>`);
  $header.append($(`<div class='user-profile'><img src=${tweetData.user.avatars}><h4>${tweetData.user.name}</h4></div>`));
  $header.append($(`<div><h4 class='account'>${tweetData.user.handle}</h4></div>`));
  $tweet.append($header);

  // create textarea
  const $textarea = $(`<textarea>${tweetData.content.text}</textarea>`);
  $tweet.append($textarea);

  // create footer
  const $footer = $(`<footer></footer>`);
  $footer.append($(`<div class = "tweet-date">${timeSince(new Date(tweetData.created_at - 24 * 60 * 60 * 1000))} ago</div>`));
  $footer.append($(`<div><img src="/images/flag.png"><img src="images/share.png"><img src="images/like.png"></div>`));
  $tweet.append($footer);

  return $tweet;
};

// www.stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
// helper function
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
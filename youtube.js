var Youtube = ( function () {
  var player;
  var options;

  var init = function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  };

  var loadVideo = function (o) {

    options = o;
    Youtube.player = new YT.Player('player', {
      height: '115',
      videoId: o.videoId,
      playerVars: {autoplay: 1},
      events: {
        'onStateChange': onPlayerStateChange
      }
    });

    return false;
  };

  var onPlayerStateChange = function (event) {
    $(document).trigger("YoutubeEvent", [event.data.toString()]);
  };

  return {
    init : init,
    loadVideo : loadVideo,
    player : player,
    ended : 0
  }
}());
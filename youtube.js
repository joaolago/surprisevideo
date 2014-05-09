var Youtube = ( function () {
  var player;
  var options;

  var init = function (o, layout) {
    
    options = o;
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubePlayerAPIReady = function () {
      Youtube.player = new YT.Player('player', {
        height: '220',
        width: '115',
        wmode: "transparent",
        playerVars: {
          wmode: "transparent"
        },
        events: {
          'onStateChange': onPlayerStateChange
        }
      });

      return false;
    }
  }

  var onPlayerStateChange = function (event) {
    $(document).trigger("YoutubeEvent", [event.data.toString()]);
  }

  return {
    init : init,
    player : player,
    ended : 0
  }
}());
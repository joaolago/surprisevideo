SurpriseVideo = ( function () {
  var youtube_id = "";
  var sublist;
  var timeoutID;

  var init = function(){
    $( document ).ready( function () {
      $("#slider").noUiSlider({
        range: {
          "min": 0,
          "max": 120
        },
        step: 1,
        start: 60,
        value: 60,
        connect: "lower", 
        slide: function(){ $("#time").text($("#slider").slider("value")) },
        change: function(){ $("#time").text($("#slider").slider("value")) }
      });
    });

    $( '#start-screen button' ).on( 'click', function(){ getNewVideo(); } );
    $( '.genre' ).on( 'click', toggleGenre );
    $( "#slider" ).on( 'slide', function(){ $("#time").text(Math.floor($("#slider").val())); });
    $( document ).on( 'click', '.reset', function(evt){  reset(evt); } );
    $( document ).on( 'click', '.get-me-another', function(evt){  getAnotherVideo(); } );
    $( document ).on( 'mousemove', 'body', resetSleepTimer);
    $( document ).on( 'click', 'body', resetSleepTimer);
    $( document ).on( 'click', '#about', function(evt){  
      hideAllBut("#sources-screen"); 
    });
    $(document).on( "YoutubeEvent", function(event, type){
      if(type === "0"){
        showEndScreen();
      }
    });

    timeoutID = setTimeout( darkenButtons, 3000 );

    Youtube.init();
    listAuthors();
  };

  var listAuthors = function () {
    _.each(artsy.all, function(index) {
       $( "#artsy" ).append('<li><a href="http://www.youtube.com/'+ index +'" target="_blank">'+index+'</a></li>');
    });
    _.each(funny.all, function(index, val) {
       $( "#funny" ).append('<li><a href="http://www.youtube.com/'+ index +'" target="_blank">'+index+'</a></li>');
    });
    _.each(interesting.all, function(index, val) {
       $( "#interesting" ).append('<li><a href="http://www.youtube.com/'+ index +'"" target="_blank">'+index+'</a></li>');
    });
  };

  var toggleGenre = function (evt){
    var target = $(evt.target);

    $( ".genre" ).removeClass('selected');
    
    target.addClass('selected');
  };

  var assembleCategories = function(){
    return _.map($(".category.selected"),function(item){return $(item).data("name")}).join();
  };

  var reset = function(){
    if(Youtube.player){
      Youtube.player.stopVideo();
    }
    hideAllBut("#start-screen"); 
    $( "body" ).removeClass( "video-on" );
  };

  var hideAllBut = function(keepalive){
    $( ".screen" ).animate(
      {"opacity": 0}, 
      "fast", 
      "linear", 
      function(){
        $( ".screen" ).hide();
        if( _.where(_.map($(".screen"), function(v){return $(v).css("display")}), "block").length == 0 ){
          $( keepalive ).show().animate({"opacity": 1},"fast", "ease");
        }
    });
  };

  var getAnotherVideo = function () {
    youtube_id = sublist.pop().id.$t.match(/video:(\S*.)/)[1];

    $( "#video-wrapper" ).html("<div id='player'></div>");
    Youtube.loadVideo({videoId: youtube_id.toString()});

    if(sublist.length < 1){
      $( ".get-me-another" ).hide();
    }
  };

  var darkenButtons = function () {
    $( "#video-screen button" ).addClass("darken");
  };

  var resetSleepTimer = function () {
    $( "#video-screen button" ).removeClass("darken");
    clearTimeout(timeoutID);
    timeoutID = setTimeout( darkenButtons, 3000 );
  };

  var getNewVideo = function () {
    var selectedAuthor = $(".genre.selected").data("name") == undefined ? "all" : $(".genre.selected").data("name");
    var category = assembleCategories();

    var searchString = "https://gdata.youtube.com/feeds/api/videos/?";
    
    var durationValue = $( "#slider" ).val()*60;
    if(durationValue <= 240) // less than 4 minutes
    {
      searchString += "duration=short&";
      author = {
        "artsy" : _.sample(artsy.shortList),
        "interesting" : _.sample(interesting.shortList),
        "funny" : _.sample(funny.shortList), 
        "all" : _.sample(allAuthors.shortList)
      }
    }else if(durationValue > 240 && durationValue <= 1200){ // up to 20 minutes
      author = {
        "artsy" : _.sample(artsy.mediumList),
        "interesting" : _.sample(interesting.mediumList),
        "funny" : _.sample(funny.mediumList),
        "all" : _.sample(allAuthors.mediumList)
      };
      searchString += "duration=medium&";
    }else{ //more than 20 minutes
      author = {
        "artsy" : _.sample(artsy.longList),
        "interesting" : _.sample(interesting.longList),
        "funny" : _.sample(funny.longList), 
        "all" : _.sample(allAuthors.longList)
      }
      searchString += "duration=long&";
    }
 
    if( selectedAuthor != ""){
      searchString += "author=" + author[selectedAuthor] + "&";
      $( "#author-link" ).attr("href", "http://www.youtube.com/"+author[selectedAuthor]);
    }

    searchString += "alt=json&max-results=50&v=2";
    console.log(searchString)

    $.get(searchString,
      {}, 
      function(data){
        //console.log(data)
        if(data.feed.entry){

          var sorted = _(data.feed.entry).sortBy(function(entry){
            return entry.media$group.yt$duration.seconds;
          });

          sublist = _.filter(sorted, function(entry){
            return entry.media$group.yt$duration.seconds <= durationValue;
          });

          youtube_id = sublist.pop().id.$t.match(/video:(\S*.)/)[1];

          $( "#video-wrapper" ).html("<div id='player'></div>");
          Youtube.loadVideo({videoId: youtube_id.toString()});

          hideAllBut( "#video-screen" );
          $( "body" ).addClass( "video-on" );
        } else {
          hideAllBut( "#error-screen" );
        }
      }
    ); 
  };

  var showEndScreen = function () {
    hideAllBut( "#end-screen" );
    $( "body" ).removeClass( "video-on" );
  };

  return {
    init: init
  }
}());
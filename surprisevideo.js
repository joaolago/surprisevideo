SurpriseVideo = ( function () {
  var youtube_id = "";
  var sublist;

  var init = function(){
    $( document ).ready( function () {
      $("#slider").slider({
        orientation: "horizontal",
        range: "min",
        max: 120,
        min: 1,
        value: 60, 
        slide: function(){$("#time").text($("#slider").slider("value"))},
        change: function(){$("#time").text($("#slider").slider("value"))}
      });
    });

    $('#start-screen button').on( 'click', function(){ getNewVideo(); } );
    $('.category').on( 'click', function(evt){ toggleCategory(evt); } );
    $('.genre').on( 'click', function(evt){  toggleGenre(evt); } );
    $( document ).on( 'click', '.reset', function(evt){  reset(evt); } );
    $( document ).on( 'click', '.get-me-another', function(evt){  getAnotherVideo(); } );

    Youtube.init();
  }

  var toggleGenre = function (evt){
    var target = $(evt.target);
    $( ".genre" ).removeClass('selected');
    
    target.addClass('selected');
  }

  var assembleCategories = function(){
    return _.map($(".category.selected"),function(item){return $(item).data("name")}).join();
  }

  var reset = function(){
    if(Youtube.player){
      Youtube.player.stopVideo();
    }
    hideAllBut("#start-screen"); 
    $( "body" ).removeClass( "video-on" );
  }

  var hideAllBut = function(keepalive){
    $( ".screen" ).fadeOut("fast", function(evt){
      if( _.where(_.map($(".screen"), function(v){return $(v).css("display")}), "block").length == 0 ){
        $( keepalive ).fadeIn("fast");
      }
    });
  }

  var getAnotherVideo = function () {
    youtube_id = sublist.pop().id.$t.match(/video:(\S*.)/)[1];

    if(Youtube.player){
      Youtube.player.loadVideoById( youtube_id.toString() );
    }

    if(sublist.length < 1){
      $( ".get-me-another" ).hide();
    }
  }

  var getNewVideo = function () {
    var selectedAuthor = $(".genre.selected").data("name") == undefined ? "all" : $(".genre.selected").data("name");
    var category = assembleCategories();

    var searchString = "https://gdata.youtube.com/feeds/api/videos/?";
    
    var durationValue = $( "#slider" ).slider( "value" )*60;
    if(durationValue <= 240) // less than 4 minutes
    {
      searchString += "duration=short&";
      author = {
        "artsy" : _.sample(Artsy.shortList),
        "interesting" : _.sample(Interesting.shortList),
        "funny" : _.sample(Funny.shortList), 
        "all" : _.sample(AllAuthors.shortList)
      }
    }else if(durationValue > 240 && durationValue <= 1200){ // up to 20 minutes
      author = {
        "artsy" : _.sample(Artsy.mediumList),
        "interesting" : _.sample(Interesting.mediumList),
        "funny" : _.sample(Funny.mediumList),
        "all" : _.sample(AllAuthors.mediumList)
      };
      searchString += "duration=medium&";
    }else{ //more than 20 minutes
      author = {
        "artsy" : _.sample(Artsy.longList),
        "interesting" : _.sample(Interesting.longList),
        "funny" : _.sample(Funny.longList), 
        "all" : _.sample(AllAuthors.longList)
      }
      searchString += "duration=long&";
    }
 
    if( selectedAuthor != ""){
      searchString += "author=" + author[selectedAuthor] + "&";
    }

    searchString += "alt=json&max-results=50&v=2";

    $.get(searchString,
      {}, 
      function(data){
        if(data.feed.entry){

          var sorted = _(data.feed.entry).sortBy(function(entry){
            return entry.media$group.yt$duration.seconds;
          });

          sublist = _.filter(sorted, function(entry){
            return entry.media$group.yt$duration.seconds <= durationValue;
          });

          youtube_id = sublist.pop().id.$t.match(/video:(\S*.)/)[1];

          if(Youtube.player){
            Youtube.player.loadVideoById( youtube_id.toString() );
          }

          hideAllBut( "#video-screen" );
          $( "body" ).addClass( "video-on" );
        } else {
          hideAllBut( "#error-screen" );
        }
      }
    ); 
  };

  return {
    init: init
  }
  
}());
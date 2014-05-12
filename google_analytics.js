GoogleAnalytics = ( function () {
  
  var init = function () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-48089366-2', {
      'cookieDomain': 'none'
    });
    ga('send', 'pageview');

    setEvents();
  };

  var setEvents = function () {
    $( document ).on( 'click', '#artsy li a', function(evt){  
      ga('send', 'event', 'author', 'click', 'artsy' );
    });
    $( document ).on( 'click', '#funny li a', function(evt){  
      ga('send', 'event', 'author', 'click', 'funny' );
    });
    $( document ).on( 'click', 'interesting li a', function(evt){  
      ga('send', 'event', 'author', 'click', 'interesting' );
    });
    $( document ).on( 'click', '#contact', function(evt){  
      ga('send', 'event', 'button', 'click', 'contact' );
    });
    $( document ).on( 'click', '#about', function(evt){  
      ga('send', 'event', 'button', 'click', "about" );
    });
    $( document ).on( 'click', '.genre', function(event){
      ga('send', 'event', 'button', 'click', $( event.target ).data("name") );
    });
    $( document ).on( 'click', '.get-me-another', function(evt){  
      ga('send', 'event', 'button', 'click', 'get another video' );
    });
    $( document ).on( 'click', '#start-screen button', function(){ 
      ga('send', 'event', 'button', 'click', 'get new video' );
      ga('send', 'event', 'slider', 'final', $( "#slider" ).val() );
    });
    $( document ).on( 'mouseup', '.noUi-handle', function(event){
      ga('send', 'event', 'slider', 'set', $( "#slider" ).val() );
    });
    $( document ).on( 'click', '.reset', function(evt){  
      ga('send', 'event', 'button', 'click', "reset" );
    });
  };

  return {
    init: init
  }
}());
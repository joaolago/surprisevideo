var Funny = (function(){
  var shortList = ["adultswim", "TheOnion", "comedycentral", "JimmyKimmelLive"];
  var mediumList = ["adultswim", "TheOnion", "JimmyKimmelLive", "teamcoco"];
  var longList = ["teamcoco"];

  return {
    shortList : shortList,
    mediumList : mediumList,
    longList : longList
  }
}());

var Interesting = (function(){
  var shortList = ["newscientistvideo", "SteveSpanglerScience", "scishow", "vice"];
  var mediumList = ["TEDtalksDirector", "thebrainscoop", "scishow", "Vsauce", "Documentary", "vice"];
  var longList = ["Vsauce", "Documentary", "vice"];

  return {
    shortList : shortList,
    mediumList : mediumList,
    longList : longList
  }
}());

var Artsy = (function(){
  var shortList = ["nfb", "BFIfilms"];
  var mediumList = ["nfb", "BFIfilms", "canaleducatif"];
  var longList = ["nfb"] ;

  return {
    shortList : shortList,
    mediumList : mediumList,
    longList : longList
  }
}());

var AllAuthors = (function(){
  var shortList = _.union(Funny.shortList, Interesting.shortList, Artsy.shortList);
  var mediumList = _.union(Funny.mediumList, Interesting.mediumList, Artsy.mediumList);
  var longList = _.union(Funny.longList, Interesting.longList, Artsy.longList);

  return{
    shortList : shortList,
    mediumList : mediumList,
    longList : longList
  }
}());
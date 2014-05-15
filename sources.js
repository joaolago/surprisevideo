var Category = function(lists){
  var shortList = lists.shortList || [];
  var mediumList = lists.mediumList || [];
  var longList = lists.longList || [];

  return {
    shortList : shortList,
    mediumList : mediumList,
    longList : longList,
    all : _.uniq(shortList.concat(mediumList, longList))
  }
};

var artsy = new Category({
  shortList : ["nfb", "BFIfilms", "tate", "MoMAvideos", "futureshorts"],
  mediumList : ["nfb", "BFIfilms", "canaleducatif", "tate", "MoMAvideos", "futureshorts"],
  longList : ["nfb", "tate", "MoMAvideos", "TimelessClassicMovie", "futureshorts"]
});


var animation = new Category({
  shortList : ["FOXADHD" , "UC-vrN89jIox3XqAKbEMeFgQ", "UC50iz5aJP46T5n7gGgGMBTQ", "simonscat", "SecretAgentBob", "HelloDoctorPuppet", "OnlyLeigh"],
  mediumList : ["UC-vrN89jIox3XqAKbEMeFgQ", "UC50iz5aJP46T5n7gGgGMBTQ", "SecretAgentBob", "HelloDoctorPuppet"],
  longList : ["HelloDoctorPuppet"]
});


var funny = new Category({
  shortList : ["adultswim", "TheOnion", "comedycentral", "JimmyKimmelLive", "collegehumor", "AboveAverageNetwork", "FOXADHD", "simonscat", "SecretAgentBob", "OnlyLeigh", "latenight"],
  mediumList : ["adultswim", "TheOnion", "JimmyKimmelLive", "teamcoco", "collegehumor", "AboveAverageNetwork", "SecretAgentBob", "latenight"],
  longList : ["teamcoco"]
});

var interesting = new Category({
  shortList : ["newscientistvideo", "SteveSpanglerScience", "scishow", "vice", "TommyEdisonXP", "RadioTripPictures", "theRSAorg", "crashcourse", "pbsideachannel", "CGPGrey", "Vihart", "destinws2"],
  mediumList : ["TEDtalksDirector", "thebrainscoop", "scishow", "Vsauce", "Documentary", "vice", "TommyEdisonXP", "RadioTripPictures", "theRSAorg", "pbsideachannel", "CGPGrey", "Vihart", "destinws2"],
  longList : ["Vsauce", "Documentary", "vice", "RadioTripPictures", "theRSAorg", "destinws2", "Vihart"]
});

var allAuthors = new Category({
  shortList : _.union(funny.shortList, interesting.shortList, artsy.shortList),
  mediumList : _.union(funny.mediumList, interesting.mediumList, artsy.mediumList),
  longList : _.union(funny.longList, interesting.longList, artsy.longList)
});
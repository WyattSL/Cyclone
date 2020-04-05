exports.run = function(client, args) {
  console.log("starting")
  // various utilites
  client.random = function(max) {
    if (!max) {
      max = 1
    }
    Math.floor(Math.random * 10)
  }
  
  
  // presence data
  var presences = require("/app/stuff/presence.json");
  client.prescount = 0
  client.setInterval(function() {
    if (client.prescount > presences.length-1) client.prescount = 0
    var p = presences[client.prescount];
    console.log(p)
    console.log(client.prescount);
    var s = p.split(" ")[0];
    p = p.sub(s.length+1);
    client.user.setPresence(s);
    client.user.setStatus(s);
    client.prescount=client.prescount+1
  }, (60/presences.length)*1000);
}
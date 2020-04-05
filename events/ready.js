exports.run = function(client, args) {
  console.log("starting")
  client.random = function(max) {
    if (!max) {
      max = 1
    }
    Math.floor(Math.random * 10)
  }
  var presences = require("/app/stuff/presence.json");
  client.prescount = 0
  var mod = 0
  client.setInterval(function() {
    mod = 1000
    if (client.prescount > presences.length-1) client.prescount = 0
    var p = presences[client.prescount];
    p=p.replace(/%users%/, client.users.array().length);
    p=p.replace(/%guilds%/, client.guilds.array().length);
    var s = p.split(" ")[0];
    p = p.slice(s.length+1);
    client.user.setPresence({status: "online", game:{ name: p, type:s}});
    client.prescount=client.prescount+1
  }, (60/presences.length)*mod);
}
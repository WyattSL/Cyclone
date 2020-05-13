const got = require("got");

exports.run = async function(client, msg, args) {
  var url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API}&vanityurl=${args.join(" ")}`;
  var id;
  var req = await got(url);
  console.log(req.body);
  var d = JSON.parse(req.body).response;
  var e = d.success
  if (e == 1) {
    id=d.steamid;
    var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API}&steamids=${id}`;
    var req = await got(url);
    console.log(req.body);
    var d = JSON.parse(req.body).response
    var e = new client.embed;
    e.setTitle("Lookup Results");
    e.setAuthor()
    msg.channel.send(e);
  } else if (e == 42) {
    msg.channel.send(`I was unable to find a user with that vanity url.`);
  } else {
    msg.channel.send(`API Error: [${e}] ${d.message}`);
  }
}

exports.usage = "steam <vanityurl>";
exports.description = "Retreive information on a steam user.";
exports.example = "steam WyattL"
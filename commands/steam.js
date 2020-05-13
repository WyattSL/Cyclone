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
    var d = JSON.parse(req.body).response.players[0];
    var e = new client.embed;
    e.setTitle("Lookup Results");
    e.setAuthor(d.personaname, d.avatar, d.profileurl)
    e.setThumbnail(d.avatarfull);
    e.addField("Steam ID", d.steamid);
    if (!d.profilestate) {
      e.setDescription("This user has not setup their profile.");
    } else if (d.communityvisiblitystate < 3) {
      e.setDescription("This user's profile is not public.");
    } else if (d.realname) {
      e.setDescription(d.realname);
    }
    if (d.personastate) {
      var state;
      switch (d.personastate) {
        case 0:
          state = "Offline"
          break;
        case 1:
          state = "Online"
          break;
        case 2:
          state = "Busy"
          break;
        case 3:
          state = "Away"
          break;
        case 4:
          state = "Snooze"
          break;
        case 5:
          state = "Looking to Trade"
          break;
        case 6:
          state = "Looking to Play"
          break;
        default:
          state = "Unknown"
      }
      e.addField("Status", state)
    }
    if (d.loccountrycode) {
      var loc = d.loccountrycode
      if (d.locstatecode) {
        loc = loc + ", " + d.locstatecode
      }
      e.addField("Location", loc)
    }
    if (d.gameextrainfo) {
      e.addField("Playing", d.gameextrainfo);
    }
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
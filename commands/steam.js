exports.run = function(client, msg, args) {
  var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_KEY}&steamids=${id}`
}

exports.usage = "steam <username/pageurl>";
exports.description = "Retreive information on a steam user.";
exports.example = "steam WyattL"
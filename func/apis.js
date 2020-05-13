const got = require("got");

exports.run = function(client) {
  got.post("discord.botsondiscord.xyz/bots/", {
      "headers": {
      "Authorization": process.env.BOD_API,
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({"guildCount": client.guilds.size+amplify*2})
  });
}
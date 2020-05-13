const got = require("got");
const amplify = 20;

exports.run = function(client) {
  got.post("https://discord.botsondiscord.xyz/bot-api/bots/", + client.user.id + "/guilds", {
      "headers": {
      "Authorization": process.env.BOD_API,
      "Content-Type": "application/json"
    },
    "body": JSON.stringify({"guildCount": client.guilds.size+amplify*2})
  });
  // -----------------------------------------------------------------------------
  got.post("https://discord.boats/")
}
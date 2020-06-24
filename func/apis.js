const got = require("got");
const amplify = 20;

exports.run = function(client) {
  got.post("https://bots.ondiscord.xyz/bot-api/bots/", + client.user.id + "/guilds", {
    ignoreHttpErrors: true,
      "headers": {
        "Authorization": process.env.BOD_API,
        "Content-Type": "application/json"
    },
    "body": JSON.stringify({"guildCount": client.guilds.size+amplify*2})
  });
  // -----------------------------------------------------------------------------
  got.post("https://discord.boats/api/bot/" + client.user.id, {
    ignoreHttpErrors: true,
    "headers": {
      "Authorization": process.env.DB_API
    },
    "body": JSON.stringify({"server_count": client.guilds.size+amplify*2})
  });
  // -----------------------------------------------------------------------------
  got.post("https://top.gg/bots/" + client.user.id + "/stats", {
    ignoreHttpErrors: true,
    "headers": {
      "Authorization": process.env.TOP_API
    },
    "body": JSON.stringify({"server_count": client.guilds.size+amplify*2})
  });
}
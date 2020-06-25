const got = require("got");

exports.run = function(client) {
  got.post("https://bots.ondiscord.xyz/bot-api/bots/", + client.user.id + "/guilds", {
    throwHttpErrors: false,
      "headers": {
        "Authorization": process.env.BOD_API,
        "Content-Type": "application/json"
    },
    "body": JSON.stringify({"guildCount": client.guilds.size})
  });
  // -----------------------------------------------------------------------------
  got.post("https://discord.boats/api/bot/" + client.user.id, {
    throwHttpErrors: false,
    "headers": {
      "Authorization": process.env.DB_API
    },
    "body": JSON.stringify({"server_count": client.guilds.size})
  });
  // -----------------------------------------------------------------------------
  got.post("https://top.gg/bots/" + client.user.id + "/stats", {
    throwHttpErrors: false,
    "headers": {
      "Authorization": process.env.TOP_API
    },
    "body": JSON.stringify({"server_count": client.guilds.size})
  });
}
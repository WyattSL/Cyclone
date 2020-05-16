exports.run = function(client, msg, args) {
  var embed = new client.embed;
  embed.setTitle("Guild List");
  embed.setColor(0x0000FF);
  embed.setFooter(client.generateFooter())
  embed.setTimestamp();
  var guilds = client.guilds.array();
  var desc = "";
  var i;
  for (i=0;i<guilds.length;i++) {
    var guild = guilds[i];
    if (!client.config[guild.id]["listGuilds"] || client.config[guild.id]["listGuilds"] == "false") return false;
    if (client.config[guild.id])
  }
}

exports.usage = "guilds"
exports.example = "guilds"
exports.description = "List all guilds the bot is in. Use the config to disable this."
exports.p = ["SEND_MESSAGES", "EMBED_LINKS"]
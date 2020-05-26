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
    console.log(guild.name)
    if (client.config[guild.id] && client.config[guild.id]["listGuilds"] == "false") {
      console.log(`0`)
    } else if (client.config[guild.id] && client.config[guild.id]["listGuildsInvite"] == "true") {
      console.log(1)
      guild.channels.random().createInvite().then(invite => {
        desc = `[${guild.name}](${invite}, Invite)\n`;
        console.log(1.5)
      });
    } else {
      console.log(2)
      desc = `${guild.name}\n`;
    }
  }
  embed.setDescription(desc);
  msg.channel.send(embed);
}

exports.usage = "guilds"
exports.example = "guilds"
exports.description = "List all guilds the bot is in. Use the config to disable this."
exports.p = ["SEND_MESSAGES", "EMBED_LINKS"]
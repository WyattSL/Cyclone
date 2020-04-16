exports.run = function(client, msg, args) {
  var announcement = msg.content.slice(10, msg.content.length);
  var channel = client.config[msg.guild.id].announceChannel;
  if (!channel) {
    var embed = new client.embed;
    embed.setTitle("Oh noes!");
    embed.setDescription("A announcement channel is not set. Please do so in the config.");
    embed.setFooter(client.generateFooter());
    embed.setColor(0xFF0000);
    embed.addField("Psst! Here's the announcement!", announcement);
    msg.channel.send(embed);
    return;
  }
  var name = msg.guild.name;
  var av = msg.guild.iconURL;
  var reason = `Announcement`;
  channel.createWebhook(name, av, reason).then(webhook => {
    webhook.send(announcement).then(ms => {
      webhook.delete();
    });
  });
}

exports.example = "announce This is a very important announcement!";
exports.description = "Send a announcement to the channel specified in the configuration.";
exports.usage = "announce <announcement>";
exports.permission = "MANAGE_MESSAGES"
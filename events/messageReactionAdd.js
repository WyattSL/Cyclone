exports.run = function(client, args) {
  var reaction = args[0];
  var user = args[1];
  var msg = reaction.message;
  var rc = client.config[msg.guild.id].reportsChannel;
  if (msg.embeds && msg.author.id == client.author.id && msg.channel == rc) {
    if (msg.embds)
  }
};
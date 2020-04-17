exports.run = function(client, msg, args) {
  var embed = new client.embed;
  embed.setTitle("Cyclone Datacenter");
  embed.setFooter(client.generateFooter());
  var path = `/app/commands/`;
  var i;
}

exports.usage = "help [command]";
exports.description = "View help on a command, or list commands."
exports.example = "help help";
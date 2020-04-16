exports.run = function(client, msg, args) {
  var configlist = client.configlist;
  var key = args.shift();
  var value = args.join(" ");
  if (!key) {
    var i;
    var embed = new client.embed;
    embed.setFooter(client.generateFooter());
    embed.setColor(0x000000);
    if (client.random(1) == 1) {
      client.setTitle(`Cyclone Configuration`);
    } else {
      client.setTitle(`Top Secret Control Panel`);
    }
    for (i=0;i<configlist.length;i++) {
      var name = configlist[i].name;
      var description = configlist[i].description;
      var default = configlist[i].default;
    };
  }
}

exports.usage = "config [key] [value] \n config [key]";
exports.description = "Modify bot configuration.";
exports.example = "config prefix !";
exports.permission = "MANAGE_SERVER";
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
      embed.setTitle(`Cyclone Configuration`);
    } else {
      embed.setTitle(`Top Secret Control Panel`);
    }
    for (i=0;i<configlist.length;i++) {
      var name = configlist[i].name;
      var description = configlist[i].description;
      var Default = configlist[i].default;
      var type = configlist[i].type;
      var cvalue = client.config[msg.guild.id][name] || Default;
      embed.addField(`${name}`, `${description}\nCurrently: ${cvalue}`, true);
    };
    msg.channel.send(embed);
  }
}

exports.usage = "config [key] [value] \n config [key]";
exports.description = "Modify bot configuration.";
exports.example = "config prefix !";
exports.permission = "MANAGE_SERVER";
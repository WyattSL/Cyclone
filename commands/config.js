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
      client.configlistkeys[name] = i;
      var description = configlist[i].description;
      var Default = configlist[i].default;
      var type = configlist[i].type;
      var cvalue = client.config[msg.guild.id][name] || Default;
      embed.addField(`${name}: ${cvalue}`, `${description}`, true);
    };
    msg.channel.send(embed);
  }
  if (key && !value) {
    var embed = new client.embed;
    embed.setFooter(client.generateFooter());
    embed.setColor(0x000000);
    embed.setTitle("Cyclone Configuration");
    embed.setDescription(key);
    var k = client.configlistkeys[key]
    if (!k) {
      embed.setDescription(`I couldn't find ${key}.`);
      embed.setThumbnail(client.assets.X);
      embed.setColor(0xFF0000);
      msg.channel.send(embed);
      return;
    }
    embed.addField(``)
    
    
  }
}

exports.usage = "config [key] [value] \n config [key]";
exports.description = "Modify bot configuration.";
exports.example = "config prefix !";
exports.permission = "MANAGE_SERVER";
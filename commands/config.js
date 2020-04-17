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
    client.configlistkeys = {};
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
  } else if (key && !value) {
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
    var c = client.configlist[k];
    var Default = c.default;
    var description = c.description;
    var type = c.type;
    var cvalue = client.config[msg.guild.id][key] || Default
    embed.addField(`Current Value`, cvalue);
    embed.addField(`Description`, description);
    embed.addField(`Default Value`, Default);
    msg.channel.send(embed);
  } else if (key && value) {
    var embed = new client.embed;
    embed.setFooter(client.generateFooter());
    embed.setColor(0x000000);
    embed.setTitle("Cyclone Configuration");
    embed.setDescription(key);
    var c = client.configlist[client.configlistkeys[key]];
    var cvalue = client.config[msg.guild.id].default || Default;
    var type = c.type;
    if (type == "number" || type == "integer") {
      if (!Number(value)) {
        embed.setDescription("Please input a number.");
        embed.setColor(0xFF0000);
        msg.channel.send(embed);
        return false;
      }
    }
    if (type == "bool") {
      switch (key) {
        case "yes":
          value = "true";
          break;
        case "no":
          value = "false";
          break;
        case "on":
          value = "true";
          break;
        case "off":
          value = "false";
          break;
        default:
          embed.setDescription("Please input true/false.");
          embed.setColor(0xFF0000);
          msg.channel.send(embed);
          return false;
      } 
    }
    embed.addField(`Old`, cvalue, true);
    embed.addField(`New`, value, true);
    var q = `DELETE FROM config WHERE guild=@0 AND key=@1`;
    client.db.run(q, msg.guild.id, key);
    var q = `INSERT INTO config ("guild", "key", "value") VALUES (@0, @1, @2)`;
    client.db.run(q, msg.guild.id, key, value);
    client.config[msg.guild.id][key] = value;
    msg.channel.send(embed);
  }
}

exports.usage = "config [key] [value] \n config [key]";
exports.description = "Modify bot configuration.";
exports.example = "config prefix !";
exports.permission = "MANAGE_SERVER";
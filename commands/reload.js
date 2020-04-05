const fs = require("fs");

exports.run = function(client, msg, args) {
  var commandName = args[1];
  var target = `/app/commands/${commandName}.js`;
  if (fs.existsSync(target)) {
    delete require.cache[require.resolve(target)];
    var e = new client.embed;
    e.setTitle(`Success`)
    e.setColor(0x00FF00)
    e.setFooter(client.generateFooter())
    e.setThumbnail(`https://wl-cycle.glitch.me/img/check`);
    e.setDescription(`Successfully reloaded ${commandName}.`);
    msg.channel.send(e);
  } else {
    var e = new client.embed;
    e.setTitle(`Error`);
    e.setColor(0xFF0000);
    e.setFooter(client.generateFooter())
    e.setThumbnail(`https://wl-cyclone.glitch.me/img/X`);
    e.setDescription(`${commandName} does not exist.`);
    msg.channel.send(e);
  }
}
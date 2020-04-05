const fs = require("fs");

exports.run = function(client, msg, args) {
  var commandName = args[0];
  var target = `/app/commands/${commandName}.js`;
  if (fs.existsSync(target)) {
    delete require.cache[require.resolve(target)];
    var e = new client.embed;
    e.setTitle(`Success`)
    e.setColor()
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
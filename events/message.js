const fs = require('fs')

module.exports = (client, args) => {
  var RichEmbed = client.embed;
  var msg = args[0];
  if (msg.author.bot) return false;
  if (msg.mentions.users.first() && msg.mentions.users.first().id == client.user.id) {
    msg.channel.send(
      `The prefix on ${msg.guild.name} is ${client.config[msg.guild.id].prefix}`
    );
    return true;
  } else if (!msg.content.startsWith(client.config[msg.guild.id].prefix)) {
    return false;
  }
  var target = msg.content.slice(client.config[msg.guild.id].prefix.length).split(" ")[0]
  var module = `/app/commands/${target}.js`
  if (fs.existsSync(module)) {
    module = require(module);
    if (module.meonly) {
      if (msg.author.id !== 270035320894914560) {
        return false;
      }
    }
    if (module.permission) {
      if (!msg.member.hasPermission(module.permission, false, true, true)) {
        var e = new RichEmbed;
        e.setTitle("Error!")
        e.setColor(0xFF0000);
        e.setDescription("You do not have permission to perform this action.")
        e.setThumbnail("https://wl-cyclone.glitch.me/img/suspicous.png")
        return false;
      }
    }
  }
};

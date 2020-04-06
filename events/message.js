const fs = require('fs')

exports.run = (client, args) => {
  var RichEmbed = client.embed;
  var msg = args[0];
  console.log("@" + msg.member.displayName + " said " + msg.content + " in " + msg.guild.name + " on #" + msg.channel.name)
  if (msg.author.bot) return false;
  var prefix = ".";
  if (msg.mentions.users.first() && msg.mentions.users.first().id == client.user.id) {
    msg.channel.send(
      `The prefix on ${msg.guild.name} is \`\`${prefix}\`\``
    );
    return true;
  } else if (!msg.content.startsWith(prefix)) {
    return false;
  }
  var target = msg.content.slice(prefix.length).split(" ")[0]
  var module = `/app/commands/${target}.js`
  if (fs.existsSync(module)) {
    module = require(module);
    if (module.meonly) {
      if (msg.author.id == 270035320894914560) {}else {
        var e = new RichEmbed;
        e.setTitle("Error!")
        e.setColor(0xFF0000);
        e.setDescription("You do not have permission to perform this action. ``IS_WYATT=FALSE``")
        e.setThumbnail("https://wl-cyclone.glitch.me/img/X")
        e.setFooter(client.generateFooter());
        msg.channel.send(e);
        return false;
      }
    }
    if (module.permission) {
      if (!msg.member.hasPermission(module.permission, false, true, true)) {
        var e = new RichEmbed;
        e.setTitle("Error!")
        e.setColor(0xFF0000);
        e.setDescription("You do not have permission to perform this action. ``" + module.permission + "``")
        e.setThumbnail("https://wl-cyclone.glitch.me/img/X")
        e.setFooter(client.generateFooter());
        msg.channel.send(e);
        return false;
      }
    }
    var args = msg.content.slice(target + prefix.length).split(" ");
    args.shift(); // remove the command
    if (msg.deletable) {
      msg.delete(); // delete the command, if it can
    }
    module.run(client, msg, args)
  }
};

const fs = require("fs");
exports.run = function(client, msg, args) {
  var embed = new client.embed;
  embed.setTitle("Cyclone Datacenter");
  embed.setDescription("You will only see commands you have access to.")
  embed.setFooter(client.generateFooter());
  var path = `/app/commands/`;
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    var i;
    for (i=0;i<files.length;i++) {
      var f = files[i];
      var n = f.split(".")[0];
      f = require(path+f);
      var prefix = client.config[msg.guild.id].prefix || ".";
      var perm = f.permission;
      if (perm) perm=perm.replace("MANAGE_SERVER", "MANAGE_GUILD");
      if (!f.hide) {
        if (!f.meonly || msg.author.id == process.env.OWNER) {
          if (!f.permission) {
            embed.addField(prefix + f.usage, f.description, false);
          } else if (msg.member.hasPermission(perm, false, true, true)) {
            embed.addField(prefix + f.usage, f.description, false);
          }
        }
      }
    }
    msg.channel.send(embed);
  });
}

exports.usage = "help [command]";
exports.description = "View help on a command, or list commands."
exports.example = "help help";
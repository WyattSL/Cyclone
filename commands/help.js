const fs = require("fs");
exports.run = function(client, msg, args) {
  var embed = new client.embed;
  embed.setTitle("Cyclone Datacenter");
  embed.setFooter(client.generateFooter());
  var path = `/app/commands/`;
  fs.readdir(path, function(err, files) {
    if (err) throw err;
    var i;
    for (i=0;i<files.length;i++) {
      var f = files[i];
      var n = f.split(".")[0];
      f = require(path+f);
      console.log(f);
    }
  });
}

exports.usage = "help [command]";
exports.description = "View help on a command, or list commands."
exports.example = "help help";
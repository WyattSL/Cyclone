exports.run = function(client, msg, args) {
  var e = new client.embed;
  e.setTitle("Bye!");
  e.setDescription("Restarting bot. This may take ~30 seconds.")
  e.setColor(0xFF0000)
  e.setFooter(client.generateFooter());
  e.setThumbnail(`https://wl-cyclone.glitch.me/img/check`);
  msg.channel.send(e);
  setTimeout(function() {
    client.destroy();
    process.exit(0);
  }, 500);
}

exports.meonly = true;
exports.description = "Restart the bot."
exports.usage = "restart"
exports.example = "restart"
exports.run = function(client, msg, args) {
  msg.channel.send(Math.round(client.ping) + "ms" + "; " + client.uptime/1000 + "s!");
}

exports.usage = "reload <command>"
exports.description = "Reload a command."
exports.example = "reload ping"
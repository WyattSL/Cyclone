exports.run = function(client, msg, args) {
  msg.channel.send(Math.round(client.ping) + "ms" + "; " + Math.round(client.uptime/1000) + "s!");
}

exports.usage = "ping"
exports.description = "Retrieve basic bot stats."
exports.example = "ping"
exports.run = function(client, msg, args) {
  msg.channel.send(Math.round(client.ping) + "ms" + "; " + client.uptime/1000 + "s!");
}
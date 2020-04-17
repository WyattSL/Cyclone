exports.run = function(client, msg, args) {
  var up = client.uptime;
  var ping = client.ping;
  var guilds = client.guildcount
  var users = client.usercount
  var status = client.status;
  switch (status) {
    case 0:
      status = "READY"
      break;
    case 1:
      status = "CONNECTING"
      break;
    case 2:
      status = "RECONNECTING"
      break;
    case 3:
      status = "IDLE"
      break;
    case 4:
      status = "NEARLY"
      break;
    case 5:
      status = "DISCONNECTED"
      break;
  }
  var version = process.version;
  var pid = process.pid;
  var platform = process.platform;
  var memtotal = process.memoryUsage().heapTotal;
  var memused = process.memoryUsage().heapUsed;
  var vc = client.voiceConnections.size;
  var e = new client.embed;
  e.setTitle("Cyclone Control")
  .setColor(0x000000)
  .setFooter(client.generateFooter())
  .addField(`Uptime`, up, true)
  .addField(`Ping`, ping, true)
  .addField(`Status`, status, true)
  .addField(`Users`, users, false)
  .addField(`Guilds`, guilds, true)
  .addField(`Node Version`, version, true)
  .addField(`Process PID`, pid, false)
  .addField(`Process Platform`, platform, true)
  .addField(`Voice Connections`, `${vc}`, true)
  msg.channel.send(e);
}

exports.usage = "ping"
exports.description = "Retrieve basic bot stats."
exports.example = "ping"
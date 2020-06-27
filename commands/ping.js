exports.run = function(client, msg, args) {
  const os = require("os")
  var up = client.uptime;
  var ping = client.ping;
  var guilds = client.guilds.size
  var users = client.users.size
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
  var sup = os.uptime();
  var memtotal = 256;
  var memused = 50;
  var type = os.type();
  var cpus = os.cpus().length;
  var vc = client.voiceConnections.size;
  var e = new client.embed;
  e.setTitle("Cyclone Control")
  .setColor(0x000000)
  .setFooter(client.generateFooter())
  .addField(`Bot Uptime`, up, true)
  .addField(`System Uptime`, sup, true)
  .addField(`Ping`, ping, true)
  .addField(`Status`, status, false)
  .addField(`Users`, users, true)
  .addField(`Guilds`, guilds, true)
  .addField(`Node Version`, version, false)
  .addField(`Process PID`, pid, true)
  .addField(`Process Platform`, platform, true)
  .addField(`Voice Connections`, `${vc}`, false)
  .addField(`Memory`, `${memused}MB/${memtotal}MB`, true)
  .addField(`System Type`, `${type}`, true)
  .addField(`CPU Count`, cpus, false)
  msg.channel.send(e);
}

exports.usage = "ping"
exports.description = "Retrieve basic bot stats."
exports.example = "ping"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]
exports.run = function(client, msg, args) {
  var up = client.uptime;
  var ping = client.ping;
  var guilds = client.guildscount
  var users = client.userscount
  var status = client.status;
  var version = process.version;
  var pid = process.pid;
  var platform = process.platform;
  var e = new client.embed;
  e.setTitle("Cyclone")
}

exports.usage = "ping"
exports.description = "Retrieve basic bot stats."
exports.example = "ping"
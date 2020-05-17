const crypto = require("crypto");
exports.run = function(client, msg, args) {
  var q = `DELETE FROM weblinks WHERE guild=?`;
  client.db.run(q, msg.guild.id);
  var secret = process.env.SECRET
  var hash = crypto.createHmac('sha256', secret)
   .update('I love cupcakes')
   .digest('hex');
  console.log(hash);
  var q = `INSERT INTO weblinks ("guild", "hash") VALUES (@0, @1)`;
  client.db.run(q, msg.guild.id, hash);
};

exports.owneronly = true;
exports.description = "Receive a link to login to the website dashboard.";
exports.usage = "dashboard";
exports.example = "dashboard";
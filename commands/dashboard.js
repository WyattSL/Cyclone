exports.run = function(client, msg, args) {
  var q = `DELETE FROM weblinks WHERE guild=?`;
  client.db.run(q, msg.guild.id);
  var randomId
};

exports.owneronly = true;
exports.description = "Receive a link to login to the website dashboard.";
exports.usage = "dashboard";
exports.example = "dashboard";
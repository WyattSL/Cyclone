exports.run = function(client, msg, args) {
  if (!msg.member.voicechannel) {
    var embed = new client.embed;
    embed.setTitle("Jeopardy");
    embed.setDescription("Please join a voice channel.");
    embed.setThumbnail(client.assets.X);
    embed.setFooter(client.generateFooter());
    embed.setColor(0xFF0000);
    msg.channel.send(embed);
    return false;
  }
  var questpath = `/app/stuff/questions.json`
  var questions = require(questpath);
}

exports.usage = "jeopardy"
exports.description = "Begin a jeopardy session."
exports.example = "jeopardy"
exports.run = function(client, msg, args) {
  if (!msg.member.voiceChannel) {
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
  var i;
  var random = client.random(questions.text.length);
  var question = questions.text[random];
  var audio = questions.audio[question];
  client.jeopardy = {}; // let me use things
  if (client.jeopardy.insession) {
    return false;
  }
  client.jeopardy.insession = true;
  msg.member.voiceChannel.join();
}

exports.usage = "jeopardy"
exports.description = "Begin a jeopardy session."
exports.example = "jeopardy"
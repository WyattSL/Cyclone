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
  var questionsFILE = require(questpath);
  var questions = questionsFILE;
  var i;
  client.jeopardy = {}; // let me use things
  if (client.jeopardy.insession) {
    return false;
  }
  client.jeopardy.question = function() {
    var random = client.random(questions.text.length);
    var question = questions.text[random-1];
    var audio = questions.audio[question];
    var answer = questions.answer[question];
    client.jeopardy.voiceconnection.playArbitraryInput(audio);
  }
  client.jeopardy.insession = true;
  msg.member.voiceChannel.join().then(connection => {
    client.jeopardy.voiceconnection = connection;
    client.jeopardy.question();
  });
}

exports.usage = "jeopardy"
exports.description = "Begin a jeopardy session."
exports.example = "jeopardy"
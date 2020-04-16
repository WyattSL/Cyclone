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
  client.jeopardy = {}; // let me use things
  if (client.jeopardy.insession) {
    return false;
  }
  this.askQuestion = function() {
    var random = client.random(questions.text.length-1);
    var question = questions.text[random];
    var audio = questions.audio[question];
    var answer = questions.answers[question];
    msg.channel.send(`R: ${random}/${questions.text.length-1} Q: ${question}; A: ${audio}; ANS: ${answer}`);
    client.jeopardy.question = question;
    client.jeopardy.audio = audio;
    client.jeopardy.answer = answer;
    client.jeopardy.voiceconnection.playArbitraryInput(audio);
  }
  client.jeopardy.insession = true;
  msg.member.voiceChannel.join().then(connection => {
    client.jeopardy.voiceconnection = connection;
    this.askQuestion();
  });
}

exports.usage = "jeopardy"
exports.description = "Begin a jeopardy session."
exports.example = "jeopardy"
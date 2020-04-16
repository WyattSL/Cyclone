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
  if (msg.guild.me.voiceChannel) msg.guild.me.voiceChannel.leave();
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
    client.jeopardy.question = question;
    client.jeopardy.audio = audio;
    client.jeopardy.answer = answer;
    client.jeopardy.voiceconnection.playArbitraryInput(`https://wl-cyclone.glitch.me/img/${audio}`);
    var filter = msg => msg.content.toLowerCase() == answer.toLowerCase();
    var collector = msg.channel.createMessageCollector(filter, {time: 15000})
    collector.on("collect", msg => {
      var embed = new client.embed;
      embed.setTitle("Jeopardy");
      embed.setDescription(`Correct! ${msg.member.displayName} has guessed ${answer}.`);
      embed.setColor(0x009900)
    });
    collector.on("end", collected => {
      if (collected.size < 1) {
        var embed = new client.embed;
        embed.setTitle("Jeopardy");
        embed.setDescription("Time is up! The answer was " + answer + ".");
        embed.setColor(0x990000);
        embed.setFooter(client.generateFooter());
        embed.setThumbnail(client.assets.X);
        embed.setTimestamp();
        msg.channel.send(embed);
      }
    });
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
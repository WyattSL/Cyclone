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
    var e = new client.embed;
    e.setTitle("Jeopardy");
    e.setDescription("A game is currently in session.");
    e.setColor(0xFF0000);
    e.setFooter(client.generateFooter());
    e.setTimestamp();
    e.setThumbnail(client.assets.X);
    msg.channel.send(e);
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
    var collector = msg.channel.createMessageCollector(filter, {time: 15000});
    var e = new client.embed;
    e.setTitle("Jeopardy");
    e.setDescription(question);
    e.setColor(0x000000);
    e.setFooter(client.generateFooter());
    msg.channel.send(e);
    collector.on("collect", msg => {
      var embed = new client.embed;
      embed.setTitle("Jeopardy");
      embed.setDescription(`Correct! ${msg.member.displayName} has guessed ${answer} correctly.`);
      embed.setColor(0x009900);
      embed.setFooter(client.generateFooter());
      embed.setTimestamp();
      embed.setThumbnail(client.assets.check);
      msg.channel.send(embed);
      collector.stop();
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
      if (client.jeopardy.rounds < client.jeopardy.maxrounds) {
        client.jeopardy.rounds=client.jeopardy.rounds+1
        this.askQuestion();
      } else {
        var e = new client.embed;
        e.setTitle("Jeopardy");
        e.setDescription("And that will conclude this round of Jeopardy!");
        e.setColor(0x000000);
        e.setFooter(client.generateFooter());
        e.setTimestamp();
        msg.channel.send(e);
      }
      return;
    });
  }
  client.jeopardy.insession = true;
  msg.member.voiceChannel.join().then(async connection => {
    client.jeopardy.voiceconnection = connection;
    var i;
    client.jeopardy.rounds = 1
    client.jeopardy.maxrounds = 5;
    this.askQuestion();
    client.jeopardy.insession = false;
    connection.voiceChannel.leave();
  });
}

exports.usage = "jeopardy"
exports.description = "Begin a jeopardy session."
exports.example = "jeopardy"
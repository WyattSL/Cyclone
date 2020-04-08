exports.run = function(client, msg, args) {
  var code = args.join(" ");
  msg.channel.send("```sql\n" + code + "```");
  try {
    client.db.all(code, function(err, res) {
      if (err) {
        msg.channel.send("```fix\n" + err + "```");
        throw err;
      }
      if (res[0]) {
        msg.channel.send("```json\n" + JSON.stringify(res) + "```");
      } else {
        msg.channel.send(`No results: ${res}`);
      }
    });
  } catch(err) {
    msg.channel.send("```fix\n" + err + "```")
  }
}

exports.meonly = true;
exports.usage = "db Code";
exports.description = "Run sql code in a un-sandboxed enviornment.";
exports.example = "db INSERT INTO mytable VALUES ('hi')";
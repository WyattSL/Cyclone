exports.run = function(client, msg, args) {
  var code = args.join(" ");
  msg.channel.send("```sql\n" + code + "```");
  try {
    client.db.run(code);
    msg.channel.send(`Executed successfully.`)
  } catch(err) {
    msg.channel.send("```fix\n" + err + "```")
  }
}

exports.meonly = true;
exports.hide = true;
exports.usage = "db Code";
exports.description = "Run sql code in a un-sandboxed enviornment.";
exports.example = "db INSERT INTO mytable VALUES ('hi')";
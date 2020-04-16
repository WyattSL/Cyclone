exports.run = function(client, msg, args) {
  var code = args.join(" ");
  var supersecuretoken = client.token;
  msg.channel.send("```js\n" + code + "```");
  client.token = "Nope!";
  try {
    eval(code);
    client.token = supersecuretoken;
    msg.channel.send(`Executed successfully.`)
  } catch(err) {
    msg.channel.send("```fix\n" + err + "```")
  }
}

exports.meonly = true;
exports.usage = "eval Code";
exports.description = "Run node code in a un-sandboxed enviornment.";
exports.example = "eval msg.channel.send('hi');"
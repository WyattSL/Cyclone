exports.run = function(client, msg, args) {
  var code = args.join(" ");
  var supersecuretoken = client.token;
  msg.channel.send("```js\n" + code + "```");
  try {
    var x; // so glitch won't scream
    eval(`var x=${code}`);
    if (x && x != "[object Promise]") {
      msg.channel.send(`Executed successfully. Output: ${x}`);
    } else {
      msg.channel.send(`Executed successfully.`)
    }
  } catch(err) {
    msg.channel.send("```fix\n" + err + "```")
  }
}

exports.meonly = true;
exports.usage = "eval Code";
exports.description = "Run node code in a un-sandboxed enviornment.";
exports.example = "eval msg.channel.send('hi');"
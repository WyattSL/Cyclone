exports.run = function(client, msg, args) {
  var code = args.join(" ");
  var supersecuretoken = client.token;
  msg.channel.send("```js\n" + code + "```");
  try {
    var x; // so glitch won't scream
    if (!msg.content.includes("eval!")) {
      eval(`var x=${code}`);
    } else {
      eval(code);
    }
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
exports.hide = true;
exports.usage = "eval Code";
exports.description = "Run node code in a un-sandboxed enviornment.";
exports.example = "eval msg.channel.send('hi');";
exports.p = ["SEND_MESSAGES"];
exports.run = function(client, msg, args) {
  var code = args.join(" ");
  var supersecuretoken = client.token;
  msg.channel.send("```js\n" + code + "```");
  if (!msg.content.includes("eval-")) {
    try {
      var x; // so glitch won't scream
      if (!msg.content.includes("eval!")) {
        eval(`var x=${code}`);
      } else {
        eval(code);
      }
      if (x && x != "[object Promise]") {
        msg.channel.send(`Executed successfully. Output: ${x}`);
      } else if (x) {
        msg.channel.send(`Executed successfully, Promise returned.`)
      } else {
        msg.channel.send(`Executed successfully, no output.`)
      }
    } catch(err) {
      msg.channel.send("```fix\n" + err + "```")
    }
  } else {
    eval(code);
  }
}

exports.meonly = true;
exports.hide = true;
exports.usage = "eval Code";
exports.description = "Run node code in a un-sandboxed enviornment.";
exports.example = "eval msg.channel.send('hi');";
exports.p = ["SEND_MESSAGES"];
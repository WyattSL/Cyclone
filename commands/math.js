exports.run = function(client, msg, args) {
  var eq = args.join(" ");
  eq=eq.replace(/times/g, "*");
  eq=eq.replace(/x/g, "*");
  eq=eq.replace(/plus/g, "+");
  eq=eq.replace(/add/g, "+");
  eq=eq.replace(/subtract/g, "-");
  eq=eq.replace(/sub/g, "-");
  eq=eq.replace(/minus/g, "-");
  eq=eq.replace(/divide/g, "/");
  eq=eq.replace(/ /g, "");
  try {
    var x;
    eval(`var x = ${eq}`);
    if (eq == "9+10" || eq == "10+9") x = 21;
    msg.channel.send(`${eq}=${x}`)
  } catch(err) {
    msg.channel.send(`I was unable to process that input. ${err}`);
  }
}

exports.usage = "math equation";
exports.description = "Solve complicated math equations!";
exports.example = "math 9+5^3"
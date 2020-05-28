exports.run = function (client, msg, args) {
  var eq = args.join(" ");
  if (!eq) {
    msg.channel.send("Please specify a equation!");
    return false;
  }
  eq = eq.toLowerCase();
  eq = eq.replace(/negative/g, "-");
  eq = eq.replace(/times/g, "*");
  eq = eq.replace(/x/g, "*");
  eq = eq.replace(/plus/g, "+");
  eq = eq.replace(/add/g, "+");
  eq = eq.replace(/subtract/g, "-");
  eq = eq.replace(/sub/g, "-");
  eq = eq.replace(/minus/g, "-");
  eq = eq.replace(/divide/g, "/");
  eq = eq.replace(/squared/g, "^2");
  eq = eq.replace(/cubed/g, "^3");
  eq = eq.replace(/a/g, "");
  eq = eq.replace(/b/g, "");
  eq = eq.replace(/c/g, "");
  eq = eq.replace(/d/g, "");
  eq = eq.replace(/e/g, "");
  eq = eq.replace(/f/g, "");
  eq = eq.replace(/g/g, "");
  eq = eq.replace(/h/g, "");
  eq = eq.replace(/i/g, "");
  eq = eq.replace(/j/g, "");
  eq = eq.replace(/k/g, "");
  eq = eq.replace(/l/g, "");
  eq = eq.replace(/m/g, "");
  eq = eq.replace(/n/g, ""); // it's hard to abuse the eval below if you can't use letters, eh?
  eq = eq.replace(/o/g, "");
  eq = eq.replace(/p/g, "");
  eq = eq.replace(/q/g, "");
  eq = eq.replace(/r/g, "");
  eq = eq.replace(/s/g, "");
  eq = eq.replace(/t/g, "");
  eq = eq.replace(/u/g, "");
  eq = eq.replace(/v/g, "");
  eq = eq.replace(/w/g, "");
  eq = eq.replace(/x/g, "");
  eq = eq.replace(/y/g, "");
  eq = eq.replace(/z/g, "");
  eq = eq.replace(/ /g, "");
  eq = eq.replace(/\^/g, "**");
  eq = eq.replace(/∞/g, "999999999999999999999999999999999999999999999999999999999999999999999999999999")
  try {
    console.log(eq);
    var x;
    eval(`var x = ${eq}`);
    if (eq == "9+10" || eq == "10+9") x = "19 **|OR|** 21";
    eq = eq.replace("**", "^");
    eq = eq.replace("**", "^");
    eq = eq.replace("**", "^");
    eq = eq.replace("**", "^");
    eq = eq.replace("**", "^");
    msg.channel.send(`\`\`${eq}\`\`=${x}`)
  } catch (err) {
    msg.channel.send(`I was unable to process \`\`${eq}\`\` as input. ${err}`);
  }
}

exports.usage = "math equation";
exports.description = "Solve complicated math equations!";
exports.example = "math 9+5^3"
exports.p = ["SEND_MESSAGES"]
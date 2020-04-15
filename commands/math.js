exports.run = function(client, msg, args) {
  var eq = args.join(" ");
  eq=eq.replace(/times/g, "*");
  eq=eq.replace(/x/g, "*");
  eq=eq.replace()
}

exports.meonly = true;
exports.usage = "math equation";
exports.description = "Solve complicated math equations!";
exports.example = "math 9+5^3"
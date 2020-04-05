exports.run = function(client, msg, args) {
  args.shift(); // shift the command out of the array (index 0)
  var ping = args.shift(); // [moved from 1->0] shift the ping out of the array (index 1)
  var reason = args.join(" ");
  if (!reason) {
    reason = "The ban hammer has spoken!"
  }
  
}
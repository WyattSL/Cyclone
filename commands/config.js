exports.run = function(client, msg, args) {
  var configlist = client.configlist;
  
}

exports.usage = "config [key] [value] \n config [key]";
exports.description = "Modify bot configuration.";
exports.example = "config prefix !";
exports.permission = "MANAGE_SERVER";
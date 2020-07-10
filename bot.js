const Discord = require("discord.js")
const {RichEmbed} = require("discord.js")
const { exec } = require("child_process");
const readline = require("readline");
const client = new Discord.Client();
const fs = require("fs")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    // If the file is not a JS file, ignore it (thanks, Apple)
    if (!file.endsWith(".js")) return;
    // Load the event file itself
    const event = require(`./events/${file}`);
    // Get just the event name from the file name
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    // without going into too many details, this means each event will be called with the client argument,
    // followed by its "normal" arguments, like message, member, etc etc.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, (arg1, arg2, arg3, arg4, arg5) => {
      var args = [arg1, arg2, arg3, arg4, arg5]
      client.embed = RichEmbed;
      var res = event.run(client, args);
    });
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

process.on("uncaughtException", err => {
  require("./events/error.js").error(err);
});

process.on("uncaughtRejection", (promise, err) => {
  var msg = `Rejection at ${promise} with error ${err}`
  require("./events/error.js").error(msg);
});

function pro() {
  rl.question("Command?", function(cmd) {
    if (cmd.split(" ")[0] == "exec") {
      exec(args.join(" "), (error, stdout, stderr) => {\
        if (error) {
            msg.channel.send(`ERROR: ${error.message}`);
        }
        if (stderr) {
            console.log(`STDERR: ${stderr}`);
        }
        console.log(`STDOUT: ${stdout}`);
        pro();
    });
    });
  });
};

client.login(process.env.TOKEN);

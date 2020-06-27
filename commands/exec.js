const { exec } = require("child_process");

exports.run = function(client, msg, args) {
    exec(args.join(" "), (error, stdout, stderr) => {
        var x = "```"
        if (error) {
            msg.channel.send(`Error: ${x}${error.message}${x}`);
            return;
        }
        if (stderr) {
            msg.channel.send(`STD Error ${x}${stderr}${x}`);
            return;
        }
        msg.channel.send(`Output: ${x}${stdout}${x}`);
    });
};

exports.meonly = true;
exports.usage = "exec <command>"
exports.example = "exec ls"
exports.description = "Run a command line command."
exports.p = ["SEND_MESSAGES"]
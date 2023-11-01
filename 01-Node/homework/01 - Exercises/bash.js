const process = require("process");
const { Z_ASCII } = require("zlib");
const commands = require("./commands/index.js");

function bash() {
  process.stdout.write("prompt > ");
  process.stdin.on("data", function (data) {
    const args = data.toString().trim();
    const args2 = args.split(" ");
    const cmd = args2[0];

    if (!commands.hasOwnProperty(cmd)) {
      print("command not found: " + cmd);
    } else {
      commands[cmd](print, args);
    }
  });
}

function print(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

bash();

module.exports = {
  print,
  bash,
};

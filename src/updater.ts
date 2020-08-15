import * as inquirer from "inquirer";
import * as pathsConfig from "./configurations/paths.config";
import CheckQuestion from "./inquiries/command.question";
import * as UpdateCommand from "./inquiries/update.command";
import * as CheckCommand from "./inquiries/check.command";
import * as ExitCommand from "./inquiries/exit.command";

console.log("Welcome to iGoodie's ArcDPS Updater!");
console.log("===================================");

pathsConfig.initialize(process.argv);

async function programLoop() {
  let running = true;

  while (running) {
    await inquirer.prompt([CheckQuestion]).then(async (answers) => {
      const command = answers[CheckQuestion.name];
      if (command === UpdateCommand.name) await UpdateCommand.default();
      if (command === CheckCommand.name) await CheckCommand.default();
      if (command === ExitCommand.name) running = false;
      console.log();
    });
  }

  console.log("Catch you later!");
}

programLoop();

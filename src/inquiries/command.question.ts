import * as inquirer from "inquirer";
import * as UpdateCommand from "~/inquiries/update.command";
import * as CheckCommand from "~/inquiries/check.command";
import * as ExitCommand from "~/inquiries/exit.command";

const question: inquirer.RawListQuestion = {
  type: "rawlist",
  name: "Select an action",
  choices: [
    { name: "Update/Install ArcDPS", value: UpdateCommand.name },
    { name: "Check for update", value: CheckCommand.name },
    { name: "Exit the program", value: ExitCommand.name },
  ],
};

export default question;

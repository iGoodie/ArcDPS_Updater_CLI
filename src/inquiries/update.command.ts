import * as chalk from "chalk";
import * as inquirer from "inquirer";
import pathsConfig from "~/configurations/paths.config";
import * as appData from "~/configurations/appdata.config";
import { downloadDLL, getLatestReleaseDate } from "~/util/arcdps.util";

export const name = "update";

export default function () {
  return inquirer
    .prompt([{ type: "confirm", name: "Force Update?", default: false }])
    .then(async (answers) => {
      const forceUpdate = answers["Force Update?"];

      if (!forceUpdate) {
        const lastReleased = await getLatestReleaseDate();
        const lastUpdated = appData.default.lastUpdated;
        if (lastUpdated > lastReleased) {
          console.log(
            chalk.green(
              "Your ArcDPS is already up to date. Enjoy the game!"
            )
          );
          return;
        }
      }

      await downloadDLL(pathsConfig.bin64Path + "\\d3d9.dll").then(() => {
        appData.default.lastUpdated = new Date();
        appData.save();
      });
    });
}

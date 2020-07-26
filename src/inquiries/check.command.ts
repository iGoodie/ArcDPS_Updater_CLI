import * as chalk from "chalk";
import appdata from "~/configurations/appdata.config";
import { getLatestReleaseDate } from "~/util/arcdps.util";

export const name = "check";

export default function () {
  return getLatestReleaseDate().then((lastReleaseDate) => {
    const lastUpdatedDate = appdata.lastUpdated;

    console.log(
      "ArcDPS was last released @",
      chalk.blueBright(lastReleaseDate.formatDate())
    );

    console.log(
      "Yours is last updated @",
      chalk.blueBright(lastUpdatedDate.formatDate())
    );

    if (lastUpdatedDate < lastReleaseDate) {
      console.log(
        chalk.red("[!] Your ArcDPS is outdated. You need to update")
      );
    } else {
      console.log(
        chalk.green("[✓] Your ArcDPS is up to date! Enjoy the game.")
      );
    }
  });
}

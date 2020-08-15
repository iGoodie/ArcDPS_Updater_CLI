import * as chalk from "chalk";
import * as fs from "fs";
import * as hasha from "hasha";
import * as arcdps from "~/util/arcdps.util";
import pathsConfig from "~/configurations/paths.config";

export const name = "check";

export default async function () {
  const d3d9Path = pathsConfig.bin64Path + "/d3d9.dll";

  if (!fs.existsSync(d3d9Path)) {
    return console.log(chalk.red("[!] ArcDPS is not installed."));
  }

  const [currentMd5, [targetMd5]] = await Promise.all([
    hasha.fromFile(d3d9Path, { algorithm: "md5" }),
    arcdps.downloadMD5Sum(),
  ]);

  console.log(chalk.blueBright("[i] Remote Hash:"), chalk.yellow(targetMd5));
  console.log(chalk.blueBright("[i] Local Hash: "), chalk.yellow(currentMd5));

  if (currentMd5 === targetMd5) {
    console.log(
      chalk.greenBright("[✓] Your ArcDPS is up to date! Enjoy the game.")
    );
  } else {
    console.log(chalk.red("[!] Your ArcDPS is outdated. You need to update"));
  }
}

import * as fs from "fs";
import * as chalk from "chalk";
import * as hasha from "hasha";
import * as arcdps from "~/util/arcdps.util";
import pathsConfig from "~/configurations/paths.config";

export const name = "update";

export default async function () {
  const d3d9Path = pathsConfig.bin64Path + "/d3d9.dll";

  if (!fs.existsSync(d3d9Path)) {
    console.log(
      chalk.blueBright(
        "[i] ArcDPS is not installed. Attempting to install it.."
      )
    );
    await performDownload(d3d9Path);
    return;
  }

  const [currentMd5, [targetMd5]] = await Promise.all([
    hasha.fromFile(d3d9Path, { algorithm: "md5" }),
    arcdps.downloadMD5Sum(),
  ]);

  if (currentMd5 === targetMd5) {
    console.log(
      chalk.greenBright(
        "[✓] Your ArcDPS is already up to date! Enjoy the game."
      )
    );
  } else {
    console.log(
      chalk.blueBright("[i] An update is available. Attempting to fetch it...")
    );
    await performDownload(d3d9Path);
  }
}

async function performDownload(path: string) {
  await arcdps.downloadDLL(path);
  console.log(
    chalk.greenBright("[✓] Intalled latest version of ArcDPS. Enjoy the game.")
  );
}

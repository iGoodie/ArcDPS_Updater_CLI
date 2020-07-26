import * as fs from "fs";

const paths: PathsConfig = { bin64Path: ".\\bin64" };

export function initialize(args: string[]) {
  const parsedArgs: any = {};
  args.forEach((arg) => {
    const [key, value] = arg.split("=", 2);
    parsedArgs[key] = value;
  });

  if (!!parsedArgs.bin64Path) paths.bin64Path = parsedArgs.bin64Path;
}

export default paths;

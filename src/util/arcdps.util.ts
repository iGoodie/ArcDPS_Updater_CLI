import * as fs from "fs";
import * as stream from "stream";
import { downloadFile } from "~/util/download.util";

const BASE_URL = "https://www.deltaconnected.com/arcdps/x64/";
const DLL_URL = BASE_URL + "d3d9.dll";
const MD5_URL = BASE_URL + "d3d9.dll.md5sum";

export async function downloadDLL(path: string) {
  return downloadFile(DLL_URL, fs.createWriteStream(path), true);
}

export async function downloadMD5Sum() {
  let md5 = "";
  const md5stream = new stream.Writable({
    write: (chunk, encoding, callback) => {
      md5 += new String(chunk);
      callback();
    },
  });
  await downloadFile(MD5_URL, md5stream, false);
  md5stream.end();
  return md5.split(/\s+/);
}

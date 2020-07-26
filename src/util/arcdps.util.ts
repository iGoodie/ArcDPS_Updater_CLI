import axios from "axios";
import * as fs from "fs";
import * as htmlParser from "node-html-parser";
import * as ProgressBar from "progress";
import { requestHTML } from "~/util/request.util";
import { request } from "http";
import { rejects } from "assert";

const BASE_URL = "https://www.deltaconnected.com/arcdps/x64/";
const DLL_URL = BASE_URL + "d3d9.dll";

function getFirstChildMatching(
  parent: htmlParser.HTMLElement,
  predicate: (child: htmlParser.HTMLElement) => boolean
): [number, htmlParser.HTMLElement] {
  for (let i = 0; i < parent.childNodes.length; i++) {
    // @ts-ignore
    const element: htmlParser.HTMLElement = parent.childNodes[i];
    if (predicate(element)) return [i, element];
  }
  return null;
}

export async function getLatestReleaseDate() {
  return await new Promise<Date>((resolve, reject) => {
    requestHTML(BASE_URL, (page: any) => {
      const root = htmlParser.parse(page, { pre: true });
      const pre = htmlParser.parse(root.querySelector("pre").innerHTML);
      const [index, anchor] = getFirstChildMatching(
        pre,
        (child) => child.tagName === "a" && child.text.trim() === "d3d9.dll"
      );
      const [date, time] = pre.childNodes[index + 1].text.trim().split(/\s+/);

      resolve(new Date(`${date}T${time}Z`));
    });
  });
}

export async function getLatestReleaseSize() {
  return await new Promise<number>((resolve, reject) => {
    requestHTML(BASE_URL, (page: any) => {
      const root = htmlParser.parse(page, { pre: true });
      const pre = htmlParser.parse(root.querySelector("pre").innerHTML);
      const [index, anchor] = getFirstChildMatching(
        pre,
        (child) => child.tagName === "a" && child.text.trim() === "d3d9.dll"
      );
      const [, , size] = pre.childNodes[index + 1].text.trim().split(/\s+/);
      if (size.endsWith("K")) return resolve(parseInt(size) * 1024);
      return resolve(parseInt(size));
    });
  });
}

export async function downloadDLL(path: string) {
  await new Promise(async (resolve) => {
    const response = await axios({
      url: DLL_URL,
      method: "GET",
      responseType: "stream",
    });

    const progressBar = new ProgressBar(
      "-> Downloading d3d9.dll [:bar] :percent :etas",
      {
        width: 40,
        complete: "=",
        incomplete: " ",
        renderThrottle: 1,
        total: await getLatestReleaseSize(),
      }
    );

    const writer = fs.createWriteStream(path);

    response.data.on("data", (chunk: any) => progressBar.tick(chunk.length));
    response.data.on("end", () => resolve());
    response.data.pipe(writer);
  });
}

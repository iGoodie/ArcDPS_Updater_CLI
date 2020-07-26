import * as https from "https";

export function requestHTML(url: string, callback: Function) {
  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => (data += chunk));
    response.on("end", () => callback(data));
  });
}

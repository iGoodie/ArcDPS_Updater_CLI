import * as fs from "fs";

const APPDATA_FOLDER =
  process.env.APPDATA ||
  (process.platform == "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/.local/share");
const DATA_FOLDER_PATH = APPDATA_FOLDER + "\\.igoodie\\arcdps_updater";
const STATE_PATH = DATA_FOLDER_PATH + "\\state.json";
const appdata: AppDataState = loadState();

export function initialize() {
  if (!fs.existsSync(DATA_FOLDER_PATH))
    fs.mkdirSync(DATA_FOLDER_PATH, { recursive: true });
}

function parseJSON(string: string) {
  try {
    return JSON.parse(string);
  } catch (error) {
    return {};
  }
}

function loadState(): AppDataState {
  const persistedState: AppDataState = fs.existsSync(STATE_PATH)
    ? parseJSON(fs.readFileSync(STATE_PATH, { encoding: "utf-8" }).toString())
    : {};

  return {
    lastUpdated: new Date(persistedState.lastUpdated || 0),
  };
}

export function save() {
  return fs.writeFileSync(STATE_PATH, JSON.stringify(appdata), {
    encoding: "utf-8",
  });
}

export default appdata;

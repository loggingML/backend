import * as express from "express";
import * as path from "path";
import * as url from "url";
import * as os from "os";
import {isUndefined} from "util";
import {error, illegalConfigError} from "./utils/error";
import {api} from "./api/main";

let parseServer = require("parse-server").ParseServer;
let parseDashboard = require("parse-dashboard");
let app = express();

let parseConfig = require("../configs/parse-dashboard-config.json");

parseConfig.apps[0].serverURL = parseConfig.apps[0].serverURL.replace("$HOSTNAME$", os.hostname());
let dashboard = new parseDashboard(parseConfig, {
		allowInsecureHTTP: parseConfig.allowInsecureHTTP
	});

let appConfig = parseConfig.apps[0];

let parserServer = new parseServer({
  databaseURI: appConfig.databaseURI,
  cloud: path.resolve(path.join(__dirname, "./cloud/main.ts")), // Absolute path to your Cloud Code
  appId: appConfig.appId,
  masterKey: appConfig.masterKey, // Keep this key secret!
  serverURL: appConfig.serverURL // Don"t forget to change to https if needed
});

let serverURL = url.parse(appConfig.serverURL);


if (!isUndefined(serverURL.pathname) &&
    !isUndefined(serverURL.port)) {
    // Serve the Parse API on the /parse URL prefix
    app.use(serverURL.pathname, parserServer);
    app.use("/dashboard", dashboard);
    app.use("/api", api(appConfig.appId, appConfig.serverURL));
    app.listen(parseInt(serverURL.port), () => {
        console.log("parse-server running on port " + serverURL.port + ".");
    });
} else {
    throw error(illegalConfigError);
}
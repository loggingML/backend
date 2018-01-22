import * as express from "express";
import * as path from "path";
import * as url from "url";
import * as os from "os";
import * as http from "http";
import {isUndefined} from "util";
import {error, illegalConfigError} from "./utils/error";
import {set_parse_config} from "./api/parse";
import httpAPI from "./api/http";
import setupWebSocket from "./api/ws";
import {AppConfigType} from "./utils/types/config_types";

let parseServer = require("parse-server").ParseServer;
let parseDashboard = require("parse-dashboard");
let app = express();
let parseConfig = require("../configs/parse-dashboard-config.json");

/**
 * process appConfig object
 */
let appConfig : AppConfigType = parseConfig.apps[0];
appConfig.serverURL = appConfig.serverURL.replace("$HOSTNAME$", os.hostname());
set_parse_config(appConfig.appId, appConfig.serverURL);

/**
 * Express Middleware: dashboard and parseServer
 */
let dashboard = new parseDashboard(parseConfig, {
		allowInsecureHTTP: parseConfig.allowInsecureHTTP
	});
let parserServer = new parseServer({
  databaseURI: appConfig.databaseURI,
  cloud: path.resolve(path.join(__dirname, "./cloud/main.ts")), // Absolute path to your Cloud Code
  appId: appConfig.appId,
  masterKey: appConfig.masterKey, // Keep this key secret!
  serverURL: appConfig.serverURL // Don"t forget to change to https if needed
});

/**
 * check validity of serverURL, and setup express server
 */
let serverURL = url.parse(appConfig.serverURL);
if (!isUndefined(serverURL.pathname) &&
    !isUndefined(serverURL.port)) {
    // Serve the Parse API on the /parse URL prefix
    app.use(serverURL.pathname, parserServer);
    app.use("/dashboard", dashboard);
    app.use("/api", httpAPI);
    const server = setupWebSocket(http.createServer(app));
    server.listen(parseInt(serverURL.port), () => {
        console.log("parse-server running on port " + serverURL.port + ".");
    });
} else {
    throw error(illegalConfigError);
}
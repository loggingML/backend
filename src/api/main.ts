import * as express from "express";
import {initDatabaseSchema} from "./data_schema";
import {saveLog} from "./save/log";
import {saveExperiment} from "./save/experiment";
import {saveAttachment} from "./save/attachment";

let parse = require("parse/node");



export function api(applicationId: string, serverURL: string) {
    let router = express.Router();
    parse.initialize(applicationId);
    parse.serverURL = serverURL;
    initDatabaseSchema();
    router.post("/save/experiment", saveExperiment);
    router.post("/save/log", saveLog);
    router.post("/save/attachment", saveAttachment);
    return router;
}





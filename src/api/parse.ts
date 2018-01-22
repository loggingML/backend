import {Dictionary} from "underscore";
let _parse = require("parse/node");

let config = {
    applicationId: "",
    serverURL: "",
    initialized: false
};

export function set_parse_config(applicationId: string, serverURL: string) {
    config.applicationId = applicationId;
    config.serverURL = serverURL;
    _parse.initialize(config.applicationId);
    _parse.serverURL = config.serverURL;
}

let parse = _parse;
export default parse;
import {ErrorInfoType} from "./types/error_types";
import {strFormat} from "./base";
import {messageTypeDict} from "./types/message_type";

class LoggingMLError extends Error {
    code: number;
    constructor (code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export function error(err: ErrorInfoType, msgList?: Array<any>) : LoggingMLError {
    let message = err.message;
    if (msgList) {
        let strList = msgList.map(a => a.toString());
        message = strFormat(message, strList);
    }
    return new LoggingMLError(err.code, message);
}

export * from "./types/error_types";
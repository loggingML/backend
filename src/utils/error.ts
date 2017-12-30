import {ErrorInfoType} from "./error_types";

class LoggingMLError extends Error {
    code: number;
    constructor (code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export function error(err: ErrorInfoType) : LoggingMLError {
    return new LoggingMLError(err.code, err.message);
}

export * from "./error_types";
export interface ErrorInfoType {
    code: number;
    message: string;
}

export let illegalConfigError: ErrorInfoType = {
    code: 0,
    message: "The config json file is illegal! Can not start backend"
};

export let unrecognizedWebSocketMessageTypeError : ErrorInfoType = {
    code: 1,
    message: "The type {0} of message {1} is unrecognized by websocket server"
};
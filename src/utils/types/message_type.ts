export interface WsMessageType {
    type: number;
    loggerName: string;
    level: number;
    experimentId: string;
    arg: any;
}

export const messageTypeDict = {
    LOG: 0
};

export const loggerLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    CRITICAL: 4,
    EXCEPTION: 5
};
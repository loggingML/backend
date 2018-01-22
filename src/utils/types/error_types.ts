export interface ErrorInfoType {
    code: number;
    message: string;
}

export let illegalConfigError: ErrorInfoType = {
    code: 0,
    message: "The config json file is illegal! Can not start backend"
};
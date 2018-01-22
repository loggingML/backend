import * as WebSocket from "uws";
import * as http from "http";
import {WsMessageType, messageTypeDict} from "../../utils/types/message_type";
import logCallback from "./message_callbacks/log";
import {error, unrecognizedWebSocketMessageTypeError} from "../../utils/error";
import parse from "../parse";

export default function setupWebSocket(server: http.Server) : http.Server {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => {
        ws.on("message", (data: WsMessageType) => {
            switch (data.type) {
                case messageTypeDict.LOG:
                    logCallback(ws, data);
                    break;
                default:
                    throw error(unrecognizedWebSocketMessageTypeError, [data.type, data]);
            }
        });
        ws.send("connected");
    });
    return server;
}
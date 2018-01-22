import * as WebSocket from "uws";
import * as http from "http";
import parse from "../parse";

export default function setupWebSocket(server: http.Server) : http.Server {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            ws.send(data); // echo server
        });
        ws.send("connected");
    });
    return server;
}
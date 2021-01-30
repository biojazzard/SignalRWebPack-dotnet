"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
const signalR = __importStar(require("@microsoft/signalr"));
const divMessages = document.querySelector("#divMessages");
const tbMessage = document.querySelector("#tbMessage");
const btnSend = document.querySelector("#btnSend");
const username = new Date().getTime();
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.on("MessageReceived", (username, message) => {
    let messages = document.createElement("div");
    messages.innerHTML =
        `<div class="message-author">${username}</div><div>${message}</div>`;
    if (divMessages) {
        divMessages.appendChild(messages);
        divMessages.scrollTop = divMessages.scrollHeight;
    }
});
connection.start().catch(err => document.write(err));
if (tbMessage) {
    tbMessage.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            send();
        }
    });
}
if (btnSend) {
    btnSend.addEventListener("click", send);
}
function send() {
    if (tbMessage) {
        connection.send("NewMessage", username, tbMessage.value)
            .then(() => tbMessage.value = '');
    }
}
//# sourceMappingURL=index.js.map
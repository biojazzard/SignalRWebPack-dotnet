import "./css/main.css";
import * as signalR from "@microsoft/signalr";

const divMessages: HTMLDivElement | null = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement | null = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement | null = document.querySelector("#btnSend");
const username = new Date().getTime();

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/hub")
  .build();

connection.on("MessageReceived", (username: string, message: string) => {
    let messages: HTMLDivElement | null = document.createElement("div");

    messages.innerHTML =
      `<div class="message-author">${username}</div><div>${message}</div>`;

    if(divMessages) {
      divMessages.appendChild(messages);
      divMessages.scrollTop = divMessages.scrollHeight;
    }

});

connection.start().catch(err => document.write(err));

if (tbMessage) {
  tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
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

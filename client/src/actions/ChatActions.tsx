import axios from "axios";
import { ChatDispatch } from "../context/ChatContext";
import MenuChat from "../components/chat/MenuChat";
import ConfirmChat from "../components/chat/ConfirmChat";
import React from "react";
import { WebSocketState } from "../context/WebsocketContext";

interface IResponseFromServer {
  header: {
    message_type: string;
    who: string;
  };
  content: string;
}

let currentClientTime = new Date().toLocaleTimeString("ko-KR", { timeStyle: "short" });

export const userMessage = (message: string, callback: ChatDispatch) => {
  try {
    callback({
      type: "IPUT_SUCCESS",
      who: "user",
      text: message,
      time: currentClientTime,
      loading: true,
    });
  } catch (error) {
    console.error(error);
    callback({
      type: "IPUT_FAIL",
    });
  }
};

function sendWebSocket(webSocket: WebSocketState, message: string): Promise<[IResponseFromServer, number]> {
  const ws = webSocket?.current;
  return new Promise((resolve, reject) => {
    const onOpen = () => {
      let userMsg = {
        text: `${message}`,
      };
      ws?.send(JSON.stringify(userMsg));
    };
    const onMessage = (event: MessageEvent) => {
      const data: IResponseFromServer = JSON.parse(event.data);
      const timestamp: number = event.timeStamp;
      ws?.removeEventListener("message", onMessage);
      resolve([data, timestamp]);
    };
    ws?.addEventListener("message", onMessage);
    switch (ws?.readyState) {
      case ws?.CONNECTING:
        ws?.addEventListener("open", onOpen);
        break;
      case ws?.OPEN:
        onOpen();
        break;
      case ws?.CLOSING:
      case ws?.CLOSED:
        reject();
        break;
    }
  });
}
export async function sendMessageToWebSocket(webSocket: WebSocketState, message: string, callback: ChatDispatch) {
  if (message === "메뉴")
    return setTimeout(() => {
      callback({
        type: "IPUT_SUCCESS",
        who: "server",
        text: <MenuChat />,
        time: currentClientTime,
        loading: false,
      });
    }, 600);
  try {
    const response = await sendWebSocket(webSocket, message);
    let [data, time] = response;
    let KST = new Date(time);
    console.log("KST", KST);
    let serverTime = KST.toLocaleTimeString("ko-KR", { timeStyle: "short" });
    console.log("serverTime", serverTime);
    console.log("data :", data);
    switch (data.header.message_type) {
      case "confirm":
        callback({
          type: "MSESSAGE_SUCCESS",
          who: data.header.who,
          text: <ConfirmChat message={data.content} />,
          time: serverTime,
          loading: false,
        });
        break;
      case "plain":
        callback({
          type: "MSESSAGE_SUCCESS",
          who: data.header.who,
          text: data.content,
          time: serverTime,
          loading: false,
        });
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    callback({
      type: "MSESSAGE_FAIL",
    });
  }
}
export async function sendMessage(message: string, callback: ChatDispatch) {
  if (message === "메뉴")
    return setTimeout(() => {
      callback({
        type: "IPUT_SUCCESS",
        who: "server",
        text: <MenuChat />,
        time: currentClientTime,
        loading: false,
      });
    }, 600);
  let result: IResponseFromServer;
  try {
    const response = await axios.post("./bot", {
      text: message,
    });
    let KST = new Date(response.headers.date);
    console.log("KST", KST);
    let serverTime = KST.toLocaleTimeString("ko-KR", { timeStyle: "short" });
    console.log("serverTime", serverTime);
    result = response?.data;
    console.log("result :", result);
    if (result.header?.message_type === "confirm") {
      callback({
        type: "MSESSAGE_SUCCESS",
        who: result.header.who,
        text: <ConfirmChat message={result.content} />,
        time: serverTime,
        loading: false,
      });
    } else {
      callback({
        type: "MSESSAGE_SUCCESS",
        who: result.header.who,
        text: result.content,
        time: serverTime,
        loading: false,
      });
    }
  } catch (error) {
    console.error(error);
    callback({
      type: "MSESSAGE_FAIL",
    });
  }
}

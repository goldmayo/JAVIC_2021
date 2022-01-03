import axios from "axios";
import { ChatDispatch } from "../context/ChatContext";
import MenuChat from "../components/chat/MenuChat";
import ConfirmChat from "../components/chat/ConfirmChat";
import React from "react";

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
function sendServer(message: string, callback: ChatDispatch) {
  const socket = new WebSocket("ws://192.168.45.236:7000/bot");
  let userMsg = {
    text: `${message}`,
  };
  socket.onopen = function (event: any) {
    socket.send(JSON.stringify(userMsg));
  };
  // socket.onmessage = function(event:WebSocketEventMap)
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
    // switch (result.header.message_type) {
    //   case "confirm":

    //     break;
    //   case "plain":

    //     break;

    //   default:
    //     break;
    // }
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

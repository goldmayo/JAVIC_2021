import axios from "axios";
import { ChatDispatch } from "../context/ChatContext";
import MenuChat from "../components/chat/MenuChat";
import ConfirmChat from "../components/chat/ConfirmChat";

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
    });
  } catch (error) {
    console.error(error);
    callback({
      type: "IPUT_FAIL",
    });
  }
};

export async function sendMessage(message: string, callback: ChatDispatch) {
  if (message === "메뉴")
    return setTimeout(() => {
      callback({
        type: "IPUT_SUCCESS",
        who: "server",
        text: <MenuChat />,
        time: currentClientTime,
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
    console.log(result);

    if (result.header.message_type === "confirm") {
      callback({
        type: "MSESSAGE_SUCCESS",
        from: result.header.who,
        text: <ConfirmChat message={result.content} />,
        time: serverTime,
      });
    } else {
      callback({
        type: "MSESSAGE_SUCCESS",
        from: result.header.who,
        text: result.content,
        time: serverTime,
      });
    }
  } catch (error) {
    console.error(error);
    callback({
      type: "MSESSAGE_FAIL",
    });
  }
}

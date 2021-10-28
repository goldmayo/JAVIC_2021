import { useRef, useLayoutEffect, useEffect } from "react";
import classNames from "classnames/bind";

import { useChatState } from "../../context/ChatContextProvier";
import Greeting from "./Greeting";
import BotProfile from "../profile/BotProfile";

import styles from "./Chat.module.css";

const cx = classNames.bind(styles);

function userChat(who: string, content: string | React.ReactElement, time: string) {
  return (
    <div className={cx(`${who}Node`)}>
      <div className={cx(`${who}Node__msg`)}>
        <p>{content}</p>
      </div>
      {/* <div className={cx(`${who}Node__timeStamp`)}>
        <time dateTime={time}>{time}</time>
      </div> */}
      <time className={cx(`${who}Node__timeStamp`)} dateTime={time}>
        {time}
      </time>
    </div>
  );
}

function serverChat(who: string, content: string | React.ReactElement, time: string) {
  return (
    <div className={cx(`${who}Node`)}>
      <BotProfile />
      <div className={cx(`${who}Node__msg`)}>
        {typeof content === "string" ? <p>{content}</p> : <div>{content}</div>}
      </div>
      {/* <div className={cx(`${who}Node__timeStamp`)}>
        <time dateTime={time}>{time}</time>
      </div> */}
      <time className={cx(`${who}Node__timeStamp`)} dateTime={time}>
        {time}
      </time>
    </div>
  );
}

function Chat() {
  const endOfChat = useRef<HTMLDivElement>(null);
  const chats = useChatState();

  useEffect(() => {
    console.log("new msg: ", ...chats);
    return () => {
      console.log("텅"); // 왜 찍히는 거냐 복사하는건데..
    };
  }, [chats]);

  const msg = chats.map((message, i) => (
    <div className={cx("chatnode")} key={i}>
      {message.who === "user"
        ? userChat(message.who, message.content, message.time)
        : serverChat(message.who, message.content, message.time)}
    </div>
  ));

  const scrollToBottom = () => {
    endOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };
  useLayoutEffect(scrollToBottom, [chats]);

  return (
    <>
      <Greeting />
      {msg}
      <div ref={endOfChat}></div>
    </>
  );
}

export default Chat;

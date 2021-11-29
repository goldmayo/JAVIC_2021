import React, { useRef, useLayoutEffect, useEffect } from "react";
import classNames from "classnames/bind";

import { useChatState } from "../../context/ChatContextProvier";
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
    if (chats.length === 0) {
      console.log("empty chats");
    } else {
      console.log("new msg: ", ...chats);
    }
  }, [chats]);

  // chats의 가장 마지막 원소만 msg 함수 실행하고 또 다른 배열에 저장해 놓는 법
  // 새로운 chats만 더해주면 되는거지.
  // react-virtualized 알아보기
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
      {msg}
      <div ref={endOfChat}></div>
    </>
  );
}

export default Chat;

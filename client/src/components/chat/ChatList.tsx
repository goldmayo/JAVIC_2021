import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, ListRowProps } from "react-virtualized";

import { useChatState } from "../../context/ChatContextProvier";
import { Chat } from "../../context/ChatContext";
import ServerChat from "./ServerChat";
import UserChat from "./UserChat";

import styles from "./Chat.module.css";

const cx = classNames.bind(styles);

const addChatMsg = (newMsg: Chat, newId: number): React.ReactElement => {
  return (
    <div className={cx("chatnode")} key={newId}>
      {newMsg.who === "user" ? (
        <UserChat who={newMsg.who} content={newMsg.content} time={newMsg.time} />
      ) : (
        <ServerChat who={newMsg.who} content={newMsg.content} time={newMsg.time} />
      )}
    </div>
  );
};

function ChatList() {
  const endOfChat = useRef<HTMLDivElement>(null);
  const chats = useChatState();
  //
  const rowRenderer = ({ index, key, parent, style }: ListRowProps) => {};
  const addChattings = () => {};

  //
  useEffect(() => {
    if (chats.length === 0) {
      console.log("empty chats");
    } else {
      console.log("new msg: ", ...chats);
    }
  }, [chats]);

  // chats의 가장 마지막 원소만 msg 함수 실행하고 또 다른 배열에 저장해 놓는 법
  // 새로운 chats만 더해주면 되는거지.
  // chat에서 server랑 user챗 컴포넌트로 나누고 chat에서 import해서 쓰기
  // https://www.youtube.com/watch?v=UrgfPjX97Yg react-virtualized 알아보기
  // react-virtualized 스타일 확인
  // 리액트 최적화 https://www.youtube.com/watch?v=3cYtqrNUiVw
  const msg = chats.map((message, i) => (
    <div className={cx("chatnode")} key={i}>
      {message.who === "user" ? (
        <UserChat who={message.who} content={message.content} time={message.time} />
      ) : (
        <ServerChat who={message.who} content={message.content} time={message.time} />
      )}
    </div>
  ));

  const scrollToBottom = () => {
    endOfChat.current?.scrollIntoView({ behavior: "smooth" });
  };
  useLayoutEffect(scrollToBottom, [chats]);

  return (
    <>
      {msg}
      {/* /  */}
      {/* <div style={{ width: "100%", height: "81vh" }}>
        <AutoSizer>
          {({ width, height }) => (
            <List width={width} height={height} rowCount={chats.length} rowHeight={} rowRenderer={rowRenderer} />
          )}
        </AutoSizer>
      </div> */}
      {/*  */}
      <div ref={endOfChat}></div>
    </>
  );
}

export default ChatList;

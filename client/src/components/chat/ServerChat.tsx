import React from "react";
import classNames from "classnames/bind";

import BotProfile from "../profile/BotProfile";
import { Chat } from "../../context/ChatContext";

import styles from "./Chat.module.css";

const cx = classNames.bind(styles);

function ServerChat({ who, content, time }: Chat) {
  return (
    <div className={cx(`${who}Node`)}>
      <BotProfile />
      <div className={cx(`${who}Node__msg`)}>
        {typeof content === "string" ? <p>{content}</p> : <div>{content}</div>}
      </div>
      <time className={cx(`${who}Node__timeStamp`)} dateTime={time}>
        {time}
      </time>
    </div>
  );
}

export default ServerChat;

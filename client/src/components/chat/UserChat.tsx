import React from "react";
import classNames from "classnames/bind";

import { Chat } from "../../context/ChatContext";

import styles from "./Chat.module.css";

const cx = classNames.bind(styles);

function UserChat({ who, content, time }: Chat) {
  return (
    <div className={cx(`${who}Node`)}>
      <div className={cx(`${who}Node__msg`)}>
        <p>{content}</p>
      </div>
      <time className={cx(`${who}Node__timeStamp`)} dateTime={time}>
        {time}
      </time>
    </div>
  );
}

export default React.memo(UserChat);

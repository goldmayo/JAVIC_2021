import React from "react";
import Greeting from "./chat/Greeting";
import classNames from "classnames/bind";

import styles from "./ChatContainer.module.css";

const cx = classNames.bind(styles);

type ChatContainerProps = {
  children?: React.ReactNode;
};

function ChatContainer({ children }: ChatContainerProps) {
  return (
    <section className={cx("chatContainer")}>
      <Greeting />
      {children}
    </section>
  );
}
export default React.memo(ChatContainer);

import React from "react";
import styles from "./ChatContainer.module.css";
import Greeting from "./chat/Greeting";

type ChatContainerProps = {
  children?: React.ReactNode;
};

function ChatContainer({ children }: ChatContainerProps) {
  return (
    <section className={styles.chatcontainer}>
      <Greeting />
      {children}
    </section>
  );
}
export default React.memo(ChatContainer);

import React from "react";
import styles from "./ChatContainer.module.css";
type ChatContainerProps = {
  children?: React.ReactNode;
};

function ChatContainer({ children }: ChatContainerProps) {
  return <section className={styles.chatcontainer}>{children}</section>;
}
export default ChatContainer;

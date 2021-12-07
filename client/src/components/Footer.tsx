import React from "react";
import styles from "./Footer.module.css";
type Props = {
  children?: React.ReactNode;
};

function Footer({ children }: Props) {
  return <footer className={styles.inputContainer}>{children}</footer>;
}
export default React.memo(Footer);

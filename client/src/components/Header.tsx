import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import classNames from "classnames/bind";

import styles from "./Header.module.css";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wraper")}>
      <div>
        <h1 className={cx("wraper__botName")}>JAVIC</h1>
      </div>
      <i className={cx("wraper__menuIcon")}>
        <FaEllipsisV />
      </i>
    </header>
  );
}

export default Header;

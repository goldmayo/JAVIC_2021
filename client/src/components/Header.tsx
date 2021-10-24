import React from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
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
        <FaMoon />
        {/* <FaSun /> */}
        <FaBars />
      </i>
    </header>
  );
}

export default Header;

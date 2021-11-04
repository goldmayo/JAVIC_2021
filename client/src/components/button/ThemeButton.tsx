import React, { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import classNames from "classnames/bind";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ThemeButton.module.css";

const cx = classNames.bind(styles);

function ThemeButton() {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const handleClick = () => {
    toggleTheme();
  };
  return (
    <button className={cx("theme__toggleBtn")} type={"button"} onClick={handleClick}>
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeButton;

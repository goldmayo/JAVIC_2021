import React from "react";
import classNames from "classnames/bind";
import styles from "./LoginBanner.module.css";
import Banner from "../images/bot_banner.png";
const cx = classNames.bind(styles);

function LoginBanner() {
  return (
    <div className={cx("bannerContainer")}>
      <img className={cx("bannerImg")} src={Banner} alt="chatbotBanner" />
    </div>
  );
}

export default LoginBanner;

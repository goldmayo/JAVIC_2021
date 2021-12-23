import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import SocialLoginButton from "../components/button/SocialLoginButton";
import LoginForm from "../components/form/LoginForm";
import LoginBanner from "../banner/LoginBanner";
import styles from "./LoginPage.module.css";
import { FaGoogle } from "react-icons/fa";

const cx = classNames.bind(styles);

function LoginPage() {
  return (
    <div className={cx("loginPageContainer")}>
      {/* <h2>WELCOME</h2> */}
      <div className={cx("loginGroup")}>
        <div className={cx("formGroup")}>
          <div className={cx("formTitle")}>
            <h1>javic</h1>
          </div>
          <LoginForm />

          <div className={cx("socialLoginGroup")}>
            <SocialLoginButton name={"Google"} icon={<FaGoogle />} />
          </div>
        </div>
        <div className={cx("bannerGroup")}>
          <LoginBanner />
        </div>
      </div>
    </div>
  );
}

export default React.memo(LoginPage);

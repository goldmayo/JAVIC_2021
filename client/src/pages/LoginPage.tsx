import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";

import LoginForm from "../components/form/LoginForm";
import RegisterButton from "../components/button/RegisterButton";
import styles from "./LoginPage.module.css";

const cx = classNames.bind(styles);

function LoginPage() {
  return (
    <div className={cx("LoginContainer")}>
      {/* <h2>WELCOME</h2> */}
      <LoginForm />
      <RegisterButton />
    </div>
  );
}

export default React.memo(LoginPage);

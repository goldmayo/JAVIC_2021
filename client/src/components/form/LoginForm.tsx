import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import { FaUser, FaLock } from "react-icons/fa";

import styles from "./LoginForm.module.css";

const cx = classNames.bind(styles);

function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  useEffect(() => {
    console.log("email : ", inputs["email"]);
    console.log("pw : ", inputs["password"]);
  }, [inputs]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target; // e.target 에서 name 과 value 를 추출
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputs({
      email: "",
      password: "",
    });
  }, []);

  return (
    <div className={cx("LoginFormContainer")}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className={cx("emailContainer")}>
          <FaUser size={"2vh"} />
          <input
            name="email"
            type="text"
            value={email}
            required
            onChange={onChange}
            placeholder="이메일"
          />
        </div>
        <div className={cx("pwContainer")}>
          <FaLock size={"2vh"} />
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={onChange}
            placeholder="비밀번호"
          />
        </div>
        <div className={cx("forgetContainer")}>
          <span>이메일 또는 비밀번호 찾기</span>
        </div>
        <button type="submit">로그인</button>
      </form>
      <div className={cx("registerContainer")}>
        <span>아직 계정이 없으신가요?</span>&emsp;
        <span className={cx("registerLink")}>회원가입</span>
      </div>
    </div>
  );
}

export default React.memo(LoginForm);

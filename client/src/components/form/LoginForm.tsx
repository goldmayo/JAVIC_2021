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
      const { value, name } = e.target;
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
    <div className={cx("loginFormContainer")}>
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
        <button type="submit">로그인</button>
      </form>
      <div className={cx("loginDivider")}>
        <span>또는</span>
      </div>
    </div>
  );
}
export default React.memo(LoginForm);

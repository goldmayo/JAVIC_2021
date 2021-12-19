import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import { FaUser, FaLock } from "react-icons/fa";

import styles from "./LoginForm.module.css";

const cx = classNames.bind(styles);

function LoginForm() {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });

  const { id, password } = inputs;

  useEffect(() => {
    console.log("id : ", inputs["id"]);
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
      id: "",
      password: "",
    });
  }, []);

  return (
    <div className={cx("LoginFormContainer")}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <div className={cx("idContainer")}>
          <FaUser size={"2vh"} />
          <input
            name="id"
            type="text"
            value={id}
            required
            onChange={onChange}
            placeholder="Username"
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
            placeholder="Password"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default React.memo(LoginForm);

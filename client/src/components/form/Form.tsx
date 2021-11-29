import React, { useState } from "react";
import { useChatDispatch } from "../../context/ChatContextProvier";
import { userMessage, sendMessage } from "../../actions/ChatActions";
import classNames from "classnames/bind";
import { FaPaperPlane } from "react-icons/fa";

import styles from "./Form.module.css";

const cx = classNames.bind(styles);

function Form() {
  // const inputRef = useRef();
  const [message, setMessage] = useState("");
  const dispatch = useChatDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userMessage(message, dispatch);
    sendMessage(message, dispatch);
    setMessage("");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className={cx("formContainer")}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          required // 입력 검사 해야됨 required 쓰거나
          type="text"
          value={message}
          name="userinput"
          onChange={onChange}
          placeholder="Type a message..."
        />
        <button type="submit">
          <FaPaperPlane size="1.3em" />
        </button>
      </form>
    </div>
  );
}

export default React.memo(Form);

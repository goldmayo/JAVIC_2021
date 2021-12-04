import React from "react";
import BaseButton from "../button/BaseButton";
import classNames from "classnames/bind";

import styles from "./ConfirmChat.module.css";

const cx = classNames.bind(styles);

interface IConfirmChat {
  message: string;
}
function ConfirmChat({ message }: IConfirmChat) {
  return (
    <div className={cx("confirmNode")}>
      <p>
        <span>{message}</span>
        <br />
      </p>
      <div className={cx("confirmNode__button")}>
        <BaseButton name={"확인"} />
        <BaseButton name={"취소"} />
      </div>
    </div>
  );
}

export default React.memo(ConfirmChat);

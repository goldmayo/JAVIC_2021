import React from "react";
import BaseButton from "../button/BaseButton";
import classNames from "classnames/bind";
import { FaEnvelope, FaUmbrellaBeach } from "react-icons/fa";

import styles from "./MenuChat.module.css";

const cx = classNames.bind(styles);

function MenuChat() {
  return (
    <div className={cx("menuNode")}>
      <p>
        <span>원하시는 서비스를 선택하시거나 자유롭게 질문 내용을 입력해주세요.</span>
        <br />
        <span>대화 도중 안내 메뉴를 확인하시려면 ‘메뉴’ 버튼을 선택해주세요.</span>
        <br />
      </p>
      <div className={cx("menuNode__button")}>
        <BaseButton name="휴가신청" icon={<FaUmbrellaBeach />} />
        <BaseButton name="메일확인" icon={<FaEnvelope />} />
      </div>
    </div>
  );
}

export default MenuChat;

import React from "react";
import BaseButton from "../button/BaseButton";
import BotProfile from "../profile/BotProfile";
import classNames from "classnames/bind";
import { FaEnvelope, FaUmbrellaBeach } from "react-icons/fa";

import styles from "./Greeting.module.css";

const cx = classNames.bind(styles);

function Greeting() {
  return (
    <div className={cx("chatNode")}>
      <BotProfile />
      <div className={cx("greetingNode")}>
        <p className={cx("greetingNode__msg")}>
          <span>안녕하세요. 챗봇 서비스 자빅(JAVIC) 입니다.</span>
          <br />
          <span>원하시는 서비스를 선택하시거나 자유롭게 질문 내용을 입력해주세요.</span>
          <br />
          <span>대화 도중 안내 메뉴를 확인하시려면 ‘메뉴’ 버튼을 선택해주세요.</span>
        </p>
        <div className={cx("greetingNode__button")}>
          <BaseButton name="휴가신청" icon={<FaUmbrellaBeach />} />
          <BaseButton name="메일확인" icon={<FaEnvelope />} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Greeting);

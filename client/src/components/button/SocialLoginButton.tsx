import React from "react";
import classNames from "classnames/bind";
import { IconType } from "react-icons";

import styles from "./SocialLoginButton.module.css";

const cx = classNames.bind(styles);

type SocialLoginProps = {
  name: string;
  icon?: React.ReactElement<IconType>;
};

function SocialLoginButton({ name, icon }: SocialLoginProps) {
  return (
    <button className={cx(`socialLoginButton`)}>
      <i className={cx("buttonIcon")}>{icon}</i>
      <span className={cx("buttonName")}>{name} 으로 계속하기</span>
    </button>
  );
}

export default React.memo(SocialLoginButton);

import React from "react";
import Loader from "react-loader-spinner";
import classNames from "classnames/bind";
import styles from "./ThreeDotsLoader.module.css";
const cx = classNames.bind(styles);
function ThreeDotsLoader() {
  return (
    <div className={cx(`chatnode`)}>
      <div className={cx(`loadingNode`)}>
        <div className={cx(`loadingNode__content`)}>
          <Loader type="ThreeDots" color="#6495ed" height={30} width={60} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ThreeDotsLoader);

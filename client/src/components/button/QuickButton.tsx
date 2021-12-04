import React from "react";
import BaseButton from "./BaseButton";

import styles from "./QuickButton.module.css";

function QuickButton() {
  return (
    <div className={styles.quickbtn}>
      <BaseButton name={"메뉴"} />
      <BaseButton name={"확인"} />
      <BaseButton name={"취소"} />
    </div>
  );
}

export default React.memo(QuickButton);

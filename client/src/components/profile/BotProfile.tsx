import React from "react";
import styles from "./BotProfile.module.css";
function BotProfile() {
  return (
    <div className="botprofile">
      <img className={styles.botImg} src="images/chatbot-icon.png" alt="chatbot profile" />
    </div>
  );
}

export default BotProfile;

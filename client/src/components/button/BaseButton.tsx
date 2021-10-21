import { useChatDispatch } from "../../context/ContextProvier";
import { userMessage, sendMessage } from "../../actions/ChatActions";
import { IconType } from "react-icons";
import classNames from "classnames/bind";

import styles from "./BaseButton.module.css";

const cx = classNames.bind(styles);

interface ButtonProps {
  name: string;
  icon?: React.ReactElement<IconType>;
}

function BaseButton({ name, icon }: ButtonProps) {
  const dispatch = useChatDispatch();

  const handleClick = () => {
    userMessage(name, dispatch);
    sendMessage(name, dispatch);
  };

  return (
    <button type="button" onClick={handleClick}>
      <i className={cx("button__icon")}>{icon}</i>
      <strong>{name}</strong>
    </button>
  );
}
export default BaseButton;

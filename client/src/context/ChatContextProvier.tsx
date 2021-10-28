import { useReducer, useContext } from "react";
import { ChatContext, ChatDispatchContext, reducer } from "./ChatContext";

export function ChatContextProvier({ children }: { children: React.ReactNode }) {
  const [chats, dispatch] = useReducer(reducer, []);
  return (
    <ChatDispatchContext.Provider value={dispatch}>
      <ChatContext.Provider value={chats}>{children}</ChatContext.Provider>
    </ChatDispatchContext.Provider>
  );
}

export function useChatState() {
  const state = useContext(ChatContext);
  if (!state) throw new Error("ChatProvider not found");
  return state;
}
export function useChatDispatch() {
  const dispatch = useContext(ChatDispatchContext);
  if (!dispatch) throw new Error("ChatDispatchProvider not found");
  return dispatch;
}

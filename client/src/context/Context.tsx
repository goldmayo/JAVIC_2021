import React from "react";

import { createContext, Dispatch } from "react";

export type Chat = {
  who: string;
  content: string | React.ReactElement;
  time: string;
};

type ChatState = Chat[];

export const ChatContext = createContext<ChatState | undefined>(undefined);

export type Actions =
  | { type: "IPUT_SUCCESS"; who: string; text: string | React.ReactElement; time: string }
  | { type: "IPUT_FAIL" }
  | { type: "MSESSAGE_SUCCESS"; from: string; text: string | React.ReactElement; time: string }
  | { type: "MSESSAGE_FAIL" };

export type ChatDispatch = Dispatch<Actions>;

export const ChatDispatchContext = createContext<ChatDispatch | undefined>(undefined);

export const reducer = (state: ChatState, action: Actions): ChatState => {
  switch (action.type) {
    case "IPUT_SUCCESS":
      // return state.concat({ who: "user", content: action.text });
      return [
        ...state,
        {
          who: action.who,
          content: action.text,
          time: action.time,
        },
      ];
    case "IPUT_FAIL":
      return [...state];
    case "MSESSAGE_SUCCESS":
      // return state.concat({ who: action.from, content: action.text });
      return [...state, { who: action.from, content: action.text, time: action.time }];
    case "MSESSAGE_FAIL":
      return [...state];
    default:
      throw new Error("unexpected action");
  }
};

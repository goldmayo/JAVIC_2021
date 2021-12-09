import React from "react";
import { createContext, Dispatch } from "react";

export type Chat = {
  who: string;
  content: string | React.ReactElement;
  time: string;
  loading: boolean;
};

export type ChatState = Chat[];

export const ChatContext = createContext<ChatState | undefined>(undefined);

export type ChatActions =
  | {
      type: "IPUT_SUCCESS";
      who: string;
      text: string | React.ReactElement;
      time: string;
      loading: boolean;
    }
  | { type: "IPUT_FAIL" }
  | {
      type: "MSESSAGE_SUCCESS";
      who: string;
      text: string | React.ReactElement;
      time: string;
      loading: boolean;
    }
  | { type: "MSESSAGE_FAIL" };

export type ChatDispatch = Dispatch<ChatActions>;

export const ChatDispatchContext = createContext<ChatDispatch | undefined>(undefined);

export const chatReducer = (state: ChatState, action: ChatActions): ChatState => {
  switch (action.type) {
    case "IPUT_SUCCESS":
      return [
        ...state,
        {
          who: action.who,
          content: action.text,
          time: action.time,
          loading: action.loading,
        },
      ];
    case "IPUT_FAIL":
      return [...state];
    case "MSESSAGE_SUCCESS":
      return [
        ...state,
        { who: action.who, content: action.text, time: action.time, loading: action.loading },
      ];
    case "MSESSAGE_FAIL":
      return [...state];
    default:
      throw new Error("unexpected action");
  }
};

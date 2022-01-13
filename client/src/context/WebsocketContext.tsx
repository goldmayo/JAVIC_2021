import React from "react";

export type WebSocketState = React.MutableRefObject<WebSocket | null>;
// export const WebSocketContext = React.createContext<WebSocket | null>(null);
export const WebSocketContext =
  React.createContext<React.MutableRefObject<WebSocket | null> | null>(null);

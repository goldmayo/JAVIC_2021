import React from "react";

// export const WebSocketContext = React.createContext<WebSocket | null>(null);
export const WebSocketContext =
  React.createContext<React.MutableRefObject<WebSocket | null> | null>(null);

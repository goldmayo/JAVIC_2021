import React, { useRef, useEffect, useContext } from "react";
import { WebSocketContext } from "./WebsocketContext";

export function WebsocketProvider({ children }: { children: React.ReactNode }) {
  const webSocketUrl = `${process.env.REACT_APP_WEBSOCKET_URL}`;
  let ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        console.log("connected to", webSocketUrl);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from", webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error", webSocketUrl);
        console.log(error);
      };
    }
    return () => {
      console.log("clean up");
      ws.current?.close();
    };
  }, [webSocketUrl]);

  return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
}
export function useWebSocketState() {
  const wsState = useContext(WebSocketContext);
  if (!wsState) throw new Error("WebSocketProvider not found");
  return wsState;
}

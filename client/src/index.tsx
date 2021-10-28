import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { ContextProvier } from "./context/ContextProvier";

ReactDOM.render(
  <React.StrictMode>
    {/* <ChatContextProvier> */}
    <App />
    {/* </ChatContextProvier> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

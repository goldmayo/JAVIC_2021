import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ChatBotPage from "./pages/ChatBotPage";
import LoginPage from "./pages/LoginPage";
function Router() {
  return (
    <Routes>
      {/* add session ID ? Chatbot : Login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chatbot" element={<ChatBotPage />} />
    </Routes>
  );
}

export default Router;

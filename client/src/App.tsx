import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import Footer from "./components/Footer";
import Form from "./components/form/Form";
import ChatList from "./components/chat/ChatList";
import QuickButton from "./components/button/QuickButton";
import { ChatContextProvier } from "./context/ChatContextProvier";
import { ThemeProvider } from "./context/ThemeProvider";

import LoginPage from "./pages/LoginPage";

import { BrowserRouter } from "react-router-dom";
// import Router from "./Router";

import "./App.module.css";

function App() {
  return (
    <LoginPage />
    // <BrowserRouter>
    //   <ThemeProvider>
    //     <Header />
    //     <ChatContextProvier>
    //       <ChatContainer>
    //         <ChatList />
    //       </ChatContainer>
    //       <Footer>
    //         <QuickButton />
    //         <Form />
    //       </Footer>
    //     </ChatContextProvier>
    //   </ThemeProvider>
    // </BrowserRouter>
  );
}

export default App;

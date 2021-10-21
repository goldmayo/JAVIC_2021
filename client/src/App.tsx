import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import Footer from "./components/Footer";
import Form from "./components/form/Form";
import Chat from "./components/chat/Chat";
import QuickButton from "./components/button/QuickButton";
import { ContextProvier } from "./context/ContextProvier";

import "./App.module.css";

function App() {
  return (
    <ContextProvier>
      <Header />
      <ChatContainer>
        <Chat />
      </ChatContainer>
      <Footer>
        <QuickButton />
        <Form />
      </Footer>
    </ContextProvier>
  );
}

export default App;

import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";
import Footer from "./components/Footer";
import Form from "./components/form/Form";
import Chat from "./components/chat/Chat";
import QuickButton from "./components/button/QuickButton";
import { ChatContextProvier } from "./context/ChatContextProvier";

import "./App.module.css";

function App() {
  return (
    <ChatContextProvier>
      <Header />
      <ChatContainer>
        <Chat />
      </ChatContainer>
      <Footer>
        <QuickButton />
        <Form />
      </Footer>
    </ChatContextProvier>
  );
}

export default App;

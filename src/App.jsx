import { Chat } from './pages/Chat';
import { DarkModeProvider } from './utils/DM';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  return (
    <>
      <ChatProvider>
        <DarkModeProvider>
          <Chat />
        </DarkModeProvider>
      </ChatProvider>
    </>
  );
}

export default App;

import Link from "next/link";
import ChatLobbyToggler from "../src/components/ChatComponents/ChatLobbyToggler";
const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/chat">Chat</Link>
      <ChatLobbyToggler />
      
    </div>
  );
};

export default MainPage;

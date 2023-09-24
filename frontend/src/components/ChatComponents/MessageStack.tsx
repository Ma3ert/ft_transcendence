import { useRef, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import MessageBox from "./MessageBox";
import LayoutStyles from "../../Styles/modules/layout.module.scss";
import EnviteMessage from "./EnviteMessage";
import { ChatContext } from "../../context/Contexts";
import { useContext } from "react";
import { loggedIndUser } from "../../../contstants";

interface MessageStackProps {
  messages: DirectMessage[];
  gameInvitation: GameInvitation | null;
  setGameInvitation: React.Dispatch<
    React.SetStateAction<GameInvitation | null>
  >;
}
const MessageStack: React.FC<MessageStackProps> = ({ messages, gameInvitation, setGameInvitation }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Scroll to the end when the component mounts or when content changes
    console.log(
      `scrollTop ${containerRef.current?.scrollTop} scrollHeight ${containerRef.current?.scrollHeight}}`
    );
    scrollContainerToBottom();
  });

  const scrollContainerToBottom = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };
  return (
    <Stack
      ref={containerRef}
      px={2}
      py={4}
      h="75%"
      maxH="75%"
      spacing={2}
      justify={"start"}
      alignItems={"start"}
      w="100%"
      overflowY={"auto"}
      className={LayoutStyles.customScroll}
    >
      {messages!.map((message, index) => {

        return <MessageBox Message={message} key={index} />;
      })}
      {gameInvitation && <EnviteMessage gameInvitation={gameInvitation} setGameInvitation={setGameInvitation} />}
    </Stack>
  );
};

export default MessageStack;

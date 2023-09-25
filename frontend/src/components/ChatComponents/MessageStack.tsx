import { useRef, useEffect, useContext } from "react";
import { Stack } from "@chakra-ui/react";
import MessageBox from "./MessageBox";
import LayoutStyles from "../../Styles/modules/layout.module.scss";
import EnviteMessage from "./EnviteMessage";
import { ChatContext } from "../../context/Contexts";
import { loggedIndUser } from "../../../contstants";

interface MessageStackProps {}
const MessageStack: React.FC<MessageStackProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {directMessages, GameInvitation, setGameInvitation} = useContext (ChatContext)
  useEffect(() => {
    // Scroll to the end when the component mounts or when content changes
    console.log(
      `scrollTop ${containerRef.current?.scrollTop} scrollHeight ${containerRef.current?.scrollHeight}}`
    );
    scrollContainerToBottom();
  }, [directMessages, GameInvitation]);

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
    {directMessages!.map((message, index) => {

        return <MessageBox Message={message} key={index} />;
      })}
      {GameInvitation && <EnviteMessage gameInvitation={GameInvitation} setGameInvitation={setGameInvitation!} />}
    </Stack>
  );
};

export default MessageStack;

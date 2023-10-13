import { useRef, useEffect, useContext } from "react";
import { Stack } from "@chakra-ui/react";
import MessageBox from "./MessageBox";
import LayoutStyles from "../../Styles/modules/layout.module.scss";
import EnviteMessage from "./EnviteMessage";
import { ChatContext, DmContext, CmContext } from "../../context/Contexts";
import { PRIVATE, loggedIndUser } from "../../../contstants";
import DirectMessages from "./DirectMessages";
import ChannelMessages from "./ChannelMessages";
interface MessageStackProps {}
const MessageStack: React.FC<MessageStackProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {chatType} = useContext (ChatContext)
  const {messages:dms} = useContext (DmContext)
  const {messages:cms} = useContext (CmContext)
  

  useEffect(() => {
    console.log(
      `scrollTop ${containerRef.current?.scrollTop} scrollHeight ${containerRef.current?.scrollHeight}}`
    );
    scrollContainerToBottom();
  }, [dms, cms]);

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
      {chatType == PRIVATE ? <DirectMessages messages={dms!}/> : <ChannelMessages messages={cms!} />}
      {/* {GameInvitation && <EnviteMessage gameInvitation={GameInvitation} setGameInvitation={setGameInvitation!} />} */}
    </Stack>
  );
};

export default MessageStack;

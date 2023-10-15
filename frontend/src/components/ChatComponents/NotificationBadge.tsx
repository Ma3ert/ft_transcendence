import { Box } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/Contexts";
const NotificationBadge: React.FC = ({}) => {
  return (
    <Box
      boxSize="0.8em"
      position={"absolute"}
      top={"0"}
      right={"0"}
      borderRadius={"full"}
      bg={"#DC585B"}
    ></Box>
  );
};

interface NotificationWrapperProps {
  children: React.ReactNode;
  status?: boolean;
  type: notificationType;
}
export const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
  children,
  status,
  type,
}) => {
  const { chatNotification, requestNotification } = useContext(ChatContext);

  return (
    <Box position={"relative"}>
      {children}
      {type === "unactiveChat" && chatNotification && <NotificationBadge />}
      {type === "request" && requestNotification && <NotificationBadge />}
      {type === "activeChat" && status && <NotificationBadge />}
    </Box>
  );
};

export default NotificationBadge;

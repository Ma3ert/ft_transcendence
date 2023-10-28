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
}
export const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
  children,
  status,
}) => {

  return (
    <Box position={"relative"}>
      {children}
     {status && <NotificationBadge />}
    </Box>
  );
};

export default NotificationBadge;

import { Box, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import "../theme/styles.css";

interface Props {
  children: React.ReactNode;
  h?: string;
}
const ScrollableStack: React.FC<Props> = ({ children, h='60vh'}) => {
  return (
    <Stack
      className="customScroll"
      fontFamily={"visbyRound"}
      justifyContent="start"
      alignItems="center"
      w={"100%"}
      h={h}
      borderRadius={"20px"}
      maxH={"65vh"}
      bg={"#1D222C"}
      maxW={{ sm: "400px", md: "450px", lg: "500px", xl: "700px" }}
      minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
      overflowY={"auto"}
      spacing={2}
      px={4}
      py={6}
    >
      {children}
    </Stack>
  );
};

export default ScrollableStack;

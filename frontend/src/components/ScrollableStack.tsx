import { Box, Stack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import "../theme/styles.css";

interface Props {
  children: React.ReactNode;
  h?: string;
  yPadding?: number;
}
const ScrollableStack: React.FC<Props> = ({ children, h='60vh', yPadding = 6}) => {
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
      maxW={{ sm: "450px", md: "550px", lg: "600px", xl: "900px" }}
      minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
      overflowY={"auto"}
      spacing={2}
      px={4}
      py={yPadding}
    >
      {children}
    </Stack>
  );
};

export default ScrollableStack;

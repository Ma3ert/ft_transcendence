"use client";
import "../src/Styles/globals.scss";
import { HStack, Stack, Box, ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import SideBar from "@/components/SideBar";
import theme from "../src/theme/theme";
interface LayoutProps {
  children: React.ReactNode;
}

const chatLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <ChakraProvider theme={theme}>
          <HStack
            justify={"space-between"}
            mx={"auto"}
            border={"1px"}
            borderColor={{
              base: "white",
              sm: "green",
              md: "blue",
              lg: "red",
              xl: "yellow",
            }}
            w={{ base: "100%", sm: "100%", md: "98%", lg: "98%", xl: "80%" }}
            maxH="100vh"
            alignItems={"center"}
          >
            <Box
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              p={4}
              minH={"100%"}
            >
              <SideBar />
            </Box>
            <Stack flex={1} p={4} maxH="100vh" h="100%">
              <Box maxH={"10%"}>
                <Header />
              </Box>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                maxH="90%"
                w={'100%'}
                border='1px'
                borderColor='blue'
              >
                {children}
              </Box>
            </Stack>
          </HStack>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default chatLayout;

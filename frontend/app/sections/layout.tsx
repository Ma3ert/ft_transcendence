"use client";
import "../../src/Styles/globals.scss";
import { HStack, Stack, Box, ChakraProvider } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import SideBar from "@/components/SideBar";
import theme from "../../src/theme/theme";
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
            w={{ base: "80%", sm: "100%", md: "98%", lg: "98%", xl: "85%"}}
            h="100vh"
            flex={1}
            maxH="100%"
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
            <Stack flex={1} p={4}  h="100%">
              <Box>
                <Header />
              </Box>
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                w={'100%'}
                maxH={'100%'}
                h={'100%'}
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

"use client";
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
            columnGap={20}
            justify={"space-between"}
            mx={"auto"}
            w={"92%"}
            alignItems={"center"}
            h="100vh"
          >
            <Box
              maxW="200px"
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              p={4}
              minH={"100%"}
              position="fixed"
              left={0}
            >
              <SideBar />
            </Box>
            <Stack
              flex={1}
              ml={10}
              p={4}
              h="100%"
            >
              <Header />
              {children}
            </Stack>
          </HStack>
    </ChakraProvider>
        </body>
      </html>
  );
};

export default chatLayout;

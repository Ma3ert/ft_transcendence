"use client";
import "../../src/theme/styles.css";
import { Button, ChakraProvider, Input, Stack, Wrap } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import theme from "@/theme/theme";
import { FaArrowCircleRight } from "react-icons/fa";
import IconButton from "@/components/IconButton";
import localFont from "@next/font/local";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import AppNavigationProvider from "@/providers/AppNavigationProvider";

const inter = Inter({ subsets: ["latin"] });

// const visbyRound = localFont({
//   src: [
//     {
//       path: '../../public/fonts/VisbyRoundCF-Bold.otf',
//       weight: '700'
//     },
//   ],
//   variable: '--font-VisbyRound'
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <AppNavigationProvider>
            <Grid templateRows={"15vh 10vh 75vh"} w="100%" h="100%">
              <GridItem
                border={"1px"}
                borderColor={"red"}
                justifyContent="center"
                alignItems="center"
              >
                <Header />
              </GridItem>
              <GridItem border={"1px"} borderColor={"yellow"}></GridItem>
              <GridItem
                border={"1px"}
                borderColor={"green"}
                justifyContent="center"
                alignItems="center"
              >
                {children}
              </GridItem>
            </Grid>
          </AppNavigationProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

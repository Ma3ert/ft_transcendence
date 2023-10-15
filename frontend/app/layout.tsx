"use client";
import "../src/theme/styles.css";
import React, { useEffect } from "react";
import { Button, ChakraProvider, Input, Stack, Wrap } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import theme from "@/theme/theme";
import { FaArrowCircleRight } from "react-icons/fa";
import IconButton from "@/components/IconButton";
import localFont from "@next/font/local";
import GlobalProvider from "@/providers/GlobalProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthUserProvider from "@/providers/AuthUserProvider";

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
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body>
        <AuthUserProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
              <GlobalProvider>{children}</GlobalProvider>
            </ChakraProvider>
          </QueryClientProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}

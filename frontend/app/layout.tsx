"use client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "@/theme/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { createContext } from "react";

const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

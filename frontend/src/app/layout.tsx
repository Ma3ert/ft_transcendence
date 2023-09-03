"use client";
import { Button, ChakraProvider, Input, Stack, Wrap } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import theme from "@/theme/theme";
import {FaArrowCircleRight} from "react-icons/fa"
import IconButton from '@/components/IconButton';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}

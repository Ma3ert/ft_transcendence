"use client";
import "../theme/styles.css"
import { Button, ChakraProvider, Input, Stack, Wrap } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import theme from "@/theme/theme";
import {FaArrowCircleRight} from "react-icons/fa"
import IconButton from '@/components/IconButton';
import localFont from '@next/font/local'

const inter = Inter({ subsets: ['latin'] })

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

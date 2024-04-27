import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Header } from "@/components/header"
import NextTopLoader from "nextjs-toploader"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TFT Forge",
  description:
    "TFT Forge is a tool for Teamfight Tactics players to help them build the best team compositions and share them with others."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

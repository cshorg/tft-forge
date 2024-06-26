import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Header } from "@/components/header"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/toaster"

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
      <head>
        <link rel="icon" type="image/png" href="/teamfight-tactics.png" />
      </head>
      <body className={`${inter.className}`}>
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <Providers>
          <Header />
          <div className="mt-[100px]">{children}</div>
        </Providers>
      </body>
    </html>
  )
}

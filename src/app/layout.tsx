import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Header } from "./header"

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
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}

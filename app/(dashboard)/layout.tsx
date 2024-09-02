import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import { ClerkProvider, useUser } from "@clerk/nextjs"

import LeftSideBar from "@/app/_components/layout/LeftSideBar"
import TopBar from "@/app/_components/layout/TopBar"
import { Toaster } from "../_components/ui/toaster"
import "@/app/_styles/globals.css"
import QueryProvider from "@/lib/queryProvider"

const playFair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s / MYA boutique",
    default: "Welcome / MYA boutique",
  },
  description: "Luxurious and modern clothes, you can find it in one place.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playFair.className} relative antialiased min-h-screen flex flex-col`}
        >
          <TopBar />
          <div className="flex max-lg:flex-col text-gray-500">
            <LeftSideBar />
            <QueryProvider>
              <div className="flex-1">{children}</div>
            </QueryProvider>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}

import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "@/app/_styles/globals.css"
import Header from "@/app/_components/header"
import { ClerkProvider } from "@clerk/nextjs"

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
          {/* <Header /> */}
          <div className="flex-1 px-8 py-12">
            <main className="mx-auto max-w-7xl">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

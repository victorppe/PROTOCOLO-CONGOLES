import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  title: "Dotado Máximo",
  description: "",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#003466",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-[#003466]">
      <body className={`${geist.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

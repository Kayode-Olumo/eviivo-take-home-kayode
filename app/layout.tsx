import React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Book App",
  description: "The best books for you",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <body className="antialiased font-sans" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

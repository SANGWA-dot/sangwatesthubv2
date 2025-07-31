import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sangwa Test Hub - Rwanda Driving License Exam Preparation",
  description:
    "Master your Rwanda driving license exam with Sangwa Test Hub. Comprehensive practice tests, expert content, and AI-powered learning platform. 95% success rate guaranteed!",
  keywords:
    "Rwanda driving test, driving license exam, practice tests, road safety, driving theory, RNP, Rwanda National Police, Sangwa Test Hub",
  authors: [{ name: "Sangwa Bruce" }],
  creator: "Sangwa Bruce",
  publisher: "Sangwa Test Hub",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Sangwa Test Hub - Rwanda Driving License Exam Preparation",
    description: "Master your Rwanda driving license exam with comprehensive practice tests and expert guidance.",
    type: "website",
    locale: "en_RW",
    siteName: "Sangwa Test Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangwa Test Hub - Rwanda Driving License Exam Preparation",
    description: "Master your Rwanda driving license exam with comprehensive practice tests and expert guidance.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

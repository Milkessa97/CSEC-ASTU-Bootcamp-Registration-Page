import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "CSEC ASTU | Python Fundamentals Bootcamp 2026",
  description:
    "Apply for the CSEC ASTU Python Fundamentals Bootcamp — a free, hands-on 4-week program for high school students at Adama Science & Technology University.",
  keywords: [
    "CSEC ASTU",
    "Python bootcamp",
    "high school programming",
    "ASTU",
    "Adama Science and Technology University",
    "free coding bootcamp Ethiopia",
    "beginner Python",
  ],
  openGraph: {
    title: "CSEC ASTU | Python Fundamentals Bootcamp 2026",
    description:
      "Your first step into the world of programming — no experience needed. Apply now for the CSEC ASTU Python Fundamentals Bootcamp.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSEC ASTU | Python Fundamentals Bootcamp 2026",
    description:
      "Free 4-week Python bootcamp for high school students by the Computer Science & Engineering Club at ASTU.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}

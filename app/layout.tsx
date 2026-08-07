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
  // Required for relative OG image URLs to work correctly in Next.js App Router
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://csec-astu.edu.et"),
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
  // Favicons & Touch Icons
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  // OpenGraph Meta Tags
  openGraph: {
    title: "CSEC ASTU | Python Fundamentals Bootcamp 2026",
    description:
      "Your first step into the world of programming — no experience needed. Apply now for the CSEC ASTU Python Fundamentals Bootcamp.",
    url: "/",
    siteName: "CSEC ASTU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Recommended size: 1200 x 630 px (stored in /public)
        width: 1200,
        height: 630,
        alt: "CSEC ASTU Python Fundamentals Bootcamp 2026 Banner",
      },
    ],
  },
  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "CSEC ASTU | Python Fundamentals Bootcamp 2026",
    description:
      "Free 4-week Python bootcamp for high school students by the Computer Science & Engineering Club at ASTU.",
    images: "/og-image.png",
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
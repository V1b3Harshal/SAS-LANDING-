import type { Metadata, Viewport } from "next/types"
import type { ReactNode } from "react"
import { BlurFooter } from '@/components/ui/BlurFooter';
import { BlurHeader } from '@/components/ui/BlurHeader';
import { Inter, Outfit, Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/Footer"
import { SmoothScrolling } from "@/components/LenisWrapper"
import { GsapProvider } from "@/components/GsapProvider"

// Font configuration with optimized loading
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: 'block',
  adjustFontFallback: false,
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'block',
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'block',
  adjustFontFallback: true,
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'block',
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Sampark AI | Voice Agent for Call Centers & Reception",
  description:
    "24/7 intelligent voice assistant that handles calls, books appointments, and manages front-desk tasks with human-like conversation.",
  keywords: ["AI", "Voice Agent", "Call Center", "Customer Service", "Reception", "Artificial Intelligence"],
  authors: [{ name: "Sampark AI" }],
  openGraph: {
    title: "Sampark AI | Voice Agent for Call Centers & Reception",
    description: "Transform your customer service with AI-powered voice agents",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Preconnect to font resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} font-manrope antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrolling>
            <main className="flex min-h-screen flex-col">
              <BlurHeader />
              <div className="flex-grow pb-[200px] relative">
                <GsapProvider>
                  {children}
                </GsapProvider>
              </div>
              <BlurFooter />
              <Footer />
            </main>
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  )
}
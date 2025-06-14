import type { Metadata, Viewport } from "next/types"
import type { ReactNode } from "react"
import { BlurFooter } from '@/components/ui/BlurFooter';
import { BlurHeader } from '@/components/ui/BlurHeader';
import { Inter, Outfit, Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Footer from "@/components/Footer"
import { SmoothScrolling } from "@/components/LenisWrapper"
import { GsapProvider } from "@/components/GsapProvider"

// Font configuration with optimized loading
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: 'swap',
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
  adjustFontFallback: true,
});

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
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Add interactive-widget to prevent browser UI from affecting layout
  interactiveWidget: 'resizes-content',
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
        {/* Add this meta tag for Safari on iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} font-manrope antialiased`}
        style={{
          // Prevent text size adjustment on mobile
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
          // Prevent tap highlight
          WebkitTapHighlightColor: 'transparent',
        }}
      >
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
      </body>
    </html>
  )
}
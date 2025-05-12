import type { Metadata } from "next/types"
import type { ReactNode } from "react"
import { BlurFooter } from '@/components/ui/BlurFooter';
import { BlurHeader } from '@/components/ui/BlurHeader';
import { Inter, Outfit, Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/Footer"
import { SmoothScrolling } from "@/components/LenisWrapper"
import { GsapProvider } from "@/components/GsapProvider" // Adjust the import path as needed

// Font imports remain the same
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
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

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} ${outfit.variable} font-manrope`}
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
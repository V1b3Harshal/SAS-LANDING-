"use client"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TypewriterEffect } from "@/components/ui/typewriter"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { FlipWords } from "@/components/ui/flip-words"
import { ContentReveal } from "@/components/ui/content-reveal"
import Link from "next/link"
import Spline from "@splinetool/react-spline"
import Lenis from "lenis"

interface SplineHeroProps {
  onTypingComplete?: () => void
}

export default function Hero1({ onTypingComplete }: SplineHeroProps) {
  const [contentLoaded, setContentLoaded] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (typingComplete && onTypingComplete) {
      onTypingComplete()
    }
  }, [typingComplete, onTypingComplete])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Black background div */}
        <div className="absolute inset-0 bg-black mask-fade-bottom" />

        <motion.div
          className="absolute inset-0 pointer-events-auto"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{
            scale: contentLoaded ? 1.2 : 1.25,
            opacity: contentLoaded ? 1 : 0,
            transition: {
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <Spline
            scene="https://prod.spline.design/ullFdbuDcgvdCgDq/scene.splinecode "
            onLoad={() => setContentLoaded(true)}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </motion.div>

        {/* Dark overlay for better text visibility */}
        <motion.div
          className="absolute inset-0 bg-black/40 mask-fade-bottom pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: contentLoaded ? 0.4 : 0,
            transition: { delay: 0.5 },
          }}
        />

        {/* Fallback gradient background while loading */}
        {!contentLoaded && <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />}
      </div>

      {/* Content Container */}
      <AnimatePresence>
        {contentLoaded && (
          <div className="text-center relative z-10 px-3 sm:px-4 pointer-events-none w-full max-w-4xl mx-auto">
            <div className="pointer-events-auto flex flex-col items-center">
              {/* Typewriter Effect for the heading */}
              <ContentReveal delay={0.45}>
                <div className="mb-4 w-full">
                  <div className="text-3xl md:text-4xl font-bold drop-shadow-lg hero-text font-space tracking-tight">
                    {!typingComplete ? (
                      <TypewriterEffect
                        words={[
                          { text: "Revolutionizing", className: "text-white" },
                          { text: "Call", className: "text-white" },
                          { text: "Centers", className: "text-white" },
                          { text: "with", className: "text-white" },
                          {
                            text: "Conversational AI",
                            className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500",
                          },
                        ]}
                        className="inline"
                        cursorClassName="inline"
                        onAnimationComplete={() => setTypingComplete(true)}
                      />
                    ) : (
                      <div>
                        <span className="text-white">Revolutionizing Call Centers with </span>
                        <FlipWords
                          words={["Conversational AI", "Sampark AI", "Voice Intelligence", "Smart Assistants"]}
                          duration={2000}
                          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ContentReveal>

              <ContentReveal delay={0.6}>
                <div className="w-full">
                  <TextGenerateEffect
                    words="AI-driven phone agents capable of understanding and responding to customer inquiries, similar to your traditional Call Center."
                    className="mt-1.5 text-base md:text-lg text-white/90 max-w-xl mx-auto font-manrope"
                  />
                </div>
              </ContentReveal>

              <ContentReveal delay={0.75}>
                <div className="mt-8 w-full flex justify-center">
                  <Link href="/register" className="pointer-events-auto">
                    <motion.button
                      className="relative px-6 py-2 overflow-hidden rounded-lg group font-outfit"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 w-full h-full transition-all duration-225 rounded-lg opacity-70 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:opacity-100"></div>
                      <div className="relative flex items-center gap-1.5">
                        <span className="relative z-10 font-medium text-white text-sm">Get Started</span>
                        <motion.span
                          animate={{ x: isHovered ? 4 : 0 }}
                          transition={{ duration: 0.225 }}
                          className="relative z-10"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </motion.span>
                      </div>
                    </motion.button>
                  </Link>
                </div>
              </ContentReveal>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
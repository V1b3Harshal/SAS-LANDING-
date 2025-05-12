"use client"
import React, { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  Mic,
  Globe,
  MessageCircle,
  Volume,
  HelpCircle,
  UserCheck,
  AlertCircle,
  SmilePlus,
  NetworkIcon as Connection,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Lenis from "lenis"

interface Feature {
  title: string
  description: string[]
  icon: React.ElementType
  color: string
  size?: "sm" | "lg"
  highlights?: string[]
}

const features: Feature[] = [
  {
    title: "Voice Recognition",
    description: [
      "Convert spoken words into accurate text with industry-leading speech-to-text technology",
      "Detect trigger phrases and keywords in real-time for responsive interactions",
    ],
    icon: Mic,
    color: "from-violet-600 to-purple-700",
    highlights: ["99% accuracy", "Real-time processing"],
  },
  {
    title: "Language Understanding",
    description: [
      "Understand user intent with advanced natural language processing",
      "Extract key details like names, dates, and locations automatically",
    ],
    icon: Globe,
    color: "from-blue-600 to-cyan-700",
    highlights: ["Context-aware", "Multilingual support"],
  },
  {
    title: "Conversation Flow",
    description: [
      "Maintain natural conversation context across multiple turns",
      "Handle complex dialogs with dynamic response generation",
    ],
    icon: MessageCircle,
    color: "from-emerald-600 to-teal-700",
    size: "lg",
    highlights: ["Context retention", "Dynamic responses"],
  },
  {
    title: "Natural Voice Output",
    description: [
      "Generate human-like speech with customizable tone and emotion",
      "Support for multiple voices and languages",
    ],
    icon: Volume,
    color: "from-orange-600 to-amber-700",
    highlights: ["40+ voices", "Emotion control"],
  },
  {
    title: "Smart Interactions",
    description: [
      "Engage users with context-aware questions and prompts",
      "Provide personalized responses based on user history",
    ],
    icon: HelpCircle,
    color: "from-pink-600 to-rose-700",
    highlights: ["Adaptive", "Personalized"],
  },
  {
    title: "Secure Authentication",
    description: [
      "Verify users through unique voice biometrics",
      "Multi-factor authentication with voiceprints and PINs",
    ],
    icon: UserCheck,
    color: "from-indigo-600 to-blue-700",
    highlights: ["99.9% accurate", "Fraud prevention"],
  },
  {
    title: "Error Recovery",
    description: [
      "Automatically detect and correct misunderstandings",
      "Provide alternative solutions when requests aren't understood",
    ],
    icon: AlertCircle,
    color: "from-red-600 to-rose-700",
    highlights: ["Self-correcting", "Fallback options"],
  },
  {
    title: "Feedback Systems",
    description: ["Collect and analyze user confirmation signals", "Continuously improve responses based on feedback"],
    icon: SmilePlus,
    color: "from-yellow-600 to-amber-700",
    highlights: ["Continuous learning", "Adaptive"],
  },
  {
    title: "Seamless Integration",
    description: [
      "Connect with external systems through simple APIs",
      "Incorporate real-time data from other services",
    ],
    icon: Connection,
    color: "from-sky-600 to-blue-700",
    size: "lg",
    highlights: ["REST API", "Webhooks"],
  },
  {
    title: "Enterprise Security",
    description: ["End-to-end encryption for all voice data", "Compliance with GDPR, HIPAA, and SOC 2 standards"],
    icon: ShieldCheck,
    color: "from-slate-600 to-gray-700",
    highlights: ["Encrypted", "Compliant"],
  },
]

const FeatureCard: React.FC<{ feature: Feature }> = React.memo(({ feature }) => {
  const Icon = feature.icon
  const isLarge = feature.size === "lg"
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${isLarge ? "md:col-span-2" : ""} h-full`}
    >
      <div className="relative h-full rounded-xl border border-gray-800/50 p-1.5 transition-all duration-300 hover:border-gray-700/70 group">
        <GlowingEffect spread={30} glow={true} disabled={false} proximity={64} inactiveZone={0.01} variant="default" />
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-gray-900/70 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="text-gray-400 group-hover:text-white transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-space">{feature.title}</h3>
          </div>

          <div className="mt-4 space-y-3">
            {feature.description.map((point, idx) => (
              <p key={idx} className="text-sm text-gray-300 leading-relaxed font-manrope">
                {point}
              </p>
            ))}
          </div>

          {feature.highlights && (
            <div className="mt-4 flex flex-wrap gap-2">
              {feature.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-space"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {isLarge && (
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400 font-manrope">Featured capability</div>
                <div className="text-xs text-gray-400">
                  {feature.title === "Conversation Flow"
                    ? "Advanced AI"
                    : feature.title === "Seamless Integration"
                      ? "Developer Friendly"
                      : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})

FeatureCard.displayName = "FeatureCard"

const KeyFeatures: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null) // Add Lenis ref
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
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
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={containerRef} className="relative overflow-hidden" id="features">
      <div className="relative">
        <motion.div
          style={{ y: contentY, willChange: "transform, opacity" }}
          className="relative z-20 pt-16 pb-12 px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4 font-space"
            >
              Core Capabilities
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">Advanced Voice AI Features</h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"
              animate={{
                width: [0, 96],
                opacity: [0, 1],
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
            />
            <p className="text-lg text-white/80 font-manrope">
              Transform user interactions with our comprehensive suite of voice AI technologies
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-fr">
              <div className="md:col-span-2">
                <FeatureCard feature={features[0]} />
              </div>
              <div className="md:col-span-2">
                <FeatureCard feature={features[1]} />
              </div>
              <div className="md:col-span-2">
                <FeatureCard feature={features[3]} />
              </div>
              <div className="md:col-span-3">
                <FeatureCard feature={features[2]} />
              </div>
              <div className="md:col-span-3">
                <FeatureCard feature={features[4]} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <section className="relative py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-space">Enterprise-Grade Solutions</h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-manrope">
              Robust features designed for business-critical applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-fr">
            <div className="md:col-span-2">
              <FeatureCard feature={features[5]} />
            </div>
            <div className="md:col-span-2">
              <FeatureCard feature={features[6]} />
            </div>
            <div className="md:col-span-2">
              <FeatureCard feature={features[7]} />
            </div>
            <div className="md:col-span-3">
              <FeatureCard feature={features[8]} />
            </div>
            <div className="md:col-span-3">
              <FeatureCard feature={features[9]} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/#contact">
              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden font-space"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started Today</span>
                <motion.div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <ArrowRight
                  size={16}
                  className="inline-block ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default KeyFeatures

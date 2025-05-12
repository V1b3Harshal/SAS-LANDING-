"use client"
import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Industry {
  name: string
  icon: string
  description: string
  useCases: string[]
  benefits: string[]
  color: string
  size?: "sm" | "lg"
  stat?: { value: string; label: string }
}

const industries: Industry[] = [
  {
    name: "Healthcare",
    icon: "🏥",
    description:
      "Transform patient communication with AI-powered voice solutions that handle sensitive healthcare interactions while maintaining compliance.",
    useCases: [
      "Automated appointment scheduling",
      "Insurance verification",
      "Prescription refill requests",
      "Symptom checking",
    ],
    benefits: ["HIPAA compliant", "24/7 availability", "Reduces staff workload"],
    color: "from-violet-600 to-purple-700",
    size: "sm",
    stat: { value: "40%", label: "reduction in call wait times" },
  },
  {
    name: "Real Estate",
    icon: "🏢",
    description:
      "Qualify leads and schedule property viewings automatically with conversational AI that understands property terminology.",
    useCases: ["Property inquiry responses", "Viewing scheduling", "Neighborhood information", "Mortgage basics"],
    benefits: ["Lead qualification", "Instant responses", "Multilingual support"],
    color: "from-blue-600 to-cyan-700",
    size: "sm",
    stat: { value: "3x", label: "more leads captured" },
  },
  {
    name: "Hospitality",
    icon: "🏨",
    description:
      "Enhance guest experiences with 24/7 voice assistance that handles bookings, requests, and local recommendations in natural language.",
    useCases: ["Reservation management", "Concierge services", "Room service orders", "Local recommendations"],
    benefits: ["Always available", "Multilingual", "Personalized responses"],
    color: "from-emerald-600 to-teal-700",
    size: "lg",
    stat: { value: "24/7", label: "guest support" },
  },
  {
    name: "Financial Services",
    icon: "💼",
    description:
      "Secure, compliant voice solutions for banking inquiries, appointment scheduling, and basic account services with enterprise-grade security.",
    useCases: ["Account balance inquiries", "Fraud alerts", "Appointment scheduling", "Service information"],
    benefits: ["SOC 2 compliant", "Voice authentication", "Secure data handling"],
    color: "from-pink-600 to-rose-700",
    size: "sm",
    stat: { value: "90%", label: "call deflection rate" },
  },
  {
    name: "Retail & E-commerce",
    icon: "🛍️",
    description:
      "Boost customer satisfaction with AI voice agents that handle orders, returns, and product inquiries with human-like understanding.",
    useCases: ["Order status updates", "Return processing", "Product recommendations", "Store information"],
    benefits: ["Reduces support tickets", "Upsell opportunities", "Instant responses"],
    color: "from-indigo-600 to-blue-700",
    size: "sm",
    stat: { value: "35%", label: "higher CSAT scores" },
  },
]

interface IndustryCardProps {
  industry: Industry
}

const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  const isLarge = industry.size === "lg"
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
            <span className="text-2xl">{industry.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white font-space">{industry.name}</h3>
              {industry.stat && (
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-bold text-white font-space">{industry.stat.value}</span>
                  <span className="text-xs text-gray-400 font-manrope">{industry.stat.label}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-300 leading-relaxed font-manrope">{industry.description}</p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2 font-space">
                Key Use Cases
              </h4>
              <ul className="space-y-1.5">
                {industry.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-emerald-400 mr-2">•</span>
                    <span className="text-sm text-gray-300 font-manrope">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {industry.benefits.map((benefit, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 font-space"
              >
                {benefit}
              </span>
            ))}
          </div>

          {isLarge && (
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400 font-manrope">Industry specialist</div>
                <div className="text-xs text-gray-400">
                  {industry.name === "Hospitality" ? "Multilingual support" : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Industries: React.FC = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="relative overflow-hidden" id="industries">
      <div className="relative">
        <div className="relative z-20 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4 font-space"
            >
              Industry Solutions
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">
              Transform{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Industry-Specific
              </span>{" "}
              Operations
            </h2>
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
              Our AI voice solutions are tailored to meet the unique challenges and requirements of your industry.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-fr">
              <div className="md:col-span-2">
                <IndustryCard industry={industries[0]} />
              </div>
              <div className="md:col-span-2">
                <IndustryCard industry={industries[1]} />
              </div>
              <div className="md:col-span-2">
                <IndustryCard industry={industries[3]} />
              </div>
              <div className="md:col-span-3">
                <IndustryCard industry={industries[2]} />
              </div>
              <div className="md:col-span-3">
                <IndustryCard industry={industries[4]} />
              </div>
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
                <span className="relative z-10">Get Industry Solution</span>
                <motion.div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <ChevronRight
                  size={16}
                  className="inline-block ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Industries

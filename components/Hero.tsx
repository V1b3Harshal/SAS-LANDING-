"use client"
import { useEffect, useRef, useState } from "react"
import type { ReactNode, FC } from "react"
import { Button } from "@/components/ui/button"
import { PhoneCall, Briefcase, Home, HeartPulse, Clock, CheckCircle, User } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { FlipWords } from "@/components/ui/flip-words"
import Lenis from "lenis"

type CallStep = {
  user: string
  ai: string
  action?: string
}
type CallScenario = {
  id: number
  title: string
  description: string
  color: string
  icon: ReactNode
  steps: CallStep[]
}

const scenarios: CallScenario[] = [
  {
    id: 1,
    title: "Corporate Office Reception",
    description: "AI handles visitor management and appointments",
    color: "from-blue-500 to-indigo-500",
    icon: <Briefcase className="w-4 h-4" />,
    steps: [
      {
        user: "Good morning, I have a 11 AM appointment with Mr. Khanna from the Sales department",
        ai: "Good morning! Welcome to TechNova Solutions. May I have your name and the company you represent? I'll immediately notify Mr. Khanna's team of your arrival.",
        action: "📞 Connecting to Sales team..."
      },
      {
        user: "I'm Rahul Sharma from Delta Corp. We scheduled this meeting last week.",
        ai: "Thank you, Mr. Sharma. I've located your appointment in our system. Mr. Khanna is currently in Conference Room 3 on the 5th floor. Would you like me to arrange for coffee or tea while you wait? The elevators are to your left.",
        action: "🔄 Notifying host..."
      },
      {
        user: "A black coffee would be appreciated, thank you.",
        ai: "Certainly, I'll have that prepared for you. Your visitor pass is ready at the reception desk, and our security personnel will escort you upstairs. Thank you for visiting TechNova Solutions - I hope you have a productive meeting with Mr. Khanna.",
        action: "✅ Visitor logged"
      }
    ]
  },
  {
    id: 2,
    title: "Real Estate (Commercial Properties)",
    description: "AI assists with office space inquiries",
    color: "from-amber-500 to-orange-500",
    icon: <Home className="w-4 h-4" />,
    steps: [
      {
        user: "We're looking for approximately 10,000 square feet of office space in Bangalore.",
        ai: "Thank you for contacting Prime Business Hub. We specialize in commercial properties in Bangalore's prime locations. Could you specify your preferred area - Whitefield, ORR, or MG Road? Also, may I know your target move-in date?",
        action: "🏢 Scanning listings..."
      },
      {
        user: "We prefer Whitefield and are looking to move in next quarter.",
        ai: "Excellent choice. We currently have a premium plug-and-play office space available at Prestige Tech Park, complete with cafeteria and fitness facilities. Would you like me to send the virtual tour link? We can also arrange a site visit at your convenience.",
        action: "📲 Sharing brochure..."
      },
      {
        user: "Please send the details. We can visit the property tomorrow.",
        ai: "I've shared the complete property dossier with your email. Our representative Ravi will meet you at the property tomorrow at 11 AM. Please remember to bring PAN cards for security clearance. We look forward to showing you Bangalore's premier business location.",
        action: "📅 Visit scheduled"
      }
    ]
  },
  {
    id: 3,
    title: "Hospital (Corporate Tie-up Desk)",
    description: "AI manages corporate health program inquiries",
    color: "from-green-500 to-teal-500",
    icon: <HeartPulse className="w-4 h-4" />,
    steps: [
      {
        user: "We're interested in health checkup packages for our employees.",
        ai: "Thank you for considering Apollo Corporate Health. We offer comprehensive health screening packages. Could you share how many employees need coverage and whether you're interested in basic diagnostics or our executive full-body screening package?",
        action: "📋 Fetching packages..."
      },
      {
        user: "We need packages for 100 employees, including full-body checkups with cardiac screening.",
        ai: "Understood. For your organization size, we can offer a 20% corporate discount along with complimentary diet counseling sessions. Would you like us to schedule a meeting with your HR team? We can arrange this either at our hospital or your office premises.",
        action: "📈 Preparing proposal..."
      },
      {
        user: "Please send a representative to our office this Friday.",
        ai: "Confirmed. Dr. Mehta, our corporate health specialist, will visit your office this Friday at 3 PM. We'll just require an authorization letter from your organization. Your employees' health is our top priority, and we look forward to this partnership.",
        action: "🏥 Corporate booking"
      }
    ]
  }
]

const features = [
  {
    icon: <PhoneCall className="w-4 h-4" />,
    title: "Voice AI Technology",
    description: "Natural sounding voice agents powered by cutting-edge TTS/STT"
  },
  {
    icon: <CheckCircle className="w-4 h-4" />,
    title: "Multi-LLM Integration",
    description: "Powered by Claude, GPT-4, Gemini and other leading models"
  },
  {
    icon: <Clock className="w-4 h-4" />,
    title: "24/7 Availability",
    description: "Never miss a call with round-the-clock coverage"
  }
]

const flipWords = ["Call Centers", "Reception", "Customer Support", "Healthcare", "Real Estate"]
const typewriterWords = [
  "Handles calls 24/7",
  "Books appointments",
  "Resolves customer issues",
  "Provides instant responses",
  "Reduces wait times",
]

const Hero: FC = () => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const demoRef = useRef<HTMLDivElement>(null)
  const demoInView = useInView(demoRef, { once: true })
  const [currentScenario, setCurrentScenario] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCallActive, setIsCallActive] = useState(false)
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
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    if (!demoInView) return
    const callTimeout = setTimeout(() => {
      setIsCallActive(true)
      let stepIndex = 0
      const stepInterval = setInterval(() => {
        if (stepIndex < scenarios[currentScenario].steps.length - 1) {
          setCurrentStep(stepIndex + 1)
          stepIndex++
        } else {
          clearInterval(stepInterval)
          setTimeout(() => {
            setCurrentScenario((prev) => (prev + 1) % scenarios.length)
            setCurrentStep(0)
            setIsCallActive(false)
          }, 1500)
        }
      }, 2000)
      return () => clearInterval(stepInterval)
    }, 750)
    return () => clearTimeout(callTimeout)
  }, [demoInView, currentScenario])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const demoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const callVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section className="relative overflow-x-hidden w-full min-h-[100dvh] bg-transparent">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 rounded-b-3xl bg-[url('/grid.svg')] opacity-2"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3"></div>
      </div>
      <div className="relative z-10 pt-16 md:pt-20 lg:pt-24 pb-12 md:pb-16 lg:pb-18">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-9">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="w-full lg:w-1/2"
            >
              <motion.div variants={itemVariants} className="mb-5">
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-medium border border-indigo-700/30">
                  <span className="relative flex h-1.5 w-1.5 mr-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
                  </span>
                  AI Voice Agent Platform
                </div>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight text-white"
              >
                Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Voice AI</span> for{" "}
                <FlipWords
                  words={flipWords}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
                />
              </motion.h1>
              <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-300 mb-6 max-w-md">
                <span className="mr-2">24/7 AI phone agents that</span>
                <TypewriterEffect
                  words={typewriterWords}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-medium"
                  cursorClassName="text-purple-400"
                />
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 text-base shadow-lg hover:shadow-indigo-500/30">
                  <PhoneCall className="mr-1.5 h-4 w-4" />
                  <span className="relative z-10">Try Voice Demo</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ originX: 0 }}
                  />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-6 py-4 text-base backdrop-blur-sm hover:border-white/30 transition-all group"
                >
                  See Use Cases
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1.5 h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
              </motion.div>
              <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="bg-white/5 backdrop-blur-sm rounded-md p-2 sm:p-3 border border-white/10 hover:border-indigo-400/30 transition-all"
                  >
                    <div className={`w-8 h-8 rounded-md mb-2 flex items-center justify-center bg-gradient-to-br ${index === 0 ? 'from-indigo-500/20 to-purple-500/20' : index === 1 ? 'from-blue-500/20 to-teal-500/20' : 'from-purple-500/20 to-pink-500/20'} border border-white/10`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-white mb-0.5">{feature.title}</h3>
                    <p className="text-xs text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      className="h-6 w-6 rounded-full border-1.5 border-white/20 bg-white/5 backdrop-blur-sm"
                      whileHover={{ scale: 1.1, y: -3 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-300">
                  Trusted by <span className="font-bold text-white">2,000+</span> businesses worldwide
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              ref={demoRef}
              variants={demoVariants}
              initial="hidden"
              animate={demoInView ? "visible" : "hidden"}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-0.5 w-full border border-white/10 overflow-hidden">
                  <div className="relative bg-gray-950 rounded-xl overflow-hidden min-h-[300px] md:h-[375px] lg:h-[435px] flex flex-col">
                    <div className="flex justify-between items-center px-3 py-1.5 text-xs text-gray-400">
                      <span>5G</span>
                      <span>10:24 AM</span>
                      <span>100%</span>
                    </div>
                    <div className="flex-1 flex flex-col p-3">
                      <AnimatePresence mode="wait">
                        {!isCallActive ? (
                          <CallConnectingAnimation />
                        ) : (
                          <ActiveCall
                            scenario={scenarios[currentScenario]}
                            currentStep={currentStep}
                            callVariants={callVariants}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium px-2 py-0.5 rounded-full shadow-lg">
                  Powered by Claude, GPT-4 & Gemini
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full border border-white/10">
                  Real-time Speech Recognition
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CallConnectingAnimation = () => (
  <motion.div
    key="dialing"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex flex-col items-center justify-center"
  >
    <div className="relative mb-6">
      <div className="w-18 h-18 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
        <PhoneCall className="w-6 h-6 text-white" />
      </div>
      <div className="absolute inset-0 rounded-full border-3 border-indigo-400/30 animate-ping opacity-0"></div>
    </div>
    <p className="text-gray-400 mb-1.5">Connecting to AI agent...</p>
    <div className="flex space-x-1.5">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
          animate={{
            y: [0, -3, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.15,
          }}
        />
      ))}
    </div>
  </motion.div>
)

type ActiveCallProps = {
  scenario: CallScenario
  currentStep: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callVariants: any
}

const ActiveCall = ({ scenario, currentStep, callVariants }: ActiveCallProps) => (
  <motion.div
    key="call-active"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="flex-1 flex flex-col"
  >
    <div className="text-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-2 shadow-lg">
        <User className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-base font-semibold text-white">AI Voice Agent</h3>
      <p className="text-xs text-indigo-400 flex items-center justify-center">
        <span className="relative flex h-1.5 w-1.5 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        Active call
      </p>
    </div>
    <div className="flex-1 space-y-3 overflow-y-auto px-1.5">
      <AnimatePresence>
        {scenario.steps.slice(0, currentStep + 1).map((step, index) => (
          <motion.div
            key={`step-${scenario.id}-${index}`}
            variants={callVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`p-2 rounded-md max-w-[85%] ${index % 2 === 0 ? 'bg-gray-800/80 rounded-tl-none ml-auto' : 'bg-indigo-900/50 rounded-tr-none'}`}
          >
            <p className="text-gray-200 text-xs">{index % 2 === 0 ? step.user : step.ai}</p>
            {step.action && index === currentStep && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-gray-400 mt-0.5 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-0.5 animate-spin"
                >
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="12" y1="18" x2="12" y2="22"></line>
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                  <line x1="2" y1="12" x2="6" y2="12"></line>
                  <line x1="18" y1="12" x2="22" y2="12"></line>
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                {step.action}
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    <CallControls />
  </motion.div>
)

const CallControls = () => (
  <div className="mt-3 pt-3 border-t border-gray-800/50">
    <div className="flex justify-center space-x-4">
      <button className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path>
          <line x1="12" y1="9" x2="12" y2="12"></line>
          <line x1="12" y1="15" x2="12.01" y2="15"></line>
        </svg>
      </button>
      <button className="p-3 rounded-full bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path>
          <line x1="23" y1="1" x2="1" y2="23"></line>
        </svg>
      </button>
      <button className="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      </button>
    </div>
  </div>
)

export default Hero
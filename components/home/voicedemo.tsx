"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  Speaker,
  Globe2,
  Brain,
  Clock,
  Phone,
  PhoneCall,
  Calendar,
  CheckCircle,
  Sparkles,
  Languages,
  Wand2,
  Bot,
  Headphones,
  Settings,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
  language: string
}

const VoiceDemo: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    language: "english",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("features")
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showWaveform, setShowWaveform] = useState(false)
  const waveformRef = useRef<HTMLCanvasElement>(null)


  // Animation for the waveform
  useEffect(() => {
    if (showWaveform && waveformRef.current) {
      const canvas = waveformRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let animationFrameId: number
      let hue = 0

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }

      resizeCanvas()
      window.addEventListener("resize", resizeCanvas)

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerY = canvas.height / 2
        const amplitude = canvas.height / 4
        const frequency = 0.01
        const speed = 0.05

        ctx.beginPath()
        ctx.moveTo(0, centerY)

        for (let x = 0; x < canvas.width; x++) {
          const time = Date.now() * speed * 0.001
          const y = centerY + Math.sin(x * frequency + time) * amplitude * Math.sin(time * 2)
          ctx.lineTo(x, y)
        }

        hue = (hue + 0.1) % 360
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.5)`)
        gradient.addColorStop(1, `hsla(${hue + 60}, 70%, 60%, 0.5)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.stroke()

        animationFrameId = requestAnimationFrame(draw)
      }

      draw()

      return () => {
        window.removeEventListener("resize", resizeCanvas)
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [showWaveform])

  // Animation for the conversation flow
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeTab === "demo") {
      setAnimationProgress(0)
      setShowWaveform(true)

      interval = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 0.5
        })
      }, 100)
    } else {
      setShowWaveform(false)
    }

    return () => clearInterval(interval)
  }, [activeTab])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false)
        setShowForm(false)
      }, 3000)
    }, 1500)
  }

  const features = [
    {
      icon: <Mic className="h-5 w-5" />,
      title: "Speech Recognition",
      description: "Advanced speech-to-text technology with 99% accuracy across multiple languages and accents.",
    },
    {
      icon: <Speaker className="h-5 w-5" />,
      title: "Natural Voice Synthesis",
      description: "Human-like voice generation with customizable emotion, pitch, and regional accents.",
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: "LLM Integration",
      description: "Powered by state-of-the-art language models for contextual understanding and natural responses.",
    },
    {
      icon: <Languages className="h-5 w-5" />,
      title: "Multilingual Support",
      description: "Support for Hindi, English, Spanish and 40+ other languages with native-sounding pronunciation.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "24/7 Availability",
      description: "Always-on voice agents that never sleep, ensuring continuous customer service.",
    },
    {
      icon: <Wand2 className="h-5 w-5" />,
      title: "Customizable Workflows",
      description: "Tailor conversation flows to your specific business needs and integration requirements.",
    },
  ]

  const useCases = [
    {
      title: "Customer Service",
      description: "Handle inquiries, process returns, and resolve issues without human intervention.",
      icon: <Headphones className="h-5 w-5" />,
    },
    {
      title: "Appointment Scheduling",
      description: "Book, reschedule, and confirm appointments across healthcare, beauty, and professional services.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Lead Qualification",
      description: "Engage prospects, qualify leads, and schedule follow-ups with sales representatives.",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Multilingual Support",
      description: "Provide native-language support for global customers without additional staffing.",
      icon: <Globe2 className="h-5 w-5" />,
    },
  ]

  const conversationSteps = [
    { text: "AI initiates outbound call", progress: 5 },
    { text: "Call connects to recipient", progress: 15 },
    { text: "AI introduces itself and purpose", progress: 25 },
    { text: "Speech-to-text processes user response", progress: 40 },
    { text: "LLM analyzes context and intent", progress: 55 },
    { text: "AI formulates appropriate response", progress: 70 },
    { text: "Text-to-speech generates natural reply", progress: 85 },
    { text: "Conversation continues until task completion", progress: 100 },
  ]

  const getCurrentConversationStep = () => {
    return conversationSteps.findIndex((step) => animationProgress <= step.progress)
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-white/90 text-sm font-medium mb-6 shadow-lg font-space"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Next-Gen Voice AI Platform
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-space"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI Voice Agents
            </span>{" "}
            That Sound Human
          </motion.h2>

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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto font-manrope"
          >
            Replace human receptionists with AI voice agents that handle calls autonomously, available 24/7 with
            customizable voices, emotions, and multilingual support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-6 py-6 rounded-xl font-medium shadow-lg"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Demo Call
            </Button>
            <Button
              onClick={() => setActiveTab("demo")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 py-6 rounded-xl"
              size="lg"
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </motion.div>
        </div>

        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-white/10 rounded-xl p-1">
            <TabsTrigger
              value="features"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg"
            >
              Key Features
            </TabsTrigger>
            <TabsTrigger
              value="usecases"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg"
            >
              Use Cases
            </TabsTrigger>
            <TabsTrigger
              value="demo"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-lg"
            >
              Live Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/30 border-white/10 hover:bg-gray-800/50 transition-colors h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 rounded-lg bg-gray-700/50 text-white/80">{feature.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 font-space">{feature.title}</h3>
                          <p className="text-sm text-gray-300 font-manrope">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4 font-space">Voice Customization</h3>
                  <p className="text-white/80 mb-6 font-manrope">
                    Our AI voice agents can be customized with different accents, emotions, and speaking styles to match
                    your brand identity and use case requirements.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/80">Emotion Control</span>
                        <span className="text-sm font-medium text-white">Professional</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[70%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/80">Speaking Rate</span>
                        <span className="text-sm font-medium text-white">Medium</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[50%] rounded-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white/80">Accent</span>
                        <span className="text-sm font-medium text-white">Indian English</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[85%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="relative bg-gray-800/70 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <Settings className="h-5 w-5 text-white/60" />
                        <h4 className="text-lg font-medium text-white">Voice Settings</h4>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-white/80 mb-1 block">Voice Type</label>
                          <select className="w-full bg-gray-700 border border-white/10 rounded-lg p-2 text-white">
                            <option>Female (Professional)</option>
                            <option>Male (Professional)</option>
                            <option>Female (Friendly)</option>
                            <option>Male (Friendly)</option>
                            <option>Gender Neutral</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-white/80 mb-1 block">Language</label>
                          <select className="w-full bg-gray-700 border border-white/10 rounded-lg p-2 text-white">
                            <option>English (India)</option>
                            <option>Hindi</option>
                            <option>English (US)</option>
                            <option>English (UK)</option>
                            <option>Spanish</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm text-white/80 mb-1 block">Emotion</label>
                          <select className="w-full bg-gray-700 border border-white/10 rounded-lg p-2 text-white">
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Empathetic</option>
                            <option>Enthusiastic</option>
                            <option>Calm</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="usecases" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative rounded-xl border border-gray-800/50 p-1.5 h-full"
                >
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    variant="default"
                  />
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gray-800 text-white/80">{useCase.icon}</div>
                        <h3 className="text-xl font-bold text-white font-space">{useCase.title}</h3>
                      </div>

                      <p className="text-gray-300 mb-6 font-manrope">{useCase.description}</p>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-white/10">
                      <h4 className="text-sm font-medium text-white/90 mb-3 font-space">Sample Conversation</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-3.5 h-3.5 text-white" />
                          </div>
                          <p className="text-sm text-white/80 font-manrope">
                            {useCase.title === "Customer Service" &&
                              "Hello, this is Maya from TechSupport. I noticed you recently purchased our product. How can I assist you today?"}
                            {useCase.title === "Appointment Scheduling" &&
                              "Good morning! This is Priya from Dr. Sharma's office. I'm calling to confirm your appointment for tomorrow at 2 PM."}
                            {useCase.title === "Lead Qualification" &&
                              "Hi there, this is Arjun from InvestPro. I'm following up on your inquiry about our investment services. Do you have a few minutes to chat?"}
                            {useCase.title === "Multilingual Support" &&
                              "नमस्ते, मैं आपकी क्या मदद कर सकता हूँ? / Hello, how may I assist you today?"}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Headphones className="w-3.5 h-3.5 text-white" />
                          </div>
                          <p className="text-sm text-white/80 font-manrope">
                            {useCase.title === "Customer Service" &&
                              "Yes, I'm having trouble setting up the software. It keeps crashing during installation."}
                            {useCase.title === "Appointment Scheduling" &&
                              "Actually, I need to reschedule. Something came up at work."}
                            {useCase.title === "Lead Qualification" &&
                              "Yes, I'm interested in learning more about your retirement planning options."}
                            {useCase.title === "Multilingual Support" &&
                              "हाँ, मुझे अपने खाते के बारे में कुछ जानकारी चाहिए। / Yes, I need some information about my account."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 font-space">Industry Applications</h3>
                  <p className="text-white/80 mb-6 font-manrope">
                    Our AI voice agents are being used across multiple industries to automate conversations and improve
                    customer experiences.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <div className="text-2xl">🏥</div>
                      <div>
                        <h4 className="text-white font-medium">Healthcare</h4>
                        <p className="text-sm text-white/70">Appointment scheduling and patient follow-ups</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <div className="text-2xl">🏢</div>
                      <div>
                        <h4 className="text-white font-medium">Real Estate</h4>
                        <p className="text-sm text-white/70">Property inquiries and viewing scheduling</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <div className="text-2xl">🏦</div>
                      <div>
                        <h4 className="text-white font-medium">Banking</h4>
                        <p className="text-sm text-white/70">Account inquiries and transaction verification</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <div className="text-2xl">🛒</div>
                      <div>
                        <h4 className="text-white font-medium">E-commerce</h4>
                        <p className="text-sm text-white/70">Order status and return processing</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-8 flex items-center justify-center">
                  <div className="max-w-md">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                        <Sparkles className="h-8 w-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 font-space">Results Our Clients See</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-white mb-1 font-space">60%</div>
                        <p className="text-sm text-white/70">Cost Reduction</p>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-white mb-1 font-space">24/7</div>
                        <p className="text-sm text-white/70">Availability</p>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-white mb-1 font-space">95%</div>
                        <p className="text-sm text-white/70">Resolution Rate</p>
                      </div>

                      <div className="bg-white/10 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-white mb-1 font-space">3x</div>
                        <p className="text-sm text-white/70">Call Capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="demo" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800/50 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 font-space">How AI Voice Calls Work</h3>
                  <p className="text-white/80 mb-6 font-manrope">
                    Our AI voice agents use a sophisticated pipeline to handle natural conversations in real-time.
                  </p>

                  <div className="space-y-4">
                    {conversationSteps.map((step, index) => (
                      <div key={index} className="relative">
                        <div
                          className={`flex items-center gap-3 ${animationProgress >= step.progress ? "text-white" : "text-white/40"}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${animationProgress >= step.progress ? "bg-purple-600" : "bg-gray-700"}`}
                          >
                            {animationProgress >= step.progress ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span className="text-sm font-medium">{step.text}</span>
                        </div>

                        {index < conversationSteps.length - 1 && (
                          <div className="absolute left-3 top-6 bottom-0 w-[1px] h-6 bg-gray-700"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Progress
                      value={animationProgress}
                      className="h-2 bg-gray-700 [&>div]:bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-white/60">
                      <span>Call Start</span>
                      <span>In Progress</span>
                      <span>Completed</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-gray-800/50 rounded-xl border border-white/10 p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 font-space">Technology Stack</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <Mic className="h-5 w-5 text-purple-400" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Speech Recognition</h4>
                        <p className="text-xs text-white/70">Advanced ASR with noise filtering</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <Brain className="h-5 w-5 text-blue-400" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Large Language Models</h4>
                        <p className="text-xs text-white/70">Context-aware conversation processing</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <Speaker className="h-5 w-5 text-green-400" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Neural Text-to-Speech</h4>
                        <p className="text-xs text-white/70">Human-like voice synthesis</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                      <Globe2 className="h-5 w-5 text-amber-400" />
                      <div>
                        <h4 className="text-white font-medium text-sm">Multilingual Processing</h4>
                        <p className="text-xs text-white/70">Support for 40+ languages</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="lg:col-span-3 relative rounded-xl border border-gray-800/50 p-1.5 h-full"
              >
                <GlowingEffect
                  spread={30}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  variant="default"
                />
                <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/20">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-bold text-white font-space">Priya AI Assistant</h3>
                        <div className="flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-xs text-white/60">Active Call</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full border-white/10">
                        <Settings className="h-4 w-4 text-white/60" />
                        <span className="sr-only">Settings</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full bg-red-500/10 hover:bg-red-500/20 border-red-500/20"
                      >
                        <Phone className="h-4 w-4 text-red-400" />
                        <span className="sr-only">End Call</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-800/50 rounded-xl border border-white/10 p-4 mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                      <canvas ref={waveformRef} className="w-full h-full opacity-20" />
                    </div>

                    <div className="relative z-10 h-full overflow-y-auto space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border border-white/20">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-700/70 rounded-lg rounded-tl-none p-3 text-white max-w-[80%]">
                          <p className="text-sm">
                            {animationProgress >= 25 ? (
                              <>
                                नमस्ते! मैं प्रिया हूँ, डॉक्टर शर्मा के क्लिनिक से बोल रही हूँ। क्या मैं आपकी कोई मदद कर सकती हूँ?
                                <br />
                                <br />
                                <span className="text-white/60 text-xs">
                                  (Hello! This is Priya from Dr. Sharma&apos;s clinic. How may I assist you today?)
                                </span>
                              </>
                            ) : (
                              "..."
                            )}
                          </p>
                        </div>
                      </div>

                      {animationProgress >= 40 && (
                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-blue-600/70 rounded-lg rounded-tr-none p-3 text-white max-w-[80%]">
                            <p className="text-sm">
                              हां, मुझे एक अपॉइंटमेंट बुक करनी है। क्या कल कोई स्लॉट उपलब्ध है?
                              <br />
                              <br />
                              <span className="text-white/60 text-xs">
                                (Yes, I need to book an appointment. Do you have any slots available tomorrow?)
                              </span>
                            </p>
                          </div>
                          <Avatar className="h-8 w-8 border border-white/20">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}

                      {animationProgress >= 55 && (
                        <div className="flex justify-center">
                          <div className="bg-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-300 flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            AI processing response...
                          </div>
                        </div>
                      )}

                      {animationProgress >= 70 && (
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8 border border-white/20">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-700/70 rounded-lg rounded-tl-none p-3 text-white max-w-[80%]">
                            <p className="text-sm">
                              जी हां, कल हमारे पास सुबह 10 बजे और दोपहर 2 बजे के स्लॉट उपलब्ध हैं। आप किस समय आना पसंद करेंगे?
                              <br />
                              <br />
                              <span className="text-white/60 text-xs">
                                (Yes, we have slots available tomorrow at 10 AM and 2 PM. Which time would you prefer?)
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      {animationProgress >= 85 && (
                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-blue-600/70 rounded-lg rounded-tr-none p-3 text-white max-w-[80%]">
                            <p className="text-sm">
                              दोपहर 2 बजे का स्लॉट अच्छा रहेगा। मेरा नाम राहुल शर्मा है।
                              <br />
                              <br />
                              <span className="text-white/60 text-xs">
                                (The 2 PM slot would be good. My name is Rahul Sharma.)
                              </span>
                            </p>
                          </div>
                          <Avatar className="h-8 w-8 border border-white/20">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}

                      {animationProgress >= 100 && (
                        <>
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 border border-white/20">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-700/70 rounded-lg rounded-tl-none p-3 text-white max-w-[80%]">
                              <p className="text-sm">
                                बहुत अच्छा, राहुल जी। मैंने आपका अपॉइंटमेंट कल दोपहर 2 बजे के लिए बुक कर दिया है। क्या आप अपना मोबाइल
                                नंबर और ईमेल प्रदान कर सकते हैं?
                                <br />
                                <br />
                                <span className="text-white/60 text-xs">
                                  (Great, Mr. Rahul. I&apos;ve booked your appointment for tomorrow at 2 PM. Could you
                                  provide your mobile number and email?)
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <div className="bg-green-500/20 rounded-full px-3 py-1 text-xs text-green-300 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Appointment successfully scheduled
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Mic className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-medium text-white/90">Speech Recognition</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getCurrentConversationStep() === 3 ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                        ></div>
                        <span className="text-xs text-white/60">Hindi + English</span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-medium text-white/90">AI Processing</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getCurrentConversationStep() === 4 ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                        ></div>
                        <span className="text-xs text-white/60">Context-aware</span>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Speaker className="h-4 w-4 text-green-400" />
                        <span className="text-xs font-medium text-white/90">Voice Synthesis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${getCurrentConversationStep() === 6 ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}
                        ></div>
                        <span className="text-xs text-white/60">Indian accent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-6 py-6 rounded-xl font-medium shadow-lg"
                size="lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Demo Call
              </Button>
              <p className="text-white/60 mt-3 text-sm font-manrope">
                Experience our AI voice agents firsthand with a personalized demo
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-xl border border-gray-800/50 p-1.5"
            >
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                variant="default"
              />
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowForm(false)
                    setShowSuccess(false)
                  }}
                  className="absolute right-4 top-4 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>

                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-10 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">Demo Call Scheduled!</h3>
                    <p className="text-white/80 mb-6 font-manrope">
                      You&apos;re in the queue. You will receive a call from our AI agent soon.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4 max-w-xs mx-auto">
                      <p className="text-white/70 text-sm">
                        Our AI assistant will call you at the provided number to demonstrate our voice technology in
                        action.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2 font-space">Schedule a Demo Call</h3>
                    <p className="text-white/80 mb-6 font-manrope">
                      Fill out the form below to experience our AI voice assistant in action
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="text-sm text-white/80 mb-1 block">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="text-sm text-white/80 mb-1 block">
                            Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="text-sm text-white/80 mb-1 block">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="text-sm text-white/80 mb-1 block">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-sm text-white/80 mb-1 block">
                          How can we help you? (Optional)
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label htmlFor="language" className="text-sm text-white/80 mb-1 block">
                          Preferred Demo Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleFormChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 text-white rounded-md p-2"
                        >
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="hinglish">Hinglish (Hindi + English)</option>
                          <option value="spanish">Spanish</option>
                        </select>
                      </div>

                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity font-space py-6"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            "Schedule My Demo Call"
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default VoiceDemo

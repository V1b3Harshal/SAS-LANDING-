"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic, Speaker, Globe2, Brain, Clock, Phone, PhoneCall, Calendar,
  CheckCircle, Sparkles, Languages, Wand2, Bot, Headphones, Settings, X,
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

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="bg-gray-800/30 border-white/10 hover:bg-gray-800/50 transition-colors h-full text-sm">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-md bg-gray-700/50 text-white/80">{icon}</div>
        <div>
          <h3 className="font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const VoiceDemo: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", company: "", message: "", language: "english",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("features")
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showWaveform, setShowWaveform] = useState(false)
  const waveformRef = useRef<HTMLCanvasElement>(null)

  // Waveform animation
  useEffect(() => {
    if (!showWaveform || !waveformRef.current) return
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
      ctx.lineWidth = 2
      ctx.stroke()
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [showWaveform])

  // Conversation progress animation
  useEffect(() => {
    if (activeTab !== "demo") {
      setShowWaveform(false)
      return
    }

    setAnimationProgress(0)
    setShowWaveform(true)
    const interval = setInterval(() => {
      setAnimationProgress(prev => prev >= 100 ? 100 : prev + 0.5)
    }, 100)

    return () => clearInterval(interval)
  }, [activeTab])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setShowForm(false)
      }, 3000)
    }, 1500)
  }

  const features = [
    { icon: <Mic size={16} />, title: "Speech Recognition", description: "Advanced speech-to-text technology with 99% accuracy across multiple languages and accents." },
    { icon: <Speaker size={16} />, title: "Natural Voice Synthesis", description: "Human-like voice generation with customizable emotion, pitch, and regional accents." },
    { icon: <Brain size={16} />, title: "LLM Integration", description: "Powered by state-of-the-art language models for contextual understanding and natural responses." },
    { icon: <Languages size={16} />, title: "Multilingual Support", description: "Support for Hindi, English, Spanish and 40+ other languages with native-sounding pronunciation." },
    { icon: <Clock size={16} />, title: "24/7 Availability", description: "Always-on voice agents that never sleep, ensuring continuous customer service." },
    { icon: <Wand2 size={16} />, title: "Customizable Workflows", description: "Tailor conversation flows to your specific business needs and integration requirements." },
  ]

  const useCases = [
    { title: "Customer Service", description: "Handle inquiries, process returns, and resolve issues without human intervention.", icon: <Headphones size={16} /> },
    { title: "Appointment Scheduling", description: "Book, reschedule, and confirm appointments across healthcare, beauty, and professional services.", icon: <Calendar size={16} /> },
    { title: "Lead Qualification", description: "Engage prospects, qualify leads, and schedule follow-ups with sales representatives.", icon: <CheckCircle size={16} /> },
    { title: "Multilingual Support", description: "Provide native-language support for global customers without additional staffing.", icon: <Globe2 size={16} /> },
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

  const getCurrentConversationStep = () => conversationSteps.findIndex(step => animationProgress <= step.progress)

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-white/90 text-xs font-medium mb-4 shadow-lg"
          >
            <Sparkles size={14} className="text-yellow-400" />
            Next-Gen Voice AI Platform
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI Voice Agents
            </span> That Sound Human
          </motion.h2>

          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4"
            animate={{ width: [0, 64], opacity: [0, 1] }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Replace human receptionists with AI voice agents that handle calls autonomously, available 24/7 with customizable voices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-5 py-4 rounded-lg font-medium shadow-lg"
            >
              <Calendar size={16} className="mr-2" />
              Schedule a Demo Call
            </Button>
            <Button
              onClick={() => setActiveTab("demo")}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-5 py-4 rounded-lg"
            >
              <PhoneCall size={16} className="mr-2" />
              See How It Works
            </Button>
          </motion.div>
        </div>

        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-white/10 rounded-lg p-1">
            <TabsTrigger value="features" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md text-sm">
              Key Features
            </TabsTrigger>
            <TabsTrigger value="usecases" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md text-sm">
              Use Cases
            </TabsTrigger>
            <TabsTrigger value="demo" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white rounded-md text-sm">
              Live Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-white/10"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-white mb-3">Voice Customization</h3>
                  <p className="text-white/80 mb-4">
                    Our AI voice agents can be customized with different accents, emotions, and speaking styles.
                  </p>

                  <div className="space-y-3">
                    {[
                      { label: "Emotion Control", value: "Professional", width: "70%" },
                      { label: "Speaking Rate", value: "Medium", width: "50%" },
                      { label: "Accent", value: "Indian English", width: "85%" },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-1 text-xs">
                          <span className="text-white/80">{item.label}</span>
                          <span className="font-medium text-white">{item.value}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: item.width }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-xs">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="relative bg-gray-800/70 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Settings size={16} className="text-white/60" />
                        <h4 className="font-medium text-white">Voice Settings</h4>
                      </div>

                      <div className="space-y-3">
                        {["Voice Type", "Language", "Emotion"].map((label, i) => (
                          <div key={i}>
                            <label className="text-xs text-white/80 mb-1 block">{label}</label>
                            <select className="w-full bg-gray-700 border border-white/10 rounded-md p-1.5 text-white text-sm">
                              {i === 0 && ["Female (Professional)", "Male (Professional)", "Female (Friendly)", "Male (Friendly)", "Gender Neutral"].map(opt => (
                                <option key={opt}>{opt}</option>
                              ))}
                              {i === 1 && ["English (India)", "Hindi", "English (US)", "English (UK)", "Spanish"].map(opt => (
                                <option key={opt}>{opt}</option>
                              ))}
                              {i === 2 && ["Professional", "Friendly", "Empathetic", "Enthusiastic", "Calm"].map(opt => (
                                <option key={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="usecases" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative rounded-lg border border-gray-800/50 p-1 h-full"
                >
                  <GlowingEffect spread={20} glow proximity={48} />
                  <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-md bg-gray-900/70 p-4 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-gray-800 text-white/80">{useCase.icon}</div>
                        <h3 className="font-bold text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-4 text-sm">{useCase.description}</p>
                    </div>

                    <div className="bg-gray-800/50 rounded-md p-3 border border-white/10">
                      <h4 className="text-xs font-medium text-white/90 mb-2">Sample Conversation</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot size={12} className="text-white" />
                          </div>
                          <p className="text-xs text-white/80">
                            {useCase.title === "Customer Service" && "Hello, this is Maya from TechSupport. How can I assist you today?"}
                            {useCase.title === "Appointment Scheduling" && "Good morning! This is Priya from Dr. Sharma's office calling about your appointment."}
                            {useCase.title === "Lead Qualification" && "Hi, this is Arjun from InvestPro following up on your inquiry."}
                            {useCase.title === "Multilingual Support" && "नमस्ते, मैं आपकी क्या मदद कर सकता हूँ? / Hello, how may I assist you?"}
                          </p>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Headphones size={12} className="text-white" />
                          </div>
                          <p className="text-xs text-white/80">
                            {useCase.title === "Customer Service" && "Yes, I'm having trouble setting up the software."}
                            {useCase.title === "Appointment Scheduling" && "Actually, I need to reschedule."}
                            {useCase.title === "Lead Qualification" && "Yes, I'm interested in retirement planning."}
                            {useCase.title === "Multilingual Support" && "हाँ, मुझे अपने खाते के बारे में जानकारी चाहिए। / Yes, I need account info."}
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
              className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">Industry Applications</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Our AI voice agents are used across industries to automate conversations and improve experiences.
                  </p>

                  <div className="space-y-3">
                    {[
                      { emoji: "🏥", title: "Healthcare", desc: "Appointment scheduling and patient follow-ups" },
                      { emoji: "🏢", title: "Real Estate", desc: "Property inquiries and viewing scheduling" },
                      { emoji: "🏦", title: "Banking", desc: "Account inquiries and transaction verification" },
                      { emoji: "🛒", title: "E-commerce", desc: "Order status and return processing" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 rounded-md p-2">
                        <div className="text-xl">{item.emoji}</div>
                        <div>
                          <h4 className="text-white font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-white/70">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 flex items-center justify-center">
                  <div className="max-w-xs">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-2">
                        <Sparkles size={20} className="text-purple-400" />
                      </div>
                      <h3 className="font-bold text-white mb-1">Results Our Clients See</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "60%", label: "Cost Reduction" },
                        { value: "24/7", label: "Availability" },
                        { value: "95%", label: "Resolution Rate" },
                        { value: "3x", label: "Call Capacity" },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/10 rounded-md p-2 text-center">
                          <div className="text-xl font-bold text-white">{item.value}</div>
                          <p className="text-xs text-white/70">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="demo" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800/50 rounded-lg border border-white/10 p-4"
                >
                  <h3 className="font-bold text-white mb-3">How AI Voice Calls Work</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Our AI voice agents handle natural conversations in real-time.
                  </p>

                  <div className="space-y-3">
                    {conversationSteps.map((step, index) => (
                      <div key={index} className="relative">
                        <div className={`flex items-center gap-2 ${animationProgress >= step.progress ? "text-white" : "text-white/40"}`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${animationProgress >= step.progress ? "bg-purple-600" : "bg-gray-700"}`}>
                            {animationProgress >= step.progress ? (
                              <CheckCircle size={12} className="text-white" />
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </div>
                          <span className="text-xs font-medium">{step.text}</span>
                        </div>
                        {index < conversationSteps.length - 1 && (
                          <div className="absolute left-2.5 top-5 bottom-0 w-[1px] h-4 bg-gray-700"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <Progress
                      value={animationProgress}
                      className="h-1.5 bg-gray-700 [&>div]:bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                    <div className="flex justify-between mt-1 text-xs text-white/60">
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
                  className="bg-gray-800/50 rounded-lg border border-white/10 p-4"
                >
                  <h3 className="font-bold text-white mb-3">Technology Stack</h3>
                  <div className="space-y-2">
                    {[
                      { icon: <Mic size={14} className="text-purple-400" />, title: "Speech Recognition", desc: "Advanced ASR with noise filtering" },
                      { icon: <Brain size={14} className="text-blue-400" />, title: "Large Language Models", desc: "Context-aware conversation processing" },
                      { icon: <Speaker size={14} className="text-green-400" />, title: "Neural Text-to-Speech", desc: "Human-like voice synthesis" },
                      { icon: <Globe2 size={14} className="text-amber-400" />, title: "Multilingual Processing", desc: "Support for 40+ languages" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 rounded-md p-2">
                        {item.icon}
                        <div>
                          <h4 className="text-white font-medium text-xs">{item.title}</h4>
                          <p className="text-xs text-white/70">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="lg:col-span-3 relative rounded-lg border border-gray-800/50 p-1 h-full"
              >
                <GlowingEffect spread={20} glow proximity={48} />
                <div className="relative flex h-full flex-col overflow-hidden rounded-md bg-gray-900/70 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-white/20">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-white">Priya AI Assistant</h3>
                        <div className="flex items-center gap-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          <span className="text-xs text-white/60">Active Call</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full border-white/10">
                        <Settings size={14} className="text-white/60" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full bg-red-500/10 hover:bg-red-500/20 border-red-500/20">
                        <Phone size={14} className="text-red-400" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 bg-gray-800/50 rounded-lg border border-white/10 p-3 mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 overflow-hidden">
                      <canvas ref={waveformRef} className="w-full h-full opacity-20" />
                    </div>

                    <div className="relative z-10 h-full overflow-y-auto space-y-3">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-6 w-6 border border-white/20">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-700/70 rounded-md rounded-tl-none p-2 text-white max-w-[80%]">
                          <p className="text-xs">
                            {animationProgress >= 25 ? (
                              <>
                                नमस्ते! मैं प्रिया हूँ, डॉक्टर शर्मा के क्लिनिक से बोल रही हूँ। क्या मैं आपकी कोई मदद कर सकती हूँ?
                                <br />
                                <span className="text-white/60 text-2xs">
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
                        <div className="flex items-start gap-2 justify-end">
                          <div className="bg-blue-600/70 rounded-md rounded-tr-none p-2 text-white max-w-[80%]">
                            <p className="text-xs">
                              हां, मुझे एक अपॉइंटमेंट बुक करनी है। क्या कल कोई स्लॉट उपलब्ध है?
                              <br />
                              <span className="text-white/60 text-2xs">
                                (Yes, I need to book an appointment. Do you have any slots available tomorrow?)
                              </span>
                            </p>
                          </div>
                          <Avatar className="h-6 w-6 border border-white/20">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}

                      {animationProgress >= 55 && (
                        <div className="flex justify-center">
                          <div className="bg-purple-500/20 rounded-full px-2 py-0.5 text-2xs text-purple-300 flex items-center gap-1">
                            <Brain size={12} />
                            AI processing response...
                          </div>
                        </div>
                      )}

                      {animationProgress >= 70 && (
                        <div className="flex items-start gap-2">
                          <Avatar className="h-6 w-6 border border-white/20">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-700/70 rounded-md rounded-tl-none p-2 text-white max-w-[80%]">
                            <p className="text-xs">
                              जी हां, कल हमारे पास सुबह 10 बजे और दोपहर 2 बजे के स्लॉट उपलब्ध हैं। आप किस समय आना पसंद करेंगे?
                              <br />
                              <span className="text-white/60 text-2xs">
                                (Yes, we have slots available tomorrow at 10 AM and 2 PM. Which time would you prefer?)
                              </span>
                            </p>
                          </div>
                        </div>
                      )}

                      {animationProgress >= 85 && (
                        <div className="flex items-start gap-2 justify-end">
                          <div className="bg-blue-600/70 rounded-md rounded-tr-none p-2 text-white max-w-[80%]">
                            <p className="text-xs">
                              दोपहर 2 बजे का स्लॉट अच्छा रहेगा। मेरा नाम राहुल शर्मा है।
                              <br />
                              <span className="text-white/60 text-2xs">
                                (The 2 PM slot would be good. My name is Rahul Sharma.)
                              </span>
                            </p>
                          </div>
                          <Avatar className="h-6 w-6 border border-white/20">
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}

                      {animationProgress >= 100 && (
                        <>
                          <div className="flex items-start gap-2">
                            <Avatar className="h-6 w-6 border border-white/20">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-700/70 rounded-md rounded-tl-none p-2 text-white max-w-[80%]">
                              <p className="text-xs">
                                बहुत अच्छा, राहुल जी। मैंने आपका अपॉइंटमेंट कल दोपहर 2 बजे के लिए बुक कर दिया है।
                                <br />
                                <span className="text-white/60 text-2xs">
                                  (Great, Mr. Rahul. I&apos;ve booked your appointment for tomorrow at 2 PM.)
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <div className="bg-green-500/20 rounded-full px-2 py-0.5 text-2xs text-green-300 flex items-center gap-1">
                              <CheckCircle size={12} />
                              Appointment successfully scheduled
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                  {[
  { icon: <Mic size={14} className="text-purple-400" />, label: "Speech Recognition", status: getCurrentConversationStep() === 3, desc: "Hindi + English" },
  { icon: <Brain size={14} className="text-blue-400" />, label: "AI Processing", status: getCurrentConversationStep() === 4, desc: "Context-aware" },
  { icon: <Speaker size={14} className="text-green-400" />, label: "Voice Synthesis", status: getCurrentConversationStep() === 6, desc: "Indian accent" },
].map((item, i) => (
  <div key={i} className="bg-gray-800/50 rounded-md p-2 border border-white/10">
    <div className="flex items-center gap-1 mb-1">
      {item.icon}
      <span className="text-xs font-medium text-white/90">{item.label}</span>
    </div>
    <div className="flex items-center gap-1">
      <div className={`w-1.5 h-1.5 rounded-full ${item.status ? "bg-green-500 animate-pulse" : "bg-gray-600"}`}></div>
      <span className="text-2xs text-white/60">{item.desc}</span>
    </div>
  </div>
))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white px-5 py-4 rounded-lg font-medium shadow-lg"
              >
                <Calendar size={16} className="mr-2" />
                Schedule Your Demo Call
              </Button>
              <p className="text-white/60 mt-2 text-xs">
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
              className="relative w-full max-w-md rounded-lg border border-gray-800/50 p-1"
            >
              <GlowingEffect spread={20} glow proximity={48} />
              <div className="relative flex flex-col overflow-hidden rounded-md bg-gray-900/70 p-4 backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowForm(false)
                    setShowSuccess(false)
                  }}
                  className="absolute right-3 top-3 h-7 w-7 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <X size={14} />
                </Button>

                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Demo Call Scheduled!</h3>
                    <p className="text-white/80 mb-4 text-sm">
                      You&apos;ll receive a call from our AI agent soon.
                    </p>
                    <div className="bg-white/10 rounded-md p-3 max-w-xs mx-auto">
                      <p className="text-white/70 text-xs">
                        Our AI assistant will call you to demonstrate our voice technology.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-1">Schedule a Demo Call</h3>
                    <p className="text-white/80 mb-4 text-sm">
                      Fill out the form to experience our AI voice assistant
                    </p>

                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="name" className="text-xs text-white/80 mb-1 block">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white h-9 text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="text-xs text-white/80 mb-1 block">
                            Company
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                            className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="text-xs text-white/80 mb-1 block">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white h-9 text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="text-xs text-white/80 mb-1 block">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleFormChange}
                          required
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white h-9 text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="text-xs text-white/80 mb-1 block">
                          How can we help? (Optional)
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white min-h-[60px] text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="language" className="text-xs text-white/80 mb-1 block">
                          Preferred Demo Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleFormChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 text-white rounded-md p-1.5 text-sm"
                        >
                          {["English", "Hindi", "Hinglish (Hindi + English)", "Spanish"].map(lang => (
                            <option key={lang} value={lang.toLowerCase().split(' ')[0]}>{lang}</option>
                          ))}
                        </select>
                      </div>

                      <div className="pt-1">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity py-4 text-sm"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg
                                className="animate-spin -ml-1 mr-2 h-3 w-3 text-white"
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
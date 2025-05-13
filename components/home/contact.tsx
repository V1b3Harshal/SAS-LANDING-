"use client"
import { useState, useRef } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Users,
  Headphones,
  Lightbulb,
  CheckCircle2,
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  Globe,
  Bot,
} from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
  inquiryType: string[]
  referralSource: string[]
}

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  inquiryType: [],
  referralSource: [],
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formRef1, formInView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleChip = (field: "inquiryType" | "referralSource", value: string) => {
    setFormData((prev) => {
      const currentValues = [...prev[field]]
      return {
        ...prev,
        [field]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setFormData(initialFormData)
      }, 4000)
    }, 1200)
  }

  return (
    <section className="relative py-18 px-3 sm:px-4 lg:px-6" id="contact">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-3 font-space"
          >
            Say Hello
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-space">
            Let&lsquo;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Connect</span>
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4"
            animate={{
              width: [0, 80],
              opacity: [0, 1],
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          />
          <p className="text-base text-white/80 font-manrope">
            Have questions about our voice AI? Drop us a message and we&apos;ll get back to you soon.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <motion.div
            ref={formRef1}
            initial={{ opacity: 0, y: 16 }}
            animate={formInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative rounded-xl border border-gray-800/50 p-1.5"
          >
            <GlowingEffect
              spread={24}
              glow={true}
              disabled={false}
              proximity={48}
              inactiveZone={0.01}
              variant="default"
            />
            <div
              ref={formRef}
              className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900/70 p-4 backdrop-blur-sm"
            >
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-space">Message Sent!</h3>
                  <p className="text-white/80 mb-5 max-w-md mx-auto font-manrope">
                    Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="bg-white/10 rounded-lg p-3 max-w-xs mx-auto">
                    <p className="text-white/70 text-xs">
                      A confirmation has been sent to <span className="text-white font-medium">{formData.email}</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-white/80 mb-1 block font-medium text-sm">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white text-sm"
                      placeholder="How should we call you?"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white/80 mb-1 block font-medium text-sm">
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white text-sm"
                      placeholder="Where can we reach you?"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 mb-1 block font-medium text-sm">What&apos;s this about?</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { value: "general", label: "Just Saying Hi", icon: <MessageSquare className="h-2.5 w-2.5" /> },
                        { value: "demo", label: "Get a Demo", icon: <Headphones className="h-2.5 w-2.5" /> },
                        { value: "partnership", label: "Partnership", icon: <Users className="h-2.5 w-2.5" /> },
                        { value: "support", label: "Support", icon: <Lightbulb className="h-2.5 w-2.5" /> },
                      ].map((chip) => (
                        <motion.button
                          key={chip.value}
                          type="button"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleChip("inquiryType", chip.value)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                            formData.inquiryType.includes(chip.value)
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "bg-gray-800/70 text-white/70 hover:text-white hover:bg-gray-700/70 border border-gray-700/50"
                          }`}
                        >
                          {chip.icon}
                          {chip.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-white/80 mb-1 block font-medium text-sm">How did you find us?</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { value: "search", label: "Search Engine" },
                        { value: "social", label: "Social Media" },
                        { value: "friend", label: "Friend" },
                        { value: "event", label: "Event" },
                        { value: "other", label: "Other" },
                      ].map((chip) => (
                        <motion.button
                          key={chip.value}
                          type="button"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleChip("referralSource", chip.value)}
                          className={`px-2 py-1 rounded-full text-xs transition-colors ${
                            formData.referralSource.includes(chip.value)
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              : "bg-gray-800/70 text-white/70 hover:text-white hover:bg-gray-700/70 border border-gray-700/50"
                          }`}
                        >
                          {chip.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="text-white/80 mb-1 block font-medium text-sm">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white text-sm min-h-[90px]"
                      placeholder="What would you like to tell us?"
                    />
                  </div>
                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity font-space py-4 rounded-xl"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-white"
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-1.5 h-3 w-3" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-xl border border-gray-800/50 p-1.5"
            >
              <GlowingEffect
                spread={24}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.01}
                variant="default"
              />
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900/70 p-4 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-3 font-space">Quick Connect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.a
                    href="mailto:hello@voiceai.com"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-2 bg-gray-800/30 p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5 text-sm">Email</h4>
                      <p className="text-white/70 text-xs">hello@voiceai.com</p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-2 bg-gray-800/30 p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-blue-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5 text-sm">Phone</h4>
                      <p className="text-white/70 text-xs">+1 (555) 123-4567</p>
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://maps.google.com "
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-2 bg-gray-800/30 p-3 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group md:col-span-2"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-green-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-0.5 text-sm">Visit</h4>
                      <p className="text-white/70 text-xs">123 AI Innovation Park, Bengaluru, India</p>
                    </div>
                  </motion.a>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-white/90 text-xs">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    We respond within 24 hours
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative rounded-xl border border-gray-800/50 p-1.5"
            >
              <GlowingEffect
                spread={24}
                glow={true}
                disabled={false}
                proximity={48}
                inactiveZone={0.01}
                variant="default"
              />
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900/70 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white font-space">Ready to get started?</h3>
                  <Bot className="h-4 w-4 text-purple-400" />
                </div>
                <p className="text-white/70 mb-4 font-manrope text-sm">
                  Experience the future of voice AI with a personalized demo tailored to your needs.
                </p>
                <motion.a
                  href="#demo"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex items-center justify-center"
                >
                  <span className="relative z-10 font-space text-sm">Schedule a Demo</span>
                  <motion.div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <ArrowRight
                    size={12}
                    className="inline-block ml-1.5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </motion.a>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-2">
                    <Globe className="h-3 w-3 text-blue-400" />
                    <span className="text-xs text-white/80">40+ languages</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 rounded-lg p-2">
                    <Bot className="h-3 w-3 text-purple-400" />
                    <span className="text-xs text-white/80">Custom voices</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
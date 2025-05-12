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
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter((item) => item !== value) }
      } else {
        return { ...prev, [field]: [...currentValues, value] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData(initialFormData)
      }, 5000)
    }, 1500)
  }

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8" id="contact">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-4 font-space"
          >
            Say Hello
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">
            Let&lsquo;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Connect</span>
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
            Have questions about our voice AI? Drop us a message and we&apos;ll get back to you soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            ref={formRef1}
            initial={{ opacity: 0, y: 20 }}
            animate={formInView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-xl border border-gray-800/50 p-1.5"
          >
            <GlowingEffect
              spread={30}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              variant="default"
            />
            <div
              ref={formRef}
              className="relative flex flex-col overflow-hidden rounded-lg bg-gray-900/70 p-6 backdrop-blur-sm"
            >
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-space">Message Sent!</h3>
                  <p className="text-white/80 mb-6 max-w-md mx-auto font-manrope">
                    Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="bg-white/10 rounded-lg p-4 max-w-xs mx-auto">
                    <p className="text-white/70 text-sm">
                      A confirmation has been sent to <span className="text-white font-medium">{formData.email}</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="text-white/80 mb-2 block font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                      placeholder="How should we call you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-white/80 mb-2 block font-medium">
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white"
                      placeholder="Where can we reach you?"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 mb-2 block font-medium">What&apos;s this about?</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: "general", label: "Just Saying Hi", icon: <MessageSquare className="h-3 w-3" /> },
                        { value: "demo", label: "Get a Demo", icon: <Headphones className="h-3 w-3" /> },
                        { value: "partnership", label: "Partnership", icon: <Users className="h-3 w-3" /> },
                        { value: "support", label: "Support", icon: <Lightbulb className="h-3 w-3" /> },
                      ].map((chip) => (
                        <motion.button
                          key={chip.value}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleChip("inquiryType", chip.value)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
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
                    <label className="text-white/80 mb-2 block font-medium">How did you find us?</label>
                    <div className="flex flex-wrap gap-2">
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
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleChip("referralSource", chip.value)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
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
                    <label htmlFor="message" className="text-white/80 mb-2 block font-medium">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white min-h-[120px]"
                      placeholder="What would you like to tell us?"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity font-space py-6 rounded-xl"
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative rounded-xl border border-gray-800/50 p-1.5"
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
                <h3 className="text-xl font-bold text-white mb-4 font-space">Quick Connect</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.a
                    href="mailto:hello@voiceai.com"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Email</h4>
                      <p className="text-white/70 text-sm">hello@voiceai.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-blue-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Phone</h4>
                      <p className="text-white/70 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, x: 0 }}
                    className="flex items-center gap-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group md:col-span-2"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-green-400 group-hover:from-purple-600/30 group-hover:to-blue-600/30 transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Visit</h4>
                      <p className="text-white/70 text-sm">123 AI Innovation Park, Bengaluru, India</p>
                    </div>
                  </motion.a>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 text-white/90 text-sm">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    We respond within 24 hours
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative rounded-xl border border-gray-800/50 p-1.5"
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-space">Ready to get started?</h3>
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>

                <p className="text-white/70 mb-6 font-manrope">
                  Experience the future of voice AI with a personalized demo tailored to your needs.
                </p>

                <motion.a
                  href="#demo"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex items-center justify-center"
                >
                  <span className="relative z-10 font-space">Schedule a Demo</span>
                  <motion.div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <ArrowRight
                    size={16}
                    className="inline-block ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </motion.a>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                    <Globe className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-white/80">40+ languages</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                    <Bot className="h-4 w-4 text-purple-400" />
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

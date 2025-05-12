"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Industries", href: "/#industries" },
        { name: "Pricing", href: "/#pricing" },
        { name: "Demo", href: "/#demo" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API", href: "/api" },
        { name: "Guides", href: "/guides" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Compliance", href: "/compliance" },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/20 pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-12">
          {/* Brand section */}
          <div className="md:col-span-2 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Sampark AI Logo"
                  width={40}
                  height={40}
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=40&width=40"
                  }}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-space">
                  Sampark<span className="text-purple-400">AI</span>
                </h2>
                <p className="text-xs text-gray-400">Conversational Voice Intelligence</p>
              </div>
            </Link>

            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Transforming customer interactions with AI-powered voice agents that understand, respond, and engage
              naturally.
            </p>

            <div className="mt-6 flex space-x-4">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-purple-600/20 hover:text-purple-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-purple-600/20 hover:text-purple-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors hover:bg-purple-600/20 hover:text-purple-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </div>

          {/* Links section */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-4 lg:col-span-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 font-space">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center text-sm text-gray-400 transition-colors hover:text-purple-400"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={12}
                          className="ml-1 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© {currentYear} Sampark AI. All rights reserved.</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-purple-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

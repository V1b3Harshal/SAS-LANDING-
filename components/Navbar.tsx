"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { motion, useScroll, useTransform } from "framer-motion"

interface NavItem {
  title: string
  href: string
  dropdown?: {
    title: string
    description: string
    href: string
    icon: React.ReactNode
  }[]
  variant?: string
}

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Scroll animation
  const { scrollY } = useScroll()
  const navbarBackground = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.85)"])
  const navbarHeight = useTransform(scrollY, [0, 100], ["4rem", "3.5rem"])
  const navbarPadding = useTransform(scrollY, [0, 100], ["1rem", "0.75rem"])
  const navbarBorderOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const navbarShadowOpacity = useTransform(scrollY, [0, 100], [0.1, 0.25])

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 800)
    return () => {
      setMounted(false)
      clearTimeout(timer)
    }
  }, [])

  const navItems: NavItem[] = [
    { title: "About", href: "#about" },
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "Contact", href: "#contact" },
  ]

  const authItems: NavItem[] = [{ title: "Get Started", href: "/", variant: "primary" }]

  const handleMouseEnter = (title: string) => {
    setOpenDropdown(title)
  }

  const handleMouseLeave = () => {
    setOpenDropdown(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (mobileMenuOpen) setExpandedItem(null)
  }

  const toggleExpanded = (title: string) => {
    setExpandedItem((current) => (current === title ? null : title))
  }

  const glassStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  }

  const navbarVariants = {
    hidden: { y: -75, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.075,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: -15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.375,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const logoVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.375,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <div className="relative z-50">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.375 }}
        className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl mx-auto h-16 z-40 rounded-xl"
      />
      <motion.header
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={navbarVariants}
        style={{
          background: navbarBackground,
          height: navbarHeight,
          paddingTop: navbarPadding,
          paddingBottom: navbarPadding,
          boxShadow: useTransform(navbarShadowOpacity, (opacity) => `0 8px 32px rgba(128, 90, 213, ${opacity})`),
          borderColor: useTransform(navbarBorderOpacity, (opacity) => `rgba(255, 255, 255, ${opacity * 0.1})`),
          borderWidth: "1px",
          borderStyle: "solid",
        }}
        className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl mx-auto z-50 rounded-xl backdrop-blur-xl transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
          {/* Logo on the left */}
          <motion.div variants={logoVariants} className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600/80 to-blue-600/80 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Sampark AI Logo"
                  width={36}
                  height={36}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiwyQTEwLDEwIDAgMCwxIDIyLDEyQTEwLDEwIDAgMCwxIDEyLDIyQTEwLDEwIDAgMCwxIDIsMTJBMTAsMTAgMCAwLDEgMTIsMk0xMiw0QTgsOCAwIDAsMCA0LDEyQTgsOCAwIDAsMCAxMiwyMEE4LDggMCAwLDAgMjAsMTJBOCw4IDAgMCwwIDEyLDRNNiwxM0gxOEg2WiIvPjwvc3ZnPg=="
                  }}
                />
              </div>
              <motion.span variants={itemVariants} className="ml-2.5 text-white font-bold text-lg hidden sm:block">
                Sampark AI
              </motion.span>
            </Link>
          </motion.div>

          {/* Centered navigation items */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  custom={index}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2.5 text-base rounded-lg flex items-center text-gray-200 hover:text-white transition-all duration-300 relative group font-semibold tracking-wide",
                      openDropdown === item.title && "text-white bg-white/5",
                    )}
                  >
                    {item.title}
                    {item.dropdown && (
                      <ChevronDown
                        className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${
                          openDropdown === item.title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                  </Link>
                  {item.dropdown && openDropdown === item.title && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[250px] rounded-xl overflow-hidden">
                      <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-[16px]"
                        style={{ WebkitBackdropFilter: "blur(16px)" }}
                      />
                      <div className="relative z-10 border border-white/10 shadow-2xl rounded-xl">
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="flex items-start gap-3 p-3.5 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              <div className="flex-shrink-0 mt-1 w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-white">
                                {dropdownItem.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-white">{dropdownItem.title}</div>
                                <div className="text-xs text-gray-300 mt-1">{dropdownItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Get Started button on the right */}
          <div className="flex items-center gap-4">
            {authItems.map((item, index) => (
              <motion.div key={item.title} variants={itemVariants} custom={index + navItems.length}>
                <Link
                  href={item.href}
                  className={cn(
                    "hidden md:block px-4 py-1 text-base rounded-md transition-all duration-300 font-bold",
                    item.variant === "text"
                      ? "text-gray-200 hover:text-white hover:bg-white/10"
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-0.5",
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            <motion.button
              variants={itemVariants}
              className="md:hidden p-2 focus:outline-none text-gray-300 hover:text-white transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        {mounted &&
          mobileMenuOpen &&
          createPortal(
            <div className="fixed inset-0 z-40 lg:hidden">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={toggleMobileMenu} />
              <motion.div
                initial={{ x: 225, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 225, opacity: 0 }}
                transition={{ duration: 0.225, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "absolute top-21 right-3",
                  "w-[225px] rounded-xl",
                  "shadow-xl shadow-purple-500/10",
                  "overflow-hidden",
                  "border border-white/10",
                )}
                style={glassStyle}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 space-y-1.5">
                  {navItems.map((item) => (
                    <div key={item.title} className="space-y-1.5">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => toggleExpanded(item.title)}
                            className={cn(
                              "flex w-full items-center justify-between",
                              "px-4 py-3 text-sm font-medium text-gray-100",
                              "rounded-lg hover:bg-white/10 transition-colors",
                            )}
                          >
                            <span>{item.title}</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform text-gray-300",
                                expandedItem === item.title ? "rotate-180" : "",
                              )}
                            />
                          </button>
                          {expandedItem === item.title && (
                            <div className="ml-2 pl-4 space-y-1.5 border-l-2 border-purple-500/30">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center px-4 py-2.5",
                                    "text-sm text-gray-300 hover:bg-white/10",
                                    "rounded-lg transition-colors",
                                  )}
                                  onClick={toggleMobileMenu}
                                >
                                  {subItem.icon && <span className="mr-2 text-gray-300">{subItem.icon}</span>}
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center px-4 py-3",
                            "text-sm font-medium text-gray-100",
                            "rounded-lg hover:bg-white/10 transition-colors",
                          )}
                          onClick={toggleMobileMenu}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                  <div className="mt-4 space-y-2 pt-3 border-t border-white/10">
                    {authItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center px-5 py-3",
                          "text-sm font-semibold",
                          "rounded-lg transition-all duration-225",
                          item.variant === "text"
                            ? "text-gray-100 hover:bg-white/10"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white",
                        )}
                        onClick={toggleMobileMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>,
            document.body,
          )}
      </motion.header>
    </div>
  )
}

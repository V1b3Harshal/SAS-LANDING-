"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ContentRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function ContentReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  className = "" 
}: ContentRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { y: 20, opacity: 0 }
      case "down": return { y: -20, opacity: 0 }
      case "left": return { x: 20, opacity: 0 }
      case "right": return { x: -20, opacity: 0 }
      default: return { y: 20, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case "up": 
      case "down": 
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      default: return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={getFinalPosition()}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

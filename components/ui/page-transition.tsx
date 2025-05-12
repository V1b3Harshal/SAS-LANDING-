"use client"

import { ReactNode, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingSpinner } from "./loading-spinner"

interface PageTransitionProps {
  children: ReactNode
  loadingTime?: number
  className?: string
}

export function PageTransition({ 
  children, 
  loadingTime = 1500, 
  className = "" 
}: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    return () => clearTimeout(timer)
  }, [loadingTime])

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          transition: { 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

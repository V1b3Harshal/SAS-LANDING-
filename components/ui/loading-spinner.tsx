"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
  color?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 16, 
  color = "purple-500", 
  text = "Loading ..." 
}: LoadingSpinnerProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        transition: { 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      className="flex flex-col items-center"
    >
      <motion.div 
        className={`w-${size} h-${size} border-4 border-${color}/30 border-t-${color} border-solid rounded-full`}
        animate={{ 
          rotate: 360,
          transition: { 
            duration: 1.2,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      {text && (
        <motion.h2 
          className="mt-6 text-white text-xl font-medium font-space"
          initial={{ y: 10, opacity: 0 }}
          animate={{ 
            y: 0,
            opacity: 1,
            transition: { 
              delay: 0.3,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
        >
          {text}
        </motion.h2>
      )}
    </motion.div>
  )
}

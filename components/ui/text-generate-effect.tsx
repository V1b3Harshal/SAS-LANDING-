"use client"
import { useEffect } from "react"
import type React from "react"

import { motion, stagger, useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"

interface TextGenerateEffectProps {
  words: string
  className?: string
  filter?: boolean
  duration?: number
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate()
  const wordsArray = words.split(" ")

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      },
    )
  },)

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="text-white opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  return (
    <div className={cn("font-medium", className)}>
      <div className="mt-4">
        <div className="text-white text-lg leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  )
}

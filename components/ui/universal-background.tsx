"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface UniversalBackgroundProps {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  className?: string
  interactive?: boolean
}

export const UniversalBackground: React.FC<UniversalBackgroundProps> = ({
  gradientBackgroundStart = "rgb(20, 20, 30)",
  gradientBackgroundEnd = "rgb(10, 10, 20)",
  firstColor = "60, 60, 110",
  secondColor = "80, 30, 100",
  thirdColor = "30, 80, 120",
  fourthColor = "100, 30, 60",
  fifthColor = "80, 80, 30",
  pointerColor = "100, 100, 180",
  size = "80%",
  blendingValue = "overlay",
  className,
  interactive = true,
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [curX, setCurX] = useState(0)
  const [curY, setCurY] = useState(0)
  const [tgX, setTgX] = useState(0)
  const [tgY, setTgY] = useState(0)
  const [isSafari, setIsSafari] = useState(false)

  // Set CSS variables
  useEffect(() => {
    const setCssVariables = () => {
      document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart)
      document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd)
      document.body.style.setProperty("--first-color", firstColor)
      document.body.style.setProperty("--second-color", secondColor)
      document.body.style.setProperty("--third-color", thirdColor)
      document.body.style.setProperty("--fourth-color", fourthColor)
      document.body.style.setProperty("--fifth-color", fifthColor)
      document.body.style.setProperty("--pointer-color", pointerColor)
      document.body.style.setProperty("--size", size)
      document.body.style.setProperty("--blending-value", blendingValue)
    }

    setCssVariables()
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ])

  // Detect Safari browser
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  // Handle mouse movement for interactive mode
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (interactiveRef.current) {
        const rect = interactiveRef.current.getBoundingClientRect()
        setTgX(e.clientX - rect.left)
        setTgY(e.clientY - rect.top)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [interactive])

  // Animation frame for smooth movement
  useEffect(() => {
    if (!interactive) return

    let animationFrameId: number
    const animate = () => {
      setCurX(prev => prev + (tgX - prev) / 20)
      setCurY(prev => prev + (tgY - prev) / 20)
      
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [tgX, tgY, curX, curY, interactive])

  const gradientCommonClasses = cn(
    "absolute [background:radial-gradient(circle_at_center,_var(--gradient-color)_0,_var(--gradient-transparent)_50%)_no-repeat]",
    "[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]",
    "[transform-origin:center_center]"
  )

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full z-[-1] bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        className,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <motion.div
          className={cn(gradientCommonClasses, "opacity-100")}
          style={{ '--gradient-color': `rgba(var(--first-color), 0.8)`, '--gradient-transparent': `rgba(var(--first-color), 0)` } as React.CSSProperties}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 30, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className={cn(gradientCommonClasses, "opacity-100")}
          style={{ '--gradient-color': `rgba(var(--second-color), 0.8)`, '--gradient-transparent': `rgba(var(--second-color), 0)`, transformOrigin: 'calc(50% - 400px)' } as React.CSSProperties}
          animate={{
            x: [0, -60, 60, 0],
            y: [0, -40, 40, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className={cn(gradientCommonClasses, "opacity-100")}
          style={{ '--gradient-color': `rgba(var(--third-color), 0.8)`, '--gradient-transparent': `rgba(var(--third-color), 0)`, transformOrigin: 'calc(50% + 400px)' } as React.CSSProperties}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -60, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className={cn(gradientCommonClasses, "opacity-70")}
          style={{ '--gradient-color': `rgba(var(--fourth-color), 0.8)`, '--gradient-transparent': `rgba(var(--fourth-color), 0)`, transformOrigin: 'calc(50% - 200px)' } as React.CSSProperties}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 50, -50, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />
        <motion.div
          className={cn(gradientCommonClasses, "opacity-100")}
          style={{ '--gradient-color': `rgba(var(--fifth-color), 0.8)`, '--gradient-transparent': `rgba(var(--fifth-color), 0)`, transformOrigin: 'calc(50% - 800px) calc(50% + 800px)' } as React.CSSProperties}
          animate={{
            x: [0, 60, -60, 0],
            y: [0, 40, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`,
            )}
          />
        )}
      </div>
    </div>
  )
}
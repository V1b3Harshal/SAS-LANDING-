"use client"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  borderWidth = 1,
  gradientClassName = "bg-gradient-to-r from-purple-500 to-blue-500",
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = (e) => {
    setIsHovered(true)
    if (onMouseEnter) onMouseEnter(e)
  }

  const handleMouseLeave = (e) => {
    setIsHovered(false)
    if (onMouseLeave) onMouseLeave(e)
  }

  return (
    <div
      className={cn("relative rounded-lg p-[1px] overflow-hidden group", containerClassName)}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn("absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100", gradientClassName)}
        animate={{
          background: isHovered
            ? [
                `radial-gradient(20px circle at ${position.x}px ${position.y}px, var(--purple-500) 0%, transparent 65%)`,
                `radial-gradient(70px circle at ${position.x}px ${position.y}px, var(--purple-500) 0%, transparent 65%)`,
              ]
            : `radial-gradient(0px circle at ${position.x}px ${position.y}px, var(--purple-500) 0%, transparent 65%)`,
        }}
        transition={{ duration }}
      />
      <Tag className={cn("relative z-10 rounded-lg", className)} {...props}>
        {children}
      </Tag>
    </div>
  )
}

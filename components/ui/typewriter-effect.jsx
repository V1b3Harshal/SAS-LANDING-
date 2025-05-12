"use client"
import { useEffect, useState, useRef } from "react"

import { motion } from "framer-motion"

export const TypewriterEffect = ({
  words,
  className = "",
  cursorClassName = "",
  typingSpeed = 150,
  deletingSpeed = 75,
  delayBetweenWords = 1500,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isBlinking, setIsBlinking] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const handleTyping = () => {
      if (isDeleting) {
        // Deleting text
        setCurrentText(currentWord.substring(0, currentText.length - 1))

        if (currentText === "") {
          setIsDeleting(false)
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        }
      } else {
        // Typing text
        setCurrentText(currentWord.substring(0, currentText.length + 1))

        if (currentText === currentWord) {
          // Delay before starting to delete
          setIsBlinking(true)
          timeoutRef.current = setTimeout(() => {
            setIsBlinking(false)
            setIsDeleting(true)
          }, delayBetweenWords)
          return
        }
      }
    }

    const typingInterval = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => {
      clearTimeout(typingInterval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className={`inline-block ${cursorClassName}`}
        animate={{ opacity: isBlinking ? [1, 0, 1] : 1 }}
        transition={{ duration: 0.8, repeat: isBlinking ? Number.POSITIVE_INFINITY : 0 }}
      >
        |
      </motion.span>
    </span>
  )
}

export const FlipWord = ({ words, duration = 2, className = "" }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <span className={`relative inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="absolute left-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : 50,
          }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  )
}

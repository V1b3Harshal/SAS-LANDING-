//utils\gsap-utils.tsx
"use client"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

type GSAPElement = gsap.DOMTarget | Element | HTMLElement | string | null | undefined

// Register GSAP plugins
export const registerGSAPPlugins = () => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
  }
}

// Custom hook to initialize GSAP
export const useGSAPInit = () => {
  useEffect(() => {
    registerGSAPPlugins()

    // Set default ease for all animations
    gsap.defaults({
      ease: "power3.out",
    })

    // Clean up ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}

// Staggered entrance animation for multiple elements
export const staggerElements = (
  elements: gsap.TweenTarget,
  options: {
    y?: number
    x?: number
    opacity?: number
    scale?: number
    stagger?: number
    duration?: number
    delay?: number
    ease?: string
  } = {},
) => {
  const {
    y = 20,
    x = 0,
    opacity = 0,
    scale = 1,
    stagger = 0.1,
    duration = 0.6,
    delay = 0,
    ease = "power3.out",
  } = options

  return gsap.from(elements, {
    y,
    x,
    opacity,
    scale,
    stagger,
    duration,
    delay,
    ease,
  })
}

// Create a scroll-triggered animation
export const createScrollTrigger = (
  trigger: GSAPElement,
  animation: gsap.core.Timeline | gsap.core.Tween,
  options: {
    start?: string
    end?: string
    scrub?: boolean | number
    toggleActions?: string
    pin?: boolean
    markers?: boolean
    id?: string
  } = {},
) => {
  const {
    start = "top 80%",
    end = "bottom 20%",
    scrub = false,
    toggleActions = "play none none reverse",
    pin = false,
    markers = false,
    id,
  } = options

  return ScrollTrigger.create({
    trigger: trigger as gsap.DOMTarget,
    start,
    end,
    scrub,
    toggleActions,
    pin,
    markers,
    id,
    animation,
  })
}

// Create a parallax effect
export const createParallax = (
  element: gsap.TweenTarget,
  options: {
    trigger?: GSAPElement
    speed?: number
    start?: string
    end?: string
  } = {},
) => {
  const { trigger = element, speed = 0.5, start = "top bottom", end = "bottom top" } = options

  return gsap.to(element, {
    y: `${speed * 100}%`,
    ease: "none",
    scrollTrigger: {
      trigger: (trigger || element) as gsap.DOMTarget,
      start,
      end,
      scrub: true,
    },
  })
}

// Create a reveal animation
export const createRevealAnimation = (
  element: gsap.TweenTarget,
  options: {
    trigger?: GSAPElement
    start?: string
    duration?: number
    delay?: number
    y?: number
    opacity?: number
    scale?: number
    ease?: string
  } = {},
) => {
  const {
    trigger = element,
    start = "top 80%",
    duration = 0.8,
    delay = 0,
    y = 30,
    opacity = 0,
    scale = 1,
    ease = "power3.out",
  } = options

  // Set initial state
  gsap.set(element, { y, opacity, scale })

  // Create the animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: (trigger || element) as gsap.DOMTarget,
      start,
      toggleActions: "play none none reverse",
    },
  })

  tl.to(element, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease,
  })

  return tl
}
//components\GsapProvider.tsx
"use client"
import { useEffect } from "react"
import type React from "react"

import { registerGSAPPlugins } from "@/utils/gsap-utils"

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins on the client side
    registerGSAPPlugins()

    return () => {
      // Clean up will be handled by individual components
    }
  }, [])

  return <>{children}</>
}

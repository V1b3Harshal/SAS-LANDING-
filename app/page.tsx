"use client"

import Navbar from "@/components/Navbar"
import Hero1 from "@/components/home/Hero1"
import Hero from "@/components/Hero"
import Industries from "@/components/home/industries"
import KeyFeatures from "@/components/home/key_features"
import VoiceDemo from "@/components/home/voicedemo"
import ContactSection from "@/components/home/contact"
import { UniversalBackground } from "@/components/ui/universal-background"
import { PageTransition } from "@/components/ui/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <div className="relative">
        <UniversalBackground
          gradientBackgroundStart="rgb(20, 20, 30)"
          gradientBackgroundEnd="rgb(10, 10, 20)"
          firstColor="60, 60, 110"
          secondColor="80, 30, 100"
          thirdColor="30, 80, 120"
          fourthColor="100, 30, 60"
          fifthColor="80, 80, 30"
          pointerColor="100, 100, 180"
          size="80%"
          blendingValue="overlay"
          interactive={true}
        />

        <Navbar />

        <div className="relative z-10">
          <Hero1 />
          <Hero />
          <KeyFeatures />
          <Industries />
          <VoiceDemo />
          <ContactSection />
        </div>
      </div>
    </PageTransition>
  )
}
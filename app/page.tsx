"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ParserCard } from "@/components/parser-card"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showParser, setShowParser] = useState(false)

  const scrollToParser = useCallback(() => {
    setShowParser(true)
    setTimeout(() => {
      document.getElementById("parser")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onGetStarted={scrollToParser} />
        
        <section id="parser" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ParserCard isVisible={showParser} />
          </div>
        </section>

        <HowItWorksSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}

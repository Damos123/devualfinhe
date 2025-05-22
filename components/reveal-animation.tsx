"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface RevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
}

export function Reveal({ children, direction = "up", delay = 0, className = "" }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Registrar o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Configurar as propriedades iniciais com base na direção
    const initialProps = {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    }

    // Configurar a animação
    gsap.fromTo(elementRef.current, initialProps, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [direction, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

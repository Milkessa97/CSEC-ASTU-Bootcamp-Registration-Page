"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Linkedin, Send, Youtube, Globe, ArrowUpRight } from "lucide-react"
import Logo from "@/public/logo_white.svg"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="colophon"
      className="relative py-28 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30 bg-background/50"
    >
      <div ref={containerRef} className="w-full space-y-16">
        {/* Logo Header */}
        

        {/* Main Club Pitch & Callout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pt-4">
          <div className="space-y-6 w-full">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              CSEC ASTU · CAPACITY BUILDING DIVISION
              
            </span>
              <div className="flex justify-between w-full">
              <h3 className="font-[var(--font-bebas)] max-w-2xl text-4xl md:text-6xl tracking-tight leading-none text-foreground">
                COMPUTE. CREATE. CONNECT.
              </h3>
            </div>
            <p className="font-mono text-xs max-w-2xl md:text-sm text-muted-foreground leading-relaxed">
              The Computer Science & Engineering Club at Adama Science & Technology University is dedicated to empowering the next generation of software engineers, competitive programmers, and tech innovators in Ethiopia.
            </p>
          </div>
        
          <div className="flex max-w-2xl justify-around space-x-12">
              <div className="pb-4 flex">
                <img src={Logo.src} alt="CSEC ASTU Logo" className="h-16 md:h-20 w-auto gaps-4  ml-auto mr-12 opacity-90 hover:opacity-100 transition-opacity" />
              </div>

          {/* Connect / Social Links */}
          <div className="flex flex-col ml-auto mr-6 items-center gap-4 pt-2">
            {[
              { label: "Telegram", href: "https://t.me/CSEC_ASTU", icon: Send },
              { label: "LinkedIn", href: "#", icon: Linkedin },
              { label: "YouTube", href: "#", icon: Youtube },
            ].map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 border border-border/40 hover:border-accent px-4 py-2 font-mono text-xs text-foreground/80 hover:text-accent bg-background/60 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5 text-accent group-hover:scale-110 transition-transform" />
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )
            })}
          </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          <p>© 2026 CSEC ASTU. All rights reserved.</p>
          <p className="flex items-center gap-2 text-foreground/60">
            <Globe className="w-3 h-3 text-accent" />
            <span>Adama Science & Technology University</span>
          </p>
        </div>
      </div>
    </footer>
  )
}


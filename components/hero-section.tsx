"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapAudioProvider } from "@/components/split-flap-text"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { bootcampConfig as staticConfig } from "@/lib/bootcamp-config"
import { useConfig } from "@/lib/config-context"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const bootcampConfig = useConfig()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-16 md:min-h-screen md:pt-0 md:pb-0 md:flex-row md:items-center pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <AnimatedNoise opacity={0.03} />

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="CSEC ASTU" speed={80} />
          </div>
        </SplitFlapAudioProvider>

        {/* Bootcamp title — top of the hierarchy, sized up on mobile so it reads as the headline */}
        <h2 className="font-[var(--font-bebas)] text-accent text-[clamp(1.4rem,6vw,2rem)] mt-7 md:mt-5 tracking-wide uppercase leading-tight">
          {bootcampConfig.title}
        </h2>

        {/* Premium Deadline Badge */}
        <div className="mt-6 inline-block">
          <div
            className="relative inline-flex items-center gap-3.5 px-5 py-2.5 bg-card/80 border border-accent/40 shadow-[0_0_25px_rgba(230,120,30,0.12)] backdrop-blur-md transition-all duration-300"
            style={{
              animation: "deadline-breath 3.5s ease-in-out infinite",
            }}
          >
            <div className="absolute -top-px left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent" />
            <style>{`
              @keyframes deadline-breath {
                0%, 100% { transform: scale(1); opacity: 0.92; }
                50%       { transform: scale(1.025); opacity: 1; }
              }
            `}</style>
            <p className="font-mono text-xs md:text-sm font-medium tracking-wide text-foreground">
              {bootcampConfig.hero.deadline}
            </p>
          </div>
        </div>

        {/* Tagline — byline, sits close to the title, quieter than everything below it */}
        <p className="mt-4 font-mono text-[9px] md:text-[10px] text-foreground/40 uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed">
          {bootcampConfig.hero.tagline}
        </p>

        {/* Description */}
        <div className="mt-5 md:mt-3 max-w-lg space-y-2.5">
          <p className="font-mono text-base md:text-sm text-foreground font-medium leading-relaxed">
            {bootcampConfig.hero.description}
          </p>
          <p className="font-mono text-xs md:text-sm text-foreground/60 leading-relaxed font-normal">
            {bootcampConfig.hero.subDescription}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-10 md:mt-8 flex flex-wrap items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center gap-2">
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                color: "oklch(0.7 0.2 45)",
                animation: "nudge-y 1.2s ease-in-out infinite",
              }}
            >
              <svg width="14" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 12,0 6,10" fill="currentColor" />
              </svg>
              <style>{`
                @keyframes nudge-y {
                  0%, 100% { transform: translateY(0); }
                  50%       { transform: translateY(6px); }
                }
              `}</style>
            </span>
            <a
              href="#apply"
              className="relative group inline-flex items-center gap-4 bg-accent text-black font-bold border-2 border-accent px-8 py-3.5 font-mono text-sm md:text-base uppercase tracking-widest shadow-[0_0_15px_rgba(230,120,30,0.20)] hover:shadow-[0_0_22px_rgba(230,120,30,0.30)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 overflow-hidden"
            >
              {/* Subtle ambient light pulse overlay */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ScrambleTextOnHover text="Apply Now" as="span" duration={0.6} />
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45 w-4 h-4" />
            </a>
          </div>
          <a
            href="#signals"
            className="font-mono text-xs uppercase tracking-widest text-foreground/50 hover:text-foreground border-b border-foreground/20 hover:border-foreground/60 pb-0.5 transition-all duration-200"
          >
            Meet Our Divisions ↓
          </a>
        </div>

        {/* Stat pills — all 6 key facts */}
        <div className="mt-12 md:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 md:flex md:flex-wrap md:gap-x-8 md:gap-y-4">
          {[
            { label: "Duration", value: bootcampConfig.hero.duration },
            { label: "Level",    value: bootcampConfig.hero.level },
            { label: "Language", value: bootcampConfig.hero.language },
            { label: "Target",   value: bootcampConfig.hero.target },
            { label: "Mode",     value: bootcampConfig.hero.mode },
            { label: "Cost",     value: bootcampConfig.hero.cost },
          ].map(({ label, value }) => (
            <div key={label} className="border-l-2 border-accent/50 pl-3">
              <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/40">{label}</p>
              <p className="font-mono text-xs text-foreground/85 font-medium mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Mobile-only inline version of the info tag — the floating corner one is unreliable on short viewports */}
        <div className="md:hidden mt-12 inline-block border border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
          CBD Initiative · Bootcamp 2026
        </div>
      </div>

      {/* Floating info tag — desktop only, where the fixed-height section makes bottom-right placement safe */}
      <div className="hidden md:block absolute bottom-8 right-8 md:bottom-12 md:right-12">
        <div className="border border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
          CBD Initiative · Bootcamp 2026
        </div>
      </div>
    </section>
  )
}
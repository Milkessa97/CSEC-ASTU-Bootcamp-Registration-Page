"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapText, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-text"
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

      {/* Left vertical label — needs the wide desktop gutter to not collide with content */}
      <div className="hidden md:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40 -rotate-90 origin-left block whitespace-nowrap">
          CSEC ASTU / 2026
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapText text="CSEC ASTU" speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        {/* Bootcamp title — top of the hierarchy, sized up on mobile so it reads as the headline */}
        <h2 className="font-[var(--font-bebas)] text-accent text-[clamp(1.4rem,6vw,2rem)] mt-7 md:mt-5 tracking-wide uppercase leading-tight">
          {bootcampConfig.title}
        </h2>

        {/* Tagline — byline, sits close to the title, quieter than everything below it */}
        <p className="mt-2 font-mono text-[9px] md:text-[10px] text-foreground/40 uppercase tracking-[0.15em] md:tracking-[0.2em] leading-relaxed">
          {bootcampConfig.hero.tagline}
        </p>

        {/* Description — new tier, so a bit more space above it than the byline got */}
        <div className="mt-5 md:mt-3 max-w-lg space-y-2.5">
          <p className="font-mono text-base md:text-sm text-foreground font-medium leading-relaxed">
            {bootcampConfig.hero.description}
          </p>
          <p className="font-mono text-[11px] md:text-xs text-foreground/55 leading-relaxed">
            {bootcampConfig.hero.subDescription}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 md:mt-6 flex flex-wrap items-end gap-5 md:gap-6">
          <div className="flex flex-col items-center gap-2">
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                color: "oklch(0.7 0.2 45)",
                animation: "nudge-y 1.2s ease-in-out infinite",
              }}
            >
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="0,0 12,0 6,10" fill="currentColor" />
              </svg>
              <style>{`
                @keyframes nudge-y {
                  0%, 100% { transform: translateY(0); }
                  50%       { transform: translateY(5px); }
                }
              `}</style>
            </span>
            <a
              href="#apply"
              className="group inline-flex items-center gap-3 bg-white text-black border border-white px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-transparent hover:text-accent hover:border-accent transition-all duration-200"
            >
              <ScrambleTextOnHover text="Apply Now" as="span" duration={0.6} />
              <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
            </a>
          </div>
          <a
            href="#signals"
            className="font-mono text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground border-b border-foreground/20 hover:border-foreground/60 pb-0.5 transition-all duration-200"
          >
            Meet Our Divisions ↓
          </a>
        </div>

        {/* Stat pills */}
        <div className="mt-12 md:mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:flex md:flex-wrap md:gap-y-4">
          {[
            { label: "Duration", value: bootcampConfig.hero.duration },
            { label: "Level",    value: bootcampConfig.hero.level },
            { label: "Language", value: bootcampConfig.hero.language },
            { label: "Target",   value: bootcampConfig.hero.target },
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
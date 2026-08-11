"use client"

import { useRef, useEffect } from "react"
import { Send, Linkedin, ExternalLink, Flame, Sparkles, Trophy, ArrowRight, ShieldCheck } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useConfig } from "@/lib/config-context"

gsap.registerPlugin(ScrollTrigger)

export function RegistrationClosed() {
  const bootcampConfig = useConfig()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="apply"
      className="relative py-20 sm:py-32 pl-4 sm:pl-6 md:pl-28 pr-4 sm:pr-6 md:pr-12 border-t border-border/30 overflow-hidden"
    >
      <div className="w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        {/* Main Promotion Card */}
        <div ref={cardRef} className="w-full lg:max-w-2xl relative order-2 lg:order-2 lg:ml-auto">
          {/* Top accent border line */}
          <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/60 to-transparent" />

          <div className="border border-accent/40 bg-card/85 backdrop-blur-md p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_0_60px_rgba(230,120,30,0.18)]">
            {/* Corner frame element */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-accent/60" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/60" />
            </div>

            <div className="relative z-10 space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-accent/50 bg-accent/15 backdrop-blur-sm">
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-accent/40" />
                  REGISTRATION CLOSED — CAPACITY REACHED
                </span>
              </div>

              {/* High-Impact Headline */}
              <div>
                <h3 className="font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-6xl tracking-wide text-foreground leading-none">
                  400+ APPLICANTS IN <span className="text-accent">UNDER 48 HOURS!</span>
                </h3>
                <p className="mt-3 font-mono text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                  Applications for the {bootcampConfig.title} are officially closed due to massive demand.
                </p>
              </div>

              {/* Club Promotion Banner */}
              <div className="border-l-2 border-accent pl-4 py-1 space-y-1">
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  UNLEASH THE DEVELOPER WITHIN
                </h4>
                <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                  CSEC ASTU is Adama Science &amp; Technology University&apos;s premier tech community. We empower students through real-world engineering, open-source projects, and hands-on bootcamps.
                </p>
              </div>

              {/* Primary Club Promotion Links */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h4 className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
                    CONNECT WITH CSEC ASTU
                  </h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Telegram Channel Button */}
                  <a
                    href="https://t.me/CSEC_ASTU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between p-5 bg-accent text-black font-bold border border-accent hover:bg-accent/90 transition-all duration-300 shadow-[0_0_25px_rgba(230,120,30,0.25)]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 border border-black/20 bg-black/10 flex items-center justify-center flex-shrink-0">
                        <Send className="w-5 h-5 text-black" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-black/80 font-bold">
                            Official Telegram Channel
                          </span>
                        </div>
                        <p className="font-mono text-base sm:text-lg font-bold text-black truncate">
                          @CSEC_ASTU
                        </p>
                        <p className="font-mono text-[10px] text-black/70 font-normal">
                          Selection announcements, bootcamp news &amp; community updates
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 border border-black/30 flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                  </a>

                  {/* LinkedIn Page Button */}
                  <a
                    href="https://www.linkedin.com/company/csec-astu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-between p-5 bg-background/90 border border-border/60 hover:border-accent hover:bg-card transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 border border-border/50 bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Linkedin className="w-5 h-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
                            LinkedIn Network
                          </span>
                        </div>
                        <p className="font-mono text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors truncate">
                          CSEC ASTU
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground font-normal">
                          Tech projects, student showcases &amp; career opportunities
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 border border-border/40 group-hover:border-accent flex items-center justify-center flex-shrink-0 group-hover:translate-x-1 transition-transform">
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Applicant Notice */}
              <div className="border border-border/50 bg-background/60 p-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
                <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                  <strong className="text-accent uppercase">Already Applied?</strong> Selection notifications and Google Meet links will be sent directly via Telegram!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header Column */}
        <div ref={headerRef} className="w-full lg:max-w-sm order-1 lg:order-1 lg:sticky lg:top-32 lg:mt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / COMMUNITY</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-none">JOIN CSEC ASTU</h2>
          <p className="mt-6 font-mono text-xs text-muted-foreground leading-relaxed">
            The Capacity Building Division of CSEC ASTU empowers student developers through world-class engineering initiatives.
          </p>

          {/* Stat Badges */}
          <div className="mt-8 pt-8 border-t border-border/30 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3.5 border border-border/30 bg-card/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">BOOTCAMP APPLICANTS</span>
              <span className="text-accent font-bold">400+</span>
            </div>
            <div className="flex items-center justify-between p-3.5 border border-border/30 bg-card/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">REGISTRATION TIME</span>
              <span className="text-foreground font-bold">&lt; 48 Hours</span>
            </div>
            <div className="flex items-center justify-between p-3.5 border border-border/30 bg-card/40">
              <span className="text-muted-foreground uppercase text-[10px] tracking-wider">OFFICIAL TELEGRAM</span>
              <span className="text-accent font-bold">@CSEC_ASTU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

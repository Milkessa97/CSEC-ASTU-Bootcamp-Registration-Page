"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { bootcampConfig as staticConfig } from "@/lib/bootcamp-config"
import { useConfig } from "@/lib/config-context"

gsap.registerPlugin(ScrollTrigger)

const weeks = [
  {
    title: "Programming Foundations & Python Basics",
    tag: "Week 01 · Foundations",
    description: "L1: Intro to programming, computers & Python setup. L2: Variables, data types & I/O. L3: Operators & calculator problem solving. Plus 2 dedicated mentor practice sessions.",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Decisions & Control Flow",
    tag: "Week 02 · Control Flow",
    description: "L1: Booleans, logic & if/elif/else conditions. L2: For & while loops. L3: Nested loops, break/continue & pattern printing exercises.",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Functions, Strings & Data Structures",
    tag: "Week 03 · Core Concepts",
    description: "L1: Functions, arguments, return values & scope. L2: String methods & debugging. L3: Lists, operations & tuples.",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Data Structures, Algorithms & Contest",
    tag: "Week 04 · Advanced & Contest",
    description: "L1: Sets & Dictionaries. L2: Problem-solving & Search/Sort algorithms. L3: Time complexity, contest prep & closing mini-contest with solutions.",
    span: "col-span-1 row-span-1",
  },
]

export function CurriculumSection() {
  const bootcampConfig = useConfig()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in from left
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="curriculum" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Curriculum</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">BOOTCAMP ROADMAP & LECTURES</h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          {bootcampConfig.projectsDescription || "A structured 4-week learning path taking high school students from syntax basics to algorithmic problem solving."}
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {weeks.map((item, index) => (
          <WorkCard key={index} item={item} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  item,
  index,
  persistHover = false,
}: {
  item: {
    title: string
    tag: string
    description: string
    span: string
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        item.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {item.tag}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {item.title}
        </h3>
      </div>

      {/* Description - reveals on hover */}
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[320px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {item.description}
        </p>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}

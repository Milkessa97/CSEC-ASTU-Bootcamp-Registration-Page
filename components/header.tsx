"use client"

import { ScrambleTextOnHover } from "@/components/scramble-text"
import Logo from './../public/logo_white.svg' // or '@/public/logo_white.svg'

// Animated arrow that bobs horizontally to draw attention to the Apply button
function BouncingArrow() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        animation: "nudge-x 1.2s ease-in-out infinite",
      }}
    >
      {/* Right-pointing triangle */}
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 10,6 0,12" fill="currentColor" />
      </svg>
      <style>{`
        @keyframes nudge-x {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(5px); }
        }
      `}</style>
    </span>
  )
}

export function Header() {
  const handleApplyClick = () => {
    const element = document.getElementById("apply")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 md:h-20 flex items-center justify-between pl-6 md:pl-28 pr-6 md:pr-12 bg-background/60 backdrop-blur-md border-b border-border/20">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        {/* Pass Logo.src instead of Logo directly */}
        <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Right: Apply CTA with attention arrow */}
      <div className="flex items-center gap-2">
        <BouncingArrow />
        <button
          onClick={handleApplyClick}
          className="group inline-flex items-center gap-3 bg-white text-black border border-white px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-accent/5 hover:text-accent hover:border-accent transition-all duration-200 cursor-pointer"
        >
          <ScrambleTextOnHover text="Closed" as="span" duration={0.6} />
        </button>
      </div>
    </header>
  )
}
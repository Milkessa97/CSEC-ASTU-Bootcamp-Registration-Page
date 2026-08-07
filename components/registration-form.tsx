"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, ArrowLeft, Terminal, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { bootcampConfig } from "@/lib/bootcamp-config"

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  region: string
  city: string
  school: string
  age: string
  gender: string
  grade: string
  hasPC: "yes" | "no" | ""
  hasInternet: "yes" | "no" | ""
  telegram: string
  email: string
  phone: string
  agreed: boolean
}

const initialData: FormData = {
  name: "",
  region: "",
  city: "",
  school: "",
  age: "",
  gender: "",
  grade: "",
  hasPC: "",
  hasInternet: "",
  telegram: "",
  email: "",
  phone: "",
  agreed: false,
}

// ----- Reusable Components -----

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  optional = false,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  optional?: boolean
}) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={cn(
          "peer block w-full bg-transparent border-b-2 border-foreground/30 pt-5 pb-2 px-0",
          "text-base text-foreground font-mono placeholder-transparent",
          "focus:border-accent focus:outline-none transition-colors duration-300",
          error && "border-accent/70"
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-0 top-5 font-mono text-sm text-foreground/70 pointer-events-none",
          "origin-[0_0] transition-all duration-300",
          "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-foreground/50",
          "peer-focus:-translate-y-5 peer-focus:text-[10px] peer-focus:tracking-widest peer-focus:uppercase peer-focus:text-accent",
          "-translate-y-5 text-[10px] tracking-widest uppercase"
        )}
      >
        {label}
        {!optional && <span className="text-accent ml-1">*</span>}
        {optional && <span className="text-foreground/40 ml-1">(optional)</span>}
      </label>
      {error && (
        <p className="mt-1.5 font-mono text-[11px] text-accent font-medium tracking-wider">{error}</p>
      )}
    </div>
  )
}

function RadioTile({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 cursor-pointer border px-4 py-3 font-mono text-sm uppercase tracking-widest transition-all duration-200",
        checked
          ? "border-accent text-accent bg-accent/10"
          : "border-foreground/25 text-foreground/80 hover:border-foreground/60 hover:text-foreground"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors duration-200",
          checked ? "border-accent bg-accent" : "border-foreground/40"
        )}
      >
        {checked && <span className="w-2 h-2 bg-black" />}
      </span>
      {label}
    </label>
  )
}

// ----- Main Component -----

export function RegistrationForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !formRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        x: -60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
      gsap.from(formRef.current, {
        y: 60, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => { const copy = { ...prev }; delete copy[field]; return copy })
    }
  }

  const validateStep1 = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!formData.name.trim()) e.name = "Full name is required"
    if (!formData.region.trim()) e.region = "Region is required"
    if (!formData.city.trim()) e.city = "City is required"
    if (!formData.school.trim()) e.school = "School name is required"
    const ageNum = parseInt(formData.age)
    if (!formData.age.trim()) e.age = "Age is required"
    else if (isNaN(ageNum) || ageNum < 10 || ageNum > 25) e.age = "Enter a valid age (10–25)"
    if (!formData.gender) e.gender = "Select a gender"
    if (!formData.grade) e.grade = "Select a grade level"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!formData.hasPC) e.hasPC = "Response required"
    if (!formData.hasInternet) e.hasInternet = "Response required"
    if (!formData.telegram.trim()) e.telegram = "Telegram username is required"
    else if (!formData.telegram.startsWith("@")) e.telegram = "Must start with @"
    if (!formData.phone.trim()) e.phone = "Phone number is required"
    else if (!/^\+?[0-9\s-]{9,15}$/.test(formData.phone)) e.phone = "Enter a valid phone number"
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email address"
    if (!formData.agreed) e.agreed = "You must accept the commitment statement"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => { if (validateStep1()) { setStep(2); setErrors({}) } }
  const handleBack = () => { setStep(1); setErrors({}) }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { handleNext(); return }
    if (validateStep2()) {
      setIsSubmitting(true)
      try {
        const res = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            bootcampId: "python-fundamentals-2026",
            timestamp: new Date().toISOString(),
            agreed: true,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Submission failed")
        }
        setIsSubmitted(true)
      } catch (err: any) {
        setErrors({ agreed: err.message || "Something went wrong. Please try again." })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section
      ref={sectionRef}
      id="apply"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Form Column */}
        <div ref={formRef} className="w-full lg:max-w-2xl relative order-2 lg:order-2 lg:ml-auto">
          {/* Outer editorial frame */}
          <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-accent via-accent/40 to-transparent" />
          <div className="border border-border/40 border-t-0 bg-card/60 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-accent/40" />
              <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/40" />
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="relative z-10">
                  {/* ── Progress Indicator ── */}
                  <div className="mb-10">
                    <div className="flex items-center gap-6 mb-4">
                      {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-7 h-7 flex items-center justify-center border font-mono text-xs font-bold transition-all duration-300",
                              step === s
                                ? "border-accent bg-accent text-black"
                                : step > s
                                ? "border-accent/60 bg-accent/10 text-accent"
                                : "border-foreground/30 text-foreground/40"
                            )}
                          >
                            {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                          </div>
                          <span
                            className={cn(
                              "font-mono text-xs uppercase tracking-widest",
                              step === s ? "text-foreground" : "text-foreground/40"
                            )}
                          >
                            {s === 1 ? "Personal & Academic" : "Access & Contact"}
                          </span>
                          {s < 2 && <div className="w-8 h-px bg-foreground/20 mx-1" />}
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-border/20 w-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-700 ease-out"
                        style={{ width: step === 1 ? "50%" : "100%" }}
                      />
                    </div>
                  </div>

                  {/* ── Step 1 ── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* Name + Age */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FloatingInput id="name" label="Full Name" value={formData.name} onChange={(v) => updateField("name", v)} error={errors.name} />
                        <FloatingInput id="age" label="Age" type="number" value={formData.age} onChange={(v) => updateField("age", v)} error={errors.age} />
                      </div>

                      {/* Region + City */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FloatingInput id="region" label="Region" value={formData.region} onChange={(v) => updateField("region", v)} error={errors.region} />
                        <FloatingInput id="city" label="City" value={formData.city} onChange={(v) => updateField("city", v)} error={errors.city} />
                      </div>

                      {/* School */}
                      <FloatingInput id="school" label="High School Name" value={formData.school} onChange={(v) => updateField("school", v)} error={errors.school} />

                      {/* Gender + Grade */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Gender */}
                        <div className="space-y-3">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                            Gender <span className="text-accent">*</span>
                          </span>
                          <div className="flex gap-3">
                            {["Male", "Female"].map((opt) => (
                              <RadioTile
                                key={opt}
                                name="gender"
                                value={opt}
                                label={opt}
                                checked={formData.gender === opt}
                                onChange={() => updateField("gender", opt)}
                              />
                            ))}
                          </div>
                          {errors.gender && <p className="font-mono text-[11px] text-accent font-medium tracking-wider">{errors.gender}</p>}
                        </div>

                        {/* Grade */}
                        <div className="space-y-3">
                          <label htmlFor="grade" className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                            Grade Level <span className="text-accent">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="grade"
                              value={formData.grade}
                              onChange={(e) => updateField("grade", e.target.value)}
                              className={cn(
                                "w-full py-2.5 px-0 bg-transparent border-b-2 border-foreground/30 font-mono text-base text-foreground",
                                "focus:border-accent focus:outline-none transition-colors duration-300 appearance-none cursor-pointer",
                                errors.grade && "border-accent/70"
                              )}
                            >
                              <option value="" className="bg-background text-muted-foreground">— Select Grade —</option>
                              {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((gr) => (
                                <option key={gr} value={gr} className="bg-background">{gr}</option>
                              ))}
                            </select>
                            <div className="absolute right-0 bottom-3 pointer-events-none text-muted-foreground/40">
                              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                          </div>
                          {errors.grade && <p className="font-mono text-[11px] text-accent font-medium tracking-wider">{errors.grade}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Step 2 ── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* PC + Internet */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-border/20">
                        <div className="space-y-3">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                            Access to a PC <span className="text-accent">*</span>
                          </span>
                          <div className="flex gap-3">
                            {["yes", "no"].map((opt) => (
                              <RadioTile key={opt} name="hasPC" value={opt} label={opt} checked={formData.hasPC === opt} onChange={() => updateField("hasPC", opt)} />
                            ))}
                          </div>
                          {errors.hasPC && <p className="font-mono text-[11px] text-accent font-medium tracking-wider">{errors.hasPC}</p>}
                        </div>
                        <div className="space-y-3">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                            Stable Internet <span className="text-accent">*</span>
                          </span>
                          <div className="flex gap-3">
                            {["yes", "no"].map((opt) => (
                              <RadioTile key={opt} name="hasInternet" value={opt} label={opt} checked={formData.hasInternet === opt} onChange={() => updateField("hasInternet", opt)} />
                            ))}
                          </div>
                          {errors.hasInternet && <p className="font-mono text-[11px] text-accent font-medium tracking-wider">{errors.hasInternet}</p>}
                        </div>
                      </div>

                      {/* Telegram + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FloatingInput id="telegram" label="Telegram (@username)" value={formData.telegram} onChange={(v) => updateField("telegram", v)} error={errors.telegram} />
                        <FloatingInput id="phone" label="Phone Number" value={formData.phone} onChange={(v) => updateField("phone", v)} error={errors.phone} />
                      </div>

                      {/* Email */}
                      <FloatingInput id="email" label="Email Address" type="email" value={formData.email} onChange={(v) => updateField("email", v)} error={errors.email} optional />

                      {/* Commitment Agreement */}
                      <div className="border border-border/40 relative">
                        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                        <div className="p-5 space-y-4">
                          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Commitment Agreement</span>
                          </div>
                          <p className="font-mono text-sm text-foreground/80 leading-relaxed">
                            By registering, I confirm that I am dedicated to actively participating in all coding lectures, completing assignments on time, and showing full commitment throughout the duration of this Python Fundamentals Bootcamp hosted by CSEC ASTU.
                          </p>
                          <label
                            className={cn(
                              "flex items-start gap-4 cursor-pointer group border border-border/30 p-3 transition-colors duration-200",
                              formData.agreed ? "border-accent/40 bg-accent/5" : "hover:border-foreground/20"
                            )}
                          >
                            <div
                              className={cn(
                                "mt-0.5 w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-all duration-200",
                                formData.agreed ? "border-accent bg-accent" : "border-muted-foreground/40 group-hover:border-foreground/60"
                              )}
                            >
                              {formData.agreed && <Check className="w-2.5 h-2.5 text-black" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={formData.agreed}
                              onChange={(e) => updateField("agreed", e.target.checked)}
                              className="sr-only"
                            />
                            <span className={cn("font-mono text-sm leading-snug transition-colors duration-200", formData.agreed ? "text-foreground" : "text-foreground/70 group-hover:text-foreground")}>
                              I confirm and agree to the commitment statement{" "}
                              <span className="text-accent">*</span>
                            </span>
                          </label>
                          {errors.agreed && <p className="font-mono text-[11px] text-accent font-medium tracking-wider">{errors.agreed}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── Navigation ── */}
                  <div className="flex justify-between items-center pt-8 mt-8 border-t border-border/20">
                    {step === 2 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border/40 hover:border-foreground/40 px-5 py-2.5 transition-all duration-200 cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                    ) : <div />}

                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="group flex items-center gap-2 bg-white text-black font-mono text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-transparent hover:text-accent hover:border-accent border border-white transition-all duration-200 cursor-pointer ml-auto"
                      >
                        Next Section
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex items-center gap-2 border border-accent bg-accent/10 text-accent font-mono text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-accent hover:text-black disabled:opacity-50 transition-all duration-200 cursor-pointer ml-auto"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        {isSubmitting ? "Submitting…" : "Submit Application"}
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-12 relative z-10 space-y-6"
                >
                  <div className="w-16 h-16 border border-accent/40 bg-accent/5 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight text-accent">
                    APPLICATION RECEIVED
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-foreground">{formData.name}</span>. Your application for the {bootcampConfig.title} has been logged.
                  </p>
                  <div className="bg-background/50 border border-border/40 p-5 max-w-sm mx-auto text-left font-mono text-[10px] text-muted-foreground space-y-2">
                    <div><span className="text-accent">&gt;</span> STATUS: pending_review</div>
                    <div><span className="text-accent">&gt;</span> REGION: {formData.region}, {formData.city}</div>
                    <div><span className="text-accent">&gt;</span> SCHOOL: {formData.school}</div>
                    <div><span className="text-accent">&gt;</span> TELEGRAM: {formData.telegram}</div>
                    <div><span className="text-accent">&gt;</span> PHONE: {formData.phone}</div>
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground/70 max-w-xs mx-auto">
                    We will contact you via Telegram or SMS with onboarding instructions soon.
                  </p>
                  <button
                    onClick={() => { setFormData(initialData); setStep(1); setIsSubmitted(false) }}
                    className="mt-4 border border-border/40 hover:border-foreground/40 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Header Column */}
        <div ref={headerRef} className="w-full lg:max-w-sm order-1 lg:order-1 lg:sticky lg:top-32 lg:mt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Register</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-none">BOOTCAMP APPLICATION</h2>
          <p className="mt-6 font-mono text-xs text-muted-foreground leading-relaxed">
            {bootcampConfig.formDescription}
          </p>
        </div>
      </div>
    </section>
  )
}

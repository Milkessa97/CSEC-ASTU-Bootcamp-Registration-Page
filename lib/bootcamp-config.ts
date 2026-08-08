import { BootcampDetails } from "./bootcamp-schema"

/**
 * ── BOOTCAMP CONFIGURATION ──
 * Edit this file to update all section copy and details site-wide.
 * This replaces hardcoded text across hero, divisions, projects, motto, and form sections.
 */
export const bootcampConfig: BootcampDetails = {
  bootcampId: "python-fundamentals-2026",
  title: "Python Fundamentals Bootcamp",

  hero: {
    tagline: "Computer Science & Engineering Club · Adama Science & Technology University",
    description: "Your first step into the world of programming — no experience needed.",
    subDescription:
      "CSEC ASTU's Capacity Building Division is running a hands-on Python bootcamp designed specifically for high school students. Learn to think like a developer, build real projects, and discover what you can create with code.",
    duration: "4 Weeks",
    level: "Beginner",
    language: "Python 3",
    target: "High School",
  },

  divisionsDescription: "CSEC ASTU DIVISIONS",

  projectsDescription:
    "Beginner-friendly Python applications designed for high schoolers discovering core programming structures.",

  motto: {
    tagline: "UNLEASH THE DEVELOPER WITHIN",
    description:
      "Take your first step into coding with CSEC ASTU. Discover the power of programming through Python, collaborate with peers, and begin building the next generation of software solutions.",
    subTagline: "BUILD WITH OUR COMMUNITY",
    subDescription:
      "Join a network of student engineers. Collaborate on real-world projects, share your learnings, and accelerate your coding journey with ASTU's active tech community backing you.",
  },

  formDescription:
    "Fill in your details below to apply for the CSEC ASTU Python Fundamentals Bootcamp. All fields are required unless marked optional.",
}

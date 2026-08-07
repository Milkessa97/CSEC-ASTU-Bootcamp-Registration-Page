import { z } from "zod"

/**
 * ── FORM SUBMISSION SCHEMA ──
 * Maps directly to form submission fields logged to Google Sheets.
 */
export const BootcampSubmissionSchema = z.object({
  timestamp: z.string().datetime().default(() => new Date().toISOString()),
  bootcampId: z.string().default("python-fundamentals-2026"),
  name: z.string().min(2, "Full name is required"),
  age: z.coerce.number().int().min(10).max(25),
  region: z.string().min(1, "Region is required"),
  city: z.string().min(1, "City is required"),
  school: z.string().min(1, "School name is required"),
  gender: z.enum(["Male", "Female"]),
  grade: z.enum(["Grade 9", "Grade 10", "Grade 11", "Grade 12"]),
  hasPC: z.enum(["yes", "no"]),
  hasInternet: z.enum(["yes", "no"]),
  telegram: z.string().min(1, "Telegram username is required").regex(/^@/, "Must start with @"),
  phone: z.string().min(9, "Phone number is required").regex(/^\+?[0-9\s-]{9,15}$/, "Invalid format"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  agreed: z.literal(true, {
    errorMap: () => ({ message: "You must accept the commitment agreement" }),
  }),
})

export type BootcampSubmission = z.infer<typeof BootcampSubmissionSchema>


/**
 * ── BOOTCAMP DETAILS / VARIABLES SCHEMA ──
 * Minimal schema for configuring section titles, descriptions, and metadata.
 * Easy to populate from a single row of a Google Sheet or config file.
 */
export const BootcampDetailsSchema = z.object({
  bootcampId: z.string().default("python-2026"),
  title: z.string().default("Python Fundamentals Bootcamp"),
  
  // Hero section customizable variables
  hero: z.object({
    tagline: z.string().default("Computer Science & Engineering Club · Adama Science & Technology University"),
    description: z.string().default("Your first step into the world of programming — no experience needed."),
    subDescription: z.string().default("CSEC ASTU's Capacity Building Division is running a hands-on Python bootcamp designed specifically for high school students. Learn to think like a developer, build real projects, and discover what you can create with code."),
    duration: z.string().default("4 Weeks"),
    level: z.string().default("Beginner"),
    language: z.string().default("Python 3"),
    target: z.string().default("High School"),
  }),

  // Section descriptions
  divisionsDescription: z.string().default("ASTU CSEC DIVISIONS"),
  projectsDescription: z.string().default("Beginner-friendly Python applications designed for high schoolers discovering core programming structures."),
  
  // Motto section text
  motto: z.object({
    tagline: z.string().default("UNLEASH THE DEVELOPER WITHIN"),
    description: z.string().default("Take your first step into coding with CSEC ASTU. Discover the powers of programming through Python, collaborate with peers, and begin building the next generation of software solutions."),
    subTagline: z.string().default("BUILD WITH OUR COMMUNITY"),
    subDescription: z.string().default("Join a network of student engineers. Collaborate on real-world projects, share your learnings, and accelerate your coding journey with ASTU's active tech community backing you."),
  }),

  // Application form header description
  formDescription: z.string().default("Fill in your details below to apply for the CSEC ASTU Python Fundamentals Bootcamp. All fields are required unless marked optional."),
})

export type BootcampDetails = z.infer<typeof BootcampDetailsSchema>

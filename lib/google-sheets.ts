import { google } from "googleapis"
import { BootcampSubmission, BootcampDetails, BootcampDetailsSchema } from "./bootcamp-schema"
import { bootcampConfig as staticConfig } from "./bootcamp-config"

// Configure Google Auth Client
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})


const sheets = google.sheets({ version: "v4", auth })

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID

/**
 * Appends a new submission row to the Google Sheet.
 * Expects the Sheet to have headers in the first row matching the submission keys.
 */
export async function appendSubmissionToSheet(submission: BootcampSubmission) {
  if (!SPREADSHEET_ID) {
    throw new Error("GOOGLE_SPREADSHEET_ID environment variable is missing")
  }

  // Format row matching standard sheet headers
  const rowValues = [
    submission.timestamp,
    submission.bootcampId,
    submission.name,
    submission.age,
    submission.gender,
    submission.grade,
    submission.school,
    submission.region,
    submission.city,
    submission.hasPC,
    submission.hasInternet,
    submission.telegram,
    submission.phone,
    submission.guardianPhone,
    submission.email || "N/A",
    submission.inspiration,
  ]

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:P", // Appends to columns A to P
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    })
    return response.data
  } catch (error) {
    console.error("Error appending to Google Sheet:", error)
    throw new Error("Failed to write submission data to spreadsheet")
  }
}

/**
 * Reads bootcamp configuration from a "Config" sheet tab.
 *
 * Expected tab layout (keys in row 1, values in row 2):
 *   bootcampId | title | hero.tagline | hero.description | ...
 *   python-2026 | Python Fundamentals Bootcamp | Hello! | ...
 *
 * Falls back to schema defaults if the tab is missing or a key is absent.
 */
export async function readBootcampConfig(): Promise<BootcampDetails> {
  if (!SPREADSHEET_ID) {
    console.warn("GOOGLE_SPREADSHEET_ID missing — using default config")
    return BootcampDetailsSchema.parse({})
  }

  try {
    // Read the first two rows: row 1 = header keys, row 2 = values
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Config!A1:Z2",
    })

    const rows = response.data.values ?? []
    if (rows.length < 2) {
      console.warn("Config sheet has fewer than 2 rows — using defaults")
      return staticConfig
    }

    const keys = rows[0]   // e.g. ["bootcampId", "title", "hero.tagline", ...]
    const vals = rows[1]   // e.g. ["python-2026", "Python Fundamentals Bootcamp", ...]

    // Build a flat key→value map by zipping headers with values
    const raw: Record<string, string> = {}
    for (let i = 0; i < keys.length; i++) {
      const key = String(keys[i] ?? "").trim()
      const val = String(vals[i] ?? "").trim()
      if (key) raw[key] = val
    }

    // Map flat keys into the nested BootcampDetails shape
    const parsed = BootcampDetailsSchema.parse({
      bootcampId:           raw["bootcampId"]           || undefined,
      title:                raw["title"]                || undefined,
      hero: {
        tagline:            raw["hero.tagline"]         || undefined,
        description:        raw["hero.description"]     || undefined,
        subDescription:     raw["hero.subDescription"]  || undefined,
        deadline:           raw["hero.deadline"]        || undefined,
        duration:           raw["hero.duration"]        || undefined,
        level:              raw["hero.level"]           || undefined,
        language:           raw["hero.language"]        || undefined,
        target:             raw["hero.target"]          || undefined,
        mode:               raw["hero.mode"]            || undefined,
        cost:               raw["hero.cost"]            || undefined,
      },
      divisionsDescription: raw["divisionsDescription"] || undefined,
      projectsDescription:  raw["projectsDescription"]  || undefined,
      motto: {
        tagline:            raw["motto.tagline"]        || undefined,
        description:        raw["motto.description"]    || undefined,
        subTagline:         raw["motto.subTagline"]     || undefined,
        subDescription:     raw["motto.subDescription"] || undefined,
      },
      formDescription:      raw["formDescription"]      || undefined,
    })

    return parsed
  } catch (error) {
    console.error("Error reading Config sheet — falling back to defaults:", error)
    return staticConfig
  }
}

import { google } from "googleapis"
import { BootcampSubmission } from "./bootcamp-schema"

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
    submission.email || "N/A",
  ]

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "A:N", // Appends to the first (default) tab, columns A to N
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

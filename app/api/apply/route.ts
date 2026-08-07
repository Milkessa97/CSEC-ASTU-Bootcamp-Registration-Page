import { NextResponse } from "next/server"
import { BootcampSubmissionSchema } from "@/lib/bootcamp-schema"
import { appendSubmissionToSheet } from "@/lib/google-sheets"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body against our schema
    const parseResult = BootcampSubmissionSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // Append to Google Sheet
    await appendSubmissionToSheet(parseResult.data)

    return NextResponse.json({ success: true, message: "Application submitted successfully" })
  } catch (error: any) {
    console.error("API application submission error:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import { readBootcampConfig } from "@/lib/google-sheets"

// Cache the config for 5 minutes so every page load doesn't hit the Sheets API
let cachedConfig: Awaited<ReturnType<typeof readBootcampConfig>> | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

export async function GET() {
  const now = Date.now()

  if (cachedConfig && now - cacheTimestamp < CACHE_TTL_MS) {
    return NextResponse.json(cachedConfig)
  }

  try {
    cachedConfig = await readBootcampConfig()
    cacheTimestamp = now
    return NextResponse.json(cachedConfig)
  } catch (error: any) {
    console.error("Config fetch error:", error)
    return NextResponse.json(
      { error: "Failed to load config" },
      { status: 500 }
    )
  }
}

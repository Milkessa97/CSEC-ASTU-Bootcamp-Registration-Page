"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { BootcampDetails } from "@/lib/bootcamp-schema"
import { bootcampConfig as staticConfig } from "@/lib/bootcamp-config"

const ConfigContext = createContext<BootcampDetails>(staticConfig)

/**
 * ConfigProvider fetches the live bootcamp config from /api/config on mount
 * and keeps it fresh by polling every 60 seconds.
 * Shows the static fallback config immediately while the fetch is in flight.
 */
export function ConfigProvider({
  initialConfig,
  children,
}: {
  initialConfig: BootcampDetails
  children: React.ReactNode
}) {
  const [config, setConfig] = useState<BootcampDetails>(initialConfig)

  useEffect(() => {
    let cancelled = false

    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config", { cache: "no-store" })
        if (!res.ok) return
        const data: BootcampDetails = await res.json()
        if (!cancelled) setConfig(data)
      } catch {
        // silently keep the initialConfig if fetch fails
      }
    }

    // Fetch immediately on mount, then every 60 seconds
    fetchConfig()
    const interval = setInterval(fetchConfig, 60_000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

/**
 * useConfig — consume the live bootcamp config in any client component.
 */
export function useConfig(): BootcampDetails {
  return useContext(ConfigContext)
}

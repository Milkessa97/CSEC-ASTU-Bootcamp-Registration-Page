import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DivisionsSection } from "@/components/divisions-section"
import { CurriculumSection } from "@/components/curriculum-section"
import { MottoSection } from "@/components/motto-section"
import { RegistrationClosed } from "@/components/registration-closed"
import { Footer } from "@/components/footer"
import { SideNav } from "@/components/side-nav"
import { ConfigProvider } from "@/lib/config-context"
import { readBootcampConfig } from "@/lib/google-sheets"
import { bootcampConfig as staticConfig } from "@/lib/bootcamp-config"

export default async function Page() {
  // Server-side: load config for the initial render (SSR).
  // The ConfigProvider will then re-fetch and keep it live on the client.
  let initialConfig = staticConfig
  try {
    initialConfig = await readBootcampConfig()
  } catch (err) {
    console.warn("SSR config load failed — using static fallback:", err)
  }

  return (
    <ConfigProvider initialConfig={initialConfig}>
      <main className="relative min-h-screen">
        <Header />
        <SideNav />
        <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

        <div className="relative z-10 pt-16 md:pt-20">
          <HeroSection />
          <DivisionsSection />
          <CurriculumSection />
          <MottoSection />
          <RegistrationClosed />
          <Footer />
        </div>
      </main>
    </ConfigProvider>
  )
}

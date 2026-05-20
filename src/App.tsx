import { useEffect, useRef } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { I18nProvider } from './features/i18n/I18nProvider'
import { Layout } from './components/Layout'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { LocalStorageLogger } from './features/logging/LocalStorageLogger'

function AppContent() {
  const loggerRef = useRef(new LocalStorageLogger())

  useEffect(() => {
    loggerRef.current.logPageView('home')
  }, [])

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App

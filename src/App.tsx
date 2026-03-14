import { useEffect, useMemo } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomTabBar } from './components/BottomTabBar'
import { EarnPage } from './pages/EarnPage'
import { InvitePage } from './pages/InvitePage'
import { LeaderPage } from './pages/LeaderPage'
import { SettingsPage } from './pages/SettingsPage'
import { UserHeader } from './components/UserHeader'
import { HomePage } from './pages/HomePage'
import { PredictPage } from './pages/PredictPage'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isSettingsPage = location.pathname === '/settings'

  if (isSettingsPage) {
    return (
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <main className="page">
      <section className="phone-shell">
        <UserHeader />
        <section className="route-view">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictPage />} />
            <Route path="/leader" element={<LeaderPage />} />
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/invite" element={<InvitePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </section>
        <BottomTabBar />
      </section>
    </main>
  )
}

function App() {
  const tg = useMemo(() => window.Telegram?.WebApp, [])

  useEffect(() => {
    if (!tg) return
    tg.ready()
    tg.expand()
  }, [tg])

  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App

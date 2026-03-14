import { useEffect, useMemo } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomTabBar } from './components/bottom-tabbar'
import { UserHeader } from './components/user-header'
import { EarnPage } from './page/earn'
import { HomePage } from './page/home'
import { InvitePage } from './page/invite'
import { LeaderPage } from './page/leader'
import { PredictPage } from './page/predict'
import { SettingsPage } from './page/settings'
import styles from './App.module.scss'

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
    <main className={styles.page}>
      <section className={styles.phoneShell}>
        <UserHeader />
        <section className={styles.routeView}>
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

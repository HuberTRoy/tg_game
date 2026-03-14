import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

function formatUserLabel(user?: {
  id?: number
  first_name?: string
  last_name?: string
  username?: string
}) {
  if (!user) return 'User-123-456'
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ').trim()
  if (fullName) return fullName
  if (user.username) return `@${user.username}`
  if (user.id) return `User-${user.id}`
  return 'User-123-456'
}

export function SettingsPage() {
  const navigate = useNavigate()
  const language = 'English'
  const [soundEnabled, setSoundEnabled] = useState(true)
  const userLabel = useMemo(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user
    return formatUserLabel(user)
  }, [])

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/')
  }

  return (
    <main className={styles.settingsScreen}>
      <header className={styles.settingsTop}>
        <div className={styles.userChip}>
          <img className={styles.avatarImg} src="/user.png" alt="user" />
          <span>{userLabel}</span>
        </div>
        <button type="button" className={styles.settingsClose} onClick={goBack} aria-label="Close settings">
          ×
        </button>
      </header>

      <h1>Settings</h1>

      <section className={styles.settingsList}>
        <button type="button" className={styles.settingsRow}>
          <span className={styles.left}>
            <i>◉</i>
            Language
          </span>
          <span className={styles.right}>
            {language}
            <b>⌄</b>
          </span>
        </button>

        <button type="button" className={styles.settingsRow} onClick={() => setSoundEnabled((prev) => !prev)}>
          <span className={styles.left}>
            <i>♫</i>
            Sound Effects
          </span>
          <span className={styles.right}>
            <b>{soundEnabled ? '☑' : '☐'}</b>
          </span>
        </button>

        <button type="button" className={styles.settingsRow}>
          <span className={styles.left}>
            <i>?</i>
            How to earn PDX
          </span>
        </button>

        <button type="button" className={styles.settingsRow}>
          <span className={styles.left}>
            <i>▭</i>
            Terms and Conditions
          </span>
        </button>

        <button type="button" className={styles.settingsRow}>
          <span className={styles.left}>
            <i>▭</i>
            Privacy Agreement
          </span>
        </button>
      </section>
    </main>
  )
}

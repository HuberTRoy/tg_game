import { useMemo } from 'react'
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

export function UserHeader() {
  const navigate = useNavigate()
  const userLabel = useMemo(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user
    return formatUserLabel(user)
  }, [])

  return (
    <header className={styles.topBar}>
      <div className={styles.userChip}>
        <img className={styles.avatarImg} src="/user.png" alt="user" />
        <span>{userLabel}</span>
      </div>
      <button className={styles.iconBtn} type="button" aria-label="Settings" onClick={() => navigate('/settings')}>
        <img className={styles.settingsImg} src="/Settings.png" alt="settings" />
      </button>
    </header>
  )
}

import { useState } from 'react'
import styles from './index.module.scss'

const inviteLink = 'https://t.me/123123/?referral=ABCDEFG'

const topReferrals = [
  { rank: '#1', user: 'User-013-436', bonus: '11.2M' },
  { rank: '#2', user: 'User-013-436', bonus: '10M' },
  { rank: '#3', user: 'User-013-436', bonus: '8M' },
  { rank: '#4', user: 'User-013-436', bonus: '5.6M' },
  { rank: '#5', user: 'User-013-436', bonus: '3.1M' },
]

export function InvitePage() {
  const [copyText, setCopyText] = useState('Copy')

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopyText('Copied')
      window.setTimeout(() => setCopyText('Copy'), 1000)
    } catch {
      setCopyText('Failed')
      window.setTimeout(() => setCopyText('Copy'), 1000)
    }
  }

  return (
    <section className={styles.invitePage}>
      <section className={styles.inviteHero}>
        <h1>
          Invite Friends and Play
          <br />
          Together
        </h1>
        <div className={styles.inviteRocket}>🚀</div>
        <p>You get 5% of their earnings - They get bonus to start</p>
      </section>

      <section className={styles.inviteSummary}>
        <article className={styles.glowCard}>
          <p>Your Referrals</p>
          <strong>123</strong>
        </article>
        <article className={styles.glowCard}>
          <p>
            Bonuses <img src="/coin.png" alt="coin" />
          </p>
          <strong>6.3M</strong>
        </article>
      </section>

      <section className={styles.inviteLinkRow}>
        <input value={inviteLink} readOnly aria-label="Invite link" />
        <button type="button" onClick={copyInviteLink}>
          {copyText}
        </button>
      </section>

      <section className={styles.inviteShareRow}>
        <button type="button" className={styles.shareMain}>
          Share via Telegram <span>TG</span>
        </button>
        <button type="button" className={styles.shareIcon}>
          X
        </button>
        <button type="button" className={styles.shareIcon}>
          DS
        </button>
      </section>

      <section className={styles.inviteTable}>
        <header>
          <h3>Your Top Referrals</h3>
          <h3>Bonuses</h3>
        </header>
        {topReferrals.map((item) => (
          <div className={styles.inviteRow} key={item.rank}>
            <span>{item.rank}</span>
            <span>{item.user}</span>
            <span>{item.bonus}</span>
          </div>
        ))}
      </section>

      <section className={styles.inviteHow}>
        <h4>How it works</h4>
        <p>Invite friends and earn 5% automatically</p>
      </section>
    </section>
  )
}

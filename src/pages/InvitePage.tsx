import { useState } from 'react'

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
    <section className="invite-page">
      <section className="invite-hero">
        <h1>
          Invite Friends and Play
          <br />
          Together
        </h1>
        <div className="invite-rocket">🚀</div>
        <p>You get 5% of their earnings - They get bonus to start</p>
      </section>

      <section className="invite-summary">
        <article className="glow-card">
          <p>Your Referrals</p>
          <strong>123</strong>
        </article>
        <article className="glow-card">
          <p>
            Bonuses <img src="/coin.png" alt="coin" />
          </p>
          <strong>6.3M</strong>
        </article>
      </section>

      <section className="invite-link-row">
        <input value={inviteLink} readOnly aria-label="Invite link" />
        <button type="button" onClick={copyInviteLink}>
          {copyText}
        </button>
      </section>

      <section className="invite-share-row">
        <button type="button" className="share-main">
          Share via Telegram <span>TG</span>
        </button>
        <button type="button" className="share-icon">
          X
        </button>
        <button type="button" className="share-icon">
          DS
        </button>
      </section>

      <section className="invite-table">
        <header>
          <h3>Your Top Referrals</h3>
          <h3>Bonuses</h3>
        </header>
        {topReferrals.map((item) => (
          <div className="invite-row" key={item.rank}>
            <span>{item.rank}</span>
            <span>{item.user}</span>
            <span>{item.bonus}</span>
          </div>
        ))}
      </section>

      <section className="invite-how">
        <h4>How it works</h4>
        <p>Invite friends and earn 5% automatically</p>
      </section>
    </section>
  )
}

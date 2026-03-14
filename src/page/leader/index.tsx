import styles from './index.module.scss'

const topPlayers = [
  { rank: '🏆', name: 'User-123-456', points: '999,999,999,999', highlight: true },
  { rank: '🏆', name: 'User-133-456', points: '999,999,999,90' },
  { rank: '🥈', name: 'User-123-196', points: '999,876,988,00' },
  { rank: '🥉', name: 'User-003-196', points: '99,876,988,00' },
  { rank: '#5', name: 'User-003-196', points: '9,876,988,00' },
]

const topReferrers = [
  { rank: '#1', name: 'User-003-196', points: '9,876,988,00' },
  { rank: '#2', name: 'User-003-196', points: '9,876,988,00' },
  { rank: '#3', name: 'User-003-196', points: '9,876,988,00' },
]

export function LeaderPage() {
  return (
    <section className={styles.leaderPage}>
      <h1>PreDex Leaderboard</h1>

      <section className={styles.leaderSummary}>
        <article className={styles.glowCard}>
          <p>Your Rank</p>
          <strong>123</strong>
        </article>
        <article className={styles.glowCard}>
          <p>
            PDX Points <img src="/coin.png" alt="coin" />
          </p>
          <strong>671B</strong>
        </article>
      </section>

      <section className={styles.leaderTable}>
        <header>
          <span>Rank</span>
          <span>Top Player</span>
          <span>
            <img src="/coin.png" alt="coin" />
            PDX Points
          </span>
        </header>

        {topPlayers.map((item, index) => (
          <div className={`${styles.row} ${item.highlight ? styles.highlight : ''}`} key={`${item.name}-${index}`}>
            <span>{item.rank}</span>
            <span>{item.name}</span>
            <span>{item.points}</span>
          </div>
        ))}

        <div className={`${styles.row} ${styles.dots}`}>
          <span>...</span>
          <span>...</span>
          <span>.....</span>
        </div>

        <div className={`${styles.row} ${styles.me}`}>
          <span>#123</span>
          <span>You</span>
          <span>816,558,00</span>
        </div>
      </section>

      <section className={`${styles.leaderTable} ${styles.referrer}`}>
        <header>
          <span>Rank</span>
          <span>Top Referrer</span>
          <span>
            <img src="/coin.png" alt="coin" />
            PDX Bonuses
          </span>
        </header>

        {topReferrers.map((item, index) => (
          <div className={styles.row} key={`${item.rank}-${index}`}>
            <span>{item.rank}</span>
            <span>{item.name}</span>
            <span>{item.points}</span>
          </div>
        ))}
      </section>
    </section>
  )
}

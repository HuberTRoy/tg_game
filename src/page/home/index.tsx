import { useMemo, useState } from 'react'
import styles from './index.module.scss'

type GainFx = {
  id: number
  x: number
  y: number
}

const TAP_GAIN = 5

const mockHomeData = {
  balance: 671_218_022_563,
  oreName: 'Copper Ore',
  afkLeft: '09:33',
  boost: 5,
  freeSpinLeft: 5,
  freeSpinTotal: 5,
  energy: 5_000,
  energyMax: 10_000_000_000,
}

export function HomePage() {
  const tg = useMemo(() => window.Telegram?.WebApp, [])
  const [balance, setBalance] = useState(mockHomeData.balance)
  const [energy, setEnergy] = useState(mockHomeData.energy)
  const [isAfkEnabled, setIsAfkEnabled] = useState(true)
  const [gains, setGains] = useState<GainFx[]>([])

  const handleTap = () => {
    setBalance((prev) => prev + TAP_GAIN)
    setEnergy((prev) => Math.min(mockHomeData.energyMax, prev + TAP_GAIN))
    tg?.HapticFeedback?.impactOccurred('light')

    const id = Date.now() + Math.floor(Math.random() * 1000)
    setGains((prev) => [
      ...prev,
      {
        id,
        x: 14 + Math.random() * 72,
        y: 18 + Math.random() * 66,
      },
    ])
    window.setTimeout(() => {
      setGains((prev) => prev.filter((item) => item.id !== id))
    }, 700)
  }

  const progress = Math.round((energy / mockHomeData.energyMax) * 100)

  return (
    <>
      <section className={styles.balanceRow}>
        <img className={styles.coinImg} src="/coin.png" alt="coin" />
        <strong>{new Intl.NumberFormat('en-US').format(balance)}</strong>
      </section>

      <section className={styles.oreZone}>
        <button type="button" className={styles.oreButton} onClick={handleTap}>
          <img className={styles.oreImg} src="/ore_copper.png" alt="ore" />
          {gains.map((gain) => (
            <span
              key={gain.id}
              className={styles.gainFx}
              style={{
                left: `${gain.x}%`,
                top: `${gain.y}%`,
              }}
            >
              +5
            </span>
          ))}
        </button>
      </section>

      <section className={styles.afkPanel}>
        <button type="button" className={styles.afkToggle} onClick={() => setIsAfkEnabled((prev) => !prev)}>
          Enable AFK <span className={styles.check}>{isAfkEnabled ? '[x]' : '[ ]'}</span>
        </button>
        <p className={styles.afkTime}>
          <img className={styles.timeImg} src="/time.png" alt="time" />
          {mockHomeData.afkLeft} left
        </p>
      </section>

      <section className={styles.oreMeta}>
        <div className={styles.oreLabel}>{mockHomeData.oreName}</div>
        <div className={styles.boostBlock}>
          <strong>{mockHomeData.boost}x</strong>
          <span>Boost</span>
          <small>{mockHomeData.afkLeft}</small>
        </div>
      </section>

      <section className={styles.energyPanel}>
        <div className={styles.energyTrack}>
          <div className={styles.energyFill} style={{ width: `${progress}%` }} />
          <div className={styles.energyBubble}>{mockHomeData.energy.toLocaleString()}</div>
        </div>
        <p>
          {new Intl.NumberFormat('en-US').format(energy)} /{' '}
          {new Intl.NumberFormat('en-US').format(mockHomeData.energyMax)}
        </p>
      </section>

      <section className={styles.multiplierPanel}>
        <button type="button" className={`${styles.multiplierItem} ${styles.isHot}`}>
          <img className={styles.socketImg} src="/socket.png" alt="socket" />
        </button>
        <button type="button" className={styles.multiplierItem}>
          3X
        </button>
        <button type="button" className={styles.multiplierItem}>
          5X
        </button>
        <div className={styles.freeSpin}>
          FREE SPIN
          <small>
            {mockHomeData.freeSpinLeft}/{mockHomeData.freeSpinTotal}
          </small>
        </div>
      </section>
    </>
  )
}

import { useMemo, useState } from 'react'
import styles from './index.module.scss'

const pricePoints = [88, 44, 40, 48, 60, 63, 71, 74, 56]
const yLabels = ['102,891', '102,890', '102,889', '102,888', '102,887', '102,886', '102,885', '102,884', '102,883', '102,882', '102,881', '102,880']
const xLabels = ['09:30', '09:31', '09:32', '09:33', '09:34', '09:35', '09:36']
const volumeBars = [
  { value: 9, up: true },
  { value: 4, up: true },
  { value: 3, up: false },
  { value: 2, up: true },
  { value: 7, up: true },
  { value: 8, up: false },
  { value: 3, up: false },
  { value: 4, up: true },
  { value: 6, up: true },
  { value: 3, up: false },
  { value: 2, up: false },
  { value: 5, up: true },
  { value: 4, up: true },
  { value: 7, up: false },
  { value: 6, up: false },
  { value: 2, up: true },
  { value: 3, up: false },
  { value: 4, up: true },
  { value: 6, up: false },
  { value: 5, up: true },
  { value: 2, up: true },
  { value: 1, up: true },
  { value: 3, up: false },
  { value: 1, up: false },
]

const historyRows = [
  { result: 'Win', score: '+5', up: true },
  { result: 'Win', score: '+5', up: true },
  { result: 'Win', score: '+5', up: true },
  { result: 'Loss', score: '-5', up: false },
]

function createLinePath(points: number[]) {
  const step = 100 / (points.length - 1)
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${index * step} ${100 - point}`).join(' ')
}

export function PredictPage() {
  const [timeframe, setTimeframe] = useState('1s')
  const path = useMemo(() => createLinePath(pricePoints), [])

  return (
    <section className={styles.predictPage}>
      <section className={styles.predictBalance}>
        <img className={styles.coinImg} src="/coin.png" alt="coin" />
        <strong>671,218,022,563</strong>
      </section>

      <section className={styles.capsuleRow}>
        <img src="/time.png" alt="capsule" />
        <strong>300</strong>
      </section>

      <section className={styles.marketRow}>
        <h2>BTC/USDT</h2>
        {['1s', '15m', '1h'].map((item) => (
          <button
            key={item}
            type="button"
            className={item === timeframe ? styles.active : ''}
            onClick={() => setTimeframe(item)}
          >
            {item}
          </button>
        ))}
      </section>

      <section className={styles.chartCard}>
        <div className={styles.chartGrid} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.chartLine}>
          <path d={path} />
          <circle cx="100" cy={100 - pricePoints.at(-1)!} r="1.2" />
        </svg>
        <div className={styles.yAxis}>
          {yLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className={styles.xAxis}>
          {xLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className={styles.tradeResults}>
          {historyRows.map((item, index) => (
            <p key={`${item.result}-${index}`} className={item.up ? styles.win : styles.loss}>
              <span>{item.result}</span>
              <span>{item.score}</span>
              <img src={item.up ? '/time.png' : '/coin.png'} alt="icon" />
            </p>
          ))}
        </div>
      </section>

      <section className={styles.volumeRow}>
        {volumeBars.map((bar, index) => (
          <span key={index} className={bar.up ? styles.up : styles.down} style={{ height: `${bar.value * 9}px` }} />
        ))}
      </section>

      <p className={styles.signalText}>SIGNAL &gt; SELL 0.01550452</p>

      <section className={styles.predictCta}>
        <p>
          Predict the Next Move
          <br />
          Earn AFK Time Capsule
        </p>
        <div className={styles.orderInfo}>
          <img src="/time.png" alt="time" />
          <span>
            <img src="/coin.png" alt="coin" />
            100 / Order
          </span>
        </div>
      </section>

      <section className={styles.actionButtons}>
        <button type="button" className={styles.upAction}>
          <strong>UP</strong>
          <span>5x Rewards</span>
        </button>
        <button type="button" className={styles.flatAction}>
          <strong>FLAT</strong>
          <span>5x Rewards</span>
        </button>
        <button type="button" className={styles.downAction}>
          <strong>DOWN</strong>
          <span>5x Rewards</span>
        </button>
      </section>

      <p className={styles.predictNote}>ⓘ Time capsules allow you to earn PDX points while you're AFK</p>
    </section>
  )
}

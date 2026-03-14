import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

const CLICK_GOAL = 100

function App() {
  const tg = useMemo(() => window.Telegram?.WebApp, [])
  const [clicks, setClicks] = useState(0)
  const [flash, setFlash] = useState(false)
  const [isTelegram, setIsTelegram] = useState(false)
  const [playerName, setPlayerName] = useState('Player')
  const [lastClickTime, setLastClickTime] = useState('还没开始')
  const [statusText, setStatusText] = useState('浏览器模式')

  useEffect(() => {
    if (!tg) return

    setIsTelegram(true)
    setStatusText('Telegram WebApp 模式')
    setPlayerName(tg.initDataUnsafe?.user?.first_name ?? 'Telegram Player')

    tg.ready()
    tg.expand()

    const root = document.documentElement
    const theme = tg.themeParams
    if (theme.bg_color) root.style.setProperty('--tg-bg', theme.bg_color)
    if (theme.text_color) root.style.setProperty('--tg-text', theme.text_color)
    if (theme.button_color) root.style.setProperty('--tg-button', theme.button_color)
    if (theme.button_text_color)
      root.style.setProperty('--tg-button-text', theme.button_text_color)
  }, [tg])

  const handleMainButtonClick = useCallback(() => {
    if (!tg) return

    tg.sendData(
      JSON.stringify({
        type: 'submit_score',
        score: clicks,
        goal: CLICK_GOAL,
        timestamp: new Date().toISOString(),
      }),
    )
  }, [clicks, tg])

  useEffect(() => {
    if (!tg) return

    tg.MainButton.setParams({
      text: `提交分数 (${clicks})`,
      color: '#1f9d73',
      text_color: '#ffffff',
      is_visible: true,
    })
    tg.MainButton.onClick(handleMainButtonClick)

    return () => tg.MainButton.offClick(handleMainButtonClick)
  }, [clicks, handleMainButtonClick, tg])

  useEffect(() => {
    if (clicks === 0) return
    setFlash(true)
    const timer = window.setTimeout(() => setFlash(false), 120)
    return () => window.clearTimeout(timer)
  }, [clicks])

  const handleTap = () => {
    setClicks((current) => current + 1)
    setLastClickTime(
      new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
      }),
    )
    tg?.HapticFeedback?.impactOccurred('light')
  }

  const progress = Math.min(100, Math.round((clicks / CLICK_GOAL) * 100))

  return (
    <main className="app">
      <section className="game-card">
        <div className="head-row">
          <h1>Tap Sprint</h1>
          <span className="status">{statusText}</span>
        </div>

        <p className="sub">Hi, {playerName}. 目标是在一局内点击 {CLICK_GOAL} 次。</p>

        <button
          type="button"
          className={`tap-button ${flash ? 'is-flashing' : ''}`}
          onClick={handleTap}
        >
          TAP
        </button>

        <div className="stats">
          <div className="stat-item">
            <span>当前分数</span>
            <strong>{clicks}</strong>
          </div>
          <div className="stat-item">
            <span>完成度</span>
            <strong>{progress}%</strong>
          </div>
          <div className="stat-item">
            <span>最后点击</span>
            <strong>{lastClickTime}</strong>
          </div>
        </div>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <p className="hint">
          {isTelegram
            ? '在 Telegram 内可使用 MainButton 把分数发给机器人。'
            : '当前在浏览器预览模式，MainButton 和 sendData 不会触发。'}
        </p>
      </section>
    </main>
  )
}

export default App

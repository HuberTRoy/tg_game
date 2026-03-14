import { useState } from 'react'
import styles from './index.module.scss'

const dailyRewards = [
  { title: 'Daily Check-In', value: '+1,000', capsule: false },
  { title: 'Visit Website', value: '+3', capsule: true },
  { title: 'Share & RT on X', value: '+3', capsule: true },
]

type Task = {
  id: string
  title: string
  icon: string
  value: string
  done?: boolean
}

const defaultTasks: Task[] = [
  { id: 'tg-group', title: 'Join PreDEX Telegram Group', icon: 'TG', value: '+1,000 PDX' },
  { id: 'tg-channel', title: 'Join PreDEX Telegram Channel', icon: 'TG', value: '+1,000 PDX' },
  { id: 'x-follow', title: 'Follow PreDEX on', icon: 'X', value: 'done', done: true },
  { id: 'discord', title: 'Join PreDEX Discord', icon: 'DS', value: '+1,000 PDX' },
  { id: 'email', title: 'Link Email', icon: '@', value: '+1,000 PDX' },
]

const wallets = ['🦊', '◉', '🛡', '◈', '+']
const walletOptions = [
  { id: 'metamask', label: 'MetaMask', icon: '🦊' },
  { id: 'coinbase', label: 'Coinbase Wallet', icon: '◉' },
  { id: 'shield', label: 'Shield Wallet', icon: '🛡' },
  { id: 'walletconnect', label: 'WalletConnect', icon: '◈' },
]

export function EarnPage() {
  const [tasks, setTasks] = useState(defaultTasks)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailStep, setEmailStep] = useState<'email' | 'code'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [errorText, setErrorText] = useState('')
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [walletStep, setWalletStep] = useState<'list' | 'detail'>('list')
  const [selectedWallet, setSelectedWallet] = useState<(typeof walletOptions)[number] | null>(null)

  const openEmailModal = () => {
    setIsEmailModalOpen(true)
    setEmailStep('email')
    setEmail('')
    setCode('')
    setErrorText('')
  }

  const closeEmailModal = () => {
    setIsEmailModalOpen(false)
    setEmailStep('email')
    setCode('')
    setErrorText('')
  }

  const handleSendCode = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail) {
      setErrorText('Please enter a valid email address')
      return
    }
    setErrorText('')
    setEmailStep('code')
  }

  const handleVerifyCode = () => {
    const isValidCode = /^\d{6}$/.test(code)
    if (!isValidCode) {
      setErrorText('Code must be 6 digits')
      return
    }

    setTasks((prev) => prev.map((item) => (item.id === 'email' ? { ...item, done: true, value: 'done' } : item)))
    closeEmailModal()
  }

  const openWalletModal = () => {
    setIsWalletModalOpen(true)
    setWalletStep('list')
    setSelectedWallet(null)
  }

  const closeWalletModal = () => {
    setIsWalletModalOpen(false)
    setWalletStep('list')
    setSelectedWallet(null)
  }

  const selectWallet = (wallet: (typeof walletOptions)[number]) => {
    setSelectedWallet(wallet)
    setWalletStep('detail')
  }

  return (
    <section className={styles.earnPage}>
      <h2 className={styles.sectionTitle}>Daily Rewards</h2>
      <section className={styles.rewardGrid}>
        {dailyRewards.map((item) => (
          <article key={item.title} className={styles.rewardCard}>
            <p>{item.title}</p>
            <strong>
              {item.value}
              {item.capsule ? <img src="/time.png" alt="capsule" /> : null}
            </strong>
          </article>
        ))}
      </section>

      <h2 className={styles.sectionTitle}>PreDEX Tasks</h2>
      <section className={styles.taskList}>
        {tasks.map((item) => (
          <article
            key={item.id}
            className={`${styles.taskRow} ${item.done ? styles.done : ''} ${item.id === 'email' ? styles.clickable : ''}`}
            onClick={item.id === 'email' && !item.done ? openEmailModal : undefined}
            role={item.id === 'email' && !item.done ? 'button' : undefined}
            tabIndex={item.id === 'email' && !item.done ? 0 : undefined}
            onKeyDown={
              item.id === 'email' && !item.done
                ? (event) => {
                    if (event.key === 'Enter' || event.key === ' ') openEmailModal()
                  }
                : undefined
            }
          >
            <p>{item.title}</p>
            <span className={`${styles.taskIcon} ${item.icon === 'X' ? styles.x : ''}`}>{item.icon}</span>
            {item.done ? <span className={styles.taskCheck}>✓</span> : <strong>{item.value}</strong>}
          </article>
        ))}

        <article
          className={`${styles.taskRow} ${styles.walletRow} ${styles.clickable}`}
          onClick={openWalletModal}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') openWalletModal()
          }}
        >
          <p>Link Wallet</p>
          <span className={styles.walletIcons}>
            {wallets.map((item) => (
              <i key={item}>{item}</i>
            ))}
          </span>
          <strong>Up to 1M PDX</strong>
        </article>
        <p className={styles.walletNote}>Waller with a higher net worth will receive a larger bonus</p>
      </section>

      {isEmailModalOpen ? (
        <section className={styles.modalOverlay} onClick={closeEmailModal}>
          <div className={styles.emailModalCard} onClick={(event) => event.stopPropagation()}>
            <h3>Link Email</h3>
            <label>
              <span>{emailStep === 'email' ? '✉' : '⚿'}</span>
              <input
                type={emailStep === 'email' ? 'email' : 'text'}
                inputMode={emailStep === 'email' ? 'email' : 'numeric'}
                maxLength={emailStep === 'email' ? 64 : 6}
                placeholder={emailStep === 'email' ? 'Email' : 'Code'}
                value={emailStep === 'email' ? email : code}
                onChange={(event) =>
                  emailStep === 'email' ? setEmail(event.target.value) : setCode(event.target.value.replace(/[^\d]/g, ''))
                }
              />
            </label>
            {errorText ? <p className={styles.emailError}>{errorText}</p> : null}
            <footer>
              <button type="button" onClick={closeEmailModal}>
                Cancel
              </button>
              {emailStep === 'email' ? (
                <button type="button" onClick={handleSendCode}>
                  Send Code
                </button>
              ) : (
                <button type="button" onClick={handleVerifyCode}>
                  Verify
                </button>
              )}
            </footer>
          </div>
        </section>
      ) : null}

      {isWalletModalOpen ? (
        <section className={styles.modalOverlay} onClick={closeWalletModal}>
          <div className={styles.walletModalCard} onClick={(event) => event.stopPropagation()}>
            {walletStep === 'list' ? (
              <>
                <header>
                  <h3>Link Wallet</h3>
                  <button type="button" className={styles.walletClose} onClick={closeWalletModal}>
                    ×
                  </button>
                </header>
                <div className={styles.walletOptionGrid}>
                  {walletOptions.map((wallet) => (
                    <button type="button" key={wallet.id} className={styles.walletOption} onClick={() => selectWallet(wallet)}>
                      <span>{wallet.icon}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3>{selectedWallet?.label ?? 'Wallet'}</h3>
                <div className={styles.walletDetail}>
                  <button type="button" className={styles.walletBack} onClick={() => setWalletStep('list')}>
                    ‹
                  </button>
                  <span className={styles.walletSelectedIcon}>{selectedWallet?.icon ?? '◉'}</span>
                </div>
                <p className={styles.walletStatusTitle}>Requesting Signature</p>
                <p className={styles.walletStatusDesc}>Please sign to connect.</p>
              </>
            )}
          </div>
        </section>
      ) : null}
    </section>
  )
}

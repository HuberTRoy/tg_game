import type { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Home', icon: '/home.svg', end: true },
  { to: '/predict', label: 'Predict', icon: '/predict.svg' },
  { to: '/leader', label: 'Leader', icon: '/leader.svg' },
  { to: '/earn', label: 'Earn', icon: '/earn.svg' },
  { to: '/invite', label: 'Invite', icon: '/invite.svg' },
]

export function BottomTabBar() {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          <span
            className="tab-icon"
            style={{ '--icon-url': `url(${tab.icon})` } as CSSProperties}
            aria-hidden="true"
          />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}

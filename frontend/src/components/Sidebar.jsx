import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, BarChart2, TrendingUp, Building2,
  Globe, MessageSquare, Target, Telescope, CheckCircle2
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Executive Summary', icon: LayoutDashboard },
  { to: '/fundamentals', label: 'Fundamentals', icon: BarChart2 },
  { to: '/technical', label: 'Technical Analysis', icon: TrendingUp },
  { to: '/institutional', label: 'Institutional Activity', icon: Building2 },
  { to: '/sector', label: 'Sector Comparison', icon: Globe },
  { to: '/sentiment', label: 'Sentiment Analysis', icon: MessageSquare },
  { to: '/composite', label: 'Composite Scoring', icon: Target },
  { to: '/forecasts', label: 'Price Forecasts', icon: Telescope },
  { to: '/recommendation', label: 'Investment Recommendation', icon: CheckCircle2 },
]

export default function Sidebar({ data }) {
  const ticker = data?.ticker
  const companyName = data?.companyName
  const score = data?.compositeScore?.totalScore
  const classification = data?.compositeScore?.classification

  const classColor =
    classification === 'UNDERVALUED' ? 'var(--bullish)' :
    classification === 'OVERPRICED' ? 'var(--bearish)' :
    'var(--neutral)'

  return (
    <aside
      className="flex flex-col h-full shrink-0"
      style={{
        width: '220px',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-default)',
      }}
    >
      {/* Ticker badge */}
      <div className="p-4 pb-3" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-lg font-mono font-bold text-base shrink-0"
            style={{
              width: 40, height: 40,
              background: ticker ? 'var(--accent-muted)' : 'var(--bg-elevated)',
              color: ticker ? 'var(--accent)' : 'var(--text-muted)',
              border: '1px solid',
              borderColor: ticker ? 'var(--border-active)' : 'var(--border-default)',
            }}
          >
            {ticker ? ticker.slice(0, 2) : 'AI'}
          </div>
          <div className="overflow-hidden">
            <div
              className="font-mono font-semibold text-sm truncate"
              style={{ color: ticker ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              {ticker || 'No stock'}
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {companyName ? companyName.split(' ').slice(0, 2).join(' ') : 'Stock Analysis'}
            </div>
          </div>
        </div>

        {score != null && (
          <div
            className="mt-2 flex items-center justify-between rounded px-2 py-1"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Score</span>
            <span className="font-mono font-bold text-sm" style={{ color: classColor }}>
              {score}/100
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
            style={({ isActive }) => ({
              borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              background: isActive ? 'var(--accent-muted)' : 'transparent',
              color: isActive ? 'var(--text-active)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            <span className="truncate leading-tight">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

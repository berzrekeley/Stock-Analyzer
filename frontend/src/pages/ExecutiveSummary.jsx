import { BarChart2, TrendingUp, DollarSign, Target, CheckCircle } from 'lucide-react'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'

function fmt(n, decimals = 2) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })
}

function fmtPct(n, decimals = 2) {
  if (n == null) return '—'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${fmt(n, decimals)}%`
}

export default function ExecutiveSummary({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const f = data.fundamentals || {}
  const m = data.metrics || {}
  const r = data.report || {}

  // Use the score from fundamentals (Step 1) or metrics (Step 2)
  const totalScore = f.score || m.score || 0
  
  const classColor =
    totalScore >= 70 ? 'var(--bullish)' :
    totalScore >= 50 ? 'var(--neutral)' :
    'var(--bearish)'

  const classBorder =
    totalScore >= 70 ? 'rgba(34,197,94,0.5)' :
    totalScore >= 50 ? 'rgba(245,158,11,0.5)' :
    'rgba(239,68,68,0.5)'

  const classBg =
    totalScore >= 70 ? 'rgba(34,197,94,0.08)' :
    totalScore >= 50 ? 'rgba(245,158,11,0.08)' :
    'rgba(239,68,68,0.08)'

  const mosSafe = f.marginOfSafety ?? null
  const mosColor = mosSafe != null && mosSafe >= 0 ? 'var(--bullish)' : 'var(--bearish)'

  const expectedReturn = f.upside ?? null
  const returnColor = expectedReturn != null && expectedReturn >= 0 ? 'var(--bullish)' : 'var(--bearish)'

  const metrics = [
    {
      icon: <BarChart2 size={22} />,
      color: 'var(--bullish)',
      bg: 'rgba(34,197,94,0.12)',
      cardAccent: 'rgba(34,197,94,0.06)',
      label: 'Forward P/E',
      value: f.peForward ? fmt(f.peForward, 1) : '—',
    },
    {
      icon: <TrendingUp size={22} />,
      color: 'var(--metric-blue)',
      bg: 'rgba(59,130,246,0.12)',
      cardAccent: 'rgba(59,130,246,0.06)',
      label: 'Revenue Growth (1Y)',
      value: f.revenueGrowth1Y != null ? fmtPct(f.revenueGrowth1Y) : '—',
    },
    {
      icon: <DollarSign size={22} />,
      color: 'var(--metric-purple)',
      bg: 'rgba(139,92,246,0.12)',
      cardAccent: 'rgba(139,92,246,0.06)',
      label: 'Net Margin',
      value: f.netMargin != null ? fmtPct(f.netMargin) : '—',
    },
    {
      icon: <Target size={22} />,
      color: 'var(--metric-orange)',
      bg: 'rgba(249,115,22,0.12)',
      cardAccent: 'rgba(249,115,22,0.06)',
      label: 'Return on Equity',
      value: f.roe ? fmtPct(f.roe) : '—',
    },
  ]

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            {data.companyName}
            <span className="font-mono" style={{ color: 'var(--text-muted)', fontSize: 18, fontWeight: 400, marginLeft: 10 }}>
              ({data.ticker})
            </span>
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '6px 0 0', lineHeight: 1.5 }}>
            Professional Stock Analysis Dashboard
            {f.currentPrice
              ? <> &bull; Current Price: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${fmt(f.currentPrice)}</span></>
              : null}
            {totalScore > 0
              ? <> &bull; Sentiment: <span style={{ color: classColor, fontWeight: 700 }}>{totalScore >= 70 ? 'Bullish' : totalScore >= 50 ? 'Neutral' : 'Bearish'}</span></>
              : null}
          </p>
        </div>

        {totalScore != null && (
          <div style={{
            background: classColor,
            color: '#fff',
            borderRadius: 8,
            padding: '7px 18px',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Roboto Mono, monospace',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            Score: {fmt(totalScore, 1)}/100
          </div>
        )}
      </div>

      {/* ── Hero Card ── */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
      }}>
        {/* Left: company info + key metrics */}
        <div style={{ flex: 1, padding: '28px 32px' }}>
          {/* Company identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {data.ticker?.slice(0, 1)}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {data.companyName}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'Roboto Mono, monospace' }}>
                {data.ticker}
              </div>
            </div>
          </div>

          {/* 2×2 metrics grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 48px' }}>
            {/* Current Price */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Current Price
              </div>
              <div className="font-mono" style={{ fontSize: 30, fontWeight: 700, color: 'var(--bullish)', lineHeight: 1 }}>
                {f.currentPrice ? `$${fmt(f.currentPrice)}` : '—'}
              </div>
            </div>

            {/* Price Target */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Analyst Target Price
              </div>
              <div className="font-mono" style={{ fontSize: 30, fontWeight: 700, color: 'var(--metric-orange)', lineHeight: 1 }}>
                {f.targetPrice ? `$${fmt(f.targetPrice)}` : '—'}
              </div>
            </div>

            {/* Composite Score */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Quality Score
              </div>
              <div className="font-mono" style={{ fontSize: 26, fontWeight: 700, color: classColor, lineHeight: 1 }}>
                {totalScore != null ? `${fmt(totalScore, 1)}/100` : '—'}
              </div>
            </div>

            {/* 12M Expected Return */}
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                12M Expected Upside
              </div>
              <div className="font-mono" style={{ fontSize: 26, fontWeight: 700, color: returnColor, lineHeight: 1 }}>
                {fmtPct(expectedReturn)}
              </div>
            </div>
          </div>
        </div>

        {/* Right: DCF panel */}
        <div style={{
          width: 220,
          background: 'var(--bg-elevated)',
          borderLeft: '1px solid var(--border-default)',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            DCF Intrinsic Value
          </div>
          <div className="font-mono" style={{ fontSize: 34, fontWeight: 700, color: 'var(--metric-cyan)', lineHeight: 1 }}>
            {f.intrinsicValue ? `$${fmt(f.intrinsicValue)}` : '—'}
          </div>
          <div style={{ height: 1, background: 'var(--border-default)', margin: '4px 0' }} />
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Margin of Safety</div>
          <div className="font-mono" style={{ fontSize: 20, fontWeight: 700, color: mosColor }}>
            {mosSafe != null ? fmtPct(mosSafe) : '—'}
          </div>
        </div>
      </div>

      {/* ── 4 Metric Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: m.cardAccent,
              border: '1px solid var(--border-default)',
              borderRadius: 10,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2D3F5A'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-default)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: m.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: m.color,
              flexShrink: 0,
            }}>
              {m.icon}
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 3 }}>{m.label}</div>
              <div className="font-mono" style={{ fontSize: 21, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                {m.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Analyst Thesis ── */}
      {r.priceTarget && (
        <div style={{
          borderLeft: '3px solid var(--accent)',
          background: 'var(--bg-elevated)',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Investment Thesis & Price Target Rationale
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {r.priceTarget}
          </p>
        </div>
      )}
    </div>
  )
}

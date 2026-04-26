export function ClassificationBadge({ classification, size = 'sm' }) {
  const map = {
    UNDERVALUED: { bg: 'var(--bullish-bg)', color: 'var(--bullish)', border: 'var(--bullish-border)' },
    'FAIRLY PRICED': { bg: 'var(--neutral-bg)', color: 'var(--neutral)', border: 'var(--neutral-border)' },
    OVERPRICED: { bg: 'var(--bearish-bg)', color: 'var(--bearish)', border: 'var(--bearish-border)' },
  }
  const style = map[classification] || map['FAIRLY PRICED']
  const fontSize = size === 'lg' ? 14 : size === 'md' ? 12 : 11

  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontSize,
        fontWeight: 600,
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding: size === 'lg' ? '8px 20px' : size === 'md' ? '4px 12px' : '3px 8px',
        borderRadius: 4,
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {classification}
    </span>
  )
}

export function TrendBadge({ label, trend }) {
  const colorMap = {
    Supportive: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Neutral: { color: 'var(--text-muted)', bg: 'var(--bg-elevated)' },
    Headwind: { color: 'var(--bearish)', bg: 'var(--bearish-bg)' },
    Dominant: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Wide: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Moderate: { color: 'var(--neutral)', bg: 'var(--neutral-bg)' },
    Narrow: { color: 'var(--neutral)', bg: 'var(--neutral-bg)' },
    Premium: { color: 'var(--neutral)', bg: 'var(--neutral-bg)' },
    Discount: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Justified: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Positive: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Mixed: { color: 'var(--neutral)', bg: 'var(--neutral-bg)' },
    Negative: { color: 'var(--bearish)', bg: 'var(--bearish-bg)' },
    Accumulation: { color: 'var(--bullish)', bg: 'var(--bullish-bg)' },
    Distribution: { color: 'var(--bearish)', bg: 'var(--bearish-bg)' },
  }
  const s = colorMap[trend] || colorMap.Neutral

  return (
    <span
      style={{
        background: s.bg, color: s.color,
        fontSize: 11, fontWeight: 600,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        padding: '3px 8px', borderRadius: 4,
        whiteSpace: 'nowrap',
      }}
    >
      {label || trend}
    </span>
  )
}

export function ActionBadge({ action, large = false }) {
  const map = {
    BUY: { color: 'var(--bullish)', bg: 'var(--bullish-bg)', border: 'var(--bullish-border)' },
    HOLD: { color: 'var(--neutral)', bg: 'var(--neutral-bg)', border: 'var(--neutral-border)' },
    SELL: { color: 'var(--bearish)', bg: 'var(--bearish-bg)', border: 'var(--bearish-border)' },
  }
  const s = map[action] || map.HOLD

  return (
    <span
      style={{
        background: s.bg, color: s.color,
        border: `2px solid ${s.border}`,
        fontSize: large ? 32 : 14,
        fontWeight: 700, fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        padding: large ? '12px 40px' : '4px 16px',
        borderRadius: 8, display: 'inline-block',
      }}
    >
      {action}
    </span>
  )
}

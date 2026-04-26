const COLOR_MAP = {
  blue: 'var(--metric-blue)',
  cyan: 'var(--metric-cyan)',
  purple: 'var(--metric-purple)',
  orange: 'var(--metric-orange)',
  green: 'var(--bullish)',
  teal: '#14B8A6',
  red: 'var(--bearish)',
  amber: 'var(--neutral)',
}

export default function MetricCircle({ label, value, color = 'blue', delta, suffix = '', prefix = '' }) {
  const circleColor = COLOR_MAP[color] || color

  const isPositive = delta !== undefined && delta !== null && String(delta).startsWith('+')
  const isNegative = delta !== undefined && delta !== null && String(delta).startsWith('-')

  return (
    <div
      className="card flex flex-col items-center text-center gap-3 p-5"
      style={{ minHeight: 140 }}
    >
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{
          width: 52, height: 52,
          background: `${circleColor}22`,
          border: `2px solid ${circleColor}55`,
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 24, height: 24, background: circleColor, opacity: 0.85 }}
        />
      </div>

      <div>
        <div
          className="font-mono font-semibold tabular-nums"
          style={{ color: 'var(--text-primary)', fontSize: 22, lineHeight: 1.2 }}
        >
          {prefix}{value != null ? value : '—'}{suffix}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, marginTop: 4 }}>
          {label}
        </div>
        {delta != null && (
          <div
            style={{
              color: isPositive ? 'var(--bullish)' : isNegative ? 'var(--bearish)' : 'var(--text-muted)',
              fontSize: 11,
              marginTop: 2,
            }}
          >
            {delta}
          </div>
        )}
      </div>
    </div>
  )
}

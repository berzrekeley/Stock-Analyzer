export default function ScoreBanner({ score, weight, label, summary }) {
  const pct = weight ? Math.round(weight * 100) : null

  return (
    <div className="score-banner flex flex-col gap-2">
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="font-mono font-bold tabular-nums"
          style={{ color: 'var(--bullish)', fontSize: 26 }}
        >
          {score}/100
        </span>
        {label && (
          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 15 }}>
            {label}
          </span>
        )}
        {pct != null && (
          <span
            className="px-2 py-0.5 rounded text-xs font-medium"
            style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
          >
            Weight: {pct}%
          </span>
        )}
      </div>
      {summary && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          {summary}
        </p>
      )}
    </div>
  )
}

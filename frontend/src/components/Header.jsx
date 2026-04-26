import SearchBar from './SearchBar'

export default function Header({ data, loading, step, onAnalyze }) {
  const ticker = data?.ticker
  const companyName = data?.companyName
  const price = data?.fundamentals?.currentPrice
  const classification = data?.compositeScore?.classification
  const score = data?.compositeScore?.totalScore

  const classColor =
    classification === 'UNDERVALUED' ? 'var(--bullish)' :
    classification === 'OVERPRICED' ? 'var(--bearish)' :
    'var(--neutral)'

  const classBg =
    classification === 'UNDERVALUED' ? 'var(--bullish-bg)' :
    classification === 'OVERPRICED' ? 'var(--bearish-bg)' :
    'var(--neutral-bg)'

  const classBorder =
    classification === 'UNDERVALUED' ? 'var(--bullish-border)' :
    classification === 'OVERPRICED' ? 'var(--bearish-border)' :
    'var(--neutral-border)'

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 gap-4"
      style={{
        height: 64,
        background: 'var(--bg-root)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      {/* Left: company info */}
      <div className="flex flex-col justify-center min-w-0 shrink-0" style={{ maxWidth: 280 }}>
        {ticker ? (
          <>
            <div className="font-semibold text-base truncate" style={{ color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {companyName}
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
              Professional Stock Analysis Dashboard
              {price && (
                <>
                  {' '}•{' '}
                  <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                    ${price.toFixed(2)}
                  </span>
                </>
              )}
              {classification && (
                <>
                  {' '}•{' '}
                  <span style={{ color: classColor }}>{classification}</span>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
              AI Stock Analysis Platform
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Multi-Factor Analysis Dashboard
            </div>
          </>
        )}
      </div>

      {/* Center: search bar */}
      <div className="flex-1 flex justify-center">
        <SearchBar onAnalyze={onAnalyze} loading={loading} step={step} />
      </div>

      {/* Right: score badge */}
      {score != null && (
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm shrink-0"
          style={{ background: classBg, border: `1px solid ${classBorder}`, color: classColor }}
        >
          Score: {score}/100
        </div>
      )}
    </header>
  )
}

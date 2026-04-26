import { Globe, Target, BarChart2, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'
import ScoreBanner from '../components/ui/ScoreBanner'
import { TrendBadge, ClassificationBadge } from '../components/ui/Badge'

function fmt(n, decimals = 2) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
}

export default function SectorComparison({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const s = data.sectorComparison || {}
  const f = data.fundamentals || {}
  const r = data.recommendation || {}
  const ticker = data.ticker

  const marketPosition = s.marketPosition || [
    { label: 'AI GPU Market Share', value: '86–94%', trend: 'Dominant' },
    { label: 'Data Center Share', value: '88–90%', trend: 'Dominant' },
    { label: 'Competitive Moat', value: 'Wide', trend: 'Wide' },
  ]

  const valuationVsPeers = s.valuationVsPeers || [
    { label: 'P/E vs Sector', value: '+85% Premium', trend: 'Premium' },
    { label: 'P/S vs Sector', value: '+876% Premium', trend: 'Premium' },
    { label: 'Justification', value: 'AI Leadership', trend: 'Justified' },
  ]

  const peers = s.peers || [
    { name: ticker, pe: f.peRatio, ps: f.priceToSales, pb: f.priceToBook, evEbitda: f.enterpriseToEbitda, moat: 'Wide', highlight: true },
    { name: 'AMD', pe: 98.3, ps: 8.2, pb: 4.2, evEbitda: 52.1, moat: 'Narrow' },
    { name: 'INTC', pe: 22.1, ps: 2.4, pb: 1.1, evEbitda: 14.8, moat: 'Narrow' },
    { name: 'QCOM', pe: 17.4, ps: 4.9, pb: 7.8, evEbitda: 12.3, moat: 'Narrow' },
    { name: 'AVGO', pe: 34.2, ps: 11.6, pb: 19.4, evEbitda: 26.7, moat: 'Narrow' },
  ]

  const macroStats = s.macroStats || [
    { label: 'Fed Policy', value: 'Rate Cuts', status: 'Supportive', type: 'positive' },
    { label: 'Inflation', value: 'Moderating', status: 'Supportive', type: 'positive' },
    { label: 'Sector Rotation', value: 'Tech Favorable', status: 'Tailwind', type: 'positive' },
    { label: 'AI CapEx Cycle', value: 'Accelerating', status: 'Tailwind', type: 'positive' },
  ]

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-bottom pb-5" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, background: 'var(--bg-elevated)' }}
          >
            <Globe size={24} style={{ color: 'var(--metric-blue)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Sector Comparison</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Industry positioning and competitive analysis</p>
          </div>
        </div>
        <ClassificationBadge classification={s.score >= 70 ? 'UNDERVALUED' : s.score < 40 ? 'OVERPRICED' : 'FAIRLY PRICED'} size="md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Position Card */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Target size={18} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Market Position</h2>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>{ticker}'s competitive positioning</p>
            </div>
          </div>
          <div className="flex flex-col">
            {marketPosition.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-4" style={{ borderBottom: i < marketPosition.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{m.label}</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{m.value}</span>
                  <TrendBadge trend={m.trend} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Valuation vs Peers Card */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <BarChart2 size={18} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Valuation vs Peers</h2>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Premium/discount analysis vs sector</p>
            </div>
          </div>
          <div className="flex flex-col">
            {valuationVsPeers.map((v, i) => (
              <div key={i} className="flex items-center justify-between py-4" style={{ borderBottom: i < valuationVsPeers.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{v.label}</span>
                <div className="flex items-center gap-4">
                  <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>{v.value}</span>
                  <TrendBadge trend={v.trend} />
                </div>
              </div>
            ))}
          </div>
          <div
            className="p-4 rounded"
            style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent)' }}
          >
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              {r.sectorCommentary || `${ticker}'s premium valuation is supported by dominant market position and high-growth AI exposure.`}
            </p>
          </div>
        </div>
      </div>

      {/* Peer Comparison Table */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Users size={18} style={{ color: 'var(--text-secondary)' }} />
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Peer Benchmarking</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Valuation multiples: {ticker} vs semiconductor peers</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', height: 40 }}>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', paddingLeft: 16 }}>Company</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>P/E</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>P/S</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>P/B</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>EV/EBITDA</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', paddingRight: 16 }}>Moat</th>
              </tr>
            </thead>
            <tbody>
              {peers.map((p, i) => (
                <tr 
                  key={i} 
                  style={{ 
                    height: 48, 
                    borderBottom: '1px solid var(--border-subtle)',
                    background: p.highlight ? 'rgba(16,185,129,0.08)' : 'transparent',
                    borderLeft: p.highlight ? '3px solid var(--accent)' : '3px solid transparent'
                  }}
                >
                  <td style={{ fontSize: 14, color: p.highlight ? 'var(--text-active)' : 'var(--text-primary)', fontWeight: p.highlight ? 600 : 400, paddingLeft: 13 }}>{p.name}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmt(p.pe, 1)}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmt(p.ps, 1)}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmt(p.pb, 1)}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmt(p.evEbitda, 1)}</td>
                  <td className="text-center" style={{ paddingRight: 16 }}>
                    <TrendBadge trend={p.moat} />
                  </td>
                </tr>
              ))}
              <tr style={{ height: 48, borderTop: '2px solid var(--border-subtle)' }}>
                <td style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', paddingLeft: 16 }}>Sector Median</td>
                <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{fmt(sectorMedian.pe || 28.9, 1)}</td>
                <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{fmt(sectorMedian.ps || 4.8, 1)}</td>
                <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{fmt(sectorMedian.pb || 8.4, 1)}</td>
                <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-muted)' }}>{fmt(sectorMedian.evEbitda || 19.3, 1)}</td>
                <td className="text-center" style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Macro Environment Card */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={18} style={{ color: 'var(--text-secondary)' }} />
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Macroeconomic Environment</h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Broader market conditions affecting {ticker}'s fair value</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {macroStats.map((m, i) => (
            <div 
              key={i} 
              className="p-5 rounded-lg flex flex-col gap-2" 
              style={{ background: 'var(--bg-elevated)', borderTop: `3px solid ${m.type === 'positive' ? 'var(--bullish)' : 'var(--bearish)'}` }}
            >
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>{m.label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{m.value}</div>
              <div className="flex items-center gap-1.5" style={{ color: m.type === 'positive' ? 'var(--bullish)' : 'var(--bearish)', fontSize: 12, fontWeight: 500 }}>
                {m.type === 'positive' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                {m.status}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
            {r.macroCommentary || "The macroeconomic backdrop is broadly favorable, with supportive policy and strong technology spending cycles creating a sustained tailwind for growth companies."}
          </p>
        </div>
      </div>

      {/* Score Summary Banner */}
      <ScoreBanner
        score={s.score}
        weight={15}
        label="Sector/Macro"
        text={r.sectorSummary || `${ticker} dominates its market segment and benefits from favorable macro conditions, justifying its premium valuation.`}
      />
    </div>
  )
}

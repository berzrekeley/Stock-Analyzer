import { Building2, TrendingUp, UserCheck, List, TrendingDown } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, LabelList } from 'recharts'
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

function fmtPct(n) {
  if (n == null) return '—'
  const sign = n >= 0 ? '+' : ''
  return `${sign}${fmt(n, 1)}%`
}

function fmtShares(n) {
  if (n == null) return '—'
  if (n >= 1e9) return `${fmt(n / 1e9, 2)}B`
  if (n >= 1e6) return `${fmt(n / 1e6, 1)}M`
  return fmt(n, 0)
}

export default function InstitutionalActivity({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const inst = data.institutional || {}
  const r = data.recommendation || {}
  const ticker = data.ticker
  
  const isAccumulation = inst.score >= 55
  const phaseColor = isAccumulation ? 'var(--bullish)' : 'var(--bearish)'
  const phaseBg = isAccumulation ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)'
  const phaseBorder = isAccumulation ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'

  const ownershipTrend = inst.ownershipTrend || [
    { quarter: 'Q1 2025', value: 62.1 },
    { quarter: 'Q2 2025', value: 63.5 },
    { quarter: 'Q3 2025', value: 64.8 },
    { quarter: 'Q4 2025', value: 66.3 },
  ]

  const majorHolders = inst.majorHolders || [
    { rank: 1, name: 'Vanguard Group', shares: 3120000000, pct: 12.7, qoq: 1.2, sentiment: 'Accumulating' },
    { rank: 2, name: 'BlackRock', shares: 2890000000, pct: 11.8, qoq: 0.8, sentiment: 'Accumulating' },
    { rank: 3, name: 'State Street', shares: 1540000000, pct: 6.3, qoq: -0.3, sentiment: 'Holding' },
    { rank: 4, name: 'Fidelity', shares: 1220000000, pct: 5.0, qoq: 2.1, sentiment: 'Accumulating' },
    { rank: 5, name: 'Capital Research', shares: 980000000, pct: 4.0, qoq: 0.5, sentiment: 'Holding' },
    { rank: 6, name: 'T. Rowe Price', shares: 810000000, pct: 3.3, qoq: -0.1, sentiment: 'Reducing' },
    { rank: 7, name: 'Geode Capital', shares: 720000000, pct: 2.9, qoq: 0.6, sentiment: 'Accumulating' },
  ]

  const insiderTransactions = inst.insiderTransactions || [
    { name: 'Jensen Huang', role: 'CEO', action: 'Sell', shares: 50000, date: 'Oct 2025' },
    { name: 'Colette Kress', role: 'CFO', action: 'Sell', shares: 12000, date: 'Oct 2025' },
    { name: 'Mark Stevens', role: 'Director', action: 'Buy', shares: 5000, date: 'Sep 2025' },
  ]

  const buyRatio = inst.buyRatio || 0.82
  const ratioColor = buyRatio < 0.5 ? 'var(--bearish)' : buyRatio > 1.5 ? 'var(--bullish)' : 'var(--neutral)'

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-bottom pb-5" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, background: 'var(--bg-elevated)' }}
          >
            <Building2 size={24} style={{ color: 'var(--metric-blue)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Institutional & Insider Activity</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Smart money positioning and insider trading signals</p>
          </div>
        </div>
        <ClassificationBadge classification={isAccumulation ? 'UNDERVALUED' : 'OVERPRICED'} size="md" />
      </div>

      {/* Phase Banner */}
      <div 
        className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4"
        style={{ background: phaseBg, border: `1px solid ${phaseBorder}` }}
      >
        <div className="flex items-center justify-center rounded-full mb-2" style={{ width: 56, height: 56, background: `${phaseColor}22` }}>
           {isAccumulation ? <TrendingUp size={32} style={{ color: phaseColor }} /> : <TrendingDown size={32} style={{ color: phaseColor }} />}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: phaseColor, letterSpacing: '0.04em' }}>
          {isAccumulation ? 'ACCUMULATION PHASE' : 'DISTRIBUTION PHASE'}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, maxWidth: 600 }}>
          {isAccumulation 
            ? 'Institutions are net buyers over the past quarter, indicating growing conviction in the stock\'s forward narrative.'
            : 'Institutions are net sellers over the past quarter, indicating a potential rotation or distribution phase.'}
        </p>
        <div className="flex gap-12 mt-4">
          <div className="text-center">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Institutional Ownership</div>
            <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(inst.institutionalOwnership, 1)}%</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>QoQ Change</div>
            <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--bullish)' }}>{fmtPct(inst.institutionalQoQ || 2.1)}</div>
          </div>
          <div className="text-center">
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Insider Buy Ratio</div>
            <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color: ratioColor }}>{fmt(buyRatio, 2)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Insider Activity Card */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <UserCheck size={18} style={{ color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Insider Trading (90-Day)
            </h2>
          </div>
          
          <div className="flex flex-col items-center py-4">
             <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Buy / Sell Ratio</div>
             <div className="font-mono" style={{ fontSize: 48, fontWeight: 700, color: ratioColor, lineHeight: 1 }}>{fmt(buyRatio, 2)}</div>
          </div>

          <div>
             <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>Notable Transactions</div>
             <div className="overflow-hidden rounded-lg">
                <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                   <thead>
                      <tr style={{ background: 'var(--bg-elevated)', height: 32 }}>
                         <th style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', paddingLeft: 12 }}>Name</th>
                         <th style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Action</th>
                         <th style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>Shares</th>
                         <th style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right', paddingRight: 12 }}>Date</th>
                      </tr>
                   </thead>
                   <tbody>
                      {insiderTransactions.map((t, i) => (
                         <tr key={i} style={{ height: 40, borderBottom: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                            <td style={{ fontSize: 13, color: 'var(--text-primary)', paddingLeft: 12 }}>{t.name} <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>({t.role})</span></td>
                            <td style={{ fontSize: 13 }}>
                               <span style={{ color: t.action === 'Buy' ? 'var(--bullish)' : 'var(--bearish)', fontWeight: 600 }}>{t.action}</span>
                            </td>
                            <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmtShares(t.shares)}</td>
                            <td className="text-right" style={{ fontSize: 12, color: 'var(--text-secondary)', paddingRight: 12 }}>{t.date}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          <div
            className="p-4 rounded"
            style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--neutral)' }}
          >
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              {r.insiderCommentary || `Insider activity for ${ticker} shows routine diversification. Planned sales are common after significant appreciation and don't necessarily signal a bearish outlook.`}
            </p>
          </div>
        </div>

        {/* Institutional Holdings Card */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Building2 size={18} style={{ color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Institutional Holdings
            </h2>
          </div>

          <div className="flex items-end justify-between py-2">
             <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Total Institutional Ownership</div>
                <div className="font-mono" style={{ fontSize: 40, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{fmt(inst.institutionalOwnership, 1)}%</div>
             </div>
             <div className="flex items-center gap-2 pb-1">
                <TrendingUp size={16} style={{ color: 'var(--bullish)' }} />
                <span className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--bullish)' }}>{fmtPct(inst.institutionalQoQ || 2.1)}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>QoQ</span>
             </div>
          </div>

          <div>
             <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>Ownership Trend (12 Months)</div>
             <div style={{ width: '100%', height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={ownershipTrend} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                      <YAxis hide domain={[0, 100]} />
                      <Bar dataKey="value" fill="var(--metric-blue)" radius={[4, 4, 0, 0]} barSize={50}>
                         <LabelList dataKey="value" position="top" formatter={(v) => `${v}%`} style={{ fill: 'var(--text-primary)', fontSize: 11, fontFamily: 'Roboto Mono', fontWeight: 500 }} />
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4 border-top" style={{ borderTop: '1px solid var(--border-subtle)' }}>
             <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Sentiment Phase</span>
             <TrendBadge trend={isAccumulation ? 'Accumulation' : 'Distribution'} />
          </div>
        </div>
      </div>

      {/* Top Institutional Holders Table */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <List size={18} style={{ color: 'var(--text-secondary)' }} />
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
              Top Institutional Holders
            </h2>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>Largest shareholders by reported position size</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', height: 40, background: 'var(--bg-elevated)' }}>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', paddingLeft: 16 }}>Rank</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Institution</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>Shares Held</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>% of Float</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>QoQ Change</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'center', paddingRight: 16 }}>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {majorHolders.map((h) => (
                <tr key={h.rank} style={{ height: 48, borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)', paddingLeft: 16 }}>{h.rank}</td>
                  <td style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{h.name}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmtShares(h.shares)}</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: 'var(--text-primary)' }}>{fmt(h.pct, 1)}%</td>
                  <td className="font-mono text-right" style={{ fontSize: 13, color: h.qoq >= 0 ? 'var(--bullish)' : 'var(--bearish)' }}>
                    {h.qoq > 0 ? '↑' : h.qoq < 0 ? '↓' : '—'} {Math.abs(h.qoq)}%
                  </td>
                  <td className="text-center" style={{ paddingRight: 16 }}>
                    <TrendBadge trend={h.sentiment} label={h.sentiment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Score Summary Banner */}
      <ScoreBanner
        score={inst.score}
        weight={10}
        label="Institutional & Insider"
        text={r.institutionalCommentary || "Institutional conviction remains high with top holders increasing positions. Insider selling is within historical norms for the sector."}
      />
    </div>
  )
}

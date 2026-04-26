import { BarChart2, Scale, TrendingUp, Heart, Target } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts'
import MetricCircle from '../components/ui/MetricCircle'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'
import ScoreBanner from '../components/ui/ScoreBanner'
import { TrendBadge } from '../components/ui/Badge'

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

export default function Fundamentals({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const f = data.fundamentals || {}
  const r = data.report || {}
  const mos = f.marginOfSafety

  const dcfChartData = [
    { name: 'Market Price', value: f.currentPrice, color: 'var(--bearish)' },
    { name: 'DCF Value', value: f.intrinsicValue, color: 'var(--metric-cyan)' },
  ]

  const valuationMetrics = [
    { label: 'Trailing P/E', value: f.peTrailing, sector: 25.4, prefix: '' },
    { label: 'Forward P/E', value: f.peForward, sector: 21.0, prefix: '' },
    { label: 'Upside (%)', value: f.upside, sector: 12.5, prefix: '' },
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
            <BarChart2 size={24} className="text-blue-500" style={{ color: 'var(--metric-blue)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Fundamental Analysis</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Financial ratios and analyst deep-dive</p>
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Market Cap</div>
          <div className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
             ${fmt(f.marketCap / 1e12, 2)}T
          </div>
        </div>
      </div>

      {/* 4 Metric Circles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCircle
          label="Forward P/E"
          value={fmt(f.peForward, 1)}
          color="blue"
          delta="Current Multiples"
        />
        <MetricCircle
          label="Revenue Growth"
          value={fmt(f.revenueGrowth1Y, 1)}
          suffix="%"
          color="cyan"
          delta="YoY"
        />
        <MetricCircle
          label="Profit Margin"
          value={fmt(f.netMargin, 1)}
          suffix="%"
          color="purple"
          delta="Net margin"
        />
        <MetricCircle
          label="Price Target"
          value={fmt(f.targetPrice)}
          prefix="$"
          color="orange"
          delta="Analyst consensus"
        />
      </div>

      {/* Analyst Deep Dive Section (New) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
           <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>A. Valuation Analysis</h3>
           <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.valuation || "Detailed valuation analysis currently loading..."}</p>
        </div>
        <div className="card">
           <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>B. Profitability Assessment</h3>
           <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.profitability || "Profitability metrics and efficiency analysis currently loading..."}</p>
        </div>
        <div className="card">
           <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>C. Growth Trajectory</h3>
           <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.growth || "Evaluation of growth drivers and strategic outlook currently loading..."}</p>
        </div>
        <div className="card">
           <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>D. Price Target Rationale</h3>
           <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.priceTarget || "Price target assumptions and analyst thesis currently loading..."}</p>
        </div>
      </div>

      {/* Valuation Ratios Table */}
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Scale size={18} style={{ color: 'var(--text-secondary)' }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Valuation Metrics vs. Industry Benchmarks
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', height: 40 }}>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Metric</th>
                <th className="text-right" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{data.ticker} Value</th>
                <th className="text-right" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Industry Median</th>
                <th className="text-right" style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {valuationMetrics.map((m) => {
                const diff = m.sector ? ((m.value - m.sector) / m.sector) * 100 : 0
                const isPremium = diff > 0
                return (
                  <tr key={m.label} style={{ borderBottom: '1px solid var(--border-subtle)', height: 48 }}>
                    <td style={{ fontSize: 14, color: 'var(--text-primary)' }}>{m.label}</td>
                    <td className="text-right font-mono" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                      {fmt(m.value, 1)}
                    </td>
                    <td className="text-right font-mono" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                      {fmt(m.sector, 1)}
                    </td>
                    <td className="text-right">
                      <TrendBadge
                        label={`${isPremium ? '+' : ''}${Math.abs(Math.round(diff))}% ${isPremium ? 'Premium' : 'Discount'}`}
                        trend={isPremium ? 'Premium' : 'Discount'}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DCF Analysis Card */}
      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <Target size={18} style={{ color: 'var(--text-secondary)' }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Valuation Analysis — DCF Model
          </h2>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Discounted cash flow intrinsic value vs current market price
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Assumptions */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>WACC (Est)</div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
                  10.0%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Terminal Growth</div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
                  2.5%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Revenue Growth (3Y)</div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {fmt(f.revenueGrowth3Y, 1)}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Horizon</div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
                  5 Years
                </div>
              </div>
            </div>
            <div
              className="mt-8 p-4 rounded"
              style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent)' }}
            >
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                The margin of safety ({fmtPct(mos)}) indicates whether the stock is undervalued or trading at a premium to its cash flow potential.
              </p>
            </div>
          </div>

          {/* Chart and key metrics */}
          <div className="flex-1 flex flex-col items-center">
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dcfChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }}
                    itemStyle={{ color: 'var(--text-primary)', fontFamily: 'Roboto Mono' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                    {dcfChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-12 mt-6">
              <div className="text-center">
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Intrinsic Value</div>
                <div className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                  ${fmt(f.intrinsicValue)}
                </div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Margin of Safety</div>
                <div className="font-mono" style={{ fontSize: 24, fontWeight: 700, color: mos >= 0 ? 'var(--bullish)' : 'var(--bearish)' }}>
                  {fmtPct(mos)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Summary Banner */}
      <ScoreBanner
        score={f.score || 75}
        weight={100}
        label="Fundamentals Deep Dive"
        text={r.valuation ? `Summary Analysis: ${r.valuation.substring(0, 150)}...` : `Comprehensive fundamental assessment for ${data.ticker}.`}
      />
    </div>
  )
}

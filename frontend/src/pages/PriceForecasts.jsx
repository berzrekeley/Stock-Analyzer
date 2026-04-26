import { useState } from 'react'
import { TrendingUp, Calculator, GitBranch, Users, ArrowRight, RefreshCw } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from 'recharts'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'
import { ClassificationBadge, TrendBadge } from '../components/ui/Badge'
import { Link } from 'react-router-dom'

const TT_STYLE = {
  backgroundColor: '#1C2535',
  border: '1px solid #1E2A3A',
  borderRadius: 6,
  color: '#F8FAFC',
  fontSize: 12,
}

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

const GROWTH_PRESETS = {
  conservative: { label: 'Conservative', rates: [20, 18, 15, 12, 10], waccAdj: 1.8 },
  moderate:     { label: 'Moderate',     rates: [30, 28, 25, 20, 15], waccAdj: 0 },
  aggressive:   { label: 'Aggressive',   rates: [45, 40, 35, 28, 20], waccAdj: -1.2 },
}

export default function PriceForecasts({ data, loading, recomputeDCF }) {
  const [waccMode, setWaccMode] = useState('manual') // 'manual' | 'market'
  const [waccInput, setWaccInput] = useState('')
  const [growthPreset, setGrowthPreset] = useState('moderate')
  const [terminalGrowth, setTerminalGrowth] = useState('')
  const [recomputedDCF, setRecomputedDCF] = useState(null)
  const [recomputing, setRecomputing] = useState(false)
  const [recomputeError, setRecomputeError] = useState(null)

  if (loading) return <PageSkeleton />
  if (!data) return (
    <div className="flex flex-col items-center justify-center h-full gap-4 mt-20">
      <Calculator size={48} style={{ color: 'var(--text-muted)' }} />
      <div className="text-center">
        <div style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 600 }}>Run an analysis first</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginTop: 8 }}>Enter a ticker in the search bar above.</div>
      </div>
    </div>
  )

  const f = data.fundamentals || {}
  const s = data.compositeScore || {}
  const r = data.recommendation || {}
  const pf = data.priceForecasts || {}
  const dcf = pf.dcfScenarios || {}
  const ticker = data.ticker

  const activeWacc = waccMode === 'market'
    ? (f.beta ? (2.5 + f.beta * 5.5).toFixed(1) : '9.5')
    : (waccInput || fmt(dcf.wacc, 1))

  const activeTG = terminalGrowth || fmt(dcf.terminalGrowthRate, 1)

  const currentIntrinsic = recomputedDCF?.intrinsicValue ?? f.intrinsicValue
  const currentMoS = recomputedDCF?.marginOfSafety ?? f.marginOfSafety

  const dcfChartData = [
    { name: 'Market Price', value: f.currentPrice },
    { name: 'DCF Intrinsic', value: currentIntrinsic },
  ]

  const preset = GROWTH_PRESETS[growthPreset]
  const scenarios = [
    {
      key: 'Conservative',
      label: 'CONSERVATIVE',
      assumption: `WACC ${fmt(Number(activeWacc) + 1.8, 1)}%, 5Y CAGR ${GROWTH_PRESETS.conservative.rates[0]}%`,
      value: dcf.conservative?.intrinsic,
      color: 'var(--bearish)',
    },
    {
      key: 'Base Case',
      label: 'BASE CASE',
      assumption: `WACC ${fmt(Number(activeWacc), 1)}%, 5Y CAGR ${GROWTH_PRESETS.moderate.rates[0]}%`,
      value: currentIntrinsic,
      color: 'var(--text-primary)',
    },
    {
      key: 'Bull Case',
      label: 'BULL CASE',
      assumption: `WACC ${fmt(Number(activeWacc) - 1.2, 1)}%, 5Y CAGR ${GROWTH_PRESETS.aggressive.rates[0]}%`,
      value: dcf.bull?.intrinsic,
      color: 'var(--bullish)',
    },
  ]

  const analysts = pf.topAnalystTargets?.length
    ? pf.topAnalystTargets
    : [
        { firm: 'Morgan Stanley', analyst: 'Joseph Moore', target: 250, rating: 'Overweight' },
        { firm: 'Bank of America', analyst: 'Vivek Arya', target: 245, rating: 'Buy' },
        { firm: 'Bernstein', analyst: 'Stacy Rasgon', target: 230, rating: 'Outperform' },
        { firm: 'Goldman Sachs', analyst: 'Toshiya Hari', target: 220, rating: 'Buy' },
        { firm: 'Barclays', analyst: "Tom O'Malley", target: 215, rating: 'Overweight' },
      ]

  const rangeMin = Math.min(f.currentPrice * 0.85, 150)
  const rangeMax = Math.max(f.analystTargetPrice * 1.3, f.currentPrice * 1.6, 300)
  const clamp = (v) => Math.max(0, Math.min(100, ((v - rangeMin) / (rangeMax - rangeMin)) * 100))
  const currentPos = clamp(f.currentPrice)
  const m6MinPos = clamp(pf.forecast6M?.low)
  const m6MaxPos = clamp(pf.forecast6M?.high)
  const m12MinPos = clamp(pf.forecast12M?.low)
  const m12MaxPos = clamp(pf.forecast12M?.high)

  async function handleRecompute() {
    setRecomputing(true)
    setRecomputeError(null)
    try {
      const result = await recomputeDCF({
        ticker,
        currentPrice: f.currentPrice,
        revenueBase: f.revenue || f.totalRevenue || 0,
        wacc: Number(activeWacc),
        terminalGrowthRate: Number(activeTG),
        growthRates: preset.rates,
        netMargin: f.netMargin || 20,
        sharesOutstanding: f.sharesOutstanding || 1,
      })
      setRecomputedDCF(result)
    } catch (e) {
      setRecomputeError(e.message)
    } finally {
      setRecomputing(false)
    }
  }

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 16 }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center rounded-full" style={{ width: 48, height: 48, background: 'var(--bg-elevated)' }}>
            <TrendingUp size={24} style={{ color: 'var(--metric-cyan)' }} />
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step 7</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Price Forecasts</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>DCF model, scenario analysis, and analyst consensus</p>
          </div>
        </div>
        <div className="text-right">
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Current Price</div>
          <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>${fmt(f.currentPrice)}</div>
        </div>
      </div>

      {/* Forecast Range Hero */}
      <div
        className="rounded-xl p-8 flex flex-col gap-8"
        style={{ background: 'linear-gradient(135deg, #0A1525 0%, #0D1F2D 50%, #0B1820 100%)', border: '1px solid rgba(59,130,246,0.2)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>6-Month Target</div>
            <div className="font-mono" style={{ fontSize: 34, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              {pf.forecast6M?.low ? `$${fmt(pf.forecast6M.low, 0)} – $${fmt(pf.forecast6M.high, 0)}` : '—'}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Base case:</span>
              <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--metric-cyan)' }}>
                {pf.forecast6M?.base ? `$${fmt(pf.forecast6M.base, 0)}` : '—'}
              </span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 32 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>12-Month Target</div>
            <div className="font-mono" style={{ fontSize: 34, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              {pf.forecast12M?.low ? `$${fmt(pf.forecast12M.low, 0)} – $${fmt(pf.forecast12M.high, 0)}` : '—'}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Base case:</span>
              <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--metric-cyan)' }}>
                {pf.forecast12M?.base ? `$${fmt(pf.forecast12M.base, 0)}` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Range bar */}
        <div className="relative" style={{ marginTop: 8 }}>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: 0, left: `${m12MinPos}%`, width: `${Math.max(m12MaxPos - m12MinPos, 2)}%`, height: 8, background: 'rgba(34,197,94,0.15)', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: 0, left: `${m6MinPos}%`, width: `${Math.max(m6MaxPos - m6MinPos, 2)}%`, height: 8, background: 'rgba(59,130,246,0.3)', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: '50%', left: `${currentPos}%`, width: 2, height: 32, background: 'var(--text-muted)', transform: 'translate(-50%, -50%)' }}>
            <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>${fmt(f.currentPrice)}</div>
          </div>
          <div className="flex justify-between mt-6 font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            <span>${Math.round(rangeMin)}</span>
            <span style={{ fontSize: 10 }}>
              <span style={{ color: 'rgba(59,130,246,0.7)' }}>■ 6M</span>
              {'  '}
              <span style={{ color: 'rgba(34,197,94,0.5)' }}>■ 12M</span>
            </span>
            <span>${Math.round(rangeMax)}+</span>
          </div>
        </div>
      </div>

      {/* Interactive DCF Controls */}
      <div className="card flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Calculator size={18} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Interactive DCF Model</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>Customize assumptions and recalculate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WACC Input */}
          <div className="flex flex-col gap-3">
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Discount Rate (WACC)</div>
            <div className="flex gap-2">
              <button
                onClick={() => setWaccMode('manual')}
                style={{
                  flex: 1, padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  background: waccMode === 'manual' ? 'var(--accent-muted)' : 'var(--bg-elevated)',
                  color: waccMode === 'manual' ? 'var(--accent)' : 'var(--text-muted)',
                  border: waccMode === 'manual' ? '1px solid var(--border-active)' : '1px solid var(--border-default)',
                }}
              >
                Manual
              </button>
              <button
                onClick={() => setWaccMode('market')}
                style={{
                  flex: 1, padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  background: waccMode === 'market' ? 'var(--accent-muted)' : 'var(--bg-elevated)',
                  color: waccMode === 'market' ? 'var(--accent)' : 'var(--text-muted)',
                  border: waccMode === 'market' ? '1px solid var(--border-active)' : '1px solid var(--border-default)',
                }}
              >
                Auto (β-based)
              </button>
            </div>
            {waccMode === 'manual' ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  step="0.1"
                  value={waccInput}
                  onChange={e => setWaccInput(e.target.value)}
                  placeholder={fmt(dcf.wacc, 1)}
                  className="font-mono"
                  style={{
                    flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                    borderRadius: 6, padding: '8px 12px', fontSize: 14, color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                />
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>%</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', padding: '8px 12px' }}>
                <span className="font-mono" style={{ fontSize: 14, color: 'var(--text-primary)' }}>{activeWacc}%</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>— CAPM (β={fmt(f.beta, 2)})</span>
              </div>
            )}
          </div>

          {/* Growth Rate Preset */}
          <div className="flex flex-col gap-3">
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Revenue Growth Assumption</div>
            <div className="flex gap-2">
              {Object.entries(GROWTH_PRESETS).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setGrowthPreset(key)}
                  style={{
                    flex: 1, padding: '6px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: growthPreset === key ? 'var(--accent-muted)' : 'var(--bg-elevated)',
                    color: growthPreset === key ? 'var(--accent)' : 'var(--text-muted)',
                    border: growthPreset === key ? '1px solid var(--border-active)' : '1px solid var(--border-default)',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex gap-1 font-mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {GROWTH_PRESETS[growthPreset].rates.map((r, i) => (
                <span key={i} className="rounded px-1.5 py-0.5" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                  Y{i+1} {r}%
                </span>
              ))}
            </div>
          </div>

          {/* Terminal Growth Rate */}
          <div className="flex flex-col gap-3">
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>Terminal Growth Rate</div>
            <div className="flex gap-2">
              {['2.0', '3.0', '3.5', '4.5'].map(v => (
                <button
                  key={v}
                  onClick={() => setTerminalGrowth(v)}
                  style={{
                    flex: 1, padding: '6px 8px', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: activeTG === v ? 'var(--accent-muted)' : 'var(--bg-elevated)',
                    color: activeTG === v ? 'var(--accent)' : 'var(--text-muted)',
                    border: activeTG === v ? '1px solid var(--border-active)' : '1px solid var(--border-default)',
                  }}
                >
                  {v}%
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={terminalGrowth}
                onChange={e => setTerminalGrowth(e.target.value)}
                placeholder={fmt(dcf.terminalGrowthRate, 1)}
                className="font-mono"
                style={{
                  flex: 1, background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                  borderRadius: 6, padding: '8px 12px', fontSize: 14, color: 'var(--text-primary)', outline: 'none',
                }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleRecompute}
            disabled={recomputing}
            className="flex items-center gap-2"
            style={{
              padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: recomputing ? 'not-allowed' : 'pointer',
              background: recomputing ? 'var(--bg-elevated)' : 'var(--accent)',
              color: recomputing ? 'var(--text-muted)' : '#fff',
              border: 'none', opacity: recomputing ? 0.7 : 1,
            }}
          >
            <RefreshCw size={14} style={{ animation: recomputing ? 'spin 1s linear infinite' : 'none' }} />
            {recomputing ? 'Recalculating...' : 'Recalculate DCF'}
          </button>
          {recomputedDCF && (
            <div className="flex items-center gap-4">
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>New intrinsic value:</span>
              <span className="font-mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--metric-cyan)' }}>${fmt(recomputedDCF.intrinsicValue)}</span>
              <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: recomputedDCF.marginOfSafety >= 0 ? 'var(--bullish)' : 'var(--bearish)' }}>
                {fmtPct(recomputedDCF.marginOfSafety)} MoS
              </span>
            </div>
          )}
          {recomputeError && <span style={{ fontSize: 13, color: 'var(--bearish)' }}>{recomputeError}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DCF Chart */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator size={18} style={{ color: 'var(--text-secondary)' }} />
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>DCF Model Assumptions</h2>
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, overflow: 'hidden' }}>
            {[
              { label: 'WACC', value: `${activeWacc}%` },
              { label: 'Terminal Growth', value: `${activeTG}%` },
              { label: '5Y Rev CAGR', value: `${GROWTH_PRESETS[growthPreset].rates[0]}%` },
              { label: 'Horizon', value: `${dcf.projectionYears || 5} Years` },
            ].map((item, i) => (
              <div key={i} className="p-4" style={{
                borderRight: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{item.label}</div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dcfChartData} margin={{ top: 24, right: 20, left: 0, bottom: 0 }} barSize={60}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip contentStyle={TT_STYLE} formatter={(v) => [`$${fmt(v)}`, '']} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  <Cell fill="var(--bearish)" />
                  <Cell fill="var(--metric-cyan)" />
                  <LabelList dataKey="value" position="top" formatter={(v) => `$${fmt(v)}`} style={{ fill: 'var(--text-primary)', fontSize: 11, fontFamily: 'Roboto Mono' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-8">
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Intrinsic Value</div>
              <div className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: 'var(--metric-cyan)' }}>${fmt(currentIntrinsic)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Margin of Safety</div>
              <div className="font-mono" style={{ fontSize: 22, fontWeight: 700, color: currentMoS >= 0 ? 'var(--bullish)' : 'var(--bearish)' }}>
                {fmtPct(currentMoS)}
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <GitBranch size={18} style={{ color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Scenario Analysis</h2>
          </div>

          <div className="flex flex-col">
            {scenarios.map((sc, i) => (
              <div key={i} className="flex items-center justify-between py-4" style={{ borderBottom: i < scenarios.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <div className="flex flex-col gap-1.5">
                  <TrendBadge trend={sc.key} label={sc.label} />
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{sc.assumption}</div>
                </div>
                <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: sc.color }}>
                  {sc.value ? `$${fmt(sc.value)}` : '—'}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded" style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--neutral)' }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              The bull case captures accelerated AI infrastructure adoption and expanded TAM. All scenarios
              assume {activeTG}% terminal growth rate.
            </p>
          </div>
        </div>
      </div>

      {/* Analyst Consensus */}
      <div className="card flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Users size={18} style={{ color: 'var(--text-secondary)' }} />
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Analyst Consensus</h2>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="font-mono" style={{ fontSize: 48, fontWeight: 700, color: 'var(--bullish)', lineHeight: 1 }}>${fmt(f.analystTargetPrice)}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Analyst Median Price Target</div>
          <div className="mt-2">
            <ClassificationBadge classification={f.analystRecommendation?.toUpperCase()?.replace('_', ' ') || 'BUY'} size="md" />
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto px-4 mb-4">
          <div className="relative h-2 w-full rounded-full" style={{ background: 'var(--border-default)' }}>
            <div className="absolute top-0 h-full rounded-full" style={{ left: '0%', width: '60%', background: 'var(--metric-blue)' }} />
            <div className="absolute top-0 h-full rounded-l-none rounded-r-full" style={{ left: '60%', width: '40%', border: '1px dashed var(--metric-cyan)', background: 'transparent' }} />
            <div style={{ position: 'absolute', top: '50%', left: '60%', width: 14, height: 14, background: 'var(--bullish)', border: '2px solid white', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
          </div>
          <div className="flex justify-between mt-3 font-mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <div className="text-center"><div style={{ marginBottom: 4 }}>$185</div><div>Low</div></div>
            <div className="text-center" style={{ color: 'var(--text-primary)' }}><div style={{ marginBottom: 4 }}>${fmt(f.analystTargetPrice)}</div><div>Median</div></div>
            <div className="text-center"><div style={{ marginBottom: 4 }}>$300+</div><div>High</div></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', height: 44 }}>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', paddingLeft: 16 }}>Firm</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>Analyst</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', textAlign: 'right' }}>Target</th>
                <th style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', paddingRight: 16, textAlign: 'right' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {analysts.map((a, i) => (
                <tr key={i} style={{ height: 44, borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ fontSize: 14, color: 'var(--text-primary)', paddingLeft: 16 }}>{a.firm}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.analyst}</td>
                  <td className="font-mono text-right" style={{ fontSize: 14, color: 'var(--text-primary)' }}>${fmt(a.target ?? a.priceTarget, 0)}</td>
                  <td className="text-right" style={{ paddingRight: 16 }}>
                    <TrendBadge trend="Supportive" label={a.rating} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Classification Banner */}
      <div className="rounded-lg p-6 flex flex-col gap-3" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="font-mono" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Composite Score: {fmt(s.totalScore, 1)}
          </div>
          <ClassificationBadge classification={s.classification} size="sm" />
        </div>
        <div className="font-mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--bullish)' }}>
          12M Base Target: {pf.forecast12M?.base ? `$${fmt(pf.forecast12M.base, 0)}` : '—'} | Range: {pf.forecast12M?.low ? `$${fmt(pf.forecast12M.low, 0)}–$${fmt(pf.forecast12M.high, 0)}` : '—'}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
          Price targets reflect a blend of DCF intrinsic value and analyst consensus.
          The wide spread reflects {ticker}'s growth optionality and the multi-year AI infrastructure cycle.
        </p>
        <Link to="/recommendation" className="flex items-center gap-1.5 mt-1" style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
          View Investment Recommendation <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

import {
  ComposedChart, AreaChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react'
import ScoreBanner from '../components/ui/ScoreBanner'
import { TrendBadge } from '../components/ui/Badge'
import { PageSkeleton, ChartSkeleton } from '../components/ui/LoadingSkeleton'

const CHART_PROPS = {
  style: { fontFamily: '"Roboto Mono", monospace', fontSize: 11 },
}

const TT_STYLE = {
  backgroundColor: '#1C2535',
  border: '1px solid #1E2A3A',
  borderRadius: 6,
  color: '#F8FAFC',
  fontSize: 12,
}

function fmt(n, d = 2) {
  return n != null ? Number(n).toFixed(d) : '—'
}

function SignalCard({ icon: Icon, title, value, valueColor, lines }) {
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Icon size={16} style={{ color: 'var(--accent)' }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>{title}</span>
      </div>
      <div className="font-mono font-bold" style={{ fontSize: 22, color: valueColor || 'var(--text-primary)' }}>
        {value}
      </div>
      {lines?.map((l, i) => (
        <div key={i} className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{l.label}</span>
          <span style={{ color: l.color || 'var(--text-secondary)', fontFamily: 'Roboto Mono' }}>{l.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function TechnicalAnalysis({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const tech = data.technicals || {}
  const signals = tech.signals || {}
  const cv = tech.currentValues || {}
  const score = tech.technicalScore || tech.score || 0

  const trendColor =
    signals.trend === 'Bullish' ? 'var(--bullish)' :
    signals.trend === 'Bearish' ? 'var(--bearish)' :
    'var(--neutral)'

  const rsiColor =
    (cv.rsi >= 70) ? 'var(--bearish)' :
    (cv.rsi <= 30) ? 'var(--bullish)' :
    'var(--neutral)'

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-default)', paddingBottom: 16 }}>
        <div style={{ color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Step 2
        </div>
        <div style={{ color: 'var(--text-primary)', fontSize: 22, fontWeight: 700 }}>
          Technical Analysis
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Market momentum and price action indicators — last 6 months
        </div>
      </div>

      {/* Price + MA Chart */}
      <div className="card">
        <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 16 }}>
          Price & Moving Averages
        </div>
        {tech.priceChart?.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={tech.priceChart} {...CHART_PROPS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
              <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }}
                tickFormatter={v => v?.slice(5)} interval="preserveStartEnd" />
              <YAxis stroke="#64748B" tick={{ fontSize: 10 }}
                tickFormatter={v => `$${v}`} domain={['auto', 'auto']} width={60} />
              <Tooltip contentStyle={TT_STYLE} formatter={(v, n) => [`$${fmt(v)}`, n]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="Close" name="Price" fill="rgba(59,130,246,0.08)"
                stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ma50" name="50d MA" stroke="#F59E0B"
                strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
              <Line type="monotone" dataKey="ma200" name="200d MA" stroke="#EC4899"
                strokeWidth={1.5} strokeDasharray="8 3" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : <ChartSkeleton height={280} />}
      </div>

      {/* MACD + RSI side by side */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card">
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 16 }}>MACD</div>
          {tech.macdChart?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={tech.macdChart} {...CHART_PROPS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }}
                  tickFormatter={v => v?.slice(5)} interval="preserveStartEnd" />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} width={45} />
                <Tooltip contentStyle={TT_STYLE} formatter={(v) => [fmt(v, 4)]} />
                <ReferenceLine y={0} stroke="#1E2A3A" strokeDasharray="4 2" />
                <Bar dataKey="macd_histogram" name="Histogram"
                  fill="#3B82F6" opacity={0.6}
                  label={false}
                />
                <Line type="monotone" dataKey="macd" name="MACD" stroke="#3B82F6" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="macd_signal" name="Signal" stroke="#06B6D4" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : <ChartSkeleton height={200} />}
        </div>

        <div className="card">
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 16 }}>
            RSI (14-day)
            {cv.rsi && (
              <span className="font-mono ml-2" style={{ color: rsiColor, fontSize: 14 }}>
                {fmt(cv.rsi, 1)}
              </span>
            )}
          </div>
          {tech.rsiChart?.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={tech.rsiChart} {...CHART_PROPS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
                <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }}
                  tickFormatter={v => v?.slice(5)} interval="preserveStartEnd" />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} domain={[0, 100]} width={35} />
                <Tooltip contentStyle={TT_STYLE} formatter={(v) => [fmt(v, 1), 'RSI']} />
                <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="4 2" label={{ value: '70', fill: '#EF4444', fontSize: 10 }} />
                <ReferenceLine y={30} stroke="#22C55E" strokeDasharray="4 2" label={{ value: '30', fill: '#22C55E', fontSize: 10 }} />
                <ReferenceLine y={50} stroke="#1E2A3A" strokeDasharray="4 2" />
                <Line type="monotone" dataKey="rsi" name="RSI" stroke="#8B5CF6" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : <ChartSkeleton height={200} />}
        </div>
      </div>

      {/* Bollinger Bands */}
      <div className="card">
        <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 16 }}>
          Bollinger Bands (20, 2)
        </div>
        {tech.bollingerChart?.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={tech.bollingerChart} {...CHART_PROPS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
              <XAxis dataKey="date" stroke="#64748B" tick={{ fontSize: 10 }}
                tickFormatter={v => v?.slice(5)} interval="preserveStartEnd" />
              <YAxis stroke="#64748B" tick={{ fontSize: 10 }}
                tickFormatter={v => `$${v}`} domain={['auto', 'auto']} width={60} />
              <Tooltip contentStyle={TT_STYLE} formatter={(v, n) => [`$${fmt(v)}`, n]} />
              <Area type="monotone" dataKey="bb_upper" name="Upper Band"
                fill="rgba(148,163,184,0.06)" stroke="#94A3B8" strokeWidth={1}
                strokeDasharray="4 2" dot={false} />
              <Area type="monotone" dataKey="bb_lower" name="Lower Band"
                fill="rgba(148,163,184,0.06)" stroke="#94A3B8" strokeWidth={1}
                strokeDasharray="4 2" dot={false} />
              <Line type="monotone" dataKey="bb_middle" name="20d MA"
                stroke="#F8FAFC" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="Close" name="Price"
                stroke="#3B82F6" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        ) : <ChartSkeleton height={220} />}
      </div>

      {/* Signal summary cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <SignalCard
          icon={signals.trend === 'Bearish' ? TrendingDown : TrendingUp}
          title="Trend Direction"
          value={signals.trend || '—'}
          valueColor={trendColor}
          lines={[
            { label: 'Above 50d MA', value: signals.aboveMa50 ? '✓ Yes' : '✗ No', color: signals.aboveMa50 ? 'var(--bullish)' : 'var(--bearish)' },
            { label: 'Above 200d MA', value: signals.aboveMa200 ? '✓ Yes' : '✗ No', color: signals.aboveMa200 ? 'var(--bullish)' : 'var(--bearish)' },
            { label: 'Golden Cross', value: signals.goldenCross ? '✓ Active' : '— No', color: signals.goldenCross ? 'var(--bullish)' : 'var(--text-muted)' },
          ]}
        />
        <SignalCard
          icon={Activity}
          title="RSI Momentum"
          value={cv.rsi ? fmt(cv.rsi, 1) : '—'}
          valueColor={rsiColor}
          lines={[
            { label: 'Status', value: signals.rsiStatus || '—' },
            { label: 'MACD', value: signals.macdBullish ? '✓ Bullish' : '✗ Bearish', color: signals.macdBullish ? 'var(--bullish)' : 'var(--bearish)' },
          ]}
        />
        <SignalCard
          icon={BarChart2}
          title="Volatility"
          value={signals.volatility || '—'}
          valueColor="var(--metric-cyan)"
          lines={[
            { label: 'BB Width', value: cv.bbWidth ? `${fmt(cv.bbWidth, 1)}%` : '—' },
            { label: '50d MA', value: cv.ma50 ? `$${fmt(cv.ma50)}` : '—' },
            { label: '200d MA', value: cv.ma200 ? `$${fmt(cv.ma200)}` : '—' },
          ]}
        />
        <SignalCard
          icon={signals.obvTrend === 'Accumulation' ? TrendingUp : TrendingDown}
          title="Volume (OBV)"
          value={signals.obvTrend || '—'}
          valueColor={signals.obvTrend === 'Accumulation' ? 'var(--bullish)' : 'var(--bearish)'}
          lines={[
            { label: 'Confirms price?', value: signals.obvTrend === 'Accumulation' ? '✓ Yes' : '— Mixed', color: signals.obvTrend === 'Accumulation' ? 'var(--bullish)' : 'var(--neutral)' },
          ]}
        />
      </div>

      <ScoreBanner
        score={score}
        weight={0.20}
        label="Technical Analysis Score"
        summary={`Trend is ${signals.trend?.toLowerCase() || 'mixed'} — price is ${signals.aboveMa50 ? 'above' : 'below'} the 50-day MA and ${signals.aboveMa200 ? 'above' : 'below'} the 200-day MA. RSI at ${cv.rsi ? fmt(cv.rsi, 1) : '—'} (${signals.rsiStatus || 'N/A'}). Volume is in ${signals.obvTrend?.toLowerCase() || 'unknown'} phase.`}
      />
    </div>
  )
}

import { MessageSquare, Gauge, BookOpen, TrendingUp, TrendingDown, Zap, Newspaper, Users, BookMarked } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
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

export default function SentimentAnalysis({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const s = data.sentiment || {}
  const r = data.recommendation || {}
  const polarity = s.polarity || 0.58
  const score = s.score || 74.6

  const polarityColor = polarity >= 0.5 ? 'var(--bullish)' : polarity >= 0.2 ? 'var(--neutral)' : 'var(--bearish)'
  const polarityBg = polarity >= 0.5 ? 'var(--bullish-bg)' : polarity >= 0.2 ? 'var(--neutral-bg)' : 'var(--bearish-bg)'
  const polarityBorder = polarity >= 0.5 ? 'var(--bullish-border)' : polarity >= 0.2 ? 'var(--neutral-border)' : 'var(--bearish-border)'

  const gaugeData = [
    { value: 0.8, color: 'var(--bearish)' }, // -1 to -0.2
    { value: 0.4, color: 'var(--neutral)' }, // -0.2 to 0.2
    { value: 0.8, color: 'var(--bullish)' }, // 0.2 to 1
  ]

  // Needle position calculation for half-donut (180 to 0 degrees)
  // Polarity -1 to 1 maps to 180 to 0
  const needleAngle = 180 - ((polarity + 1) / 2) * 180

  const narratives = s.narratives || {
    bullish: [
      'AI accelerator dominance — CUDA ecosystem creates durable advantage',
      'Blackwell chip launch driving next-gen data center upgrade cycle',
      '86–94% AI GPU market share with no near-term credible challenger',
    ],
    bearish: [
      'US export restrictions to China pose ongoing revenue risk',
      'AMD MI300x gaining traction in specific inference workloads',
      'Valuation at 53x P/E creates downside risk if capex cycle slows',
    ],
    catalysts: [
      'Q3 FY2026 earnings release — consensus expects strong beat',
      'Blackwell GB200 NVLink rack production ramp (Q4 2025)',
      'Potential new sovereign AI government contracts globally',
    ],
  }

  const sources = [
    {
      name: 'News & Analyst Reports',
      icon: <Newspaper size={24} style={{ color: 'var(--metric-blue)' }} />,
      score: s.newsPolarity || 0.62,
      summary: s.newsSummary || "Analyst consensus is Strong Buy. Recent reports highlight AI infrastructure demand acceleration and Blackwell supply normalization.",
    },
    {
      name: 'Reddit / Social Media',
      icon: <Users size={24} style={{ color: 'var(--metric-purple)' }} />,
      score: s.socialPolarity || 0.48,
      summary: s.socialSummary || "Retail sentiment is cautiously optimistic. Bullish on AI thesis but concerned about valuation after significant YTD gains.",
    },
    {
      name: 'Seeking Alpha',
      icon: <BookMarked size={24} style={{ color: 'var(--metric-cyan)' }} />,
      score: s.seekingAlphaPolarity || 0.52,
      summary: s.seekingAlphaSummary || "Contributor articles are predominantly bullish on AI capex cycle durability. Main bear case centers on competitive risk.",
    },
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
            <MessageSquare size={24} style={{ color: 'var(--metric-purple)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Sentiment Analysis</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Market sentiment across multiple sources</p>
          </div>
        </div>
        <div 
          className="flex items-center gap-3 px-4 py-2 rounded-lg"
          style={{ background: polarityBg, border: `1px solid ${polarityBorder}` }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Polarity</div>
          <div className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: polarityColor }}>{fmt(polarity, 2)}</div>
          <TrendingUp size={14} style={{ color: polarityColor }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Sentiment Card */}
        <div className="card flex flex-col items-center gap-6">
          <div className="w-full flex items-center gap-2">
            <Gauge size={18} style={{ color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Overall Sentiment</h2>
          </div>
          
          <div className="flex flex-col items-center mt-4">
            <div className="font-mono" style={{ fontSize: 64, fontWeight: 700, color: polarityColor, lineHeight: 1 }}>{fmt(polarity, 2)}</div>
            <div className="mt-4">
               <TrendBadge trend={polarity >= 0.5 ? 'Positive' : polarity >= 0.2 ? 'Mixed' : 'Negative'} label={polarity >= 0.5 ? 'MODERATELY POSITIVE' : polarity >= 0.2 ? 'NEUTRAL / MIXED' : 'MODERATELY NEGATIVE'} />
            </div>
          </div>

          <div style={{ width: '100%', height: 160, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.3} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Needle */}
            <div 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: '50%', 
                width: 2, 
                height: 85, 
                background: 'var(--text-primary)',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${needleAngle - 90}deg)`,
                transition: 'transform 0.6s ease-out'
              }} 
            />
            <div className="flex justify-between mt-2 px-4">
               <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>-1 Bearish</span>
               <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>0 Neutral</span>
               <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>+1 Bullish</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-8 mt-4 pt-6 border-top" style={{ borderTop: '1px solid var(--border-subtle)' }}>
             <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Analyst Sentiment</div>
                <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--bullish)' }}>0.45</div>
                <div style={{ fontSize: 12, color: 'var(--bullish)', fontWeight: 500 }}>Very Positive</div>
             </div>
             <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Social Sentiment</div>
                <div className="font-mono" style={{ fontSize: 20, fontWeight: 600, color: 'var(--neutral)' }}>0.48</div>
                <div style={{ fontSize: 12, color: 'var(--neutral)', fontWeight: 500 }}>Mixed</div>
             </div>
          </div>
        </div>

        {/* Key Narratives Card */}
        <div className="card flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <BookOpen size={18} style={{ color: 'var(--text-secondary)' }} />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Key Narratives</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Bullish */}
            <div className="p-4 rounded-lg" style={{ background: 'var(--bg-root)', borderLeft: '3px solid var(--bullish)' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--bullish)', fontSize: 14, fontWeight: 600 }}>
                <TrendingUp size={16} /> Bullish
              </div>
              <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                {narratives.bullish.map((n, i) => (
                  <li key={i} className="flex gap-2" style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--bullish)' }}>•</span> {n}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bearish */}
            <div className="p-4 rounded-lg" style={{ background: 'var(--bg-root)', borderLeft: '3px solid var(--bearish)' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--bearish)', fontSize: 14, fontWeight: 600 }}>
                <TrendingDown size={16} /> Bearish
              </div>
              <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                {narratives.bearish.map((n, i) => (
                  <li key={i} className="flex gap-2" style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--bearish)' }}>•</span> {n}
                  </li>
                ))}
              </ul>
            </div>

            {/* Catalysts */}
            <div className="p-4 rounded-lg" style={{ background: 'var(--bg-root)', borderLeft: '3px solid var(--neutral)' }}>
              <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--neutral)', fontSize: 14, fontWeight: 600 }}>
                <Zap size={16} /> Catalysts
              </div>
              <ul className="flex flex-col gap-2 p-0 m-0 list-none">
                {narratives.catalysts.map((n, i) => (
                  <li key={i} className="flex gap-2" style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--neutral)' }}>•</span> {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Source Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((src, i) => {
          const sColor = src.score >= 0.5 ? 'var(--bullish)' : src.score >= 0.2 ? 'var(--neutral)' : 'var(--bearish)'
          return (
            <div key={i} className="card flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {src.icon}
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{src.name}</h3>
              </div>
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Polarity Score</div>
                <div className="font-mono" style={{ fontSize: 32, fontWeight: 700, color: sColor, lineHeight: 1 }}>{fmt(src.score, 2)}</div>
                <div className="mt-3">
                  <TrendBadge trend={src.score >= 0.5 ? 'Positive' : src.score >= 0.2 ? 'Mixed' : 'Negative'} label={src.score >= 0.5 ? 'POSITIVE' : src.score >= 0.2 ? 'MIXED' : 'NEGATIVE'} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 16, margin: '16px 0 0 0' }}>
                  {src.summary}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Score Summary Banner */}
      <ScoreBanner
        score={score}
        weight={15}
        label="Sentiment"
        text={r.sentimentCommentary || `Market sentiment for ${data.ticker} is moderately positive. Analyst conviction remains strong, while retail sentiment is balanced between growth optimism and valuation caution.`}
      />
    </div>
  )
}

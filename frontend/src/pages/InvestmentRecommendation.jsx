import { CheckCircle, AlertTriangle, Zap } from 'lucide-react'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'
import { ClassificationBadge, ActionBadge } from '../components/ui/Badge'

function fmt(n, decimals = 2) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
}

export default function InvestmentRecommendation({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const r = data.recommendation || {}
  const f = data.fundamentals || {}
  const s = data.compositeScore || {}
  const pf = data.priceForecasts || {}
  const ticker = data.ticker

  const strengths = r.strengths || [
    'Strong institutional momentum',
    `Number 1 GPU market share (${f.marketShare || '86-94%'})`,
    `Exceptional margins (${fmt(f.netMargin, 1)}% net margin)`,
    `Excellent revenue growth ${fmt(f.revenueGrowth1Y, 1)}% YoY`,
    'CUDA ecosystem moat',
    'Data center share 88-90%',
  ]

  const risks = r.risks || [
    `High valuation multiples (P/E ${fmt(f.peRatio, 1)})`,
    'US export restrictions to China',
    'Competitive pressure from AMD MI300x',
    'Data center CapEx reduction risk',
    'AI infrastructure cyclicality headwinds',
  ]

  const catalysts = r.catalysts || [
    'Next quarterly earnings report',
    'Blackwell chip launch volumes',
    'AI infrastructure CapEx cycle',
    'Fed rate cuts supporting growth equities',
    'Sovereign AI expansion globally',
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
            <Zap size={24} style={{ color: 'var(--metric-orange)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Investment Recommendation</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Final verdict and multi-factor synthesis for {ticker}</p>
          </div>
        </div>
      </div>

      {/* Recommendation Hero Card */}
      <div 
        className="rounded-xl p-10 flex flex-col items-center text-center gap-4"
        style={{ 
          background: 'linear-gradient(135deg, #0D2018 0%, #0B1525 60%, #0A1220 100%)', 
          border: '1px solid rgba(16, 185, 129, 0.2)' 
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>Investment Verdict</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Based on synthesized fundamental, technical, and sentiment analysis</div>
        
        <div className="my-6">
           <ActionBadge action={r.action || (s.totalScore >= 70 ? 'BUY' : s.totalScore < 40 ? 'SELL' : 'HOLD')} large={true} />
        </div>

        <div className="font-mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
           12M Base Case Target: ${fmt(pf.forecast12M?.base, 0)}
        </div>
      </div>

      {/* 3-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="card" style={{ borderLeft: '3px solid var(--bullish)' }}>
           <div className="flex items-center gap-2 mb-6">
              <CheckCircle size={16} style={{ color: 'var(--bullish)' }} />
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Investment Strengths</h2>
           </div>
           <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {strengths.map((item, i) => (
                 <li key={i} className="flex gap-3 items-start" style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--bullish)' }} />
                    {item}
                 </li>
              ))}
           </ul>
        </div>

        {/* Risks */}
        <div className="card" style={{ borderLeft: '3px solid var(--bearish)' }}>
           <div className="flex items-center gap-2 mb-6">
              <AlertTriangle size={16} style={{ color: 'var(--bearish)' }} />
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Key Risk Factors</h2>
           </div>
           <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {risks.map((item, i) => (
                 <li key={i} className="flex gap-3 items-start" style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--bearish)' }} />
                    {item}
                 </li>
              ))}
           </ul>
        </div>

        {/* Catalysts */}
        <div className="card" style={{ borderLeft: '3px solid var(--neutral)' }}>
           <div className="flex items-center gap-2 mb-6">
              <Zap size={16} style={{ color: 'var(--neutral)' }} />
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Catalysts</h2>
           </div>
           <ul className="flex flex-col gap-3 p-0 m-0 list-none">
              {catalysts.map((item, i) => (
                 <li key={i} className="flex gap-3 items-start" style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--neutral)' }} />
                    {item}
                 </li>
              ))}
           </ul>
        </div>
      </div>

      {/* Price Forecast Section */}
      <div className="card">
         <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>Price Forecast Range</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
               <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>6-Month Target</div>
               <div className="font-mono" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)' }}>
                  ${fmt(pf.forecast6M?.low, 0)} – ${fmt(pf.forecast6M?.high, 0)}
               </div>
            </div>
            <div>
               <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>12-Month Target</div>
               <div className="font-mono" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text-primary)' }}>
                  ${fmt(pf.forecast12M?.low, 0)} – ${fmt(pf.forecast12M?.high, 0)}
               </div>
            </div>
         </div>
         <div className="pt-6 border-top flex items-center gap-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Analyst Consensus:</span>
            <span className="font-mono" style={{ fontSize: 16, fontWeight: 600, color: 'var(--bullish)' }}>${fmt(f.analystTargetPrice)}</span>
            <ClassificationBadge classification={f.analystRecommendation?.toUpperCase()?.replace('_', ' ') || 'BUY'} size="sm" />
         </div>
      </div>

      {/* Summary Paragraph */}
      <div 
        className="rounded-lg p-8"
        style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent)' }}
      >
        <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Summary</div>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
           {r.summaryParagraph || `${ticker} is classified as ${s.classification} based on its exceptional growth profile and dominant market position. While valuation remains a primary consideration, the multi-year AI cycle and Blackwell launch provide significant catalysts for continued appreciation.`}
        </p>
      </div>
    </div>
  )
}

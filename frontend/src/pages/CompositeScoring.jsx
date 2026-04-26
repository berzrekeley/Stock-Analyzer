import { LayoutDashboard } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, PieChart, Pie, LabelList } from 'recharts'
import { PageSkeleton } from '../components/ui/LoadingSkeleton'
import { ClassificationBadge } from '../components/ui/Badge'

function fmt(n, decimals = 1) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
}

export default function CompositeScoring({ data, loading }) {
  if (loading) return <PageSkeleton />
  if (!data) return null

  const s = data.compositeScore || {}
  const ticker = data.ticker
  const totalScore = s.totalScore || 82.0

  const factors = [
    { name: 'Fundamentals', score: data.fundamentals?.score || 90, weight: 0.40, color: 'var(--bullish)' },
    { name: 'Technicals', score: data.technicals?.score || 70, weight: 0.20, color: 'var(--neutral)' },
    { name: 'Institutional', score: data.institutional?.score || 82, weight: 0.10, color: 'var(--bullish)' },
    { name: 'Sector/Macro', score: data.sectorComparison?.score || 82, weight: 0.15, color: 'var(--bullish)' },
    { name: 'Sentiment', score: data.sentiment?.score || 74.6, weight: 0.15, color: 'var(--bullish)' },
  ]

  const chartData = factors.map(f => ({
    name: f.name,
    score: f.score,
    weighted: f.score * f.weight,
    color: f.color,
    label: `${fmt(f.score * f.weight)} pts`
  }))

  const pieData = factors.map(f => ({
    name: f.name,
    value: f.score * f.weight,
    color: f.color
  }))

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center justify-between border-bottom pb-5" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, background: 'var(--bg-elevated)' }}
          >
            <LayoutDashboard size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Composite Scoring</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>Multi-factor weighted analysis for {ticker}</p>
          </div>
        </div>
      </div>

      {/* Hero Score Section */}
      <div className="flex flex-col items-center justify-center py-10">
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
           Final Composite Score
        </div>
        <div className="font-mono" style={{ fontSize: 80, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
           {fmt(totalScore)}
        </div>
        <div className="mt-6">
           <ClassificationBadge classification={s.classification} size="lg" />
        </div>
      </div>

      {/* 5 Factor Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {factors.map((f, i) => (
          <div key={i} className="card relative overflow-hidden flex flex-col gap-2 p-5 pt-6" style={{ borderTop: `4px solid ${f.color}` }}>
             <div className="font-mono" style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{fmt(f.score)}</div>
             <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{f.name}</div>
             <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Weight: {f.weight * 100}%</div>
             <div className="mt-4 w-full bg-border-default rounded-full" style={{ height: 4, background: 'var(--border-default)' }}>
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${f.score}%`, background: f.color }} 
                />
             </div>
          </div>
        ))}
      </div>

      {/* Calculation Display */}
      <div className="flex flex-col items-center gap-2 mt-4">
         <div className="font-mono text-center" style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 800 }}>
            {factors.map((f, i) => (
               <span key={i}>
                  ({fmt(f.score, 1)} × {f.weight.toFixed(2)})
                  {i < factors.length - 1 ? ' + ' : ''}
               </span>
            ))}
         </div>
         <div className="font-mono" style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600 }}>
            {factors.map((f, i) => (
               <span key={i}>
                  {fmt(f.score * f.weight, 1)}
                  {i < factors.length - 1 ? ' + ' : ' = '}
               </span>
            ))}
            <span style={{ color: 'var(--text-primary)' }}>{fmt(totalScore, 1)}</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
         {/* Score Breakdown Chart */}
         <div className="card">
            <h2 className="mb-8" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 32px 0' }}>
               Score Breakdown by Category
            </h2>
            <div style={{ width: '100%', height: 280 }}>
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={chartData} 
                    layout="vertical" 
                    margin={{ top: 5, right: 60, left: 40, bottom: 5 }}
                  >
                     <XAxis type="number" hide domain={[0, 40]} />
                     <YAxis 
                       type="category" 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} 
                       width={100}
                     />
                     <Tooltip 
                       cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                       contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }}
                       itemStyle={{ color: 'var(--text-primary)', fontFamily: 'Roboto Mono' }}
                     />
                     <Bar dataKey="weighted" radius={[0, 4, 4, 0]} barSize={24}>
                        {chartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="label" position="right" style={{ fill: 'var(--text-primary)', fontSize: 12, fontFamily: 'Roboto Mono', fontWeight: 600 }} />
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Weighted Contribution Donut */}
         <div className="card flex flex-col">
            <h2 className="mb-8" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 32px 0' }}>
               Weighted Contribution
            </h2>
            <div style={{ width: '100%', height: 280, position: 'relative' }}>
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                       data={pieData}
                       cx="50%"
                       cy="50%"
                       innerRadius={70}
                       outerRadius={95}
                       paddingAngle={4}
                       dataKey="value"
                       stroke="none"
                     >
                        {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               {/* Center text */}
               <div style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
               }}>
                  <div className="font-mono" style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)' }}>{fmt(totalScore)}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total</div>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 mt-6">
               {factors.map((f, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color }} />
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.name}</span>
                     </div>
                     <span className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{fmt(f.score * f.weight)} pts</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  )
}


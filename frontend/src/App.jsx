import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAnalysis } from './hooks/useAnalysis'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ExecutiveSummary from './pages/ExecutiveSummary'
import Fundamentals from './pages/Fundamentals'
import TechnicalAnalysis from './pages/TechnicalAnalysis'
import InstitutionalActivity from './pages/InstitutionalActivity'
import SectorComparison from './pages/SectorComparison'
import SentimentAnalysis from './pages/SentimentAnalysis'
import CompositeScoring from './pages/CompositeScoring'
import PriceForecasts from './pages/PriceForecasts'
import InvestmentRecommendation from './pages/InvestmentRecommendation'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4" style={{ marginTop: 80 }}>
      <div style={{ fontSize: 48 }}>📊</div>
      <div className="text-center">
        <div style={{ color: 'var(--text-primary)', fontSize: 20, fontWeight: 600 }}>
          Enter a ticker to begin
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 8 }}>
          Type a stock ticker (e.g. NVDA) or company name in the search bar above
        </div>
      </div>
    </div>
  )
}

function AppLayout() {
  const { data, loading, error, step, analyze, recomputeDCF } = useAnalysis()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-root)' }}>
      <Sidebar data={data} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header data={data} loading={loading} step={step} onAnalyze={analyze} />

        <main className="flex-1 overflow-y-auto">
          {error && (
            <div
              className="mx-8 mt-6 px-4 py-3 rounded-lg text-sm"
              style={{
                background: 'var(--bearish-bg)',
                border: '1px solid var(--bearish-border)',
                color: 'var(--bearish)',
              }}
            >
              {error}
            </div>
          )}

          <Routes>
            <Route path="/" element={<ExecutiveSummary data={data} loading={loading} />} />
            <Route path="/fundamentals" element={<Fundamentals data={data} loading={loading} />} />
            <Route path="/technical" element={<TechnicalAnalysis data={data} loading={loading} />} />
            <Route path="/institutional" element={<InstitutionalActivity data={data} loading={loading} />} />
            <Route path="/sector" element={<SectorComparison data={data} loading={loading} />} />
            <Route path="/sentiment" element={<SentimentAnalysis data={data} loading={loading} />} />
            <Route path="/composite" element={<CompositeScoring data={data} loading={loading} />} />
            <Route path="/forecasts" element={<PriceForecasts data={data} loading={loading} recomputeDCF={recomputeDCF} />} />
            <Route path="/recommendation" element={<InvestmentRecommendation data={data} loading={loading} />} />
          </Routes>

          {!data && !loading && !error && <EmptyState />}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

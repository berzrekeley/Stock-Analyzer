import { useState } from 'react'
import { Search, Loader2, Zap } from 'lucide-react'

export default function SearchBar({ onAnalyze, loading, step }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading) onAnalyze(query.trim())
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter ticker (NVDA) or company name (NVIDIA)..."
            disabled={loading}
            className="w-full h-11 pl-10 pr-4 rounded-lg font-mono text-sm tabular-nums"
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              fontSize: '15px',
              transition: 'border-color 150ms',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="flex items-center gap-2 h-11 px-5 rounded-lg font-sans text-sm font-semibold transition-all"
          style={{
            background: loading || !query.trim() ? 'var(--bg-elevated)' : 'var(--accent)',
            color: loading || !query.trim() ? 'var(--text-muted)' : '#0B1A12',
            cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
            minWidth: '120px',
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Zap size={15} />
          )}
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {loading && step && (
        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          <Loader2 size={11} className="animate-spin" style={{ color: 'var(--accent)' }} />
          <span>{step}</span>
        </div>
      )}
    </div>
  )
}

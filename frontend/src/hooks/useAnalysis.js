import { useState, useCallback } from 'react'

export function useAnalysis() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [step, setStep] = useState('')

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const analyze = useCallback(async (query) => {
    setLoading(true)
    setError(null)
    setData(null)

    const steps = [
      'Resolving company & ticker...',
      'Step 1: Gathering Fundamentals from Google & Yahoo Finance...',
      'Step 2: Computing Technical Indicators (RSI, MACD, MA) via Yahoo Finance...',
      'Step 3: Analyzing Institutional & Insider Activity via Yahoo Finance...',
      'Step 4: Sector Benchmarking & Macro Analysis...',
      'Step 5: Sentiment Analysis (News & Social Media)...',
      'Step 6: Generating Final Score & Recommendation...',
    ]

    let currentContext = {}
    let resolvedTicker = query

    try {
      for (let i = 1; i <= 2; i++) {
        setStep(steps[i])
        
        const res = await fetch(`${API_BASE}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            query: resolvedTicker, 
            step: i,
            context: null
          }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({ detail: res.statusText }))
          throw new Error(err.detail || `Step ${i} failed`)
        }

        const result = await res.json()
        resolvedTicker = result.ticker 
        
        setData(prev => ({ 
          ...prev, 
          ticker: result.ticker, 
          companyName: result.data.fundamentals?.companyName || result.data.companyName || prev?.companyName,
          ...result.data 
        }))
      }
      setStep('')
    } catch (e) {
      setError(e.message)
      setStep('')
    } finally {
      setLoading(false)
    }
  }, [])

  const recomputeDCF = useCallback(async (params) => {
    const res = await fetch(`${API_BASE}/api/dcf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    if (!res.ok) throw new Error('DCF computation failed')
    return res.json()
  }, [])

  return { data, loading, error, step, analyze, recomputeDCF }
}

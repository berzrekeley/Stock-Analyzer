# Page: Investment Recommendation
> Overrides MASTER.md where noted.

## Layout (matches screenshot)

```
┌─────────────────────────────────────────────────────────┐
│  Recommendation Hero Card                               │
│  "Investment Recommendation"                            │
│  "Enter verdict with risk assessment"                   │
│  [BUY]  Target: $229.67                                │
├─────────────────────────────────────────────────────────┤
│  Investment Strengths │ Key Risk Factors │ Catalysts    │
│  (3-column grid)                                        │
└─────────────────────────────────────────────────────────┘
```

## Recommendation Hero Card

```css
.recommendation-hero {
  background: linear-gradient(135deg, #0D2018 0%, #0B1525 60%, #0A1220 100%);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}
```

- Title: `Inter 700 28px --text-primary`
- Subtitle: `Inter 400 14px --text-secondary`

**BUY badge** (large, centered):
```css
.badge-buy-hero {
  font: Inter 700 32px;
  color: #22C55E;
  background: rgba(34, 197, 94, 0.12);
  border: 2px solid rgba(34, 197, 94, 0.4);
  border-radius: 8px;
  padding: 12px 40px;
  letter-spacing: 0.15em;
  margin: 24px auto;
  display: inline-block;
}
```

**Target price** below badge: `Roboto Mono 600 18px --text-primary` "Target: $229.67"

## 3-Column Content Grid

### Column 1 — Investment Strengths (green left border)

```
Card: border-left 3px solid --bullish, bg --bg-surface

[CheckCircle icon 16px --bullish]  Investment Strengths
─────────────────────────────────
• Strong institutional momentum
• Number 1 GPU market share (86-94%)
• Exceptional margins (52.4% net margin)
• Excellent revenue growth 55.6% YoY
• CUDA ecosystem moat
• Data center share 88-90%
```

- Bullet points: `Inter 400 14px --text-secondary`, `line-height 1.8`
- Bullet dot: `8px` circle, `--bullish`

### Column 2 — Key Risk Factors (red left border)

```
Card: border-left 3px solid --bearish, bg --bg-surface

[AlertTriangle icon 16px --bearish]  Key Risk Factors
─────────────────────────────────
• High valuation multiples (P/E 53.8)
• China export restrictions / Barry pressure
• Competitive pressure from AMD MI300x
• Data center CapEx reduction risk
• AI infrastructure cyclicality headwinds
• Regulatory and geopolitical risk
```

- Bullet dot: `8px` circle, `--bearish`

### Column 3 — Catalysts (amber left border)

```
Card: border-left 3px solid --neutral, bg --bg-surface

[Zap icon 16px --neutral]  Catalysts
─────────────────────────────────
• November '19 earnings report
• Blackwell chip launch volumes
• AI infrastructure CapEx cycle
• Fed rate cuts supporting growth
• Data center and AI expansion
```

- Bullet dot: `8px` circle, `--neutral`

## Price Forecast Section (below 3 columns)

```
┌─────────────────────────────────────────────────────────┐
│  Price Forecast Range                                   │
│                                                         │
│  6-Month Target: $195 – $245                            │
│  12-Month Target: $220 – $280                           │
│                                                         │
│  Analyst Consensus: $229.67  (Strong Buy)               │
└─────────────────────────────────────────────────────────┘
```

- Section header: `Inter 600 18px --text-primary`
- Range values: `Roboto Mono 600 20px --text-primary`
- Analyst consensus: `Roboto Mono 500 16px --bullish`
- "Strong Buy" label: classification badge style, bullish

## Auto-Generated Summary Paragraph

```
┌─────────────────────────────────────────────────────────┐
│  Summary                                                │
│  ─────────────────────────────────────────────────────  │
│  NVDA is classified as UNDERVALUED based on its         │
│  exceptional revenue growth (55.6% YoY), dominant       │
│  market position in AI accelerators, and strong          │
│  institutional accumulation. The primary risk is         │
│  its premium valuation (P/E 53.5) and potential          │
│  headwinds from export restrictions. Catalysts           │
│  include the Blackwell chip cycle and continued          │
│  data center AI buildout. 6-month forecast: $195–245.   │
│  12-month forecast: $220–280.                            │
└─────────────────────────────────────────────────────────┘
```

- Background: `--bg-elevated`, `border-radius 8px`, `padding 24px`
- Border-left: `3px solid --accent`
- Text: `Inter 400 15px --text-secondary`, `line-height 1.7`
- "Summary" label: `Inter 600 14px --text-muted`, uppercase, letter-spacing 0.08em

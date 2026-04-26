# Page: Technical Analysis
> Overrides MASTER.md where noted.

## Page Header

```
[📈 icon]  Technical Analysis               [current price badge]
           Market momentum and price action indicators
```

## Layout: Chart-First, Indicator Cards Below

```
┌─────────────────────────────────────────────────────────┐
│  Price Chart + Moving Averages (full width, 320px tall) │
│  6-month OHLC area chart with 50d MA and 200d MA lines  │
├───────────────────┬─────────────────────────────────────┤
│  MACD Panel       │  RSI Panel                          │
│  (280px tall)     │  (280px tall)                       │
├───────────────────┴─────────────────────────────────────┤
│  Bollinger Bands (full width, 240px tall)               │
├─────────────────────────────────────────────────────────┤
│  Indicator Summary Cards (4-col grid)                   │
│  [Trend] [Momentum] [Volatility] [Volume]               │
└─────────────────────────────────────────────────────────┘
```

## Price Chart Spec

- Type: Area chart with line overlays
- X-axis: Date (last 6 months, tick every 2 weeks)
- Y-axis: Price in USD, right-aligned, dollar-formatted
- Price area: `#3B82F6` fill with `rgba(59,130,246,0.08)` gradient fill to transparent
- 50d MA line: `#F59E0B` (amber), `strokeWidth: 1.5`, dashed `strokeDasharray: "4 2"`
- 200d MA line: `#EC4899` (pink), `strokeWidth: 1.5`, dashed `strokeDasharray: "8 3"`
- Legend: top-right inside chart — Price, 50d MA, 200d MA
- Crosshair: vertical cursor line on hover, `#2D3F5A`
- Tooltip: shows Date, Price, 50d MA value, 200d MA value

**NVDA reference data** (Nov 2025 snapshot):
- 6-month range: Aug–Nov 2025
- Current: $188.15
- 50d MA: approximately $162–175 range (price above = bullish)
- 200d MA: approximately $128–145 range (price above = bullish)
- Trend: Price above both MAs → **Bullish**

## MACD Panel

- Upper line: MACD line (`#3B82F6`)
- Lower line: Signal line (`#06B6D4`)
- Histogram: green bars when MACD > Signal, red bars when MACD < Signal
- Zero line: `#1E2A3A` dashed
- X-axis: synced with price chart
- Tooltip: MACD, Signal, Histogram values

**NVDA MACD status** (Nov 2025): Positive and above signal line → bullish momentum

## RSI Panel

- Line: `#8B5CF6` (purple), `strokeWidth: 2`
- Overbought zone (70–100): `rgba(239,68,68,0.08)` fill, `#EF4444` dashed border at 70
- Oversold zone (0–30): `rgba(34,197,94,0.08)` fill, `#22C55E` dashed border at 30
- Neutral band label at 50
- Tooltip: RSI value + status label (Overbought / Neutral / Oversold)

**NVDA RSI status** (Nov 2025): ~62 → Moderately bullish, not yet overbought

## Bollinger Bands Panel

- Middle band (20d MA): `#F8FAFC`, `strokeWidth: 1.5`
- Upper band: `#94A3B8`, `strokeWidth: 1`, dashed
- Lower band: `#94A3B8`, `strokeWidth: 1`, dashed
- Band fill: `rgba(148,163,184,0.06)` between upper and lower
- Price line: `#3B82F6`

## Indicator Summary Cards (4 cards, equal width)

### Card 1 — Trend Direction
```
[Arrow icon - up]
Bullish
Trend Direction
──────────────────
Price above 50d MA: ✓
Price above 200d MA: ✓
Golden Cross: Active
```
- Border top: `3px solid #22C55E`
- Status: `Inter 700 18px --bullish`

### Card 2 — Momentum (RSI)
```
[Gauge icon]
62.4
RSI (14-day)
──────────────────
Status: Neutral-Bullish
Not overbought
14d Change: +8.2
```
- Border top: `3px solid #F59E0B`
- RSI value: `Roboto Mono 700 24px --text-primary`

### Card 3 — Volatility (Bollinger)
```
[Activity icon]
Moderate
Volatility Level
──────────────────
Band Width: 12.4%
Price position: Upper half
Squeeze: No
```
- Border top: `3px solid #06B6D4`

### Card 4 — Volume (OBV)
```
[TrendingUp icon]
Accumulation
OBV Trend
──────────────────
OBV trending up
Confirms price action
Institutional buying: Likely
```
- Border top: `3px solid #8B5CF6`

## Technical Score Summary Banner

Full-width banner at bottom of page:
```
┌─────────────────────────────────────────────────────────┐
│  Technical Analysis Score: 70/100  [Weight: 20%]        │
│  "Momentum broadly aligns with fundamental value.        │
│   Price above both moving averages confirms the          │
│   bullish trend. RSI not yet overbought."                │
└─────────────────────────────────────────────────────────┘
```
- Background: `rgba(16,185,129,0.05)`, border: `1px solid rgba(16,185,129,0.15)`
- Score: `Roboto Mono 700 28px --bullish`
- Weight badge: `Inter 500 12px --text-muted`

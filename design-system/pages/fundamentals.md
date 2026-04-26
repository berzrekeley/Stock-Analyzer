# Page: Fundamentals
> Overrides MASTER.md where noted. Inherits all other rules from MASTER.

## Page Header

```
[BarChart2 icon]  Fundamental Analysis             Market Cap: $4.58T →
                  Financial ratios and valuation metrics
```

- Icon: 32px circle, `--bg-elevated`, `BarChart2` from Lucide
- Title: `Inter 700 24px --text-primary`
- Subtitle: `Inter 400 14px --text-secondary`
- Right-aligned market cap: `Roboto Mono 600 16px --text-primary` label `Inter 400 12px --text-muted`

---

## 4 Metric Circle Badge Cards (top grid, equal-width 4-col)

Reuses the Metric Circle Badge Card pattern from MASTER.md §6.

| Slot | Metric | Value | Circle Color Token | Delta |
|------|--------|-------|--------------------|-------|
| 1 | Current P/E | 53.5 | `--metric-blue` | vs 45.7 sector |
| 2 | Revenue Growth | +55.6% | `--metric-cyan` | YoY |
| 3 | Profit Margin | 52.4% | `--metric-purple` | Net margin |
| 4 | Price Target | $229.67 | `--metric-orange` | Analyst consensus |

Each card:
```
[●]   53.5              ← Roboto Mono 600 24px --text-primary
Current P/E             ← Inter 500 13px --text-secondary
↑ vs 45.7 sector        ← Inter 400 11px --bullish (or --bearish)
```

---

## Valuation Ratios Card (full width)

### Header
```
[Scale icon]  Valuation Ratings vs. Benchmarks
```

### Table

5 rows × 4 columns. Row height: 48px.

| Metric | NVDA Value | Sector Median | vs Sector |
|--------|-----------|---------------|-----------|
| P/E Ratio | 53.5 | 28.9 | +85% Premium badge (--neutral) |
| PEG Ratio | 1.8 | 2.1 | -14% Discount badge (--bullish) |
| P/B Ratio | 42.3 | 8.4 | +403% Premium badge (--neutral) |
| P/S Ratio | 24.1 | 4.8 | +402% Premium badge (--neutral) |
| EV/EBITDA | 47.2 | 19.3 | +145% Premium badge (--neutral) |

Badge styling:
- "Premium": `--neutral-bg`, `--neutral` text, `border: 1px solid --neutral-border`
- "Discount": `--bullish-bg`, `--bullish` text
- "In-Line": `--bg-elevated`, `--text-secondary` text

NVDA value column: `Roboto Mono 500 14px`, right-aligned.
Sector median column: `Roboto Mono 400 14px --text-muted`, right-aligned.
Metric label: `Inter 400 14px --text-primary`, left-aligned.

---

## Profitability & Growth Card (left 50%) + Health Metrics Card (right 50%)

### Profitability & Growth Card

```
[TrendingUp icon]  Profitability & Growth
```

2×2 grid of inline stat tiles inside the card:

```
┌────────────────────┬────────────────────┐
│ Revenue CAGR (1Y)  │ Revenue CAGR (3Y)  │
│ +55.6%             │ +72.3%             │
├────────────────────┼────────────────────┤
│ Net Margin         │ Gross Margin       │
│ 52.4%              │ 71.1%              │
└────────────────────┴────────────────────┘
```

Below the 2×2: EPS Growth (1Y) inline stat → `+88.3%` | `Roboto Mono 600 18px --bullish`

Each tile:
- Value: `Roboto Mono 600 20px --text-primary`
- Label: `Inter 400 12px --text-muted`
- Positive values: `--bullish` color on value

### Health Metrics Card

```
[Heart icon]  Financial Health
```

2×2 grid of inline stat tiles:

```
┌────────────────────┬────────────────────┐
│ Debt / Equity      │ Current Ratio      │
│ 0.41               │ 4.2x               │
├────────────────────┼────────────────────┤
│ Free Cash Flow     │ Return on Equity   │
│ $60.8B             │ 91.2%              │
└────────────────────┴────────────────────┘
```

Below the 2×2: Net Cash inline stat → `$46.2B` | `Roboto Mono 600 18px --bullish`

Interpretation footnote (border-left 3px `--accent`, `--bg-elevated`, padding 12px 16px):
```
"All health metrics indicate a fortress balance sheet. Low leverage,
 high liquidity, and exceptional free cash flow generation support
 continued R&D investment and share buybacks."
```
Font: `Inter 400 13px --text-secondary`

---

## DCF / Intrinsic Value Card (full width)

```
[Target icon]  Valuation Analysis Image — DCF Model
               Discounted cash flow intrinsic value vs current market price
```

### Left panel — Assumptions grid (2×2)

| Assumption | Value |
|------------|-------|
| WACC | 9.2% |
| Terminal Growth Rate | 3.5% |
| 5Y Revenue CAGR | 35–45% |
| Projection Horizon | 5 Years |

Each stat: `Inter 400 13px --text-muted` label, `Roboto Mono 600 18px --text-primary` value.

### Right panel — Bar chart + key metrics

**Chart**: Side-by-side vertical bars (Recharts BarChart)
- Bar 1: "Current Price $188.15" — color `--bearish` (`#EF4444`), height proportional to value
- Bar 2: "DCF Intrinsic Value $58.87" — color `--metric-cyan` (`#06B6D4`)
- X-axis labels: "Market Price" | "DCF Value"
- Y-axis: USD, right-aligned, dollar-formatted, no gridline above bars
- Chart height: 200px

Below chart, 2 inline metrics:
```
Intrinsic Value       Margin of Safety
$58.87                -68.71%
Roboto Mono 700 24px  Roboto Mono 700 24px --bearish
```

Interpretation note (same border-left style as Health Metrics):
```
"The negative margin of safety (-68.71%) indicates NVDA trades at a
 significant premium to its DCF value. This is consistent with high-
 growth AI companies where market pricing reflects future optionality
 beyond a traditional 5-year DCF window. The composite score accounts
 for this by weighting fundamentals at 40% alongside momentum, sentiment,
 and sector factors."
```

---

## Score Summary Banner

```
┌─────────────────────────────────────────────────────────┐
│  Fundamentals Score: 90/100   [Weight: 40%]             │
│  "NVDA's fundamentals are exceptional — 55.6% revenue   │
│   growth, 52.4% net margins, and a fortress balance      │
│   sheet justify a premium valuation. The DCF model       │
│   shows above-intrinsic-value pricing, consistent with  │
│   high-growth AI infrastructure leaders."                │
└─────────────────────────────────────────────────────────┘
```

- Background: `rgba(16,185,129,0.05)`, border: `1px solid rgba(16,185,129,0.15)`, radius: `8px`
- Score: `Roboto Mono 700 28px --bullish`
- Weight badge: `Inter 500 12px --text-muted`, `--bg-elevated` pill
- Prose: `Inter 400 14px --text-secondary`, `line-height 1.7`

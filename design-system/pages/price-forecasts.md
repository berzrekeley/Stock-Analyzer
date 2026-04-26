# Page: Price Forecasts
> Overrides MASTER.md where noted. Inherits all other rules from MASTER.
> This is an OUTPUT page — no factor score. It synthesizes DCF + analyst data into forward-looking price targets.

## Page Header

```
[TrendingUp icon]  Price Forecasts                  Current: $188.15 →
                   Forward-looking price targets based on DCF model and analyst consensus
```

- Icon: 32px circle, `--bg-elevated`, `TrendingUp` from Lucide
- Right-aligned current price: `Roboto Mono 600 16px --text-primary`, label `Inter 400 12px --text-muted`

---

## Forecast Range Hero Card (full width)

Gradient card matching Investment Recommendation hero style:

```css
.forecast-hero {
  background: linear-gradient(135deg, #0A1525 0%, #0D1F2D 50%, #0B1820 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);  /* --metric-blue tint */
  border-radius: 12px;
  padding: 40px;
}
```

**Layout**: 2-column split inside the card.

**Left column** — 6-Month Forecast:
```
6-Month Target
$195 – $245
Roboto Mono 600 32px --text-primary

Base case: $220  ← Roboto Mono 500 16px --metric-cyan
```

**Right column** — 12-Month Forecast:
```
12-Month Target
$220 – $280
Roboto Mono 600 32px --text-primary

Base case: $250  ← Roboto Mono 500 16px --metric-cyan
```

**Below the 2-col split** — Horizontal range bar chart (Recharts ComposedChart):
- Single horizontal track, full card width
- Current price marker: `$188.15` — vertical dashed line in `--text-muted`
- 6M range band: `rgba(59,130,246,0.15)` fill, $195–$245
- 12M range band: `rgba(16,185,129,0.12)` fill, $220–$280
- Labels at left/right endpoints: `Roboto Mono 400 11px --text-muted`
- Chart height: 80px

---

## DCF Model Card (left 50%) + Scenario Analysis Card (right 50%)

### DCF Model Card

```
[Calculator icon]  DCF Model Assumptions
                   Inputs used to derive intrinsic value estimate
```

**Top: Assumptions 2×2 grid**

```
┌─────────────────────┬─────────────────────┐
│ WACC                │ Terminal Growth Rate │
│ 9.2%                │ 3.5%                │
├─────────────────────┼─────────────────────┤
│ 5Y Revenue CAGR     │ Projection Horizon  │
│ 35–45%              │ 5 Years             │
└─────────────────────┴─────────────────────┘
```

Each tile: value `Roboto Mono 600 20px --text-primary`, label `Inter 400 12px --text-muted`

**Bottom: DCF vs Market Price bar chart** (reused from `fundamentals.md` DCF section)

Recharts BarChart, 2 bars, height 180px:
- Bar 1: "Market Price" → $188.15 → `--bearish` (`#EF4444`)
- Bar 2: "DCF Base Case" → $58.87 → `--metric-cyan` (`#06B6D4`)
- Value labels above each bar: `Roboto Mono 500 12px --text-primary`
- X-axis: bar labels, `Inter 400 12px --text-muted`
- No Y-axis labels — values are on bars

Below chart, 2 key stats inline:
```
Intrinsic Value (Base)    Margin of Safety
$58.87                    -68.71%
Roboto Mono 700 22px      Roboto Mono 700 22px --bearish
```

Margin of Safety note:
```
Inter 400 12px --text-muted, margin-top 8px
"Negative margin of safety reflects growth premium beyond 5-year DCF horizon."
```

### Scenario Analysis Card

```
[GitBranch icon]  Scenario Analysis
                  Intrinsic value under conservative, base, and bull assumptions
```

3 scenario rows, stacked. Each row:

```
┌────────────────────────────────────────────────────────┐
│  [badge]   Key Assumption            Intrinsic Value   │
│  CONSERVATIVE   WACC 11%, 5Y CAGR 25%      $52.00     │
├────────────────────────────────────────────────────────┤
│  BASE CASE      WACC 9.2%, 5Y CAGR 35%    $58.87     │
├────────────────────────────────────────────────────────┤
│  BULL CASE      WACC 8%, 5Y CAGR 45%       $78.00     │
└────────────────────────────────────────────────────────┘
```

Row layout: scenario badge (left) | assumption text (center) | intrinsic value (right, Roboto Mono 600 18px)
Row height: 60px. Divider: `1px solid --border-subtle`.

Scenario badge styles:
- "CONSERVATIVE": `--bearish-bg`, `--bearish` text, `Inter 600 11px` uppercase
- "BASE CASE": `--neutral-bg`, `--neutral` text
- "BULL CASE": `--bullish-bg`, `--bullish` text

Assumption text: `Inter 400 13px --text-secondary`
Intrinsic value color:
- Conservative: `--bearish`
- Base: `--text-primary`
- Bull: `--bullish`

Below 3 rows — additional context:
```
border-left 3px --neutral | --bg-elevated | padding 12px 16px
"All three scenarios assume terminal growth of 3.5% post-projection period.
 The bull case captures accelerated AI infrastructure adoption and expanded
 total addressable market from Blackwell-era products."
```
Font: `Inter 400 13px --text-secondary`

---

## Analyst Consensus Card (full width)

```
[Users icon]  Analyst Consensus
              Wall Street price targets and rating distribution
```

**Top row — Consensus target (hero stat, centered)**:
```
$229.67
Roboto Mono 700 48px --bullish
Analyst Median Price Target

[STRONG BUY]  ← classification badge (bullish)
```

**Horizontal range bar** (below hero stat):

```
$185 ────────────────────●────────────────────── $300+
Low   $185              $229.67 Median           High $300+
```

- Bar track: `height 8px`, `border-radius 4px`, bg `--border-default`
- Filled portion (Low → Median): `--metric-blue`
- Median marker dot: `14px` circle, `--bullish`, white border `2px`
- End cap (Median → High): `--metric-cyan` (lighter, dashed)
- Labels below: `Roboto Mono 400 12px --text-muted`

**Analyst breakdown table** (below range bar):

5 rows × 4 columns. Row height: 44px.

| Firm | Analyst | Price Target | Rating |
|------|---------|-------------|--------|
| Morgan Stanley | Joseph Moore | $250 | Overweight |
| Bank of America | Vivek Arya | $245 | Buy |
| Bernstein | Stacy Rasgon | $230 | Outperform |
| Goldman Sachs | Toshiya Hari | $220 | Buy |
| Barclays | Tom O'Malley | $215 | Overweight |

Firm: `Inter 400 14px --text-primary`
Analyst: `Inter 400 13px --text-muted`
Price Target: `Roboto Mono 500 14px --text-primary`, right-aligned
Rating badge: small badge — "Buy"/"Overweight"/"Outperform" → bullish style, "Hold"/"Neutral" → neutral style

---

## Classification Banner (replaces Score Summary Banner for output pages)

```
┌─────────────────────────────────────────────────────────┐
│  Based on Composite Score: 82.0  [UNDERVALUED]          │
│  12-Month Base Case Target: $250 | Range: $220–$280     │
│                                                         │
│  "Forward price targets reflect a blend of DCF-derived  │
│   intrinsic value (base $58.87) and the analyst          │
│   consensus ($229.67). The wide spread reflects NVDA's  │
│   growth optionality — markets are pricing in a multi-  │
│   year AI infrastructure cycle beyond a 5-year DCF."    │
│                             [→ View Investment Recommendation] │
└─────────────────────────────────────────────────────────┘
```

- Background: `rgba(16,185,129,0.05)`, border: `1px solid rgba(16,185,129,0.15)`, radius: `8px`, padding: `24px`
- Composite score: `Roboto Mono 700 20px --text-primary`
- Classification badge: standard UNDERVALUED badge (bullish)
- 12M target line: `Roboto Mono 600 16px --bullish`
- Prose: `Inter 400 14px --text-secondary`, `line-height 1.7`
- CTA link: `Inter 500 14px --accent`, underline on hover, `ArrowRight 14px` icon inline

---

## Loading State

This page makes a calculated output from prior analysis steps. If data is unavailable:

```
[Calculator icon 32px --text-muted]
"Price forecast data requires a completed analysis."
"Run the full analysis from the Executive Summary page first."
[→ Go to Executive Summary]  ← ghost button (--accent)
```
Centered in page content area, `margin-top: 80px`.

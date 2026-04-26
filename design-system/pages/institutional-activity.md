# Page: Institutional Activity
> Overrides MASTER.md where noted.

## Page Header

```
[🏦 icon]  Institutional & Insider Activity      [Score: 82/100 badge]
           Smart money positioning and insider trading signals
```

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  Phase Banner (full width)                              │
│  "ACCUMULATION PHASE" or "DISTRIBUTION PHASE"           │
├──────────────────────┬──────────────────────────────────┤
│  Insider Activity    │  Institutional Holdings          │
│  (left card, 50%)    │  (right card, 50%)               │
├──────────────────────┴──────────────────────────────────┤
│  Top Institutional Holders Table (full width)           │
├─────────────────────────────────────────────────────────┤
│  Institutional Activity Score Banner                    │
└─────────────────────────────────────────────────────────┘
```

## Phase Banner

Large full-width card at top — most prominent element on the page:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    [TrendingUp icon 32px]                               │
│    ACCUMULATION PHASE                                   │
│    Institutions are net buyers over the past quarter    │
│                                                         │
│    Institutional Ownership: 66.3%                       │
│    QoQ Change: +2.1%          Insider Buy Ratio: 0.82   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- **Accumulation phase**: `bg rgba(34,197,94,0.06)`, `border 1px solid rgba(34,197,94,0.2)`, icon + title `--bullish`
- **Distribution phase**: `bg rgba(239,68,68,0.06)`, `border 1px solid rgba(239,68,68,0.2)`, icon + title `--bearish`
- Phase label: `Inter 700 22px`
- Description: `Inter 400 14px --text-secondary`
- Stats row: 3 inline stats, `Roboto Mono 600 18px` values, `Inter 400 12px --text-muted` labels

**NVDA data** (Nov 2025): Accumulation phase — institutional ownership ~66%, positive net inflows

## Insider Activity Card (left)

### Header
```
[UserCheck icon]  Insider Trading (90-Day)
```

### Content
```
Buy / Sell Ratio
────────────────
     0.82
  ← ratio display: Roboto Mono 700 36px
  color: --neutral (between 0.5 and 1.2 = mixed)

Buy transactions:   3
Sell transactions:  4  (tax planning / options exercise)

Notable Transactions:
──────────────────────────────────────────────
Name            Role      Action   Shares    Date
Jensen Huang    CEO       Sell     50,000    Oct 2025
Colette Kress   CFO       Sell     12,000    Oct 2025
[Board member]  Director  Buy       5,000    Sep 2025
──────────────────────────────────────────────

Interpretation
"Insider selling in Q3/Q4 2025 primarily reflects
 planned options exercises and diversification —
 a common pattern for NVDA executives given the
 stock's significant appreciation. Not a bearish
 signal in isolation."
```

- Table: compact rows `36px`, alternating bg, `Roboto Mono 500 13px` for numbers
- Interpretation: `Inter 400 13px --text-secondary`, `bg --bg-elevated`, `border-left 3px solid --neutral`, padding `12px 16px`, `border-radius 4px`
- Buy/sell ratio color: < 0.5 = bearish, 0.5–1.5 = neutral, > 1.5 = bullish

## Institutional Holdings Card (right)

### Header
```
[Building2 icon]  Institutional Holdings
```

### Content
```
Total Institutional Ownership
──────────────────────────────
  66.3%
  ← Roboto Mono 700 36px --text-primary

Quarter-over-Quarter Change: +2.1%  ← --bullish with up arrow

Ownership Trend Chart (12 months)
─────────────────────────────────
[Bar chart — 4 quarters, showing institutional % each quarter]
Q1 2025  Q2 2025  Q3 2025  Q4 2025
  62.1%    63.5%    64.8%    66.3%   ← values on bars

Sentiment:  ACCUMULATION
Phase note: Net buyers for 4 consecutive quarters
```

- Bar chart: `height: 160px`, bars in `--metric-blue`, value labels on top of bars in `Roboto Mono 500 11px`
- Sentiment badge: same classification badge style as MASTER.md
- QoQ change: up arrow icon (Lucide `TrendingUp 16px`) + value in `--bullish`

## Top Institutional Holders Table (full width)

### Header
```
[List icon]  Top Institutional Holders
             Largest shareholders by reported position size
```

### Table columns
| Rank | Institution | Shares Held | % of Float | QoQ Change | Sentiment |
|------|-------------|-------------|------------|------------|-----------|

**NVDA reference data** (approximate, Nov 2025):

| Rank | Institution | Shares Held | % Float | QoQ Change | Sentiment |
|------|-------------|-------------|---------|------------|-----------|
| 1 | Vanguard Group | 3.12B | 12.7% | +1.2% | Accumulating |
| 2 | BlackRock | 2.89B | 11.8% | +0.8% | Accumulating |
| 3 | State Street | 1.54B | 6.3% | -0.3% | Holding |
| 4 | Fidelity | 1.22B | 5.0% | +2.1% | Accumulating |
| 5 | Capital Research | 0.98B | 4.0% | +0.5% | Holding |
| 6 | T. Rowe Price | 0.81B | 3.3% | -0.1% | Reducing |
| 7 | Geode Capital | 0.72B | 2.9% | +0.6% | Accumulating |

### Table styling

- Row height: `48px`
- Rank: `Inter 500 13px --text-muted`
- Institution name: `Inter 500 14px --text-primary`
- Numbers (Shares, %): `Roboto Mono 500 13px`, right-aligned
- QoQ Change: delta with colored arrow — positive `--bullish ↑`, negative `--bearish ↓`, zero `--text-muted —`
- Sentiment: small badge — "Accumulating" `--bullish-bg`, "Reducing" `--bearish-bg`, "Holding" `--bg-elevated`
- Sort: default by Shares Held desc, sortable on all numeric columns

## Institutional Score Summary Banner

```
┌─────────────────────────────────────────────────────────┐
│  Institutional & Insider Score: 82/100  [Weight: 10%]   │
│  "Institutional ownership is rising quarter-over-quarter │
│   with accumulation from top-tier holders. Insider       │
│   selling reflects routine diversification, not a        │
│   fundamental concern."                                  │
└─────────────────────────────────────────────────────────┘
```

- Score: `Roboto Mono 700 28px --bullish`
- Weight badge: `Inter 500 12px --text-muted`
- Background/border: matches Technical Analysis Score Banner (emerald muted)

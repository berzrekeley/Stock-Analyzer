# Page: Sector Comparison
> Overrides MASTER.md where noted. Inherits all other rules from MASTER.

## Page Header

```
[Globe icon]  Sector Comparison                    Score: 82/100 →
              Industry positioning and competitive analysis
```

- Icon: 32px circle, `--bg-elevated`, `Globe` from Lucide
- Right-aligned score badge: same classification badge style (bullish, score 82/100)

---

## Market Position Card (left 50%) + Valuation vs Peers Card (right 50%)

### Market Position Card

```
[Target icon]  Market Position
               NVDA's competitive positioning in the AI/semiconductor space
```

3 metric rows, each row:
```
Label              Value                  Badge
──────────────────────────────────────────────────────
AI GPU Market Share    86–94%             [Dominant]
Data Center Share      88–90%             [Dominant]
Competitive Moat       Wide               [Wide]
```

Row layout: label (`Inter 400 14px --text-secondary`) | value (`Roboto Mono 600 16px --text-primary`) | badge (right-aligned)

Badge specs:
- "Dominant": `--bullish-bg`, `--bullish` text, `--bullish-border`
- "Wide": `--bullish-bg`, `--bullish` text, `--bullish-border`
- "Narrow": `--neutral-bg`, `--neutral` text
- "Contested": `--bearish-bg`, `--bearish` text

Row height: 56px. Divider between rows: `1px solid --border-subtle`.

### Valuation vs Peers Card

```
[BarChart icon]  Valuation vs Peers
                 Premium/discount analysis vs semiconductor sector
```

3 metric rows:

```
Label              Value               Badge
──────────────────────────────────────────────────────
P/E vs Sector      +85% Premium        [Premium]
P/S vs Sector      +876% Premium       [Premium]
Justification      AI Leadership       [Justified]
```

Badge specs:
- "Premium": `--neutral-bg`, `--neutral` text, `--neutral-border`
- "Justified": `--bullish-bg`, `--bullish` text, `--bullish-border`
- "Unjustified": `--bearish-bg`, `--bearish` text

Justification row explanation note (below the 3 rows, inside card):
```
Inter 400 13px --text-muted | border-left 3px --accent | --bg-elevated | padding 12px 16px
"NVDA's premium valuation is supported by its dominant AI GPU market
 position, CUDA moat, and accelerating data center demand — factors
 not captured in trailing sector averages."
```

---

## Peer Comparison Table (full width)

### Header

```
[Users icon]  Peer Benchmarking
              Valuation multiples: NVDA vs semiconductor peers
```

### Table

6 rows × 6 columns. Row height: 48px.

| Company | P/E | P/S | P/B | EV/EBITDA | Moat |
|---------|-----|-----|-----|-----------|------|
| **NVDA** ← highlighted | 53.5 | 24.1 | 42.3 | 47.2 | Wide |
| AMD | 98.3 | 8.2 | 4.2 | 52.1 | Narrow |
| INTC | 22.1 | 2.4 | 1.1 | 14.8 | Narrow |
| QCOM | 17.4 | 4.9 | 7.8 | 12.3 | Narrow |
| AVGO | 34.2 | 11.6 | 19.4 | 26.7 | Narrow |
| Sector Median | 28.9 | 4.8 | 8.4 | 19.3 | — |

NVDA row: `background: rgba(16,185,129,0.08)`, `border-left: 3px solid #10B981`
NVDA company label: `Inter 600 14px --text-active`

Moat column: small badge — "Wide" bullish, "Narrow" neutral, "—" muted text.

Sector Median row: `Inter 500 13px --text-muted` italic, `--border-subtle` top border (separator).

All number cells: `Roboto Mono 500 13px`, right-aligned.
Company name cells: `Inter 400 14px --text-primary`, left-aligned.
Header row: `Inter 500 12px --text-muted` uppercase, `--bg-elevated`.

---

## Macro Environment Card (full width)

### Header

```
[TrendingUp icon]  Macroeconomic Environment
                   Broader market conditions affecting NVDA's fair value
```

### 4-Column Stat Tile Grid

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│ Fed Policy       │ Inflation        │ Sector Rotation  │ AI CapEx Cycle   │
│ Rate Cuts        │ Moderating       │ Tech Favorable   │ Accelerating     │
│ Supportive  ✓    │ Supportive  ✓    │ Tailwind  ✓      │ Tailwind  ✓      │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

Each tile:
- Label: `Inter 500 13px --text-muted` (e.g., "Fed Policy")
- Value: `Inter 600 15px --text-primary` (e.g., "Rate Cuts")
- Status: `Inter 500 12px --bullish` + `CheckCircle 14px` icon (e.g., "Supportive")
- Border-top: `3px solid --bullish` (for positive/tailwind) or `--bearish` (for headwinds)
- Padding: 20px, `--bg-elevated`, `radius: 8px`

**Headwind variant** (if applicable — none for NVDA Nov 2025):
- Status: `Inter 500 12px --bearish` + `AlertCircle 14px` icon
- Border-top: `3px solid --bearish`

Below the 4 tiles — a single paragraph interpretation:
```
"The macroeconomic backdrop is broadly favorable for NVDA. Federal Reserve
 rate cuts reduce the discount rate applied to high-growth equities,
 supporting premium valuations. Moderating inflation and a strong AI
 infrastructure investment cycle create a sustained demand tailwind for
 data center GPU products through 2026."
```
Style: `Inter 400 14px --text-secondary`, `line-height 1.7`, margin-top `16px`.

---

## Score Summary Banner

```
┌─────────────────────────────────────────────────────────┐
│  Sector/Macro Score: 82/100   [Weight: 15%]             │
│  "NVDA dominates the AI GPU market with 86–94% share    │
│   and an 88–90% data center position. While trading at  │
│   a meaningful premium to sector peers, the moat and    │
│   macro environment justify the premium pricing."        │
└─────────────────────────────────────────────────────────┘
```

- Background: `rgba(16,185,129,0.05)`, border: `1px solid rgba(16,185,129,0.15)`, radius: `8px`
- Score: `Roboto Mono 700 28px --bullish`
- Weight badge: `Inter 500 12px --text-muted`, `--bg-elevated` pill
- Prose: `Inter 400 14px --text-secondary`, `line-height 1.7`

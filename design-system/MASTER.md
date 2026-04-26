# Design System — Multi-Factor AI Stock Analysis Platform
> Source of Truth derived from reference screenshots. Page-specific overrides in `/pages/`.

---

## 1. Product Context

| Field | Value |
|-------|-------|
| Product Type | Professional Fintech SaaS — Data Analytics Dashboard |
| Audience | Self-directed investors, active traders, financial analysts |
| Usage Context | Desktop-primary; extended sessions; high information density |
| Tone | Authoritative, precise, data-forward — zero decorative UI |
| Style | **Dark Professional Navy** — deep navy bg, emerald accents, colored metric badges |

---

## 2. Color System

### Backgrounds

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-root` | `#0B0E1A` | Page / app root background |
| `--bg-sidebar` | `#0D1117` | Left sidebar |
| `--bg-surface` | `#111827` | Cards, panels |
| `--bg-elevated` | `#1C2535` | Hover states, dropdown menus, modals |
| `--bg-input` | `#1A2233` | Form inputs |
| `--bg-header` | `#0B0E1A` | Top header bar |

### Borders

| Token | Hex | Usage |
|-------|-----|-------|
| `--border-default` | `#1E2A3A` | Card borders, dividers |
| `--border-subtle` | `#141D2E` | Inner section dividers |
| `--border-active` | `#10B981` | Active nav item left border |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#F8FAFC` | Headings, key values, prices |
| `--text-secondary` | `#94A3B8` | Labels, descriptions, subtitles |
| `--text-muted` | `#64748B` | Timestamps, captions, weight labels |
| `--text-active` | `#10B981` | Active nav items, highlighted labels |

### Semantic / Classification Colors

| Token | Hex | Context |
|-------|-----|---------|
| `--color-bullish` | `#22C55E` | UNDERVALUED badge, positive delta, buy |
| `--color-bullish-bg` | `rgba(34,197,94,0.12)` | UNDERVALUED badge background |
| `--color-bullish-border` | `rgba(34,197,94,0.3)` | UNDERVALUED badge border |
| `--color-bearish` | `#EF4444` | OVERPRICED badge, negative delta, sell |
| `--color-bearish-bg` | `rgba(239,68,68,0.12)` | OVERPRICED badge background |
| `--color-neutral` | `#F59E0B` | FAIRLY PRICED badge, hold |
| `--color-neutral-bg` | `rgba(245,158,11,0.12)` | FAIRLY PRICED badge background |
| `--color-accent` | `#10B981` | Active nav, interactive highlights, sidebar active |
| `--color-accent-hover` | `#059669` | Accent hover |
| `--color-accent-muted` | `rgba(16,185,129,0.1)` | Active nav background |

### Metric Badge Circle Colors (observed from screenshots)

| Metric Type | Circle Color | Hex |
|-------------|-------------|-----|
| P/E Ratio | Blue | `#3B82F6` |
| Revenue Growth | Blue-Green | `#06B6D4` |
| Profit Margin | Purple/Violet | `#8B5CF6` |
| Price Target | Orange | `#F97316` |
| Composite Score | Green (matches bullish) | `#22C55E` |
| DCF / Intrinsic Value | Teal | `#14B8A6` |

### Chart Series Palette (Colorblind-safe)

| Series | Hex | Label |
|--------|-----|-------|
| Price / Main | `#3B82F6` | Primary data series |
| Volume | `#06B6D4` | Volume / OBV |
| 50-day MA | `#F59E0B` | Moving average 1 |
| 200-day MA | `#EC4899` | Moving average 2 |
| Benchmark | `#8B5CF6` | Sector / peer comparison |
| Positive signal | `#22C55E` | Buy, bullish bars |
| Negative signal | `#EF4444` | Sell, bearish bars |
| Grid / Neutral | `#1E2A3A` | Gridlines only |

> **Rule**: Never use color as the sole data differentiator — always pair with label, icon, or pattern.

---

## 3. Typography

### Fonts

| Role | Font | Fallback | Weights |
|------|------|----------|---------|
| UI / Headings | `Inter` | system-ui, sans-serif | 400, 500, 600, 700 |
| Data / Numbers | `Roboto Mono` | `JetBrains Mono`, monospace | 400, 500, 600 |

> The reference screenshots show **Roboto Mono** (the docx embeds RobotoMono font files). Use this for all financial figures.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Token | Size | Line Height | Weight | Font | Usage |
|-------|------|-------------|--------|------|-------|
| `text-xs` | 11px | 1.5 | 400 | Inter | Captions, weight labels |
| `text-sm` | 13px | 1.5 | 500 | Inter | Nav labels, helper text |
| `text-base` | 15px | 1.6 | 400 | Inter | Body, descriptions |
| `text-lg` | 17px | 1.5 | 500 | Inter | Section subtitles |
| `text-xl` | 20px | 1.4 | 600 | Inter | Card titles, page section headers |
| `text-2xl` | 24px | 1.3 | 700 | Inter | Page headings |
| `mono-sm` | 12px | 1.4 | 400 | Roboto Mono | Table values, small data |
| `mono-base` | 14px | 1.4 | 500 | Roboto Mono | Standard metric values |
| `mono-lg` | 18px | 1.3 | 500 | Roboto Mono | Card metric values |
| `mono-xl` | 24px | 1.2 | 600 | Roboto Mono | Price display |
| `mono-hero` | 36px | 1.1 | 700 | Roboto Mono | Composite score hero number |
| `mono-score` | 48px | 1.0 | 700 | Roboto Mono | Large score ring number |

> **Rule**: ALL financial figures (prices, ratios, scores, percentages) use Roboto Mono with `font-variant-numeric: tabular-nums`.

---

## 4. Spacing (8px grid)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon-to-label gap |
| `space-2` | 8px | Inline gaps |
| `space-3` | 12px | Input vertical padding |
| `space-4` | 16px | Card inner padding (compact) |
| `space-6` | 24px | Card padding (standard) |
| `space-8` | 32px | Between major sections |
| `space-10` | 40px | Page-level vertical rhythm |
| `space-12` | 48px | Section breaks |

---

## 5. Layout

### App Shell

```
┌────────────────────────────────────────────────────────┐
│  Sidebar (220px fixed, bg: --bg-sidebar)               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [N] NVDA  ←─ ticker badge                        │  │
│  │     Stock Analysis                               │  │
│  │ ─────────────────────────────                   │  │
│  │ · Executive Summary      ← active: emerald bar  │  │
│  │ · Fundamentals                                  │  │
│  │ · Technical Analysis                            │  │
│  │ · Institutional Activity                        │  │
│  │ · Sector Comparison                             │  │
│  │ · Sentiment Analysis                            │  │
│  │ · Composite Scoring                             │  │
│  │ · Price Forecasts                               │  │
│  │ · Investment Recommendation                     │  │
│  └──────────────────────────────────────────────────┘  │
│  ─────────────────────────────────────────────────────  │
│  Main Content (fluid, bg: --bg-root)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Header bar (sticky 64px)                         │  │
│  │ "NVIDIA Corporation (NVDA)"                      │  │
│  │ Professional Stock Analysis Dashboard •          │  │
│  │ Current Price: $188.15 • Classification: BADGE   │  │
│  │                              Score: [82/100] →   │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ Page content — card grid (padding: 0 32px)       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Sidebar Nav Item States

```css
/* Default */
.nav-item { color: #94A3B8; padding: 10px 16px; border-left: 3px solid transparent; }

/* Hover */
.nav-item:hover { background: rgba(16,185,129,0.05); color: #F8FAFC; }

/* Active */
.nav-item.active {
  background: rgba(16,185,129,0.1);
  color: #10B981;
  border-left: 3px solid #10B981;
  font-weight: 600;
}
```

### Top Header Bar (sticky)

- Height: `64px`
- Background: `--bg-root` with bottom border `1px solid --border-default`
- Left: Company name `Inter 600 18px` + subtitle `Inter 400 13px --text-secondary`
- Right: Score badge `Roboto Mono 700 14px` on dark pill

### Score Badge (top-right)

```
Score: [82/100]
─────────────
bg: rgba(34,197,94,0.12)   ← matches classification
border: rgba(34,197,94,0.3)
text: #22C55E
font: Roboto Mono 700 14px
padding: 6px 14px | border-radius: 6px
```

---

## 6. Component Specifications

### Metric Circle Badge Cards

Observed in Fundamentals and Executive Summary views:

```
┌─────────────────────┐
│  [●]                │  ← Colored circle (48px) with icon
│  53.5               │  ← Value: Roboto Mono 600 24px
│  Current P/E        │  ← Label: Inter 500 13px --text-secondary
│  ↑ vs 45.7          │  ← Delta: Inter 400 11px (green/red)
└─────────────────────┘
Card: bg --bg-surface, border --border-default, radius 8px, padding 20px
```

Circle colors map to metric type (see §2 Metric Badge Circle Colors).

### Classification Badge (UNDERVALUED / FAIRLY PRICED / OVERPRICED)

```css
.badge-undervalued {
  background: rgba(34,197,94,0.12);
  color: #22C55E;
  border: 1px solid rgba(34,197,94,0.3);
  font: Inter 600 12px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 4px;
}
.badge-neutral { /* same structure, amber tokens */ }
.badge-overpriced { /* same structure, red tokens */ }
```

### Score Breakdown Cards (Composite Scoring page)

Each factor card shows:
- Factor name: `Inter 500 14px`
- Score number: `Roboto Mono 700 32px #F8FAFC`
- Weight label: `Inter 400 12px --text-muted` ("Weight: 40%")
- Bottom accent bar: height `3px`, color matches score range (bullish/neutral/bearish)

### Recommendation Card (Investment Recommendation page)

```
Background: linear-gradient(135deg, #0D2018 0%, #0A1A2E 100%)
Border: 1px solid rgba(16,185,129,0.2)
Border-radius: 12px
Padding: 32px

"BUY" / "HOLD" / "SELL" badge — large, centered, 700 weight
Target price below: Roboto Mono 600 18px

Content split into 3 columns:
  - Investment Strengths (bulleted, green dot markers)
  - Key Risk Factors (bulleted, red dot markers)
  - Catalysts (bulleted, amber dot markers)
```

### Data Tables

- Row height: `44px` (touch target minimum)
- Header: `bg --bg-elevated`, `Inter 500 13px --text-muted`, uppercase
- Alternating rows: `--bg-surface` / `--bg-root`
- Sorted column header: `2px solid --color-accent` underline + `aria-sort`
- Numbers: right-aligned, `Roboto Mono 500`
- Labels: left-aligned, `Inter 400`

### Cards (general)

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: 8px;
  padding: 24px;
  transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
}
.card:hover {
  border-color: #2D3F5A;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}
```

### Buttons

| Variant | Bg | Text | Border | Usage |
|---------|-----|------|--------|-------|
| Primary | `#10B981` | `#0B1A12` | none | Analyze, Run |
| Secondary | `--bg-elevated` | `--text-primary` | `--border-default` | Export, Settings |
| Ghost | transparent | `--text-secondary` | none | Icon-only, nav |
| Danger | `rgba(239,68,68,0.1)` | `#EF4444` | `rgba(239,68,68,0.3)` | Reset, Clear |

All buttons: `min-height: 36px`, `padding: 0 16px`, `border-radius: 6px`, `Inter 500 14px`.

---

## 7. Charts & Data Visualization

### Chart Library

**Recharts** (React) — consistent with dark theme and easy tooltip customization.

### Global Chart Theme

```js
const chartDefaults = {
  background: 'transparent',
  gridColor: '#1E2A3A',
  axisColor: '#64748B',
  tickColor: '#94A3B8',
  tooltipBg: '#1C2535',
  tooltipBorder: '#1E2A3A',
  fontFamily: '"Roboto Mono", monospace',
  fontSize: 12,
}
```

### Chart Type Assignments

| View | Data | Chart Type |
|------|------|-----------|
| Technical Analysis | Price + 50d/200d MA (6mo) | Area chart with MA line overlays |
| Technical Analysis | MACD | Dual-line + histogram, synchronized x-axis |
| Technical Analysis | RSI | Line chart, shaded 70/30 threshold bands |
| Technical Analysis | Bollinger Bands | Line with semi-transparent band fill |
| Technical Analysis | Volume / OBV | Bar chart, green/red by direction |
| Composite Scoring | Factor weight breakdown | Horizontal stacked bar — 5 factors |
| Sentiment Analysis | Polarity score | Gauge / half-donut (−1 to +1) |
| Sector Comparison | Valuation multiples | Grouped bar (target vs sector vs leader) |
| Institutional Activity | Holdings change | Bar chart, positive/negative delta |
| Fundamentals | Intrinsic value vs price | Side-by-side bar with margin of safety band |

### Chart Rules

- Gridlines: `#1E2A3A` — low contrast so data dominates
- Legend: always visible, positioned inside chart top-right — never below scroll fold
- Tooltips: on hover with exact values, locale-formatted numbers
- All chart entrances: `400ms ease-out`, `prefers-reduced-motion` → no animation
- Loading: shimmer skeleton at exact chart dimensions — never blank axis frame
- Screen readers: `role="img"` + `aria-label` describing the key insight
- Export option: CSV download button on data-heavy charts

---

## 8. Page Header Pattern (used on every section)

```
┌──────────────────────────────────────────────────────┐
│ [Icon]  Section Title                    Market Cap → │
│         Subtitle description                         │
└──────────────────────────────────────────────────────┘
```

- Icon: 32px circle, `--bg-elevated`, section-specific icon (Lucide SVG)
- Title: `Inter 700 24px --text-primary`
- Subtitle: `Inter 400 14px --text-secondary`
- Right aligned secondary metric (e.g., Market Cap on Fundamentals, Final Score on Composite)
- Bottom border: `1px solid --border-default`, margin-bottom `32px`

---

## 9. Animation & Motion

| Element | Duration | Easing | Property |
|---------|----------|--------|----------|
| Page/section enter | 200ms | ease-out | opacity + translateY(8px→0) |
| Card appear (staggered) | 200ms | ease-out | opacity + translateY(12px→0), 30ms stagger |
| Sidebar collapse/expand | 250ms | ease-in-out | width |
| Score number count-up | 600ms | ease-out | numeric value animation |
| Score ring draw | 800ms | ease-out | stroke-dashoffset |
| Badge appear | 150ms | ease-out | scale(0.96→1) + opacity |
| Metric value flash (update) | 300ms | ease-out | background-color flash to accent |
| Chart series draw | 400ms | ease-out | opacity + path animation |
| Button press | 80ms | ease-in | scale(0.97) |
| Tooltip show | 120ms | ease-out | opacity |

**Reduced motion**: all transforms become opacity-only. Score ring appears instantly at final value.

---

## 10. Navigation (Sidebar)

### Items

```
Executive Summary
Fundamentals
Technical Analysis
Institutional Activity
Sector Comparison
Sentiment Analysis
Composite Scoring
Price Forecasts
Investment Recommendation
```

Use **Lucide React** icons — not emoji, not png.

### Rules

- Active state: `border-left: 3px solid #10B981` + `bg rgba(16,185,129,0.1)` + `color #10B981`
- Each nav item links to a unique URL path (deep linking)
- Scroll position preserved on back navigation
- All nav items keyboard-reachable, `aria-current="page"` on active
- Sidebar has company ticker badge at top: rounded square with ticker letter(s), company name, "Stock Analysis" subtitle

---

## 11. Accessibility

| Check | Requirement |
|-------|-------------|
| Text contrast | ≥ 4.5:1 body text on dark backgrounds |
| Large text contrast | ≥ 3:1 for headings ≥ 18px bold |
| UI element contrast | ≥ 3:1 for borders, icons, chart elements |
| Focus rings | `2px solid #10B981`, `outline-offset: 2px` |
| Skip link | First focusable element: "Skip to main content" |
| Headings | h1 per page → h2 per section → h3 per card, no skips |
| Icon buttons | `aria-label` on all icon-only controls |
| Charts | `role="img"` + `aria-label` with key insight description |
| Tables | `scope="col"`, `aria-sort` on sortable headers |
| Live price data | Wrapped in `aria-live="polite"` region |
| Classification | Never color-only — always paired with text label |
| Keyboard nav | Tab order matches visual order; all controls reachable |

---

## 12. Loading & Empty States

### Loading

- **Full analysis load**: Skeleton shimmer cards in grid layout, animated `#1C2535` → `#243044`
- **Chart loading**: Shimmer at exact chart dimensions — never blank axis
- **Ticker submit**: Spinner inside Analyze button, button disabled during fetch
- **Section refresh**: Inline spinner in section header; card content dims to 40% opacity

### Empty States

- **No ticker entered**: Centered prompt — "Enter a ticker symbol to begin analysis" with input field
- **Invalid ticker**: Inline error below input: "Ticker not found. Try AAPL, MSFT, NVDA."
- **Missing metric**: Card shows "Data unavailable for this period" + info icon tooltip
- **API error**: Error card with message + retry button

---

## 13. CSS Variables Reference

```css
:root {
  /* Backgrounds */
  --bg-root:       #0B0E1A;
  --bg-sidebar:    #0D1117;
  --bg-surface:    #111827;
  --bg-elevated:   #1C2535;
  --bg-input:      #1A2233;

  /* Borders */
  --border-default: #1E2A3A;
  --border-subtle:  #141D2E;
  --border-active:  #10B981;

  /* Text */
  --text-primary:   #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted:     #64748B;
  --text-active:    #10B981;

  /* Semantic */
  --bullish:        #22C55E;
  --bullish-bg:     rgba(34, 197, 94, 0.12);
  --bullish-border: rgba(34, 197, 94, 0.30);
  --bearish:        #EF4444;
  --bearish-bg:     rgba(239, 68, 68, 0.12);
  --bearish-border: rgba(239, 68, 68, 0.30);
  --neutral:        #F59E0B;
  --neutral-bg:     rgba(245, 158, 11, 0.12);
  --neutral-border: rgba(245, 158, 11, 0.30);

  /* Accent */
  --accent:         #10B981;
  --accent-hover:   #059669;
  --accent-muted:   rgba(16, 185, 129, 0.10);

  /* Metric circles */
  --metric-blue:    #3B82F6;
  --metric-cyan:    #06B6D4;
  --metric-purple:  #8B5CF6;
  --metric-orange:  #F97316;

  /* Typography */
  --font-ui:   'Inter', system-ui, sans-serif;
  --font-mono: 'Roboto Mono', 'JetBrains Mono', monospace;

  /* Spacing */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;
  --space-10: 40px; --space-12: 48px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;

  /* Shadows */
  --shadow-card:  0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.5);
  --shadow-modal: 0 20px 60px rgba(0,0,0,0.7);
  --shadow-focus: 0 0 0 3px rgba(16,185,129,0.3);

  /* Transitions */
  --transition-fast:   150ms ease-out;
  --transition-base:   250ms ease-out;
  --transition-slow:   400ms ease-out;
}
```

---

## 14. Anti-Patterns to Avoid

| Anti-Pattern | Why |
|-------------|-----|
| Emoji as structural icons | Platform-inconsistent, unthemeable — use Lucide SVG |
| Hardcoded hex in components | Breaks token system — always use CSS variables |
| Color-only buy/sell signals | Fails colorblind users — always add text label |
| Placeholder-only input labels | Disappears on focus, fails accessibility |
| Animating width/height | Causes layout reflow — use transform or max-height |
| Blank chart axes during load | Confusing — use shimmer skeleton |
| Pie/donut with > 5 segments | Switch to horizontal bar (e.g., factor breakdown) |
| Blocking UI during data fetch | Keep sidebar and nav interactive during loads |
| Mixing icon styles (fill vs outline) | Destroys visual coherence |
| Different accent colors per page | Sidebar accent is always emerald — never page-specific |

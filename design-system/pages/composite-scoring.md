# Page: Composite Scoring
> Overrides MASTER.md where noted.

## Layout (matches screenshot exactly)

```
┌─────────────────────────────────────────────────────────┐
│  Hero Score Section                                     │
│  "Final Score: 82.0"  [UNDERVALUED]                     │
├─────────────────────────────────────────────────────────┤
│  5 Factor Score Cards (equal-width row)                 │
│  Fundamentals | Technical | Institutional | Sector/Macro | Sentiment │
├───────────────────────────┬─────────────────────────────┤
│  Score Breakdown by       │  Weighted Contribution      │
│  Category (bar chart)     │  (stacked bar or pie)       │
└───────────────────────────┴─────────────────────────────┘
```

## Hero Score Section

```
                Final Score
                  82.0
               [UNDERVALUED]
```

- "Final Score" label: `Inter 500 14px --text-muted`, uppercase, letter-spacing 0.1em
- Score number: `Roboto Mono 700 64px --text-primary`
- Classification badge: large version, `Inter 700 14px`, padding `8px 20px`, `border-radius 6px`

## 5 Factor Score Cards

Each card (from screenshot):
```
┌──────────────────┐
│  90              │  ← Roboto Mono 700 32px
│  Fundamentals    │  ← Inter 500 14px --text-primary
│  Weight: 40%     │  ← Inter 400 12px --text-muted
│  ▓▓▓▓▓▓▓▓▓░     │  ← progress bar (score/100)
└──────────────────┘
```

| Factor | Score | Weight | Bar Color |
|--------|-------|--------|-----------|
| Fundamentals | 90 | 40% | `--bullish` |
| Technical | 70 | 20% | `--neutral` |
| Institutional | 82 | 10% | `--bullish` |
| Sector/Macro | 82 | 15% | `--bullish` |
| Sentiment | 74.6 | 15% | `--bullish` |

Progress bar: `height 4px`, `border-radius 2px`, bg `--border-default`, fill color per table above.

Top border accent: `3px solid [bar-color]`, `border-radius 8px 8px 0 0`

## Composite Calculation Display

Show the weighted math visually:
```
(90 × 0.40) + (70 × 0.20) + (82 × 0.10) + (82 × 0.15) + (74.6 × 0.15)
=  36.0   +   14.0   +   8.2   +   12.3   +   11.2   =  81.7 ≈ 82.0
```
Display as equation in `Roboto Mono 400 13px --text-muted`, centered below factor cards.

## Score Breakdown Chart (left panel)

- Horizontal bar chart, one bar per factor
- Bar length proportional to weighted contribution (not raw score)
- Bars labeled with factor name (left) and weighted contribution value (right)
- Colors match factor card colors

## Weighted Contribution Chart (right panel)

- Donut chart showing each factor's weighted contribution to final score
- Segments: match factor colors
- Legend below with factor name + weighted points
- Center of donut: "82.0" total score

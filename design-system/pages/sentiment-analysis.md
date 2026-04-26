# Page: Sentiment Analysis
> Overrides MASTER.md where noted. Inherits all other rules from MASTER.

## Page Header

```
[MessageSquare icon]  Sentiment Analysis              Polarity: 0.58 →
                      Market sentiment across multiple sources
```

- Icon: 32px circle, `--bg-elevated`, `MessageSquare` from Lucide
- Right-aligned polarity badge: `Roboto Mono 600 14px --bullish` value + `Inter 400 12px --text-muted` label
- Polarity badge background: `--bullish-bg`, border: `--bullish-border`

---

## Overall Sentiment Card (left 50%) + Key Narratives Card (right 50%)

### Overall Sentiment Card

```
[Gauge icon]  Overall Sentiment
              Composite polarity across news, social, and analyst sources
```

**Polarity Score** (hero number, centered in card):
```
0.58
```
- Font: `Roboto Mono 700 64px`
- Color logic: ≥ 0.5 → `--bullish`, 0.2–0.49 → `--neutral`, < 0.2 or negative → `--bearish`
- For NVDA (0.58): `--bullish`

Below the hero number:

**Rating badge** (centered):
```
[MODERATELY POSITIVE]
```
- Style: classification badge pattern from MASTER.md, `--neutral-bg`, `--neutral` text (amber)
- Font: `Inter 600 12px`, uppercase, letter-spacing 0.06em

**Gauge chart** (half-donut, Recharts PieChart with 180° sweep):
- Arc from −1 (left, `--bearish`) → 0 (center, `--neutral`) → +1 (right, `--bullish`)
- 3 colored zones: red (−1 to −0.2), amber (−0.2 to +0.2), green (+0.2 to +1)
- Needle position at 0.58 — thin line or filled arc to current value
- Chart width: fills card width, height: 160px
- X-axis labels: "−1 Bearish" | "0 Neutral" | "+1 Bullish" — `Inter 400 11px --text-muted`

**Secondary metrics** (below gauge, 2-col inline):

```
Analyst Sentiment          Social Sentiment
0.45                       0.48
Very Positive              Mixed
Roboto Mono 600 20px       Roboto Mono 600 20px
--bullish                  --neutral
```

### Key Narratives Card

```
[BookOpen icon]  Key Narratives
                 Dominant themes identified from AI analysis
```

3 sections with colored left borders, stacked vertically. Each section is visually separated.

**Section 1 — Bullish** (`border-left: 3px solid --bullish`, `--bg-surface`)
```
[TrendingUp 16px --bullish]  Bullish
──────────────────────────────────────
• AI accelerator dominance — CUDA ecosystem and developer lock-in create
  durable competitive advantage
• Blackwell chip launch driving next-gen data center upgrade cycle
• 86–94% AI GPU market share with no near-term credible challenger
• Data center revenue growing faster than overall AI capex spend
• November earnings expected to show continued beat-and-raise pattern
```

**Section 2 — Bearish** (`border-left: 3px solid --bearish`, `--bg-surface`)
```
[TrendingDown 16px --bearish]  Bearish
──────────────────────────────────────
• US export restrictions on H100/H200 chips to China pose ongoing revenue risk
• AMD MI300x gaining traction — 5–10% of inference workload market
• Valuation at 53x P/E creates downside risk if AI capex cycle slows
• Hyperscaler customer concentration risk (Microsoft, Google, Meta)
• Regulatory scrutiny of AI chip monopoly position increasing
```

**Section 3 — Catalyst** (`border-left: 3px solid --neutral`, `--bg-surface`)
```
[Zap 16px --neutral]  Catalysts
──────────────────────────────────────
• Q3 FY2026 earnings release — consensus expects $0.88 EPS, $35.1B revenue
• Blackwell GB200 NVLink rack production ramp (Q4 2025 – Q1 2026)
• Fed rate cut cycle continuation reduces discount rate on growth equities
• AI infrastructure investment by hyperscalers remains robust through 2026
• Potential new sovereign AI government contracts (Middle East, EU)
```

Each bullet: `Inter 400 14px --text-secondary`, `line-height 1.8`
Section header: `Inter 600 14px` matching border color + Lucide icon

---

## Source Breakdown Cards (3-column grid)

3 equal-width cards below the 2-col section.

### Card 1 — News & Analyst Reports

```
[Newspaper icon 24px --metric-blue]  News & Analyst Reports
─────────────────────────────────────────────────────────────
Polarity Score    0.62
                  Roboto Mono 700 32px --bullish

[POSITIVE] badge

"Analyst consensus is Strong Buy with a median 12-month target of
 $229.67. Recent reports highlight AI infrastructure demand
 acceleration and Blackwell supply normalization."
Inter 400 13px --text-secondary
```

### Card 2 — Reddit / Social Media

```
[Users icon 24px --metric-purple]  Reddit / Social (r/stocks, r/wallstreetbets)
─────────────────────────────────────────────────────────────
Polarity Score    0.48
                  Roboto Mono 700 32px --neutral

[MIXED] badge (--neutral-bg, --neutral text)

"Retail sentiment is cautiously optimistic. Bullish on AI thesis
 but concerned about valuation after 200%+ YTD gains. Short interest
 elevated at 1.2% of float."
```

### Card 3 — Seeking Alpha

```
[BookMarked icon 24px --metric-cyan]  Seeking Alpha
─────────────────────────────────────────────────────────────
Polarity Score    0.52
                  Roboto Mono 700 32px --bullish

[POSITIVE] badge

"Contributor articles are predominantly bullish on AI capex cycle
 durability. Main bear case centers on AMD competitive risk and
 export restriction escalation scenarios."
```

Card structure (all 3):
- `--bg-surface`, `--border-default`, `radius: 8px`, `padding: 20px`
- Icon: 24px, colored per card
- Polarity value: `Roboto Mono 700 32px`, color matches sentiment level
- Badge: classification badge style (positive=bullish, mixed=neutral, negative=bearish)
- Summary: `Inter 400 13px --text-secondary`, `line-height 1.6`, `margin-top: 12px`

Badge mapping:
- Score ≥ 0.5: "POSITIVE" → `--bullish-bg`, `--bullish` text
- Score 0.2–0.49: "MIXED" → `--neutral-bg`, `--neutral` text
- Score < 0.2 or negative: "NEGATIVE" → `--bearish-bg`, `--bearish` text

---

## Score Summary Banner

```
┌─────────────────────────────────────────────────────────┐
│  Sentiment Score: 74.6/100   [Weight: 15%]              │
│  "Market sentiment is moderately positive overall (0.58  │
│   polarity). Analyst conviction is high (Strong Buy,     │
│   $229.67 target). Retail and social sentiment is mixed  │
│   due to valuation concerns, partially tempering the     │
│   overall sentiment score."                              │
└─────────────────────────────────────────────────────────┘
```

- Background: `rgba(16,185,129,0.05)`, border: `1px solid rgba(16,185,129,0.15)`, radius: `8px`
- Score: `Roboto Mono 700 28px --bullish`
- Weight badge: `Inter 500 12px --text-muted`, `--bg-elevated` pill
- Prose: `Inter 400 14px --text-secondary`, `line-height 1.7`

# Page: Executive Summary
> Overrides MASTER.md where noted. Inherits all other rules from MASTER.

## Hero Card

**Layout**: Full-width card with 2-column split
- Left: Company logo badge + name + ticker + Classification badge + Composite Score + 12M Expected Return
- Right: DCF Intrinsic Value (large mono number) + Margin of Safety (red when negative, green when positive)

**Company Badge**: 48px rounded square, emerald bg, white ticker letter(s), `Inter 700 20px`

**Key metrics row** (below hero card): 4 metric circle cards in equal-width grid
- P/E Ratio (blue circle)
- Revenue Growth (cyan circle) — show YoY %
- Profit Margin (purple circle) — show %
- Price Target (orange circle) — analyst consensus

## Composite Score Display (within hero card)

```
82.0 / 100        ← Roboto Mono 700 36px
[UNDERVALUED]     ← classification badge
12M Expected Return: +33.62%  ← Roboto Mono 500 16px --bullish
```

## Classification Badge (prominent, inline with price)

```
Current Price: $188.15   [UNDERVALUED]
```
Badge inline with price line, not stacked.

## DCF Panel (right column of hero)

```
DCF Intrinsic Value
$58.87            ← Roboto Mono 700 32px --text-primary
Margin of Safety
-68.71%           ← Roboto Mono 600 18px --bearish (negative = stock trading above intrinsic value)
```

> Note: A negative margin of safety means the stock is trading ABOVE the DCF intrinsic value, which is expected for a growth stock like NVDA. This is intentional and should be displayed with a red/bearish color to indicate premium pricing relative to DCF, while the overall composite score still shows UNDERVALUED based on the multi-factor model.

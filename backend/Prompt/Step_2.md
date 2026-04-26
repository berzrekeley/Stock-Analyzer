# Functional Instruction Set: Technical Indicator & Trend Analysis (Step 2 - Updated)

This document provides specific instructions for generating Python code to extract technical indicators, perform trend/volatility analysis, and assess momentum against intrinsic value.

## 1. Data Retrieval
- **Library:** `yfinance`
- **Scope:** 6 months of daily data (`6mo`, `1d`).
- **Input:** Ticker symbol and an `intrinsic_value` variable (passed from the fundamental analysis stage).

## 2. Technical Indicator Calculations
The code must calculate:
- **50-day & 200-day SMA** (Note: 200-day will require a larger data window than 6mo; pull `2y` of data initially then slice to `6mo` for the final report).
- **RSI (14-day)**.
- **MACD** (12-EMA, 26-EMA, and 9-EMA Signal).
- **Bollinger Bands** (20-day SMA +/- 2 Std Dev).
- **On-Balance Volume (OBV)**.

## 3. Advanced Analysis Logic
The Python code must implement the following analytical functions:

### A. Trend Direction Identification
- **Bullish:** Price > 50-day SMA AND 50-day SMA > 200-day SMA.
- **Bearish:** Price < 50-day SMA AND 50-day SMA < 200-day SMA.
- **Neutral/Sideways:** SMA crossovers or price oscillating between SMAs.

### B. Volatility Assessment
- **Logic:** Calculate the **Bollinger Band Width** ( (Upper - Lower) / Middle ).
- **Classification:** - Compare current width to the 6-month average width.
    - If current > average by 20%: "High Volatility (Expansion)".
    - If current < average by 20%: "Low Volatility (Squeeze)".

### C. Key Support & Resistance Zones
- **Resistance:** Identify the 6-month maximum price and the 0.786 Fibonacci retracement level.
- **Support:** Identify the 6-month minimum price and the 0.382 Fibonacci retracement level.
- **Code implementation:** Use `df['High'].max()` and `df['Low'].min()`.

### D. Momentum vs. Intrinsic Value Alignment
This section compares market sentiment (Technical) with fundamental valuation (Intrinsic).
- **Case 1: Support:** RSI is < 40 (Oversold) AND Current Price < Intrinsic Value (Undervalued). -> *Action: Strong Buy Alignment.*
- **Case 2: Contradiction:** RSI is > 70 (Overbought) BUT Current Price < Intrinsic Value. -> *Action: Value exists but entry is risky due to overextension.*
- **Case 3: Contradiction:** RSI is < 30 (Oversold) BUT Current Price > Intrinsic Value. -> *Action: Falling knife; avoid despite low RSI.*
- **Case 4: Resistance Alignment:** Price is near Resistance Zone AND Price > Intrinsic Value. -> *Action: Strong Sell/Take Profit.*

## 4. Integration & Output
- **Merge Logic:** Join these calculated metrics with the `ticker_cache.csv` file on the `Date` column.
- **Final Output:** A printout or JSON object summarizing the "Trend Status," "Volatility Level," and the "Momentum-Value Alignment Score."
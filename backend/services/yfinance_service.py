import yfinance as yf
import pandas as pd
import asyncio
import json
import os
import numpy as np
from typing import Any, Dict
from services import cache_service

# --- FUNDAMENTALS ---

async def get_raw_fundamentals(ticker: str) -> Dict[str, Any]:
    """Fetch raw data from yfinance without processing, using local cache if available."""
    cached = cache_service.get_cached_data(ticker, "raw_fundamentals", expiry_hours=24)
    if cached:
        return cached

    def _fetch():
        stock = yf.Ticker(ticker)
        
        def df_to_dict(df):
            if df is None or df.empty: return {}
            df = df.copy()
            df.columns = [str(c) for c in df.columns]
            return df.to_dict()

        data = {
            "info": stock.info,
            "income_stmt": df_to_dict(stock.income_stmt),
            "balance_sheet": df_to_dict(stock.balance_sheet),
            "cashflow": df_to_dict(stock.cashflow)
        }
        return data

    data = await asyncio.to_thread(_fetch)
    cache_service.set_cached_data(ticker, "raw_fundamentals", data)
    return data

def calculate_fundamentals_metrics(ticker: str, raw_data: Dict[str, Any]) -> Dict[str, Any]:
    """Perform calculations on raw yfinance data."""
    info = raw_data.get("info", {})
    
    def get_df_from_dict(d):
        if not d: return pd.DataFrame()
        return pd.DataFrame.from_dict(d)

    income = get_df_from_dict(raw_data.get("income_stmt"))
    balance = get_df_from_dict(raw_data.get("balance_sheet"))
    cashflow = get_df_from_dict(raw_data.get("cashflow"))
    
    def calculate_cagr(series):
        if series is None or len(series) < 2:
            return 0.0
        try:
            vals = series.dropna()
            if len(vals) < 2: return 0.0
            present = float(vals.iloc[0])
            past = float(vals.iloc[-1])
            periods = len(vals) - 1
            if past <= 0 or present <= 0 or periods <= 0: return 0.0
            return ((present / past) ** (1 / periods) - 1) * 100
        except:
            return 0.0

    def get_growth_1y(series):
        if series is None or len(series) < 2:
            return 0.0
        try:
            present = float(series.iloc[0])
            past = float(series.iloc[1])
            if past <= 0: return 0.0
            return ((present - past) / past) * 100
        except:
            return 0.0

    rev_growth_1y = 0.0
    rev_growth_3y = 0.0
    eps_growth_1y = 0.0
    operating_margin = 0.0
    
    if not income.empty:
        rev_key = next((k for k in ["Total Revenue", "TotalRevenue"] if k in income.index), None)
        if rev_key:
            rev_series = income.loc[rev_key]
            rev_growth_1y = get_growth_1y(rev_series)
            rev_growth_3y = calculate_cagr(rev_series.iloc[:min(4, len(rev_series))])
        
        eps_key = next((k for k in ["Diluted EPS", "DilutedEPS"] if k in income.index), None)
        if eps_key:
            eps_series = income.loc[eps_key]
            eps_growth_1y = get_growth_1y(eps_series)
            
        op_inc_key = next((k for k in ["Operating Income", "OperatingIncome"] if k in income.index), None)
        if op_inc_key and rev_key:
            try:
                op_inc = float(income.loc[op_inc_key].iloc[0])
                rev = float(income.loc[rev_key].iloc[0])
                operating_margin = (op_inc / rev) * 100 if rev else 0
            except:
                operating_margin = 0

    current_price = info.get("currentPrice") or info.get("regularMarketPrice") or 0.0
    fcf = info.get("freeCashflow")
    if not fcf and not cashflow.empty:
        fcf_key = next((k for k in ["Free Cash Flow", "FreeCashFlow"] if k in cashflow.index), None)
        if fcf_key:
            fcf = float(cashflow.loc[fcf_key].iloc[0])
    
    fcf = fcf or 0
    shares = info.get("sharesOutstanding") or 1
    growth_est = info.get("earningsGrowth", 0.10) or 0.10
    if growth_est is None: growth_est = 0.10
    if growth_est > 0.30: growth_est = 0.20
    elif growth_est < 0: growth_est = 0.05
    
    discount_rate = 0.10
    terminal_growth = 0.025
    
    intrinsic_value = 0
    if fcf > 0 and shares > 0:
        pvs = []
        temp_fcf = fcf
        for i in range(1, 6):
            temp_fcf = temp_fcf * (1 + growth_est)
            pvs.append(temp_fcf / ((1 + discount_rate) ** i))
        terminal_val = (pvs[-1] * (1 + terminal_growth)) / (discount_rate - terminal_growth)
        pv_terminal = terminal_val / ((1 + discount_rate) ** 5)
        intrinsic_value = (sum(pvs) + pv_terminal) / shares

    total_debt = info.get("totalDebt")
    total_equity = info.get("totalStockholderEquity")
    if not total_equity and not balance.empty:
        equity_key = next((k for k in ["Stockholders Equity", "Total Stockholder Equity", "TotalStockholderEquity"] if k in balance.index), None)
        if equity_key:
            total_equity = float(balance.loc[equity_key].iloc[0])
    
    debt_to_equity = info.get("debtToEquity")
    if not debt_to_equity and total_debt and total_equity:
        debt_to_equity = (total_debt / total_equity) * 100

    target_price = info.get("targetMeanPrice", 0)
    upside = ((target_price - current_price) / current_price * 100) if current_price and target_price else 0

    return {
        "revenueGrowth1Y": round(rev_growth_1y, 2),
        "revenueGrowth3Y": round(rev_growth_3y, 2),
        "epsGrowth1Y": round(eps_growth_1y, 2),
        "intrinsicValue": round(intrinsic_value, 2),
        "marginOfSafety": round(((intrinsic_value - current_price) / current_price * 100), 2) if current_price and intrinsic_value else 0,
        "debtToEquity": round(debt_to_equity, 2) if debt_to_equity else 0,
        "netMargin": round(info.get("profitMargins", 0) * 100, 2) if info.get("profitMargins") else 0,
        "operatingMargin": round(operating_margin, 2),
        "grossMargin": round(info.get("grossMargins", 0) * 100, 2) if info.get("grossMargins") else 0,
        "roe": round(info.get("returnOnEquity", 0) * 100, 2) if info.get("returnOnEquity") else 0,
        "currentPrice": current_price,
        "peTrailing": info.get("trailingPE"),
        "peForward": info.get("forwardPE"),
        "targetPrice": target_price,
        "upside": round(upside, 2),
        "marketCap": info.get("marketCap")
    }

async def get_extended_fundamentals(ticker: str) -> Dict[str, Any]:
    raw = await get_raw_fundamentals(ticker)
    calc = calculate_fundamentals_metrics(ticker, raw)
    return {"info": raw["info"], "calculated": calc}

# --- TECHNICALS ---

async def get_raw_technicals(ticker: str) -> Dict[str, Any]:
    """Fetch raw historical data (2y) for technical analysis."""
    cached = cache_service.get_cached_data(ticker, "raw_technicals", expiry_hours=24)
    if cached:
        return cached

    def _fetch():
        stock = yf.Ticker(ticker)
        df = stock.history(period="2y")
        if df.empty: return {}
        df.reset_index(inplace=True)
        # Convert Timestamp to string
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')
        return df.to_dict(orient="records")

    data = await asyncio.to_thread(_fetch)
    if data:
        cache_service.set_cached_data(ticker, "raw_technicals", data)
    return data

def calculate_technical_indicators(ticker: str, history_data: list, intrinsic_value: float = 0) -> Dict[str, Any]:
    """Calculate SMA, RSI, MACD, Bollinger Bands, and OBV."""
    if not history_data: return {}
    
    df = pd.DataFrame(history_data)
    df['Date'] = pd.to_datetime(df['Date'])
    df.set_index('Date', inplace=True)
    
    # 1. Moving Averages
    df['SMA50'] = df['Close'].rolling(window=50).mean()
    df['SMA200'] = df['Close'].rolling(window=200).mean()
    
    # 2. RSI (14-day)
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    
    # 3. MACD (12, 26, 9)
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['MACD'] = exp1 - exp2
    df['Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()
    df['Histogram'] = df['MACD'] - df['Signal']
    
    # 4. Bollinger Bands (20-day)
    df['BB_Mid'] = df['Close'].rolling(window=20).mean()
    df['BB_Std'] = df['Close'].rolling(window=20).std()
    df['BB_Upper'] = df['BB_Mid'] + (df['BB_Std'] * 2)
    df['BB_Lower'] = df['BB_Mid'] - (df['BB_Std'] * 2)
    df['BB_Width'] = (df['BB_Upper'] - df['BB_Lower']) / df['BB_Mid']
    
    # 5. OBV
    df['OBV'] = (np.sign(df['Close'].diff()) * df['Volume']).fillna(0).cumsum()
    
    # Slice to last 6 months (approx 126 trading days)
    report_df = df.iloc[-126:].copy()
    
    current_price = report_df['Close'].iloc[-1]
    sma50 = report_df['SMA50'].iloc[-1]
    sma200 = report_df['SMA200'].iloc[-1]
    rsi = report_df['RSI'].iloc[-1]
    
    # Trend Logic
    trend = "Neutral"
    if current_price > sma50 and sma50 > sma200: trend = "Bullish"
    elif current_price < sma50 and sma50 < sma200: trend = "Bearish"
    
    # Volatility Logic
    avg_width = report_df['BB_Width'].mean()
    curr_width = report_df['BB_Width'].iloc[-1]
    volatility = "Moderate"
    if curr_width > avg_width * 1.2: volatility = "High (Expansion)"
    elif curr_width < avg_width * 0.8: volatility = "Low (Squeeze)"
    
    # Support/Resistance
    resistance = report_df['High'].max()
    support = report_df['Low'].min()
    
    # Momentum-Value Alignment
    alignment = "Neutral"
    if rsi < 40 and current_price < intrinsic_value: alignment = "Strong Buy Alignment"
    elif rsi > 70 and current_price < intrinsic_value: alignment = "Risk: Overextended Value"
    elif rsi < 30 and current_price > intrinsic_value: alignment = "Risk: Falling Knife (Overvalued)"
    elif current_price > resistance * 0.95 and current_price > intrinsic_value: alignment = "Strong Sell/Take Profit"

    # Score (Simple heuristic for now)
    score = 50
    if trend == "Bullish": score += 20
    if rsi < 60: score += 10
    if rsi > 80: score -= 10
    if current_price < intrinsic_value: score += 10
    
    # Convert to chart data format
    report_df.reset_index(inplace=True)
    report_df['Date'] = report_df['Date'].dt.strftime('%Y-%m-%d')
    chart_data = report_df.replace({np.nan: None}).to_dict(orient="records")

    return {
        "metrics": {
            "currentPrice": round(current_price, 2),
            "sma50": round(sma50, 2) if not pd.isna(sma50) else None,
            "sma200": round(sma200, 2) if not pd.isna(sma200) else None,
            "rsi": round(rsi, 2) if not pd.isna(rsi) else None,
            "trend": trend,
            "volatility": volatility,
            "support": round(support, 2),
            "resistance": round(resistance, 2),
            "alignment": alignment,
            "score": score
        },
        "chartData": chart_data
    }

async def get_technical_analysis(ticker: str, intrinsic_value: float = 0) -> Dict[str, Any]:
    raw = await get_raw_technicals(ticker)
    if not raw: return {}
    analysis = calculate_technical_indicators(ticker, raw, intrinsic_value)
    cache_service.set_cached_data(ticker, "step_2", analysis)
    return analysis

# --- RESTORE PREVIOUS FUNCTIONS ---

async def get_stock_info(ticker: str) -> Dict[str, Any]:
    def _fetch():
        stock = yf.Ticker(ticker)
        return stock.info
    return await asyncio.to_thread(_fetch)

async def get_institutional_holders(ticker: str) -> Dict[str, Any]:
    def _fetch():
        stock = yf.Ticker(ticker)
        holders = stock.institutional_holders
        return holders.to_dict(orient="records") if holders is not None and not holders.empty else []
    return await asyncio.to_thread(_fetch)

async def get_recommendations(ticker: str) -> Dict[str, Any]:
    def _fetch():
        stock = yf.Ticker(ticker)
        recs = stock.recommendations
        return recs.to_dict(orient="records") if recs is not None and not recs.empty else []
    return await asyncio.to_thread(_fetch)

async def get_insider_transactions(ticker: str) -> Dict[str, Any]:
    def _fetch():
        stock = yf.Ticker(ticker)
        df = stock.insider_transactions
        if df is not None and not df.empty:
            df = df.copy()
            for col in df.columns:
                if pd.api.types.is_datetime64_any_dtype(df[col]):
                    df[col] = df[col].dt.strftime('%Y-%m-%d')
            return df.to_dict(orient="records")
        return []
    return await asyncio.to_thread(_fetch)

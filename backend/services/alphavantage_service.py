import os
import httpx
import asyncio

ALPHAVANTAGE_BASE = "https://www.alphavantage.co/query"
_TIMEOUT = 30

_client: httpx.AsyncClient | None = None


def _get_client() -> httpx.AsyncClient:
    global _client
    if _client is None or _client.is_closed:
        _client = httpx.AsyncClient(timeout=_TIMEOUT)
    return _client


def _api_key() -> str:
    key = os.getenv("ALPHAVANTAGE_API_KEY", "")
    if not key:
        # Fallback for demo purposes if not set, but ideally should be set
        return "demo"
    return key


async def _get(params: dict):
    p = {"apikey": _api_key(), **params}
    resp = await _get_client().get(ALPHAVANTAGE_BASE, params=p)
    resp.raise_for_status()
    data = resp.json()
    
    if "Error Message" in data:
        raise ValueError(f"Alpha Vantage error: {data['Error Message']}")
    if "Note" in data and "rate limit" in data["Note"].lower():
        raise ValueError("Alpha Vantage rate limit reached. Please try again later.")
        
    return data


async def get_company_overview(symbol: str) -> dict:
    return await _get({"function": "OVERVIEW", "symbol": symbol})


async def get_income_statement(symbol: str) -> dict:
    return await _get({"function": "INCOME_STATEMENT", "symbol": symbol})


async def get_balance_sheet(symbol: str) -> dict:
    return await _get({"function": "BALANCE_SHEET", "symbol": symbol})


async def get_cash_flow(symbol: str) -> dict:
    return await _get({"function": "CASH_FLOW", "symbol": symbol})


async def get_quote(symbol: str) -> dict:
    data = await _get({"function": "GLOBAL_QUOTE", "symbol": symbol})
    return data.get("Global Quote", {})


async def get_daily_prices(symbol: str, outputsize: str = "compact") -> dict:
    return await _get({
        "function": "TIME_SERIES_DAILY", 
        "symbol": symbol, 
        "outputsize": outputsize
    })


async def get_institutional_holdings(symbol: str) -> dict:
    return await _get({"function": "INSTITUTIONAL_HOLDINGS", "symbol": symbol})


async def get_market_news_sentiment(symbol: str) -> dict:
    return await _get({
        "function": "NEWS_SENTIMENT", 
        "tickers": symbol,
        "sort": "LATEST",
        "limit": 10
    })

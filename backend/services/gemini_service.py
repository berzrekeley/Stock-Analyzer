import os
import json
import re
import asyncio
from datetime import date
import httpx
from pathlib import Path
from dotenv import load_dotenv
from services import alphavantage_service, yfinance_service, cache_service

# Ensure environment variables are loaded from the backend directory
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"
TIMEOUT = 120

# Global client for connection pooling
_client = httpx.AsyncClient(timeout=TIMEOUT)

AV_TOOLS = {
    "function_declarations": [
        {
            "name": "get_company_overview",
            "description": "Fetch company overview and fundamental data like P/E, PEG, market cap, sector, and industry.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol (e.g., AAPL)."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_income_statement",
            "description": "Fetch annual and quarterly income statements for revenue and profit analysis.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_balance_sheet",
            "description": "Fetch balance sheet for debt, equity, and asset analysis.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_cash_flow",
            "description": "Fetch cash flow statements for free cash flow analysis.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_quote",
            "description": "Fetch real-time price, change, and volume for a stock.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_daily_prices",
            "description": "Fetch historical daily prices for technical analysis and charting.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."},
                    "outputsize": {"type": "string", "enum": ["compact", "full"], "description": "compact for last 100 days, full for 20+ years."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_institutional_holdings",
            "description": "Fetch institutional ownership and major holder positions.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        },
        {
            "name": "get_market_news_sentiment",
            "description": "Fetch latest news and sentiment scores for a stock ticker.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["symbol"]
            }
        }
    ]
}

YF_TOOLS = {
    "function_declarations": [
        {
            "name": "yf_get_stock_info",
            "description": "Fetch comprehensive stock info, fundamentals, P/E, PEG, market cap, and more using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["ticker"]
            }
        },
        {
            "name": "yf_get_stock_history",
            "description": "Fetch historical price data for charting and technical analysis using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."},
                    "period": {"type": "string", "description": "e.g., '1y', '2y', '5y', 'max'."}
                },
                "required": ["ticker"]
            }
        },
        {
            "name": "yf_get_financials",
            "description": "Fetch income statement, balance sheet, and cash flow using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["ticker"]
            }
        },
        {
            "name": "yf_get_institutional_holders",
            "description": "Fetch major institutional holders using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["ticker"]
            }
        },
        {
            "name": "yf_get_insider_transactions",
            "description": "Fetch latest insider transactions using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["ticker"]
            }
        },
        {
            "name": "yf_get_insider_purchases",
            "description": "Fetch summary of insider purchases over the last 6-12 months using Yahoo Finance.",
            "parameters": {
                "type": "object",
                "properties": {
                    "ticker": {"type": "string", "description": "The stock ticker symbol."}
                },
                "required": ["ticker"]
            }
        }
    ]
}


def _get_api_key() -> str:
    key = os.getenv("GEMINI_API_KEY", "")
    if not key:
        raise ValueError("GEMINI_API_KEY not set in environment")
    return key


def _load_prompt(step_index: int, ticker: str) -> str:
    """Load prompt from file if exists, else fallback to hardcoded."""
    prompt_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "Prompt", f"Step_{step_index}.md")
    if os.path.exists(prompt_path):
        with open(prompt_path, "r") as f:
            content = f.read()
        return content.replace("{{TICKER}}", ticker)
    return ""


def _clean_json(text: str) -> str:
    """Strip markdown code fences from Gemini JSON response."""
    text = text.strip()
    # Remove any markdown headers or text before/after JSON
    if "{" in text and "}" in text:
        text = text[text.find("{"):text.rfind("}")+1]
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return text.strip()


async def resolve_ticker_name(query: str) -> dict:
    """Ask Gemini to identify the stock ticker for a company name query."""
    prompt = f"""
Identify the stock ticker for "{query}".
Return ONLY JSON: {{"ticker": "XXXX", "companyName": "Name", "exchange": "EXC"}}
"""
    try:
        text = await _call_gemini(prompt, use_search=False)
        return json.loads(_clean_json(text))
    except Exception:
        return {"ticker": query.upper(), "companyName": query}


async def _call_gemini(prompt: str, use_search: bool = True, use_av: bool = False, use_yf: bool = False) -> str:
    api_key = _get_api_key()
    url = f"{GEMINI_BASE_URL}/{GEMINI_MODEL}:generateContent?key={api_key}"

    messages = [{"role": "user", "parts": [{"text": prompt}]}]
    
    tools = []
    if use_search:
        tools.append({"google_search_retrieval": {}})
    if use_av:
        tools.append(AV_TOOLS)
    if use_yf:
        tools.append(YF_TOOLS)

    max_turns = 10
    
    for turn in range(max_turns):
        payload: dict = {
            "contents": messages,
            "generationConfig": {"temperature": 0.1, "maxOutputTokens": 4096}, # Reduced for token efficiency
        }
        if tools:
            payload["tools"] = tools

        # Robust retry logic for 429 and connection errors
        max_retries = 3 # Reduced retries for faster failure/fallback
        base_delay = 2
        resp = None
        
        for attempt in range(max_retries):
            try:
                resp = await _client.post(url, json=payload)
                if resp.status_code == 429:
                    delay = base_delay * (2 ** attempt)
                    await asyncio.sleep(delay)
                    continue
                resp.raise_for_status()
                break # Success
            except (httpx.HTTPStatusError, httpx.RequestError):
                if attempt == max_retries - 1:
                    raise
                await asyncio.sleep(base_delay * (2 ** attempt))

        data = resp.json()
        if "candidates" not in data:
            error_details = json.dumps(data.get("error", data), indent=2)
            print(f"Gemini API returned no candidates. Response: {error_details}")
            if "error" in data:
                raise Exception(f"Gemini API Error: {data['error'].get('message', 'Unknown error')}")
            raise Exception(f"Gemini API unexpected response: {error_details}")

        candidate = data["candidates"][0]
        msg = candidate["content"]
        messages.append(msg)
        
        parts = msg.get("parts", [])
        
        # Check for function calls
        function_calls = [p["functionCall"] for p in parts if "functionCall" in p]
        
        if not function_calls:
            return "".join(p.get("text", "") for p in parts)

        # Handle function calls
        response_parts = []
        for call in function_calls:
            name = call["name"]
            args = call.get("args", {})
            
            try:
                if name == "get_company_overview":
                    result = await alphavantage_service.get_company_overview(**args)
                elif name == "get_income_statement":
                    result = await alphavantage_service.get_income_statement(**args)
                elif name == "get_balance_sheet":
                    result = await alphavantage_service.get_balance_sheet(**args)
                elif name == "get_cash_flow":
                    result = await alphavantage_service.get_cash_flow(**args)
                elif name == "get_quote":
                    result = await alphavantage_service.get_quote(**args)
                elif name == "get_daily_prices":
                    result = await alphavantage_service.get_daily_prices(**args)
                elif name == "get_institutional_holdings":
                    result = await alphavantage_service.get_institutional_holdings(**args)
                elif name == "get_market_news_sentiment":
                    result = await alphavantage_service.get_market_news_sentiment(**args)
                # Yahoo Finance tools
                elif name == "yf_get_stock_info":
                    result = await yfinance_service.get_stock_info(**args)
                    # PRUNE: Only keep essential fields for fundamentals
                    if isinstance(result, dict):
                        keys = ["currentPrice", "marketCap", "trailingPE", "forwardPE", "pegRatio", "priceToBook", "priceToSales", "enterpriseToEbitda", "revenueGrowth", "earningsGrowth", "profitMargins", "grossMargins", "debtToEquity", "currentRatio", "freeCashflow", "returnOnEquity", "totalCash", "beta", "targetMeanPrice", "recommendationKey", "longBusinessSummary", "longName", "fiftyTwoWeekHigh", "fiftyTwoWeekLow"]
                        result = {k: result[k] for k in keys if k in result}
                elif name == "yf_get_stock_history":
                    result = await yfinance_service.get_stock_history(**args)
                    # PRUNE: Limit history size
                    if isinstance(result, list):
                        result = result[-30:] # Last 30 days sufficient for most technicals
                elif name == "yf_get_financials":
                    result = await yfinance_service.get_financials(**args)
                    # PRUNE: Financials are huge, return only most recent 2 years
                    if isinstance(result, dict):
                        for k in result:
                            if isinstance(result[k], dict):
                                dates = sorted(result[k].keys(), reverse=True)
                                result[k] = {d: result[k][d] for d in dates[:2]}
                elif name == "yf_get_institutional_holders":
                    result = await yfinance_service.get_institutional_holders(**args)
                elif name == "yf_get_insider_transactions":
                    result = await yfinance_service.get_insider_transactions(**args)
                elif name == "yf_get_insider_purchases":
                    result = await yfinance_service.get_insider_purchases(**args)
                else:
                    result = {"error": f"Unknown function: {name}"}
            except Exception as e:
                result = {"error": str(e)}
            
            response_parts.append({
                "functionResponse": {
                    "name": name,
                    "response": {"content": result}
                }
            })
        
        messages.append({"role": "function", "parts": response_parts})

    raise Exception("Max tool-calling turns reached")


async def get_seeking_alpha_growth(ticker: str) -> float:
    """Fetch 'EPS FWD Long Term Growth' from Seeking Alpha."""
    prompt = f"Seeking Alpha {ticker} 'EPS FWD Long Term Growth (3-5Y CAGR)'. Return FLOAT ONLY."
    try:
        text = await _call_gemini(prompt, use_search=True)
        match = re.search(r"(\d+\.?\d*)", text)
        return float(match.group(1)) if match else 0.0
    except Exception:
        return 0.0


async def perform_analysis_step(ticker: str, step_index: int, context: dict = None) -> dict:
    """Execute a specific step of the 6-step analytical pipeline."""
    # Check cache first
    cached_data = cache_service.get_cached_data(ticker, f"step_{step_index}")
    if cached_data:
        return cached_data

    # Step 1: Fundamentals Deep Dive & Dashboard
    if step_index == 1:
        print(f"Attempting Direct Fetch for Step 1 {ticker}...")
        try:
            ext = await yfinance_service.get_extended_fundamentals(ticker)
            info = ext["info"]
            calc = ext["calculated"]
            
            # Base data for dashboard cards
            result = {
                "fundamentals": {
                    "currentPrice": calc["currentPrice"],
                    "marketCap": calc["marketCap"],
                    "peTrailing": calc["peTrailing"],
                    "peForward": calc["peForward"],
                    "revenueGrowth1Y": calc["revenueGrowth1Y"],
                    "revenueGrowth3Y": calc["revenueGrowth3Y"],
                    "netMargin": calc["netMargin"],
                    "roe": calc["roe"],
                    "targetPrice": calc["targetPrice"],
                    "upside": calc["upside"],
                    "intrinsicValue": calc["intrinsicValue"],
                    "marginOfSafety": calc["marginOfSafety"],
                    "companyName": info.get("longName", ticker),
                    "longBusinessSummary": info.get("longBusinessSummary", "")
                },
                "report": {} # To be populated by AI
            }

            print(f"Generating Senior Analyst Report for {ticker}...")
            # Enhanced prompt for Deep Dive Report
            prompt = f"""You are a Senior Wall Street Analyst. Analyze the following raw data for {ticker} and provide a high-fidelity deep-dive report.
            
            DATA: {json.dumps(calc)}
            
            STRUCTURE YOUR RESPONSE AS A JSON OBJECT WITH THESE KEYS:
            1. "valuation": A deep analysis of P/E multiples vs historical norms and intrinsic value.
            2. "profitability": Assessment of margins (Operating {calc['operatingMargin']}%, Net {calc['netMargin']}%) and ROE.
            3. "growth": Evaluation of top-line expansion (1Y: {calc['revenueGrowth1Y']}%, 3Y CAGR: {calc['revenueGrowth3Y']}%) and strategic drivers.
            4. "priceTarget": 12-month target rationale (Target: ${calc['targetPrice']}) and investment thesis.
            5. "score": A composite quality score (0-100).
            
            Return ONLY the JSON object."""
            
            try:
                ai_text = await _call_gemini(prompt, use_search=False)
                ai_data = json.loads(_clean_json(ai_text))
                result["report"] = {
                    "valuation": ai_data.get("valuation", ""),
                    "profitability": ai_data.get("profitability", ""),
                    "growth": ai_data.get("growth", ""),
                    "priceTarget": ai_data.get("priceTarget", "")
                }
                result["fundamentals"]["score"] = ai_data.get("score", 75)
            except Exception as ai_err:
                print(f"AI Report generation failed: {ai_err}")
                result["report"] = {"error": "AI report generation currently unavailable."}
                result["fundamentals"]["score"] = 75

            print(f"Step 1 Direct Fetch & Report successful for {ticker}")
            cache_service.set_cached_data(ticker, "step_1", result)
            return result
        except Exception as e:
            print(f"Step 1 Direct Fetch failed for {ticker}: {e}. Falling back to standard AI.")
            pass

    # Step 2: Technical Analysis Direct Fetch
    if step_index == 2:
        print(f"Attempting Direct Fetch for Step 2 {ticker}...")
        try:
            # Try to get intrinsic value from Step 1 cache for alignment logic
            intrinsic_value = 0
            step1_cache = cache_service.get_cached_data(ticker, "step_1")
            if step1_cache and "fundamentals" in step1_cache:
                intrinsic_value = step1_cache["fundamentals"].get("intrinsicValue", 0)
            
            result = await yfinance_service.get_technical_analysis(ticker, intrinsic_value)
            
            # Minimal AI for summary if needed
            if "summary" not in result:
                metrics = result["metrics"]
                prompt = f"Summarize technical outlook for {ticker} based on: Trend {metrics['trend']}, RSI {metrics['rsi']}, Volatility {metrics['volatility']}, Alignment {metrics['alignment']}. Max 2 sentences."
                try:
                    summary = await _call_gemini(prompt, use_search=False)
                    result["summary"] = summary.strip()
                except:
                    result["summary"] = f"The stock is currently in a {metrics['trend']} trend with {metrics['volatility']} volatility."

            print(f"Step 2 Direct Fetch successful for {ticker}")
            cache_service.set_cached_data(ticker, "step_2", result)
            return result
        except Exception as e:
            print(f"Step 2 Direct Fetch failed for {ticker}: {e}. Falling back to AI.")
            pass

    # Load prompt from file or use fallback
    prompt = _load_prompt(step_index, ticker)
    
    if not prompt:
        step_prompts = [
            # Step 1: Fundamentals (Backup)
            f"Gather financial fundamentals for {ticker}. Use yf_get_stock_info and yf_get_financials. Return JSON only.",
            # Step 2: Technicals
            f"Gather technical indicators for {ticker}. Use yf_get_stock_history. Return JSON only.",
            # Step 3: Institutional
            f"Gather institutional holders for {ticker}. Return JSON only.",
            # Step 4: Sector/Macro
            f"Compare {ticker} to its sector and peers. Return JSON only.",
            # Step 5: Sentiment
            f"Analyze sentiment for {ticker} from last 7 days. Return JSON only.",
            # Step 6: Final Scoring
            f"Final recommendation for {ticker} using context: {json.dumps(context)}. Return JSON only."
        ]
        prompt = step_prompts[step_index - 1]

    use_yf = step_index <= 3
    use_av = (step_index == 5) or (step_index > 3 and not use_yf)

    try:
        text = await _call_gemini(prompt, use_search=True, use_av=use_av, use_yf=use_yf)
        result = json.loads(_clean_json(text))
        cache_service.set_cached_data(ticker, f"step_{step_index}", result)
        return result
    except Exception as e:
        print(f"Error in perform_analysis_step {step_index}: {e}")
        raise

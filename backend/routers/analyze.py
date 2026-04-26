from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.gemini_service import resolve_ticker_name, perform_analysis_step

router = APIRouter()

class AnalyzeRequest(BaseModel):
    query: str
    step: int = 1
    context: dict | None = None

@router.post("/analyze")
async def analyze_stock(req: AnalyzeRequest):
    if req.step > 1:
        raise HTTPException(status_code=400, detail="Only Step 1 is enabled for testing at this time.")
    
    query = req.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # Fast-track: If it looks like a ticker, use it immediately
    ticker = None
    if query.isupper() and 1 <= len(query) <= 5:
        ticker = query
    
    # Step 0: Resolve ticker only if not already determined
    if not ticker and req.step == 1:
        # Use AI only if it's clearly a company name
        ticker_info = await resolve_ticker_name(query)
        ticker = ticker_info.get("ticker")
    elif not ticker:
        ticker = query # Fallback
    
    if not ticker:
        raise HTTPException(status_code=404, detail=f"Could not find stock ticker for: {query}")

    # Execute the requested step
    try:
        step_result = await perform_analysis_step(ticker, req.step, req.context)
        return {
            "ticker": ticker,
            "step": req.step,
            "data": step_result
        }
    except Exception as e:
        print(f"Step {req.step} failed for {ticker}: {e}")
        raise HTTPException(status_code=502, detail=f"AI Step {req.step} failed: {str(e)}")

@router.post("/dcf")
async def compute_dcf(req: dict):
    """Recompute DCF intrinsic value with user-supplied assumptions."""
    # Keeping this as a utility for the UI's interactive DCF calculator
    ticker = req.get("ticker", "")
    current_price = req.get("currentPrice", 0)
    revenue = req.get("revenueBase", 0)
    wacc = req.get("wacc", 10.0) / 100
    terminal_growth = req.get("terminalGrowthRate", 3.0) / 100
    growth_rates = req.get("growthRates", [30, 25, 20, 18, 15])
    margin = req.get("netMargin", 25.0) / 100
    shares_outstanding = req.get("sharesOutstanding", 1)

    # Simple DCF calculation
    fcfs = []
    rev = revenue
    for g in growth_rates:
        rev = rev * (1 + g / 100)
        fcf = rev * margin
        fcfs.append(fcf)

    terminal_value = fcfs[-1] * (1 + terminal_growth) / (wacc - terminal_growth)
    pv_fcfs = sum(fcf / (1 + wacc) ** (i + 1) for i, fcf in enumerate(fcfs))
    pv_terminal = terminal_value / (1 + wacc) ** len(fcfs)
    enterprise_value = pv_fcfs + pv_terminal
    intrinsic_per_share = enterprise_value / shares_outstanding if shares_outstanding else 0
    margin_of_safety = (intrinsic_per_share - current_price) / current_price * 100 if current_price else 0

    return {
        "intrinsicValue": round(intrinsic_per_share, 2),
        "marginOfSafety": round(margin_of_safety, 2),
        "enterpriseValue": round(enterprise_value, 0),
        "pvFCFs": round(pv_fcfs, 0),
        "pvTerminal": round(pv_terminal, 0),
    }

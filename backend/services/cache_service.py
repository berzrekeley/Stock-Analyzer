import os
import json
import time
from datetime import datetime, timedelta

CACHE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "cache")

def get_cache_path(ticker: str, step: str) -> str:
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)
    return os.path.join(CACHE_DIR, f"{ticker}_{step}.json")

def get_cached_data(ticker: str, step: str, expiry_hours: int = 24):
    path = get_cache_path(ticker, step)
    if not os.path.exists(path):
        return None
    
    try:
        with open(path, "r") as f:
            cached = json.load(f)
            
        timestamp = cached.get("timestamp", 0)
        if time.time() - timestamp > (expiry_hours * 3600):
            return None # Expired
            
        return cached.get("data")
    except Exception:
        return None

def set_cached_data(ticker: str, step: str, data: dict):
    path = get_cache_path(ticker, step)
    try:
        with open(path, "w") as f:
            json.dump({
                "timestamp": time.time(),
                "date": datetime.now().isoformat(),
                "data": data
            }, f, indent=2)
    except Exception as e:
        print(f"Cache write error: {e}")

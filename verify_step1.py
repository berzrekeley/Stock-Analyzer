import asyncio
import httpx
import json

async def main():
    async with httpx.AsyncClient(timeout=120) as client:
        print("Triggering Step 1 for GOOG...")
        try:
            resp = await client.post("http://localhost:8000/api/analyze", json={
                "query": "GOOG",
                "step": 1
            })
            print(f"Status: {resp.status_code}")
            print(f"Response: {json.dumps(resp.json(), indent=2)}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

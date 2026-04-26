
Gemini
Stock Analysis Platform PRD Generation
Conversation with Gemini
I want to create a website for stocks. I have created a requirements document and attached it here. please use this document to help me create a prd document that I can feed into Claude so that it can help me make the website.

Here is a comprehensive Product Requirements Document (PRD) formulated from your provided requirements. To align with an Omni-Architect approach to system design, this PRD is structured to be highly modular, ensuring the front-end dashboard, data-fetching agents, and quantitative risk modeling engines can scale cleanly.

You can copy and paste this directly into Claude to guide the development of your stock analysis website.

Product Requirements Document (PRD): Multi-Factor AI Stock Analysis Platform
1. Product Vision & Overview
The objective is to build a professional-grade, AI-driven stock analysis web application. The platform will serve as a holistic multi-factor modeling tool that evaluates whether a stock (e.g., NVDA) is undervalued, fairly priced, or overpriced. It will synthesize fundamental, technical, and sentiment-based data into a unified dashboard.
+1

2. Core Functional Requirements
The application must execute a 6-step analytical pipeline to generate its recommendations.

Step 1: Financial Fundamentals (Intrinsic Value)

Data Gathering: Fetch current price, 52-week high/low, market cap, P/E, PEG, P/B, P/S, and EV/EBITDA ratios.


Performance Metrics: Retrieve 1Y, 3Y, and 5Y CAGR for revenue growth, EPS growth, and profit margins.


Health Metrics: Calculate debt-to-equity, current ratio, free cash flow, and ROE.


Valuation Engine: Perform a Discounted Cash Flow (DCF) or intrinsic value analysis utilizing projected growth rates, WACC, and terminal value.


Output: Display the intrinsic value estimate alongside the margin of safety.

Step 2: Technical Indicators (Market Momentum)

Data Scope: Analyze the last 6 months of price and volume data.


Calculations: Compute 50-day and 200-day moving averages, RSI, MACD, Bollinger Bands, and On-Balance Volume (OBV).


Trend Analysis: Identify trend direction, volatility, key support/resistance zones, and assess if momentum aligns with the fundamental intrinsic value.

Step 3: Institutional and Insider Activity

Tracking: Examine insider buying vs. selling ratios over the past 90 days.


Institutional Sentiment: Analyze percentage changes in institutional holdings over the past quarter and determine if the stock is in an accumulation or distribution phase.

Step 4: Sector and Macro Comparison

Peer Benchmarking: Compare the target stock's valuation multiples against sector averages and industry leaders.


Macro Analysis: Assess broader conditions like interest rate environments, inflation expectations, and sector rotation to identify potential headwinds or tailwinds.

Step 5: AI Sentiment & Narrative Analysis

Aggregation: Summarize recent financial news, analyst reports, and social media sentiment from platforms like Reddit, Twitter/X, and Seeking Alpha.


NLP Processing: Identify prevailing narratives (e.g., "AI boom") and assign a sentiment polarity score ranging from -1 to +1. Ensure this sentiment is evaluated against the stock's fundamentals.
+1

Step 6: Composite Scoring Engine

Weighting System: The application must calculate a total score on a 0–100 scale using the following strict weights:

Fundamentals: 40% 

Technicals: 20% 

Sector/Macro: 15% 

Sentiment/Narrative: 15% 

Institutional/Insider: 10% 

Classification Logic:


Undervalued (Score ≥ 70): Flag as a potential buy opportunity.


Fairly Priced (Score 40–69): Flag as hold or neutral.


Overpriced (Score < 40): Flag to avoid or consider a short position.

3. User Interface (UI) & Dashboard Architecture
The front-end should be designed as an interactive, professional dashboard.

Global Navigation (Left Sidebar): Should include routing to distinct views: Executive Summary, Fundamentals, Technical Analysis, Institutional Activity, Sector Comparison, Sentiment Analysis, Composite Scoring, Price Forecasts, and Investment Recommendation.

Executive Summary View: Must immediately show the stock ticker, current price, calculated intrinsic value, margin of safety, and the final 0-100 composite score with its corresponding classification badge (e.g., "UNDERVALUED").

Visualizations: Integrate charting libraries to visualize technical indicators, sentiment polarity, and the weighted breakdown of the composite score.


Final Output Summary: A concise, auto-generated paragraph must be displayed detailing the primary reason for the classification, key risk factors/catalysts, and a 6-to-12-month price forecast range.

4. Technical Stack & Data Integrations

Data Pipelines: The backend should utilize Python-based integrations or serverless functions using yfinance and yahooquery to fetch real-time market data.


Data Processing: Utilize pandas, numpy, and pandas_ta for data manipulation and automated technical analysis computations.
+1


Historical Data Requirements: The system must ensure it pulls at least 18 months of historical data to accurately process the 200-day Moving Average (requiring 200+ trading days of data).

make this file into a .md file so it is easier for claude to ingest

Your Markdown file is ready
MD icon
 PRD_MultiF...k_Analysis 
MD

I have packaged the complete Product Requirements Document (PRD) into a formatted Markdown (.md) file. You can download this file and upload or paste it directly into Claude to begin the architectural planning and coding of your stock analysis platform.

You’ve reached your Pro model limit
Responses will use other models until it resets on Apr 20, 9:44 PM.






Gemini is AI and can make mistakes.

# Product Requirements Document (PRD): Multi-Factor AI Stock Analysis Platform

## 1. Product Vision & Overview
The objective is to build a professional-grade, AI-driven stock analysis web application. The platform will serve as a holistic multi-factor modeling tool that evaluates whether a stock (e.g., NVDA) is undervalued, fairly priced, or overpriced. It will synthesize fundamental, technical, and sentiment-based data into a unified dashboard.

## 2. Core Functional Requirements

The application must execute a 6-step analytical pipeline to generate its recommendations.

### Step 1: Financial Fundamentals (Intrinsic Value)
* **Data Gathering:** Fetch current price, 52-week high/low, market cap, P/E, PEG, P/B, P/S, and EV/EBITDA ratios.
* **Performance Metrics:** Retrieve 1Y, 3Y, and 5Y CAGR for revenue growth, EPS growth, and profit margins.
* **Health Metrics:** Calculate debt-to-equity, current ratio, free cash flow, and ROE.
* **Valuation Engine:** Perform a Discounted Cash Flow (DCF) or intrinsic value analysis utilizing projected growth rates, WACC, and terminal value. 
* **Output:** Display the intrinsic value estimate alongside the margin of safety.

### Step 2: Technical Indicators (Market Momentum)
* **Data Scope:** Analyze the last 6 months of price and volume data.
* **Calculations:** Compute 50-day and 200-day moving averages, RSI, MACD, Bollinger Bands, and On-Balance Volume (OBV).
* **Trend Analysis:** Identify trend direction, volatility, key support/resistance zones, and assess if momentum aligns with the fundamental intrinsic value.

### Step 3: Institutional and Insider Activity
* **Tracking:** Examine insider buying vs. selling ratios over the past 90 days.
* **Institutional Sentiment:** Analyze percentage changes in institutional holdings over the past quarter and determine if the stock is in an accumulation or distribution phase.

### Step 4: Sector and Macro Comparison
* **Peer Benchmarking:** Compare the target stock's valuation multiples against sector averages and industry leaders.
* **Macro Analysis:** Assess broader conditions like interest rate environments, inflation expectations, and sector rotation to identify potential headwinds or tailwinds.

### Step 5: AI Sentiment & Narrative Analysis
* **Aggregation:** Summarize recent financial news, analyst reports, and social media sentiment from platforms like Reddit, Twitter/X, and Seeking Alpha.
* **NLP Processing:** Identify prevailing narratives (e.g., "AI boom") and assign a sentiment polarity score ranging from -1 to +1. Ensure this sentiment is evaluated against the stock's fundamentals.

### Step 6: Composite Scoring Engine
* **Weighting System:** The application must calculate a total score on a 0–100 scale using the following strict weights:
    * Fundamentals: 40%
    * Technicals: 20%
    * Sector/Macro: 15%
    * Sentiment/Narrative: 15%
    * Institutional/Insider: 10%
* **Classification Logic:**
    * **Undervalued (Score >= 70):** Flag as a potential buy opportunity.
    * **Fairly Priced (Score 40–69):** Flag as hold or neutral.
    * **Overpriced (Score < 40):** Flag to avoid or consider a short position.

## 3. User Interface (UI) & Dashboard Architecture
The front-end should be designed as an interactive, professional dashboard. 

* **Global Navigation (Left Sidebar):** Should include routing to distinct views: Executive Summary, Fundamentals, Technical Analysis, Institutional Activity, Sector Comparison, Sentiment Analysis, Composite Scoring, Price Forecasts, and Investment Recommendation.
* **Executive Summary View:** Must immediately show the stock ticker, current price, calculated intrinsic value, margin of safety, and the final 0-100 composite score with its corresponding classification badge (e.g., "UNDERVALUED").
* **Visualizations:** Integrate charting libraries to visualize technical indicators, sentiment polarity, and the weighted breakdown of the composite score.
* **Final Output Summary:** A concise, auto-generated paragraph must be displayed detailing the primary reason for the classification, key risk factors/catalysts, and a 6-to-12-month price forecast range.

## 4. Technical Stack & Data Integrations
* **Data Pipelines:** The backend should utilize Python-based integrations or serverless functions using `yfinance` and `yahooquery` to fetch real-time market data.
* **Data Processing:** Utilize `pandas`, `numpy`, and `pandas_ta` for data manipulation and automated technical analysis computations.
* **Historical Data Requirements:** The system must ensure it pulls at least 18 months of historical data to accurately process the 200-day Moving Average (requiring 200+ trading days of data).
PRD_MultiFactor_AI_Stock_Analysis.md
Displaying PRD_MultiFactor_AI_Stock_Analysis.md.
Chat

New Conversation

🤓 Explain a complex thing

Explain Artificial Intelligence so that I can explain it to my six-year-old child.


🧠 Get suggestions and create new ideas

Please give me the best 10 travel ideas around the world


💭 Translate, summarize, fix grammar and more…

Translate "I love you" French



AITOPIA
Hello, how can I help you today?



Translate "I love you" French




AITOPIA
(Internet connection lost. Please try again)




AITOPIA

10
Upgrade





Product Requirements Document (PRD): Multi-Factor AI Stock Analysis Platform
1. Product Vision & Overview
The objective is to build a professional-grade, AI-driven stock analysis web application. The platform will serve as a holistic multi-factor modeling tool that evaluates whether a stock (e.g., NVDA) is undervalued, fairly priced, or overpriced. It will synthesize fundamental, technical, and sentiment-based data into a unified dashboard.
+1

2. Core Functional Requirements
The application must execute a 6-step analytical pipeline to generate its recommendations.

Step 1: Financial Fundamentals (Intrinsic Value)

Data Gathering: Fetch current price, 52-week high/low, market cap, P/E, PEG, P/B, P/S, and EV/EBITDA ratios.


Performance Metrics: Retrieve 1Y, 3Y, and 5Y CAGR for revenue growth, EPS growth, and profit margins.


Health Metrics: Calculate debt-to-equity, current ratio, free cash flow, and ROE.


Valuation Engine: Perform a Discounted Cash Flow (DCF) or intrinsic value analysis utilizing projected growth rates, WACC, and terminal value.


Output: Display the intrinsic value estimate alongside the margin of safety.

Step 2: Technical Indicators (Market Momentum)

Data Scope: Analyze the last 6 months of price and volume data.


Calculations: Compute 50-day and 200-day moving averages, RSI, MACD, Bollinger Bands, and On-Balance Volume (OBV).


Trend Analysis: Identify trend direction, volatility, key support/resistance zones, and assess if momentum aligns with the fundamental intrinsic value.

Step 3: Institutional and Insider Activity

Tracking: Examine insider buying vs. selling ratios over the past 90 days.


Institutional Sentiment: Analyze percentage changes in institutional holdings over the past quarter and determine if the stock is in an accumulation or distribution phase.

Step 4: Sector and Macro Comparison

Peer Benchmarking: Compare the target stock's valuation multiples against sector averages and industry leaders.


Macro Analysis: Assess broader conditions like interest rate environments, inflation expectations, and sector rotation to identify potential headwinds or tailwinds.

Step 5: AI Sentiment & Narrative Analysis

Aggregation: Summarize recent financial news, analyst reports, and social media sentiment from platforms like Reddit, Twitter/X, and Seeking Alpha.


NLP Processing: Identify prevailing narratives (e.g., "AI boom") and assign a sentiment polarity score ranging from -1 to +1. Ensure this sentiment is evaluated against the stock's fundamentals.
+1

Step 6: Composite Scoring Engine

Weighting System: The application must calculate a total score on a 0–100 scale using the following strict weights:

Fundamentals: 40% 

Technicals: 20% 

Sector/Macro: 15% 

Sentiment/Narrative: 15% 

Institutional/Insider: 10% 

Classification Logic:


Undervalued (Score ≥ 70): Flag as a potential buy opportunity.


Fairly Priced (Score 40–69): Flag as hold or neutral.


Overpriced (Score < 40): Flag to avoid or consider a short position.

3. User Interface (UI) & Dashboard Architecture
The front-end should be designed as an interactive, professional dashboard.

Global Navigation (Left Sidebar): Should include routing to distinct views: Executive Summary, Fundamentals, Technical Analysis, Institutional Activity, Sector Comparison, Sentiment Analysis, Composite Scoring, Price Forecasts, and Investment Recommendation.

Executive Summary View: Must immediately show the stock ticker, current price, calculated intrinsic value, margin of safety, and the final 0-100 composite score with its corresponding classification badge (e.g., "UNDERVALUED").

Visualizations: Integrate charting libraries to visualize technical indicators, sentiment polarity, and the weighted breakdown of the composite score.


Final Output Summary: A concise, auto-generated paragraph must be displayed detailing the primary reason for the classification, key risk factors/catalysts, and a 6-to-12-month price forecast range.

4. Technical Stack & Data Integrations

Data Pipelines: The backend should utilize Python-based integrations or serverless functions using yfinance and yahooquery to fetch real-time market data.


Data Processing: Utilize pandas, numpy, and pandas_ta for data manipulation and automated technical analysis computations.
+1


Historical Data Requirements: The system must ensure it pulls at least 18 months of historical data to accurately process the 200-day Moving Average (requiring 200+ trading days of data).




Make a Review & Earn Credit ❤
Chat
Ask
Search
Write
Image
ChatFile
Vision
Agent
Full Page
Invite & Earn

import ccxt
import pandas as pd
import time

binance = ccxt.binance()
symbol = 'BTC/USDT'  # You can change to ETH/USDT, EUR/USDT, etc.
timeframe = '1m'     # Options: '1m', '5m', '1h', '1d'
limit = 1000         # Binance max per request

all_candles = []

print("📡 Fetching 10,000 candles from Binance...")

# Fetch in chunks of 1000
since = binance.parse8601('2024-01-01T00:00:00Z')
for i in range(10):  # 10 * 1000 = 10,000 candles
    candles = binance.fetch_ohlcv(symbol, timeframe=timeframe, since=since, limit=limit)
    all_candles.extend(candles)
    since = candles[-1][0] + 1
    time.sleep(binance.rateLimit / 1000)

# Convert to DataFrame
df = pd.DataFrame(all_candles, columns=["timestamp", "open", "high", "low", "close", "volume"])
df["timestamp"] = pd.to_datetime(df["timestamp"], unit='ms')
df.to_csv("data/sample_data.csv", index=False)

print("✅ Saved to data/sample_data.csv")

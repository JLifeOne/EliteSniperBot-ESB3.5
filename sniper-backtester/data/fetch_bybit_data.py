import ccxt
import pandas as pd
import time

bybit = ccxt.bybit()
symbol = 'BTC/USDT'
timeframe = '1m'
limit = 1000

print("📡 Fetching 10,000 candles from Bybit...")

all_candles = []
since = bybit.parse8601('2024-01-01T00:00:00Z')

for _ in range(10):  # 10 * 1000 = 10,000
    candles = bybit.fetch_ohlcv(symbol, timeframe=timeframe, since=since, limit=limit)
    all_candles.extend(candles)
    since = candles[-1][0] + 1
    time.sleep(bybit.rateLimit / 1000)

df = pd.DataFrame(all_candles, columns=["timestamp", "open", "high", "low", "close", "volume"])
df["timestamp"] = pd.to_datetime(df["timestamp"], unit='ms')
df.to_csv("data/sample_data.csv", index=False)

print("✅ Saved: data/sample_data.csv")

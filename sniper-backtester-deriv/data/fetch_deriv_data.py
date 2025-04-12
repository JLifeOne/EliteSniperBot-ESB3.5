import websocket
import json
import pandas as pd
from datetime import datetime

output = []

def on_message(ws, message):
    global output
    print("📩 Message Received")
    data = json.loads(message)

    # ✅ Updated for Deriv candles
    if 'candles' in data:
        for candle in data['candles']:
            output.append([
                datetime.utcfromtimestamp(candle['epoch']).strftime('%Y-%m-%d %H:%M:%S'),
                float(candle['open']),
                float(candle['high']),
                float(candle['low']),
                float(candle['close']),
                float(candle.get('volume', 0))  # Deriv may omit volume
            ])
        print(f"✅ Received {len(output)} candles. Closing WebSocket...")
        ws.close()
    else:
        print("⚠️ No candle data returned:", data)

def on_open(ws):
    print("🚀 WebSocket Opened")
    ws.send(json.dumps({
        "ticks_history": "frxEURUSD",
        "adjust_start_time": 1,
        "count": 1000,
        "granularity": 60,
        "style": "candles",
        "end": "latest"
    }))

def fetch_and_save():
    ws = websocket.WebSocketApp(
        "wss://ws.binaryws.com/websockets/v3?app_id=1089",
        on_open=on_open,
        on_message=on_message
    )
    ws.run_forever()

    df = pd.DataFrame(output, columns=["timestamp", "open", "high", "low", "close", "volume"])
    df.to_csv("data/sample_data_deriv.csv", index=False)
    print("📁 Saved to data/sample_data_deriv.csv")

# Run it
if __name__ == "__main__":
    fetch_and_save()

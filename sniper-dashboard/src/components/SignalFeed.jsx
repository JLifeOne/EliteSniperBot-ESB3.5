import { useEffect, useState } from "react";

export default function SignalFeed() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://107.170.23.200:8080");

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📡 Signal received:", data);
        setSignals((prev) => [data, ...prev.slice(0, 50)]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => socket.close();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">📈 Live Signals</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {signals.map((signal, index) => (
          <li key={index} className="border border-blue-200 p-4 rounded-lg bg-white shadow-sm">
            <div className="font-medium text-lg mb-1">{signal.asset}</div>
            <div className="text-sm text-gray-600">
              <strong>Direction:</strong> {signal.direction} <br />
              <strong>Confidence:</strong> {signal.confidence}% <br />
              <strong>Killshot:</strong> {signal.killshot ? "✅ Yes" : "❌ No"} <br />
              <strong>Time:</strong> {signal.timestamp} <br />
              <strong>MTF Sync:</strong> {signal.mtfSync || "N/A"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
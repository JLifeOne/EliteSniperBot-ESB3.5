import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { execSync } from "child_process"; // For clearing 8080
import { startSignalStream } from "./websocket/stream.js"; // Optional external logic

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8080;

// Basic health route
app.get("/", (req, res) => {
  res.send("Sniper Core is live 🔫");
});

// WebSocket handler
wss.on("connection", (socket) => {
  console.log("📡 Client connected");
  startSignalStream?.(socket); // Optional if stream.js exists
});

// Kill 8080 if already used
try {
  execSync("fuser -k 8080/tcp");
  console.log("🔪 Cleared port 8080 before launch");
} catch (err) {
  console.log("⚠️ Port 8080 was free");
}

// ✅ Bind to 0.0.0.0 for external access
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🟢 Sniper Core running on http://0.0.0.0:${PORT}`);
});

// 🔁 Broadcast mock sniper signal every 3 seconds
setInterval(() => {
  const signal = {
    id: Math.floor(Math.random() * 100000),
    asset: "EURUSD",
    direction: Math.random() > 0.5 ? "CALL" : "PUT",
    confidence: (90 + Math.random() * 10).toFixed(2) + "%",
    timestamp: new Date().toISOString(),
    killshot: true,
  };

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(signal));
    }
  });

  console.log("🚀 Mock signal sent:", signal);
}, 3000);

import { generateSignal } from "../engine/logic.js";

export function startSignalStream(socket) {
  setInterval(() => {
    const signal = generateSignal();
    if (signal) {
      socket.send(JSON.stringify(signal));
    }
  }, 3000);
}

export function evaluatePattern() {
  const patterns = ["Engulfing", "Pin Bar", "Morning Star", "Doji", "None"];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

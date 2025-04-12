import { evaluatePattern } from "./patterns.js";
import { analyzeIndicators } from "./indicators.js";
import { calculateConfidence } from "./scoring.js";
import { validateKillShot } from "./validator.js";
import { v4 as uuid } from "uuid";

export function generateSignal() {
  const pattern = evaluatePattern();
  const indicators = analyzeIndicators();
  const confidence = calculateConfidence(pattern, indicators);
  const killShot = validateKillShot(confidence, pattern, indicators);

  return {
    id: uuid(),
    timestamp: new Date().toISOString(),
    asset: "EUR/USD",
    result: Math.random() < confidence / 100 ? "WIN" : "LOSS",
    confidence,
    pattern,
    indicators,
    killShot,
  };
}

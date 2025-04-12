export function validateKillShot(confidence, pattern, indicators) {
  return (
    confidence >= 94 &&
    pattern !== "None" &&
    indicators.macd &&
    indicators.vb_smi &&
    indicators.multi_tf_match
  );
}

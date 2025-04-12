export function calculateConfidence(pattern, indicators) {
  let score = 50;

  if (pattern !== "None") score += 10;
  if (indicators.macd) score += 10;
  if (indicators.vb_smi) score += 10;
  if (indicators.rsi_bb_agree) score += 10;
  if (indicators.adx_trend) score += 5;
  if (indicators.multi_tf_match) score += 5;

  return Math.min(score, 100);
}

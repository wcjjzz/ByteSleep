// 用简单规则模拟不同 Epoch 的阶段。
export function getEpochStage(epochId) {
  const mod = epochId % 10;
  if (mod === 0 || mod === 1) return 'WAKE';
  if (mod === 2) return 'N1';
  if (mod >= 3 && mod <= 6) return 'N2';
  if (mod === 7 || mod === 8) return 'N3';
  return 'REM';
}
